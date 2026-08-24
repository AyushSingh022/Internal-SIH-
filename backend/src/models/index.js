import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// ============================================================
// LOCATION MODELS
// ============================================================

export const State = sequelize.define('State', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  name_local: { type: DataTypes.STRING(200) },
  lgd_code: { type: DataTypes.INTEGER, unique: true },
  iso_code: { type: DataTypes.STRING(10) },
}, { tableName: 'states' });

export const District = sequelize.define('District', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  name_local: { type: DataTypes.STRING(200) },
  lgd_code: { type: DataTypes.INTEGER },
  state_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'districts' });

export const Tehsil = sequelize.define('Tehsil', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  name_local: { type: DataTypes.STRING(200) },
  lgd_code: { type: DataTypes.INTEGER },
  district_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'tehsils' });

export const Block = sequelize.define('Block', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  name_local: { type: DataTypes.STRING(200) },
  lgd_code: { type: DataTypes.INTEGER },
  district_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'blocks' });

export const Village = sequelize.define('Village', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  name_local: { type: DataTypes.STRING(300) },
  lgd_code: { type: DataTypes.INTEGER },
  state_id: { type: DataTypes.INTEGER, allowNull: false },
  district_id: { type: DataTypes.INTEGER, allowNull: false },
  tehsil_id: { type: DataTypes.INTEGER },
  block_id: { type: DataTypes.INTEGER },
  latitude: { type: DataTypes.DECIMAL(10, 7) },
  longitude: { type: DataTypes.DECIMAL(10, 7) },
  population: { type: DataTypes.INTEGER },
  pincode: { type: DataTypes.STRING(10) },
}, { tableName: 'villages' });

// ============================================================
// USER MODEL
// ============================================================

export const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING(150), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  mobile: { type: DataTypes.STRING(15) },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  preferred_language: { type: DataTypes.STRING(10), defaultValue: 'en' },
  state_id: { type: DataTypes.INTEGER },
  district_id: { type: DataTypes.INTEGER },
}, { tableName: 'users' });

// ============================================================
// BUSINESS MODELS
// ============================================================

export const BusinessCategory = sequelize.define('BusinessCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  name_local: { type: DataTypes.STRING(200) },
  description: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING(50) },
  sector: { type: DataTypes.STRING(50) },
}, { tableName: 'business_categories' });

export const Business = sequelize.define('Business', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(200), allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
  latitude: { type: DataTypes.DECIMAL(10, 7) },
  longitude: { type: DataTypes.DECIMAL(10, 7) },
  village_id: { type: DataTypes.INTEGER },
  tehsil_id: { type: DataTypes.INTEGER },
  district_id: { type: DataTypes.INTEGER },
  state_id: { type: DataTypes.INTEGER },
  source: { type: DataTypes.STRING(100), defaultValue: 'seed' },
  verification_status: { type: DataTypes.ENUM('verified', 'unverified', 'pending'), defaultValue: 'unverified' },
  address: { type: DataTypes.TEXT },
  phone: { type: DataTypes.STRING(15) },
}, { tableName: 'businesses' });

// ============================================================
// GOVERNMENT SCHEME MODELS
// ============================================================

export const GovernmentScheme = sequelize.define('GovernmentScheme', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(300), allowNull: false },
  full_name: { type: DataTypes.STRING(500) },
  slug: { type: DataTypes.STRING(300), unique: true },
  government_level: { type: DataTypes.ENUM('central', 'state', 'district'), defaultValue: 'central' },
  state: { type: DataTypes.STRING(100) },
  department: { type: DataTypes.STRING(200) },
  ministry: { type: DataTypes.STRING(200) },
  description: { type: DataTypes.TEXT },
  objective: { type: DataTypes.JSON },
  target_group: { type: DataTypes.JSON },
  eligibility: { type: DataTypes.JSON },
  benefits: { type: DataTypes.TEXT },
  best_for: { type: DataTypes.JSON },
  limitations: { type: DataTypes.JSON },
  source_url: { type: DataTypes.STRING(500) },
  last_updated: { type: DataTypes.DATE },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'government_schemes' });

export const SchemeFinancialRule = sequelize.define('SchemeFinancialRule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  scheme_id: { type: DataTypes.INTEGER, allowNull: false },
  category_label: { type: DataTypes.STRING(100) },
  min_project_cost: { type: DataTypes.DECIMAL(15, 2) },
  max_project_cost: { type: DataTypes.DECIMAL(15, 2) },
  max_loan_amount: { type: DataTypes.DECIMAL(15, 2) },
  min_loan_amount: { type: DataTypes.DECIMAL(15, 2) },
  margin_percentage: { type: DataTypes.DECIMAL(5, 2) },
  loan_percentage: { type: DataTypes.DECIMAL(5, 2) },
  interest_rate: { type: DataTypes.DECIMAL(5, 2) },
  subsidy_percentage: { type: DataTypes.DECIMAL(5, 2) },
  subsidy_description: { type: DataTypes.TEXT },
  tenure_months: { type: DataTypes.INTEGER },
  moratorium_months: { type: DataTypes.INTEGER },
  repayment_frequency: { type: DataTypes.ENUM('monthly', 'quarterly', 'half_yearly', 'annual'), defaultValue: 'monthly' },
  support_type: { type: DataTypes.STRING(100) },
  conditions: { type: DataTypes.TEXT },
}, { tableName: 'scheme_financial_rules' });

