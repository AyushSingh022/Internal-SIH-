import { v4 as uuidv4 } from 'uuid';
import { AnalysisReport } from '../models/index.js';
import * as locationService from './locationService.js';
import * as businessService from './businessService.js';
import * as schemeService from './schemeService.js';
import { calculateFinancials } from '../financial/calculator.js';
import { generateFeasibilityAnalysis } from '../ai/gemini.js';

export async function createAnalysis({
  userId,
  stateId,
  districtId,
  tehsilId,
  blockId,
  villageId,
  categoryId,
  availableCapital,
  searchRadiusKm = 10,
  language = 'en',
}) {
  // 1. Get location details
  const village = await locationService.getVillageById(villageId);
  if (!village) throw { status: 404, message: 'Village not found' };

  const location = {
    state: village.State?.name || '',
    district: village.District?.name || '',
    tehsil: village.Tehsil?.name || '',
    block: village.Block?.name || '',
    village: village.name,
    latitude: village.latitude,
    longitude: village.longitude,
    population: village.population,
  };

  // 2. Get business category
  const categories = await businessService.getCategories();
  const category = categories.find(c => c.id === parseInt(categoryId));
  const categoryName = category?.name || 'Unknown';

  // 3. Get competitor data
  let competitorData = { total_nearby: 0, same_category_count: 0, competition_level: 'Data not available', competitors: [], distribution: {} };
  if (village.latitude && village.longitude) {
    competitorData = await businessService.getCompetitorAnalysis(
      parseFloat(village.latitude),
      parseFloat(village.longitude),
      searchRadiusKm,
      categoryId
    );
  }

  // 4. Get eligible schemes
  const eligibleSchemes = await schemeService.getEligibleSchemes({
    availableCapital: parseFloat(availableCapital),
    categoryId,
    state: location.state,
  });

  // 5. Financial calculation
  const topSchemeRules = eligibleSchemes.length > 0
    ? eligibleSchemes[0].financialRules || []
    : [];
  const financialData = calculateFinancials({
    availableCapital: parseFloat(availableCapital),
    schemeRules: topSchemeRules,
  });

  // 6. AI analysis
  const aiAnalysis = await generateFeasibilityAnalysis({
    location,
    businessCategory: categoryName,
    availableCapital: parseFloat(availableCapital),
    competitorData,
    eligibleSchemes: eligibleSchemes.slice(0, 5),
    financialData,
    language,
  });

  // 7. Save report
  const report = await AnalysisReport.create({
    uuid: uuidv4(),
    user_id: userId,
    state_id: stateId,
    district_id: districtId,
    tehsil_id: tehsilId || null,
    block_id: blockId || null,
    village_id: villageId,
    state_name: location.state,
    district_name: location.district,
    tehsil_name: location.tehsil,
    block_name: location.block,
    village_name: location.village,
    category_id: categoryId,
    category_name: categoryName,
    available_capital: availableCapital,
    feasibility_score: aiAnalysis.feasibility_score || null,
    competitor_count: competitorData.same_category_count,
    search_radius_km: searchRadiusKm,
    market_analysis: aiAnalysis.market_analysis || null,
    opportunity_analysis: aiAnalysis.opportunity_analysis || null,
    swot_analysis: aiAnalysis.swot || null,
    risk_analysis: aiAnalysis.risk_analysis || null,
    ai_recommendation: aiAnalysis.recommendation || null,
    competitor_data: competitorData,
    financial_calculation: financialData,
    eligible_schemes: eligibleSchemes.map(s => ({
      id: s.id,
      name: s.name,
      full_name: s.full_name,
      government_level: s.government_level,
      state: s.state,
      department: s.department,
      description: typeof s.description === 'string' ? s.description.slice(0, 300) : s.description,
      benefits: typeof s.benefits === 'string' ? s.benefits.slice(0, 300) : s.benefits,
      source_url: s.source_url,
    })),
    recommended_scheme_id: eligibleSchemes.length > 0 ? eligibleSchemes[0].id : null,
    language,
    status: 'completed',
  });

  return report;
}

export async function getUserReports(userId) {
  return await AnalysisReport.findAll({
    where: { user_id: userId },
    order: [['created_at', 'DESC']],
    attributes: [
      'id', 'uuid', 'category_name', 'village_name', 'district_name',
      'state_name', 'feasibility_score', 'available_capital', 'status',
      'created_at',
    ],
  });
}

export async function getReportById(reportId, userId) {
  const report = await AnalysisReport.findOne({
    where: { id: reportId, user_id: userId },
  });
  if (!report) throw { status: 404, message: 'Report not found' };
  return report;
}

export async function getReportByUuid(uuid) {
  const report = await AnalysisReport.findOne({
    where: { uuid },
  });
  if (!report) throw { status: 404, message: 'Report not found' };
  return report;
}
