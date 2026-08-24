import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, '..', '..', 'fonts');

// Font mapping for Indian scripts
const FONT_MAP = {
  hi: 'NotoSansDevanagari',
  mr: 'NotoSansDevanagari',
  ne: 'NotoSansDevanagari',
  sa: 'NotoSansDevanagari',
  bn: 'NotoSansBengali',
  as: 'NotoSansBengali',
  te: 'NotoSansTelugu',
  ta: 'NotoSansTamil',
  gu: 'NotoSansGujarati',
  kn: 'NotoSansKannada',
  ml: 'NotoSansMalayalam',
  pa: 'NotoSansGurmukhi',
  or: 'NotoSansOriya',
  ur: 'NotoNaskhArabic',
  si: 'NotoSansSinhala',
};

function getFont(language) {
  const fontName = FONT_MAP[language];
  if (fontName) {
    const fontPath = path.join(FONTS_DIR, `${fontName}-Regular.ttf`);
    if (fs.existsSync(fontPath)) return fontPath;
  }
  return null; // Fall back to built-in Helvetica
}

function formatCurrency(amount) {
  if (!amount && amount !== 0) return 'Data not available';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

/**
 * Generate PDF buffer from analysis report data
 */
export async function generateReportPDF(report) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50, bufferPages: true });
      const buffers = [];

      doc.on('data', chunk => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', reject);

      const lang = report.language || 'en';
      const customFont = getFont(lang);

      // Helper to set font
      const setFont = (size = 12, bold = false) => {
        if (customFont && lang !== 'en') {
          doc.font(customFont).fontSize(size);
        } else {
          doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(size);
        }
      };

      // ── TITLE PAGE ──
      doc.rect(0, 0, doc.page.width, 180).fill('#4F46E5');
      setFont(24, true);
      doc.fillColor('#FFFFFF').text('Business Feasibility Report', 50, 60, { align: 'center' });
      setFont(12);
      doc.text('AI-Driven Hyper-Local Business Advisory Platform', 50, 100, { align: 'center' });
      doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 50, 130, { align: 'center' });

      doc.fillColor('#333333');
      doc.moveDown(5);

      // ── SECTION 1: LOCATION ──
      addSectionHeader(doc, setFont, 'Location Details');
      addKeyValue(doc, setFont, 'State', report.state_name);
      addKeyValue(doc, setFont, 'District', report.district_name);
      addKeyValue(doc, setFont, 'Tehsil', report.tehsil_name);
      addKeyValue(doc, setFont, 'Block', report.block_name);
      addKeyValue(doc, setFont, 'Village', report.village_name);
      doc.moveDown();

      // ── SECTION 2: BUSINESS ──
      addSectionHeader(doc, setFont, 'Business Information');
      addKeyValue(doc, setFont, 'Business Category', report.category_name);
      addKeyValue(doc, setFont, 'Available Capital', formatCurrency(report.available_capital));
      addKeyValue(doc, setFont, 'Feasibility Score', report.feasibility_score ? `${report.feasibility_score}/100` : 'Data not available');
      doc.moveDown();

      // ── SECTION 3: COMPETITOR ANALYSIS ──
      const comp = report.competitor_data || {};
      addSectionHeader(doc, setFont, 'Competitor Analysis');
      addKeyValue(doc, setFont, 'Search Radius', `${comp.search_radius_km || report.search_radius_km || 10} km`);
      addKeyValue(doc, setFont, 'Total Nearby Businesses', comp.total_nearby?.toString() || 'Data not available');
      addKeyValue(doc, setFont, 'Same Category Competitors', comp.same_category_count?.toString() || 'Data not available');
      addKeyValue(doc, setFont, 'Competition Level', comp.competition_level || 'Data not available');
      doc.moveDown();

      // ── SECTION 4: FINANCIAL SUMMARY ──
      const fin = report.financial_calculation || {};
      if (fin.calculations && fin.calculations.length > 0) {
        addSectionHeader(doc, setFont, 'Financial Summary');
        const calc = fin.calculations[0];
        addKeyValue(doc, setFont, 'Estimated Project Cost', formatCurrency(calc.estimated_project_cost));
        addKeyValue(doc, setFont, 'Potential Loan', formatCurrency(calc.potential_loan));
        addKeyValue(doc, setFont, 'Margin Contribution', formatCurrency(calc.margin_contribution));
        addKeyValue(doc, setFont, 'Interest Rate', calc.interest_rate ? `${calc.interest_rate}%` : 'Data not available');
        addKeyValue(doc, setFont, 'Tenure', calc.tenure_months ? `${calc.tenure_months} months` : 'Data not available');
        addKeyValue(doc, setFont, 'Moratorium', calc.moratorium_months ? `${calc.moratorium_months} months` : 'None');
        addKeyValue(doc, setFont, 'Estimated Installment', formatCurrency(calc.installment_amount));
        addKeyValue(doc, setFont, 'Total Repayment', formatCurrency(calc.total_repayment));
        addKeyValue(doc, setFont, 'Total Interest', formatCurrency(calc.total_interest));
        doc.moveDown();
      }

      // ── SECTION 5: GOVERNMENT SCHEMES ──
      const schemes = report.eligible_schemes || [];
      if (schemes.length > 0) {
        doc.addPage();
        addSectionHeader(doc, setFont, 'Eligible Government Schemes');
        schemes.forEach((scheme, i) => {
          setFont(11, true);
          doc.text(`${i + 1}. ${scheme.name || 'N/A'}`, { continued: false });
          setFont(10);
          if (scheme.full_name) doc.text(`   Full Name: ${scheme.full_name}`);
          doc.text(`   Government Level: ${scheme.government_level || 'N/A'}`);
          if (scheme.department) doc.text(`   Department: ${scheme.department}`);
          if (scheme.source_url) doc.text(`   Source: ${scheme.source_url}`);
          doc.moveDown(0.5);
        });
      }

      // ── SECTION 6: SWOT ──
      const swot = report.swot_analysis || {};
      if (swot.strengths || swot.weaknesses || swot.opportunities || swot.threats) {
        doc.addPage();
        addSectionHeader(doc, setFont, 'SWOT Analysis');

        ['strengths', 'weaknesses', 'opportunities', 'threats'].forEach(key => {
          const items = swot[key] || [];
          setFont(11, true);
          doc.text(key.charAt(0).toUpperCase() + key.slice(1) + ':');
          setFont(10);
          if (items.length > 0) {
            items.forEach(item => doc.text(`  • ${item}`));
          } else {
            doc.text('  Data not available');
          }
          doc.moveDown(0.5);
        });
      }

      // ── SECTION 7: RISK ANALYSIS ──
      const risks = report.risk_analysis || [];
      if (risks.length > 0) {
        addSectionHeader(doc, setFont, 'Risk Analysis');
        risks.forEach(risk => {
          setFont(10, true);
          doc.text(`${risk.risk} — Severity: ${risk.severity}`);
          setFont(10);
          doc.text(`  ${risk.explanation}`);
          doc.text(`  Mitigation: ${risk.mitigation}`);
          doc.moveDown(0.3);
        });
      }

      // ── SECTION 8: AI RECOMMENDATION ──
      const rec = report.ai_recommendation || {};
      if (rec.overall) {
        doc.addPage();
        addSectionHeader(doc, setFont, 'AI Recommendation');
        addKeyValue(doc, setFont, 'Overall', rec.overall);
        if (rec.why_this_business) {
          setFont(10);
          doc.text(`Why this business: ${rec.why_this_business}`);
        }
        if (rec.suggested_strategy) {
          doc.text(`Strategy: ${rec.suggested_strategy}`);
        }
        doc.moveDown();
      }

      // ── DISCLAIMER ──
      doc.moveDown(2);
      setFont(8);
      doc.fillColor('#888888');
      doc.text('DISCLAIMER: This report contains AI-generated analysis and estimates. AI-generated recommendations should not be treated as official government data. Please verify all information with local authorities before making business decisions.', {
        align: 'center',
      });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

function addSectionHeader(doc, setFont, title) {
  setFont(14, true);
  doc.fillColor('#4F46E5').text(title);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke('#4F46E5');
  doc.fillColor('#333333');
  doc.moveDown(0.5);
}

function addKeyValue(doc, setFont, key, value) {
  setFont(10, true);
  doc.text(`${key}: `, { continued: true });
  setFont(10);
  doc.text(value || 'Data not available');
}
