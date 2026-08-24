import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { analysisService } from '../services/index';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import toast from 'react-hot-toast';

const CHART_COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

function formatCurrency(amount) {
  if (!amount && amount !== 0) return 'Data not available';
  return '₹' + Number(amount).toLocaleString('en-IN');
}

export default function ReportPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    analysisService.getReport(id)
      .then(res => setReport(res.data))
      .catch(() => toast.error('Failed to load report'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const res = await analysisService.downloadPDF(id);
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `business-report-${report.uuid || id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('PDF downloaded!');
    } catch {
      toast.error('PDF generation failed');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div className="loader"><div className="spinner" /></div>;
  if (!report) return <div className="glass-card-static" style={{ textAlign: 'center', padding: '3rem' }}><p>Report not found</p></div>;

  const comp = report.competitor_data || {};
  const fin = report.financial_calculation || {};
  const calc = fin.calculations?.[0] || {};
  const schemes = report.eligible_schemes || [];
  const swot = report.swot_analysis || {};
  const risks = report.risk_analysis || [];
  const rec = report.ai_recommendation || {};

  // Chart data
  const distData = comp.distribution ? Object.entries(comp.distribution).map(([name, value]) => ({ name, value })) : [];
  const scoreClass = report.feasibility_score >= 70 ? 'score-high' : report.feasibility_score >= 40 ? 'score-medium' : 'score-low';

  return (
    <div className="animate-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="page-header" style={{ margin: 0 }}>
          <h1>📊 {t('dashboard.title', 'Business Dashboard')}</h1>
          <p>{t('report.generated', 'Report generated on')} {new Date(report.created_at).toLocaleDateString('en-IN')}</p>
        </div>
        <button id="download-pdf" className="btn btn-accent btn-lg" onClick={handleDownloadPDF} disabled={downloading}>
          {downloading ? '⏳ Generating...' : `📥 ${t('report.download', 'Download Business Report PDF')}`}
        </button>
      </div>

      {/* Feasibility Score */}
      {report.feasibility_score && (
        <div className="glass-card-static" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className={`score-circle ${scoreClass}`} style={{ margin: '0 auto' }}>
            <span className="score-value">{report.feasibility_score}</span>
            <span className="score-label">/100</span>
          </div>
          <p style={{ marginTop: '0.75rem', fontWeight: 600 }}>{t('dashboard.score', 'Feasibility Score')}</p>
        </div>
      )}

      {/* SECTION 1: LOCATION */}
      <div className="section">
        <div className="section-header"><span className="section-icon">📍</span><h2>{t('report.location', 'Location Details')}</h2></div>
        <div className="grid grid-4 stagger">
          {[
            { label: t('location.state', 'State'), value: report.state_name },
            { label: t('location.district', 'District'), value: report.district_name },
            { label: t('location.tehsil', 'Tehsil'), value: report.tehsil_name },
            { label: t('location.block', 'Block'), value: report.block_name },
            { label: t('location.village', 'Village'), value: report.village_name },
          ].map((item, i) => (
            <div key={i} className="stat-card animate-in">
              <div className="stat-label">{item.label}</div>
              <div style={{ fontWeight: 600, fontSize: '1rem' }}>{item.value || t('common.noData', 'Data not available')}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: BUSINESS */}
      <div className="section">
        <div className="section-header"><span className="section-icon">🏪</span><h2>{t('report.business', 'Business Information')}</h2></div>
        <div className="grid grid-4 stagger">
          <div className="stat-card animate-in"><div className="stat-label">{t('business.category', 'Category')}</div><div style={{ fontWeight: 600 }}>{report.category_name}</div></div>
          <div className="stat-card animate-in"><div className="stat-label">{t('financial.availableCapital', 'Capital')}</div><div className="stat-value">{formatCurrency(report.available_capital)}</div></div>
          <div className="stat-card animate-in"><div className="stat-label">{t('competitor.competitionLevel', 'Competition')}</div><div style={{ fontWeight: 600 }}>{comp.competition_level || t('common.noData')}</div></div>
          <div className="stat-card animate-in"><div className="stat-label">{t('competitor.totalNearby', 'Nearby')}</div><div className="stat-value accent">{comp.total_nearby ?? t('common.noData')}</div></div>
        </div>
      </div>

      {/* SECTION 3: MARKET / COMPETITORS */}
      <div className="section">
        <div className="section-header"><span className="section-icon">📈</span><h2>{t('report.market', 'Market Analysis')}</h2></div>
        <div className="grid grid-2">
          {distData.length > 0 && (
            <div className="glass-card-static">
              <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{t('competitor.distribution', 'Business Distribution')}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={distData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {distData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F1F5F9' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
          {distData.length > 0 && (
            <div className="glass-card-static">
              <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{t('competitor.nearby', 'Nearby Businesses')}</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={distData}>
                  <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
                  <YAxis tick={{ fill: '#94A3B8' }} />
                  <Tooltip contentStyle={{ background: '#1A1A2E', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#F1F5F9' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {distData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        {comp.competitors && comp.competitors.length > 0 && (
          <div className="glass-card-static" style={{ marginTop: '1rem', overflowX: 'auto' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>{t('competitor.sameCategory', 'Same Category Competitors')}</h3>
            <table className="data-table">
              <thead><tr><th>Name</th><th>Category</th><th>Distance</th></tr></thead>
              <tbody>
                {comp.competitors.slice(0, 10).map((c, i) => (
                  <tr key={i}><td>{c.name}</td><td>{c.BusinessCategory?.name || ''}</td><td>{c.distance_km} km</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 4: FINANCIAL SUMMARY */}
      <div className="section">
        <div className="section-header"><span className="section-icon">💰</span><h2>{t('report.financial', 'Financial Summary')}</h2></div>
        <div className="grid grid-4 stagger">
          {[
            { label: t('financial.availableCapital'), value: formatCurrency(calc.available_capital), cls: '' },
            { label: t('financial.projectCost'), value: formatCurrency(calc.estimated_project_cost), cls: 'accent' },
            { label: t('financial.loanAmount'), value: formatCurrency(calc.potential_loan), cls: '' },
            { label: t('financial.margin'), value: formatCurrency(calc.margin_contribution), cls: '' },
            { label: t('financial.interestRate'), value: calc.interest_rate ? `${calc.interest_rate}%` : t('common.noData'), cls: 'amber' },
            { label: t('financial.tenure'), value: calc.tenure_months ? `${calc.tenure_months} ${t('financial.months')}` : t('common.noData'), cls: '' },
            { label: t('financial.moratorium'), value: calc.moratorium_months ? `${calc.moratorium_months} ${t('financial.months')}` : 'None', cls: '' },
            { label: t('financial.installment'), value: formatCurrency(calc.installment_amount), cls: 'accent' },
            { label: t('financial.totalRepayment'), value: formatCurrency(calc.total_repayment), cls: '' },
            { label: t('financial.totalInterest'), value: formatCurrency(calc.total_interest), cls: 'amber' },
          ].map((item, i) => (
            <div key={i} className="stat-card animate-in">
              <div className="stat-label">{item.label}</div>
              <div className={`stat-value ${item.cls}`} style={{ fontSize: '1.2rem' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: GOVERNMENT SCHEMES */}
      <div className="section">
        <div className="section-header"><span className="section-icon">🏛️</span><h2>{t('report.schemes', 'Government Schemes')}</h2></div>
        {schemes.length === 0 ? (
          <div className="glass-card-static" style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>{t('schemes.noSchemes')}</p>
          </div>
        ) : (
          <div className="grid grid-2 stagger">
            {schemes.map((scheme, i) => (
              <div key={i} className={`scheme-card animate-in ${i === 0 ? 'recommended' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3>{scheme.name}</h3>
                  {i === 0 && <span className="badge badge-accent">⭐ {t('schemes.recommended')}</span>}
                </div>
                {scheme.full_name && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{scheme.full_name}</p>}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>{t('schemes.govLevel')}:</span> {scheme.government_level}</div>
                  {scheme.department && <div><span style={{ color: 'var(--text-muted)' }}>{t('schemes.department')}:</span> {scheme.department}</div>}
                </div>
                {scheme.eligibility && Array.isArray(scheme.eligibility) && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>{t('schemes.eligibility')}:</p>
                    <ul style={{ paddingLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {scheme.eligibility.slice(0, 3).map((e, j) => <li key={j}>{e}</li>)}
                    </ul>
                  </div>
                )}
                {scheme.source_url && (
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem' }}>
                    <a href={scheme.source_url} target="_blank" rel="noopener noreferrer">🔗 {t('schemes.source', 'Source')}</a>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 6: SWOT */}
      <div className="section">
        <div className="section-header"><span className="section-icon">🎯</span><h2>{t('report.swot', 'SWOT Analysis')}</h2></div>
        <div className="swot-grid stagger">
          {[
            { key: 'strengths', label: t('swot.strengths', 'Strengths'), cls: 'strengths' },
            { key: 'weaknesses', label: t('swot.weaknesses', 'Weaknesses'), cls: 'weaknesses' },
            { key: 'opportunities', label: t('swot.opportunities', 'Opportunities'), cls: 'opportunities' },
            { key: 'threats', label: t('swot.threats', 'Threats'), cls: 'threats' },
          ].map(item => (
            <div key={item.key} className={`swot-card ${item.cls} animate-in`}>
              <h3>{item.label}</h3>
              <ul>
                {(swot[item.key] || []).length > 0
                  ? swot[item.key].map((s, i) => <li key={i}>{s}</li>)
                  : <li>{t('common.noData', 'Data not available')}</li>}
              </ul>
            </div>
          ))}
        </div>
        <div className="disclaimer" style={{ marginTop: '1rem' }}>⚠️ {t('common.disclaimer')}</div>
      </div>

      {/* SECTION 7: RISK ANALYSIS */}
      <div className="section">
        <div className="section-header"><span className="section-icon">⚠️</span><h2>{t('report.risks', 'Risk Analysis')}</h2></div>
        {risks.length > 0 ? (
          <div className="glass-card-static" style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead><tr><th>{t('risk.risk')}</th><th>{t('risk.severity')}</th><th>{t('risk.explanation')}</th><th>{t('risk.mitigation')}</th></tr></thead>
              <tbody>
                {risks.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.risk}</td>
                    <td><span className={`badge ${r.severity === 'High' ? 'badge-red' : r.severity === 'Medium' ? 'badge-amber' : 'badge-accent'}`}>{r.severity}</span></td>
                    <td>{r.explanation}</td>
                    <td>{r.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="glass-card-static" style={{ textAlign: 'center' }}><p style={{ color: 'var(--text-muted)' }}>{t('common.noData')}</p></div>
        )}
      </div>

      {/* SECTION 8: AI RECOMMENDATION */}
      <div className="section">
        <div className="section-header"><span className="section-icon">🤖</span><h2>{t('report.recommendation', 'AI Recommendation')}</h2></div>
        <div className="glass-card-static">
          <div className="grid grid-2" style={{ gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('recommendation.overall')}</h3>
              <p style={{ fontWeight: 700, fontSize: '1.15rem' }}>
                {rec.overall === 'Recommended' && <span style={{ color: 'var(--accent-400)' }}>✅ {rec.overall}</span>}
                {rec.overall === 'Conditionally Recommended' && <span style={{ color: 'var(--amber-400)' }}>⚠️ {rec.overall}</span>}
                {rec.overall === 'Not Recommended' && <span style={{ color: 'var(--red-400)' }}>❌ {rec.overall}</span>}
                {!['Recommended', 'Conditionally Recommended', 'Not Recommended'].includes(rec.overall) && (rec.overall || t('common.noData'))}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('recommendation.whyBusiness')}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{rec.why_this_business || t('common.noData')}</p>
            </div>
          </div>
          {rec.suggested_strategy && (
            <div style={{ marginTop: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('recommendation.strategy')}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{rec.suggested_strategy}</p>
            </div>
          )}
          {rec.expected_next_steps && rec.expected_next_steps.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{t('recommendation.nextSteps')}</h3>
              <ol style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {rec.expected_next_steps.map((s, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{s}</li>)}
              </ol>
            </div>
          )}
        </div>
        <div className="disclaimer" style={{ marginTop: '1rem' }}>⚠️ {t('common.disclaimer')}</div>
      </div>

      {/* Download PDF footer */}
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <button className="btn btn-accent btn-lg" onClick={handleDownloadPDF} disabled={downloading}>
          📥 {t('report.download', 'Download Business Report PDF')}
        </button>
      </div>
    </div>
  );
}
