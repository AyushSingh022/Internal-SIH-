import { body } from 'express-validator';

export const signupValidator = [
  body('full_name').trim().notEmpty().withMessage('Full name is required').isLength({ max: 150 }),
  body('email').trim().isEmail().withMessage('Valid email address is required').normalizeEmail(),
  body('mobile').optional({ checkFalsy: true }).trim().isMobilePhone('any').withMessage('Valid mobile number is required'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('confirm_password')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match'),
  body('preferred_language').optional().isString(),
  body('state_id').optional({ checkFalsy: true }).isInt().withMessage('State must be a valid number'),
  body('district_id').optional({ checkFalsy: true }).isInt().withMessage('District must be a valid number'),
];

export const loginValidator = [
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export const analysisValidator = [
  body('state_id').isInt().withMessage('State is required'),
  body('district_id').isInt().withMessage('District is required'),
  body('village_id').isInt().withMessage('Village is required'),
  body('category_id').isInt().withMessage('Business category is required'),
  body('available_capital').isFloat({ min: 0 }).withMessage('Available capital must be a positive number'),
  body('search_radius_km').optional().isInt({ min: 1, max: 50 }).withMessage('Radius must be 1-50 km'),
  body('language').optional().isString(),
];

export const financialCalculateValidator = [
  body('available_capital').isFloat({ min: 0 }).withMessage('Available capital is required'),
  body('category_id').optional().isInt(),
  body('state').optional().isString(),
  body('scheme_id').optional().isInt(),
];

export const repaymentValidator = [
  body('loan_amount').isFloat({ min: 1 }).withMessage('Loan amount is required'),
  body('interest_rate').isFloat({ min: 0 }).withMessage('Interest rate is required'),
  body('tenure_months').isInt({ min: 1 }).withMessage('Tenure is required'),
  body('moratorium_months').optional().isInt({ min: 0 }),
  body('repayment_frequency').optional().isIn(['monthly', 'quarterly', 'half_yearly', 'annual']),
];
