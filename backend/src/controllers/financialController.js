import { validationResult } from 'express-validator';
import { calculateFinancials, generateRepaymentSchedule } from '../financial/calculator.js';
import * as schemeService from '../services/schemeService.js';
import { successResponse, errorResponse } from '../utils/response.js';

export async function calculate(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());

    const { available_capital, category_id, state, scheme_id } = req.body;

    let schemeRules = [];

    if (scheme_id) {
      const scheme = await schemeService.getSchemeById(scheme_id);
      if (scheme) schemeRules = scheme.financialRules?.map(r => r.toJSON()) || [];
    } else {
      const eligible = await schemeService.getEligibleSchemes({
        availableCapital: parseFloat(available_capital),
        categoryId: category_id,
        state,
      });
      if (eligible.length > 0) {
        schemeRules = eligible[0].financialRules || [];
      }
    }

    const result = calculateFinancials({
      availableCapital: parseFloat(available_capital),
      schemeRules,
    });

    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, 'Financial calculation failed', 500);
  }
}

export async function repayment(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return errorResponse(res, 'Validation failed', 400, errors.array());

    const { loan_amount, interest_rate, tenure_months, moratorium_months, repayment_frequency } = req.body;

    const schedule = generateRepaymentSchedule({
      loanAmount: parseFloat(loan_amount),
      interestRate: parseFloat(interest_rate),
      tenureMonths: parseInt(tenure_months),
      moratoriumMonths: parseInt(moratorium_months) || 0,
      repaymentFrequency: repayment_frequency || 'monthly',
    });

    return successResponse(res, schedule);
  } catch (err) {
    return errorResponse(res, 'Repayment calculation failed', 500);
  }
}
