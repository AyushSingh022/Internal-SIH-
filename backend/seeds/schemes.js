import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GovernmentScheme, SchemeFinancialRule, SchemeDocument, SchemeCategory } from '../src/models/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCHEMES_DIR = path.join(__dirname, '..', 'imports', 'schemes');

/**
 * Generic JSON scheme importer.
 * Handles different JSON structures and normalizes them into the database schema.
 */
export async function seedSchemes() {
  console.log('  Importing government schemes...');

  const files = fs.readdirSync(SCHEMES_DIR).filter(f => f.endsWith('.json'));
  console.log(`  Found ${files.length} scheme file(s)`);

  for (const file of files) {
    const filePath = path.join(SCHEMES_DIR, file);
    console.log(`  Processing: ${file}`);

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(raw);
      await processSchemeFile(data, file);
    } catch (err) {
      console.error(`  ⚠ Error processing ${file}:`, err.message);
    }
  }
}

async function processSchemeFile(data, fileName) {
  // Handle different JSON structures
  const schemes = extractSchemes(data);

  for (const rawScheme of schemes) {
    try {
      const normalized = normalizeScheme(rawScheme, data);
      await upsertScheme(normalized, data.common_documents);
    } catch (err) {
      console.error(`  ⚠ Error importing scheme "${rawScheme.name || 'unknown'}":`, err.message);
    }
  }
}

/**
 * Extract scheme array from various JSON structures
 */
function extractSchemes(data) {
  if (Array.isArray(data)) return data;
  if (data.schemes && Array.isArray(data.schemes)) return data.schemes;
  if (data.data && Array.isArray(data.data)) return data.data;
  if (data.scheme) return [data.scheme];
  // Single scheme object
  if (data.name) return [data];
  return [];
}

/**
 * Normalize different field naming conventions
 */
function normalizeScheme(raw, fileData) {
  const name = raw.name || raw.scheme_name || raw.title || '';
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return {
    name,
    full_name: raw.full_name || raw.fullName || null,
    slug,
    government_level: detectGovernmentLevel(raw, fileData),
    state: raw.state || raw.applicable_state || fileData?.state || null,
    department: raw.department || raw.ministry || raw.nodal_agency || null,
    ministry: raw.ministry || raw.department || null,
    description: raw.description || raw.objective?.[0] || raw.about || null,
    objective: raw.objective || raw.objectives || null,
    target_group: normalizeTargetGroup(raw.target_group || raw.targetGroup || raw.beneficiaries),
    eligibility: raw.eligibility || raw.eligibility_criteria || null,
    benefits: raw.benefits || raw.benefit_description || null,
    best_for: raw.best_for || raw.suitable_for || null,
    limitations: raw.limitations || raw.restrictions || null,
    source_url: raw.source_url || raw.url || raw.website || null,
    last_updated: raw.last_updated || raw.updated_at || null,
    financial_support: raw.financial_support || raw.financialSupport || raw.financial || null,
    common_documents: fileData?.common_documents || [],
  };
}

function normalizeTargetGroup(tg) {
  if (!tg) return null;
  if (Array.isArray(tg)) return tg;
  if (typeof tg === 'string') return [tg];
  return null;
}

function detectGovernmentLevel(raw, fileData) {
  const gov = (raw.government || raw.government_level || fileData?.government || '').toLowerCase();
  if (gov.includes('central') || gov.includes('india')) return 'central';
  if (gov.includes('state')) return 'state';
  if (gov.includes('district')) return 'district';
  // Infer from other fields
  if (raw.state || fileData?.state) return 'state';
  return 'central';
}

/**
 * Insert or update a scheme, avoiding duplicates
 */
async function upsertScheme(normalized, commonDocuments) {
  // Check for duplicates
  const existing = await GovernmentScheme.findOne({ where: { slug: normalized.slug } });
  if (existing) {
    console.log(`    ↳ Skipping duplicate: ${normalized.name}`);
    return;
  }

  const scheme = await GovernmentScheme.create({
    name: normalized.name,
    full_name: normalized.full_name,
    slug: normalized.slug,
    government_level: normalized.government_level,
    state: normalized.state,
    department: normalized.department,
    ministry: normalized.ministry,
    description: normalized.description,
    objective: normalized.objective,
    target_group: normalized.target_group,
    eligibility: normalized.eligibility,
    benefits: typeof normalized.benefits === 'string' ? normalized.benefits : JSON.stringify(normalized.benefits),
    best_for: normalized.best_for,
    limitations: normalized.limitations,
    source_url: normalized.source_url,
    last_updated: normalized.last_updated ? new Date(normalized.last_updated) : null,
  });

  // Extract and create financial rules
  await createFinancialRules(scheme.id, normalized.financial_support);

  // Create required documents
  const docs = commonDocuments || [];
  if (docs.length > 0) {
    await SchemeDocument.bulkCreate(
      docs.map(d => ({ scheme_id: scheme.id, document_name: d, is_mandatory: true }))
    );
  }

  console.log(`    ✓ Imported: ${normalized.name}`);
}

