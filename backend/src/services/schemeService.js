import { Op } from 'sequelize';
import { GovernmentScheme, SchemeFinancialRule, SchemeDocument, SchemeCategory, BusinessCategory } from '../models/index.js';

export async function getAllSchemes(filters = {}) {
  const where = { is_active: true };
  if (filters.government_level) where.government_level = filters.government_level;
  if (filters.state) where[Op.or] = [
    { state: filters.state },
    { state: null },
    { government_level: 'central' },
  ];

  return await GovernmentScheme.findAll({
    where,
    include: [
      { model: SchemeFinancialRule, as: 'financialRules' },
      { model: SchemeDocument, as: 'documents' },
    ],
    order: [['name', 'ASC']],
  });
}

export async function getSchemeById(id) {
  return await GovernmentScheme.findByPk(id, {
    include: [
      { model: SchemeFinancialRule, as: 'financialRules' },
      { model: SchemeDocument, as: 'documents' },
      {
        model: SchemeCategory, as: 'schemeCategories',
        include: [{ model: BusinessCategory }]
      },
    ],
  });
}

export async function getEligibleSchemes({ availableCapital, categoryId, state, isNewBusiness = true }) {
  const where = { is_active: true };

  // Get schemes available for the state (central + state-specific)
  if (state) {
    where[Op.or] = [
      { government_level: 'central' },
      { state: state },
    ];
  }

  const schemes = await GovernmentScheme.findAll({
    where,
    include: [
      { model: SchemeFinancialRule, as: 'financialRules' },
      { model: SchemeDocument, as: 'documents' },
      {
        model: SchemeCategory, as: 'schemeCategories',
        include: [{ model: BusinessCategory }],
      },
    ],
  });

  // Filter by eligibility
  const eligible = schemes
    .map(scheme => {
      const schemeData = scheme.toJSON();
      const rules = schemeData.financialRules || [];
      const matchingRules = rules.filter(rule => {
        if (rule.min_project_cost && availableCapital < parseFloat(rule.min_project_cost)) return false;
        return true;
      });

      // Check if business category matches (if scheme has category restrictions)
      const schemeCats = schemeData.schemeCategories || [];
      const categoryMatch = schemeCats.length === 0 || // No restriction
        schemeCats.some(sc => sc.category_id === parseInt(categoryId));

      // Calculate feasible project cost and loan for each matching rule
      const calculations = matchingRules.map(rule => {
        const marginPct = rule.margin_percentage ? parseFloat(rule.margin_percentage) / 100 : 0.1;
        const maxProjectFromMargin = marginPct > 0 ? availableCapital / marginPct : null;
        const maxProjectCost = rule.max_project_cost
          ? Math.min(maxProjectFromMargin || Infinity, parseFloat(rule.max_project_cost))
          : maxProjectFromMargin;

        const loanPct = rule.loan_percentage ? parseFloat(rule.loan_percentage) / 100 : (1 - marginPct);
        const calculatedLoan = maxProjectCost ? maxProjectCost * loanPct : null;
        const maxLoan = rule.max_loan_amount
          ? Math.min(calculatedLoan || Infinity, parseFloat(rule.max_loan_amount))
          : calculatedLoan;

        return {
          ...rule,
          calculated_project_cost: maxProjectCost ? Math.round(maxProjectCost) : null,
          calculated_loan: maxLoan ? Math.round(maxLoan) : null,
          calculated_margin: availableCapital,
        };
      });

      return {
        ...schemeData,
        category_match: categoryMatch,
        calculations,
        relevance_score: (categoryMatch ? 50 : 0) + (calculations.length > 0 ? 30 : 0) + (matchingRules.length * 10),
      };
    })
    .filter(s => s.relevance_score > 0)
    .sort((a, b) => b.relevance_score - a.relevance_score);

  return eligible;
}

export async function compareSchemes(schemeIds) {
  const schemes = await GovernmentScheme.findAll({
    where: { id: { [Op.in]: schemeIds } },
    include: [
      { model: SchemeFinancialRule, as: 'financialRules' },
      { model: SchemeDocument, as: 'documents' },
    ],
  });
  return schemes;
}