export const SchemeDocument = sequelize.define('SchemeDocument', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  scheme_id: { type: DataTypes.INTEGER, allowNull: false },
  document_name: { type: DataTypes.STRING(200), allowNull: false },
  is_mandatory: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'scheme_documents' });

export const SchemeCategory = sequelize.define('SchemeCategory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  scheme_id: { type: DataTypes.INTEGER, allowNull: false },
  category_id: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'scheme_categories' });

// ============================================================
// ANALYSIS / REPORT MODEL
// ============================================================

export const AnalysisReport = sequelize.define('AnalysisReport', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.STRING(36), unique: true, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  // Location
  state_id: { type: DataTypes.INTEGER },
  district_id: { type: DataTypes.INTEGER },
  tehsil_id: { type: DataTypes.INTEGER },
  block_id: { type: DataTypes.INTEGER },
  village_id: { type: DataTypes.INTEGER },
  state_name: { type: DataTypes.STRING(100) },
  district_name: { type: DataTypes.STRING(100) },
  tehsil_name: { type: DataTypes.STRING(100) },
  block_name: { type: DataTypes.STRING(100) },
  village_name: { type: DataTypes.STRING(150) },
  // Business
  category_id: { type: DataTypes.INTEGER },
  category_name: { type: DataTypes.STRING(100) },
  available_capital: { type: DataTypes.DECIMAL(15, 2) },
  // Results
  feasibility_score: { type: DataTypes.INTEGER },
  competitor_count: { type: DataTypes.INTEGER },
  search_radius_km: { type: DataTypes.INTEGER, defaultValue: 10 },
  // Analysis data stored as JSON
  market_analysis: { type: DataTypes.JSON },
  opportunity_analysis: { type: DataTypes.JSON },
  swot_analysis: { type: DataTypes.JSON },
  risk_analysis: { type: DataTypes.JSON },
  ai_recommendation: { type: DataTypes.JSON },
  competitor_data: { type: DataTypes.JSON },
  financial_calculation: { type: DataTypes.JSON },
  eligible_schemes: { type: DataTypes.JSON },
  recommended_scheme_id: { type: DataTypes.INTEGER },
  repayment_schedule: { type: DataTypes.JSON },
  // Meta
  language: { type: DataTypes.STRING(10), defaultValue: 'en' },
  status: { type: DataTypes.ENUM('draft', 'completed', 'error'), defaultValue: 'draft' },
}, { tableName: 'analysis_reports' });

// ============================================================
// LANGUAGE / TRANSLATION MODELS
// ============================================================

export const Language = sequelize.define('Language', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING(10), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(50), allowNull: false },
  native_name: { type: DataTypes.STRING(100), allowNull: false },
  script: { type: DataTypes.STRING(50) },
  direction: { type: DataTypes.ENUM('ltr', 'rtl'), defaultValue: 'ltr' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  font_family: { type: DataTypes.STRING(100) },
}, { tableName: 'languages' });

export const Translation = sequelize.define('Translation', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  language_code: { type: DataTypes.STRING(10), allowNull: false },
  translation_key: { type: DataTypes.STRING(200), allowNull: false },
  translation_value: { type: DataTypes.TEXT, allowNull: false },
}, {
  tableName: 'translations',
  indexes: [
    { unique: true, fields: ['language_code', 'translation_key'] },
  ],
});

// ============================================================
// ASSOCIATIONS
// ============================================================

// Location hierarchy
State.hasMany(District, { foreignKey: 'state_id' });
District.belongsTo(State, { foreignKey: 'state_id' });

District.hasMany(Tehsil, { foreignKey: 'district_id' });
Tehsil.belongsTo(District, { foreignKey: 'district_id' });

District.hasMany(Block, { foreignKey: 'district_id' });
Block.belongsTo(District, { foreignKey: 'district_id' });

State.hasMany(Village, { foreignKey: 'state_id' });
Village.belongsTo(State, { foreignKey: 'state_id' });
District.hasMany(Village, { foreignKey: 'district_id' });
Village.belongsTo(District, { foreignKey: 'district_id' });
Tehsil.hasMany(Village, { foreignKey: 'tehsil_id' });
Village.belongsTo(Tehsil, { foreignKey: 'tehsil_id' });
Block.hasMany(Village, { foreignKey: 'block_id' });
Village.belongsTo(Block, { foreignKey: 'block_id' });

// Business
BusinessCategory.hasMany(Business, { foreignKey: 'category_id' });
Business.belongsTo(BusinessCategory, { foreignKey: 'category_id' });

// Schemes
GovernmentScheme.hasMany(SchemeFinancialRule, { foreignKey: 'scheme_id', as: 'financialRules' });
SchemeFinancialRule.belongsTo(GovernmentScheme, { foreignKey: 'scheme_id' });

GovernmentScheme.hasMany(SchemeDocument, { foreignKey: 'scheme_id', as: 'documents' });
SchemeDocument.belongsTo(GovernmentScheme, { foreignKey: 'scheme_id' });

GovernmentScheme.hasMany(SchemeCategory, { foreignKey: 'scheme_id', as: 'schemeCategories' });
SchemeCategory.belongsTo(GovernmentScheme, { foreignKey: 'scheme_id' });
BusinessCategory.hasMany(SchemeCategory, { foreignKey: 'category_id' });
SchemeCategory.belongsTo(BusinessCategory, { foreignKey: 'category_id' });

// Reports
User.hasMany(AnalysisReport, { foreignKey: 'user_id' });
AnalysisReport.belongsTo(User, { foreignKey: 'user_id' });

export default sequelize;