/**
 * Extract financial rules from various JSON structures
 */
async function createFinancialRules(schemeId, financialSupport) {
  if (!financialSupport) return;

  const rules = [];

  // Handle MUDRA-style categories
  if (financialSupport.categories) {
    for (const [label, desc] of Object.entries(financialSupport.categories)) {
      const amounts = extractAmounts(desc);
      rules.push({
        scheme_id: schemeId,
        category_label: label,
        max_loan_amount: amounts.max,
        min_loan_amount: amounts.min,
        support_type: financialSupport.type || 'Loan',
      });
    }
  }

  // Handle max project cost (PMEGP style)
  if (financialSupport.maximum_project_cost || financialSupport.maximum_project_cost_for_subsidy) {
    const costs = financialSupport.maximum_project_cost || financialSupport.maximum_project_cost_for_subsidy;
    for (const [label, desc] of Object.entries(costs)) {
      const amounts = extractAmounts(desc);
      const subsidyParts = extractSubsidy(financialSupport.subsidy);
      rules.push({
        scheme_id: schemeId,
        category_label: label,
        max_project_cost: amounts.max,
        subsidy_percentage: subsidyParts.percentage,
        subsidy_description: financialSupport.subsidy || null,
        margin_percentage: subsidyParts.percentage ? (100 - subsidyParts.percentage) * 0.1 : 10,
        loan_percentage: 90,
        interest_rate: 8.5,
        tenure_months: 60,
        moratorium_months: 6,
        repayment_frequency: 'monthly',
        support_type: 'Bank loan plus subsidy',
      });
    }
  }

  // Handle Stand-Up India style (loan range)
  if (financialSupport.loan) {
    const amounts = extractAmounts(financialSupport.loan);
    rules.push({
      scheme_id: schemeId,
      category_label: 'General',
      min_loan_amount: amounts.min,
      max_loan_amount: amounts.max,
      margin_percentage: 15,
      loan_percentage: 85,
      interest_rate: 9.0,
      tenure_months: 84,
      moratorium_months: 12,
      repayment_frequency: 'monthly',
      support_type: financialSupport.type || 'Bank loan',
    });
  }

  // Handle generic type (SVANidhi, CGTMSE)
  if (rules.length === 0 && financialSupport.type) {
    rules.push({
      scheme_id: schemeId,
      category_label: 'General',
      support_type: financialSupport.type,
      conditions: financialSupport.description || null,
    });
  }

  if (rules.length > 0) {
    await SchemeFinancialRule.bulkCreate(rules);
  }
}

/**
 * Extract numeric amounts from text like "Rs. 50,000" or "Up to Rs. 10 lakh"
 */
function extractAmounts(text) {
  if (!text) return { min: null, max: null };
  if (typeof text === 'number') return { min: null, max: text };

  const str = text.toString();
  let min = null, max = null;

  // Match patterns like "Rs. X lakh", "Rs. X crore", "Rs. X,XXX"
  const amounts = [];
  const regex = /Rs\.?\s*([\d,.]+)\s*(lakh|crore|thousand)?/gi;
  let match;
  while ((match = regex.exec(str)) !== null) {
    let num = parseFloat(match[1].replace(/,/g, ''));
    const unit = (match[2] || '').toLowerCase();
    if (unit === 'lakh') num *= 100000;
    else if (unit === 'crore') num *= 10000000;
    else if (unit === 'thousand') num *= 1000;
    amounts.push(num);
  }

  if (amounts.length >= 2) {
    min = Math.min(...amounts);
    max = Math.max(...amounts);
  } else if (amounts.length === 1) {
    max = amounts[0];
    if (str.toLowerCase().includes('above')) min = amounts[0];
  }

  return { min, max };
}

function extractSubsidy(text) {
  if (!text) return { percentage: null };
  const match = text.match(/(\d+)%\s*to\s*(\d+)%/);
  if (match) return { percentage: parseFloat(match[2]) }; // Use upper bound
  const single = text.match(/(\d+)%/);
  if (single) return { percentage: parseFloat(single[1]) };
  return { percentage: null };
}
