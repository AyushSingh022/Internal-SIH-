import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { locationService, businessService, analysisService } from '../services/index';
import toast from 'react-hot-toast';

export default function AnalysisPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Location state
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [villages, setVillages] = useState([]);

  // Categories
  const [categories, setCategories] = useState([]);

  // Form
  const [form, setForm] = useState({
    state_id: '', district_id: '', tehsil_id: '', block_id: '', village_id: '',
    category_id: '', available_capital: '', search_radius_km: 10,
  });

  // Load states and categories on mount
  useEffect(() => {
    locationService.getStates().then(res => setStates(res.data || [])).catch(() => {});
    businessService.getCategories().then(res => setCategories(res.data || [])).catch(() => {});
  }, []);

  // Cascading dropdowns
  useEffect(() => {
    if (form.state_id) {
      locationService.getDistricts(form.state_id).then(res => setDistricts(res.data || [])).catch(() => {});
    } else {
      setDistricts([]); setTehsils([]); setBlocks([]); setVillages([]);
    }
  }, [form.state_id]);

  useEffect(() => {
    if (form.district_id) {
      locationService.getTehsils(form.district_id).then(res => setTehsils(res.data || [])).catch(() => {});
      locationService.getBlocks(form.district_id).then(res => setBlocks(res.data || [])).catch(() => {});
    } else {
      setTehsils([]); setBlocks([]); setVillages([]);
    }
  }, [form.district_id]);

  useEffect(() => {
    if (form.tehsil_id || form.block_id) {
      const params = {};
      if (form.tehsil_id) params.tehsilId = form.tehsil_id;
      if (form.block_id) params.blockId = form.block_id;
      if (form.district_id) params.districtId = form.district_id;
      locationService.getVillages(params).then(res => setVillages(res.data || [])).catch(() => {});
    } else {
      setVillages([]);
    }
  }, [form.tehsil_id, form.block_id]);

  const update = (key, val) => {
    const newForm = { ...form, [key]: val };
    // Reset dependents
    if (key === 'state_id') { newForm.district_id = ''; newForm.tehsil_id = ''; newForm.block_id = ''; newForm.village_id = ''; }
    if (key === 'district_id') { newForm.tehsil_id = ''; newForm.block_id = ''; newForm.village_id = ''; }
    if (key === 'tehsil_id' || key === 'block_id') { newForm.village_id = ''; }
    setForm(newForm);
  };

  const canProceedStep1 = form.state_id && form.district_id && form.village_id;
  const canProceedStep2 = form.category_id && form.available_capital;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await analysisService.generate({ ...form, language });
      toast.success('Analysis generated!');
      navigate(`/report/${res.data.id}`);
    } catch (err) {
      toast.error(err.message || 'Failed to generate analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <h1>📊 {t('analysis.title', 'Business Feasibility Analysis')}</h1>
        <p>{t('app.tagline', 'Analyze your business opportunity with AI-powered insights')}</p>
      </div>

      {/* Stepper */}
      <div className="stepper">
        {[
          { num: 1, label: t('analysis.step1', 'Select Location') },
          { num: 2, label: t('analysis.step2', 'Business Details') },
          { num: 3, label: t('analysis.step3', 'Generate') },
        ].map((s, i) => (
          <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
            <div className={`stepper-item ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}>
              <div className="stepper-circle">{step > s.num ? '✓' : s.num}</div>
              <span className="stepper-label">{s.label}</span>
            </div>
            {i < 2 && <div className={`stepper-line ${step > s.num ? 'completed' : ''}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Location */}
      {step === 1 && (
        <div className="glass-card-static animate-slide" style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.15rem' }}>📍 {t('location.title', 'Select Your Location')}</h2>

          <div className="form-group">
            <label className="form-label">{t('location.state', 'State')} *</label>
            <select className="form-select" value={form.state_id} onChange={e => update('state_id', e.target.value)}>
              <option value="">{t('location.selectState', 'Select State')}</option>
              {states.map(s => <option key={s.id} value={s.id}>{s.name} {s.name_local ? `(${s.name_local})` : ''}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">{t('location.district', 'District')} *</label>
            <select className="form-select" value={form.district_id} onChange={e => update('district_id', e.target.value)} disabled={!form.state_id}>
              <option value="">{t('location.selectDistrict', 'Select District')}</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">{t('location.tehsil', 'Tehsil')}</label>
              <select className="form-select" value={form.tehsil_id} onChange={e => update('tehsil_id', e.target.value)} disabled={!form.district_id}>
                <option value="">{t('location.selectTehsil', 'Select Tehsil')}</option>
                {tehsils.map(th => <option key={th.id} value={th.id}>{th.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t('location.block', 'Block')}</label>
              <select className="form-select" value={form.block_id} onChange={e => update('block_id', e.target.value)} disabled={!form.district_id}>
                <option value="">{t('location.selectBlock', 'Select Block')}</option>
                {blocks.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t('location.village', 'Village')} *</label>
            <select className="form-select" value={form.village_id} onChange={e => update('village_id', e.target.value)} disabled={!form.tehsil_id && !form.block_id}>
              <option value="">{t('location.selectVillage', 'Select Village')}</option>
              {villages.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>

          <button className="btn btn-primary btn-block btn-lg" disabled={!canProceedStep1} onClick={() => setStep(2)}>
            {t('common.next', 'Next')} →
          </button>
        </div>
      )}

      {/* Step 2: Business Details */}
      {step === 2 && (
        <div className="glass-card-static animate-slide" style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.15rem' }}>🏪 {t('business.title', 'Business Information')}</h2>

          <div className="form-group">
            <label className="form-label">{t('business.category', 'Business Category')} *</label>
            <select className="form-select" value={form.category_id} onChange={e => update('category_id', e.target.value)}>
              <option value="">{t('business.selectCategory', 'Select Business Category')}</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">{t('business.availableCapital', 'Available Capital (₹)')} *</label>
            <input
              type="number"
              className="form-input"
              value={form.available_capital}
              onChange={e => update('available_capital', e.target.value)}
              placeholder={t('business.enterCapital', 'Enter your available capital')}
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('business.searchRadius', 'Search Radius')} ({form.search_radius_km} km)</label>
            <input
              type="range"
              min="1" max="50"
              value={form.search_radius_km}
              onChange={e => update('search_radius_km', parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>1 km</span><span>25 km</span><span>50 km</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>
              ← {t('common.previous', 'Previous')}
            </button>
            <button className="btn btn-primary" disabled={!canProceedStep2} onClick={() => setStep(3)} style={{ flex: 2 }}>
              {t('common.next', 'Next')} →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Generate */}
      {step === 3 && (
        <div className="glass-card-static animate-slide" style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.15rem' }}>🤖 {t('analysis.title', 'Generate AI Analysis')}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {t('common.disclaimer', 'AI-generated content. Verify with local authorities.')}
          </p>

          {/* Summary */}
          <div className="glass-card" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <p><strong>📍 {t('location.state', 'State')}:</strong> {states.find(s => s.id == form.state_id)?.name || ''}</p>
            <p><strong>🏙️ {t('location.district', 'District')}:</strong> {districts.find(d => d.id == form.district_id)?.name || ''}</p>
            <p><strong>🏘️ {t('location.village', 'Village')}:</strong> {villages.find(v => v.id == form.village_id)?.name || ''}</p>
            <p><strong>🏪 {t('business.category', 'Category')}:</strong> {categories.find(c => c.id == form.category_id)?.name || ''}</p>
            <p><strong>💰 {t('financial.availableCapital', 'Capital')}:</strong> ₹{Number(form.available_capital).toLocaleString('en-IN')}</p>
            <p><strong>📡 Radius:</strong> {form.search_radius_km} km</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={() => setStep(2)} style={{ flex: 1 }}>← {t('common.previous', 'Back')}</button>
            <button className="btn btn-accent btn-lg" onClick={handleGenerate} disabled={loading} style={{ flex: 2 }}>
              {loading ? (
                <><div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} /> {t('analysis.generating', 'Generating...')}</>
              ) : (
                <>🚀 {t('analysis.generate', 'Generate Analysis')}</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" style={{ width: 50, height: 50 }} />
          <p>{t('analysis.generating', 'Generating AI Analysis...')}</p>
          <p style={{ fontSize: '0.8rem' }}>This may take 15-30 seconds</p>
        </div>
      )}
    </div>
  );
}
