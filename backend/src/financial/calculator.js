/**
 * Data-driven financial calculation engine.
 * All values come from scheme data — nothing hardcoded.
 */

/**
 * Calculate EMI using the standard formula:
 * EMI = [P × r × (1+r)^n] / [(1+r)^n - 1]
 */
export function calculateEMI(principal, annualRate, tenureMonths) {
  if (!principal || principal <= 0 || !annualRate || !tenureMonths) return null;

  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / tenureMonths;

  const pow = Math.pow(1 + monthlyRate, tenureMonths);
  return (principal * monthlyRate * pow) / (pow - 1);
}

/**
 * Convert repayment frequency to number of months per installment
 */
function frequencyToMonths(frequency) {
  switch (frequency) {
    case 'monthly': return 1;
    case 'quarterly': return 3;
    case 'half_yearly': return 6;
    case 'annual': return 12;
    default: return 1;
  }
}

/**
 * Generate full repayment schedule
 */
export function generateRepaymentSchedule({
  loanAmount,
  interestRate,
  tenureMonths,
  moratoriumMonths = 0,
  repaymentFrequency = 'monthly',
}) {
  if (!loanAmount || !interestRate || !tenureMonths) {
    return { error: 'Insufficient data for repayment calculation' };
  }

  const monthsPerInstallment = frequencyToMonths(repaymentFrequency);
  const effectiveTenure = tenureMonths - moratoriumMonths;
  const numberOfInstallments = Math.ceil(effectiveTenure / monthsPerInstallment);
  const periodicRate = (interestRate / 100 / 12) * monthsPerInstallment;

  // Calculate installment amount
  let installmentAmount;
  if (periodicRate === 0) {
    installmentAmount = loanAmount / numberOfInstallments;
  } else {
    const pow = Math.pow(1 + periodicRate, numberOfInstallments);
    installmentAmount = (loanAmount * periodicRate * pow) / (pow - 1);
  }

  // Generate schedule
  const schedule = [];
  let balance = loanAmount;

  // Moratorium period (interest accrual only)
  if (moratoriumMonths > 0) {
    const moratoriumInterest = loanAmount * (interestRate / 100 / 12) * moratoriumMonths;
    schedule.push({
      period: 'Moratorium',
      installment_number: 0,
      months: `1 - ${moratoriumMonths}`,
      installment_amount: 0,
      principal_component: 0,
      interest_component: Math.round(moratoriumInterest),
      remaining_balance: Math.round(loanAmount),
      is_moratorium: true,
    });
  }

  let totalInterest = 0;
  let totalPrincipal = 0;

  for (let i = 1; i <= numberOfInstallments; i++) {
    const interestComponent = balance * periodicRate;
    const principalComponent = installmentAmount - interestComponent;
    balance -= principalComponent;

    totalInterest += interestComponent;
    totalPrincipal += principalComponent;

    schedule.push({
      period: `${repaymentFrequency}`,
      installment_number: i,
      installment_amount: Math.round(installmentAmount),
      principal_component: Math.round(principalComponent),
      interest_component: Math.round(interestComponent),
      remaining_balance: Math.max(0, Math.round(balance)),
      is_moratorium: false,
    });
  }

  return {
    loan_amount: Math.round(loanAmount),
    interest_rate: interestRate,
    tenure_months: tenureMonths,
    moratorium_months: moratoriumMonths,
    repayment_frequency: repaymentFrequency,
    number_of_installments: numberOfInstallments,
    installment_amount: Math.round(installmentAmount),
    total_repayment: Math.round(totalPrincipal + totalInterest),
    total_interest: Math.round(totalInterest),
    total_principal: Math.round(totalPrincipal),
    schedule,
  };
}

/**
 * Main financial calculation using scheme-driven values
 */
export function calculateFinancials({ availableCapital, schemeRules }) {
  if (!schemeRules || schemeRules.length === 0) {
    return {
      available_capital: availableCapital,
      message: 'No matching government scheme found for the current inputs.',
      calculations: [],
    };
  }

  const calculations = schemeRules.map(rule => {
    const marginPct = rule.margin_percentage ? parseFloat(rule.margin_percentage) / 100 : null;
    const loanPct = rule.loan_percentage ? parseFloat(rule.loan_percentage) / 100 : (marginPct ? 1 - marginPct : null);

    // Calculate max feasible project cost based on available margin
    let estimatedProjectCost = null;
    if (marginPct && marginPct > 0) {
      estimatedProjectCost = availableCapital / marginPct;
    }

    // Cap at scheme maximum
    const maxProject = rule.max_project_cost ? parseFloat(rule.max_project_cost) : null;
    if (maxProject && estimatedProjectCost) {
      estimatedProjectCost = Math.min(estimatedProjectCost, maxProject);
    }

    // Calculate loan
    let potentialLoan = null;
    if (estimatedProjectCost && loanPct) {
      potentialLoan = estimatedProjectCost * loanPct;
    }

    // Cap at scheme max loan
    const maxLoan = rule.max_loan_amount ? parseFloat(rule.max_loan_amount) : null;
    if (maxLoan && potentialLoan) {
      potentialLoan = Math.min(potentialLoan, maxLoan);
    }

    // Calculate margin contribution
    const marginContribution = estimatedProjectCost ? estimatedProjectCost - (potentialLoan || 0) : availableCapital;

    // Repayment
    const interestRate = rule.interest_rate ? parseFloat(rule.interest_rate) : null;
    const tenureMonths = rule.tenure_months || null;
    const moratoriumMonths = rule.moratorium_months || 0;

    let repayment = null;
    if (potentialLoan && interestRate && tenureMonths) {
      repayment = generateRepaymentSchedule({
        loanAmount: potentialLoan,
        interestRate,
        tenureMonths,
        moratoriumMonths,
        repaymentFrequency: rule.repayment_frequency || 'monthly',
      });
    }

    return {
      category_label: rule.category_label || 'General',
      available_capital: Math.round(availableCapital),
      estimated_project_cost: estimatedProjectCost ? Math.round(estimatedProjectCost) : null,
      potential_loan: potentialLoan ? Math.round(potentialLoan) : null,
      margin_contribution: Math.round(marginContribution),
      margin_percentage: rule.margin_percentage || null,
      loan_percentage: rule.loan_percentage || null,
      interest_rate: interestRate,
      tenure_months: tenureMonths,
      moratorium_months: moratoriumMonths,
      repayment_frequency: rule.repayment_frequency || 'monthly',
      subsidy_percentage: rule.subsidy_percentage || null,
      subsidy_description: rule.subsidy_description || null,
      support_type: rule.support_type || null,
      installment_amount: repayment?.installment_amount || null,
      total_repayment: repayment?.total_repayment || null,
      total_interest: repayment?.total_interest || null,
      repayment_schedule: repayment,
    };
  });

  return {
    available_capital: Math.round(availableCapital),
    calculations,
  };
}
