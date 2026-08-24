import { GoogleGenerativeAI } from '@google/generative-ai';
import env from '../config/environment.js';

let genAI = null;
let model = null;

function initGemini() {
  if (!env.gemini.apiKey || env.gemini.apiKey === 'your_gemini_api_key_here') {
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(env.gemini.apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-3.6-flash' });
  }
  return model;
}

/**
 * Generate business feasibility analysis using Gemini AI
 */
export async function generateFeasibilityAnalysis({
  location,
  businessCategory,
  availableCapital,
  competitorData,
  eligibleSchemes,
  financialData,
  language = 'en',
}) {
  const ai = initGemini();

  if (!ai) {
    // Return structured fallback when API key not configured
    return getFallbackAnalysis(location, businessCategory, competitorData, language);
  }

  const languageInstruction = language !== 'en'
    ? `IMPORTANT: Generate all text content in the language with code "${language}". Use the appropriate script for that language.`
    : '';

  const prompt = `You are an expert business advisor specializing in rural micro-enterprise development in India.

${languageInstruction}

Analyze the following business proposal and generate a comprehensive feasibility report.

## Input Data (VERIFIED — from database)
- **Location**: ${location.village || 'N/A'}, ${location.tehsil || 'N/A'}, ${location.district || 'N/A'}, ${location.state || 'N/A'}
- **Population**: ${location.population || 'Data not available'}
- **Business Category**: ${businessCategory || 'N/A'}
- **Available Capital**: ₹${availableCapital?.toLocaleString('en-IN') || 'N/A'}
- **Nearby Competitors (same category within ${competitorData?.search_radius_km || 10}km)**: ${competitorData?.same_category_count ?? 'Data not available'}
- **Total Nearby Businesses**: ${competitorData?.total_nearby ?? 'Data not available'}
- **Competition Level**: ${competitorData?.competition_level || 'Data not available'}
- **Business Distribution**: ${JSON.stringify(competitorData?.distribution || {})}

## Eligible Government Schemes
${eligibleSchemes?.length > 0
      ? eligibleSchemes.map(s => `- ${s.name}: ${s.description || s.objective?.[0] || 'N/A'}`).join('\n')
      : 'No specific scheme data available'}

## Financial Data
${financialData ? JSON.stringify(financialData, null, 2) : 'Data not available'}

## Required Output Format
Return ONLY valid JSON (no markdown, no code fences) with this exact structure:

{
  "feasibility_score": <number 0-100>,
  "market_analysis": {
    "market_reach": "<description>",
    "potential_customer_base": "<description>",
    "demand_indicators": ["<indicator1>", "<indicator2>"],
    "distribution_channels": ["<channel1>", "<channel2>"]
  },
  "opportunity_analysis": {
    "underserved_markets": ["<market1>", "<market2>"],
    "business_niches": ["<niche1>", "<niche2>"],
    "alternative_models": ["<model1>", "<model2>"]
  },
  "swot": {
    "strengths": ["<s1>", "<s2>", "<s3>"],
    "weaknesses": ["<w1>", "<w2>", "<w3>"],
    "opportunities": ["<o1>", "<o2>", "<o3>"],
    "threats": ["<t1>", "<t2>", "<t3>"]
  },
  "risk_analysis": [
    {
      "risk": "<risk name>",
      "severity": "<Low|Medium|High>",
      "explanation": "<description>",
      "mitigation": "<how to mitigate>"
    }
  ],
  "recommendation": {
    "overall": "<Recommended|Conditionally Recommended|Not Recommended>",
    "why_this_business": "<explanation>",
    "suggested_business_model": "<model description>",
    "suggested_strategy": "<strategy>",
    "key_risks": ["<risk1>", "<risk2>"],
    "risk_mitigation": ["<mitigation1>", "<mitigation2>"],
    "expected_next_steps": ["<step1>", "<step2>", "<step3>"]
  }
}

IMPORTANT RULES:
1. Base analysis on VERIFIED data provided above
2. Clearly indicate where you are making estimates vs using verified data
3. Do NOT present AI-generated content as official government data
4. If any data is missing, acknowledge it honestly
5. Be specific to the location and business category provided
6. Consider rural Indian context, infrastructure, and market dynamics`;

  try {
    const result = await ai.generateContent(prompt);
    const text = result.response.text();

    // Clean markdown code fences if present
    let cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const parsed = JSON.parse(cleaned);
    return {
      ...parsed,
      _meta: {
        source: 'ai_generated',
        model: 'gemini-3.6-flash',
        disclaimer: 'This analysis is AI-generated and should be verified with local authorities and market research.',
        generated_at: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error('Gemini AI error:', error);
    return getFallbackAnalysis(location, businessCategory, competitorData, language);
  }
}

function getFallbackAnalysis(location, businessCategory, competitorData, language) {
  return {
    feasibility_score: null,
    market_analysis: {
      market_reach: 'AI analysis unavailable. Please configure the Gemini API key.',
      potential_customer_base: 'Data not available',
      demand_indicators: [],
      distribution_channels: [],
    },
    opportunity_analysis: {
      underserved_markets: [],
      business_niches: [],
      alternative_models: [],
    },
    swot: {
      strengths: ['Low competition in area (verified data)'].filter(() => competitorData?.same_category_count === 0),
      weaknesses: ['AI analysis unavailable for detailed assessment'],
      opportunities: [],
      threats: [],
    },
    risk_analysis: [],
    recommendation: {
      overall: 'Analysis unavailable',
      why_this_business: 'AI analysis unavailable. Please configure the Gemini API key to generate recommendations.',
      suggested_business_model: 'Data not available',
      suggested_strategy: 'Data not available',
      key_risks: [],
      risk_mitigation: [],
      expected_next_steps: ['Configure Gemini API key', 'Re-run analysis'],
    },
    _meta: {
      source: 'fallback',
      disclaimer: 'AI service unavailable. Limited analysis based on available data only.',
      generated_at: new Date().toISOString(),
    },
  };
}
