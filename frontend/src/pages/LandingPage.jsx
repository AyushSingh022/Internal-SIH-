import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const handleStartAnalysis = () => {
    if (isAuthenticated) {
      navigate('/analysis');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="landing-container">
      {/* ── NAVBAR ── */}
      <header className="landing-navbar">
        <div className="landing-nav-brand">
          <span className="brand-logo-icon">🛡️</span>
          <span className="brand-name">GramVyapar <span className="brand-ai-badge">AI</span></span>
        </div>

        <nav className="landing-nav-links">
          <Link to="/" className="nav-item active">Home</Link>
          <button className="nav-item btn-link" onClick={handleStartAnalysis}>Start Analysis</button>
          {isAuthenticated ? (
            <Link to="/dashboard" className="nav-item">Dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/signup" className="nav-item nav-btn-signup">Sign Up</Link>
            </>
          )}

          {/* Lang Selector */}
          <div className="landing-lang-toggle">
            <button
              className={`lang-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>

            <button
              className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
              onClick={() => setLanguage('hi')}
            >
              हिन्दी
            </button>
          </div>
        </nav>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Fair Business Feasibility & Credit Scoring for Every Indian
          </h1>
          <p className="hero-subtitle">
            AI-powered hyper-local alternate credit & market feasibility assessment for 63M+ unbanked and rural Indian micro-entrepreneurs who deserve access to fair institutional loans.
          </p>

          {/* Impact Metric Cards */}
          <div className="hero-metrics">
            <div className="metric-card">
              <h3>63M+</h3>
              <p>RURAL MICRO-ENTREPRENEURS (MSME 2023)</p>
            </div>
            <div className="metric-card">
              <h3>24-48%</h3>
              <p>MONEYLENDER INTEREST RATES (RBI, 2023)</p>
            </div>
            <div className="metric-card">
              <h3>96%</h3>
              <p>SHG WOMEN REPAYMENT RATE</p>
            </div>
          </div>

          <div className="hero-cta-wrapper">
            <button className="btn-hero-cta" onClick={handleStartAnalysis}>
              Check Your Feasibility Score <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Badge Graphic */}
        <div className="hero-graphic">
          <div className="circular-score-badge">
            <div className="badge-icon">📈</div>
            <h4>GramVyapar AI</h4>
            <p>Feasibility Score Engine</p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="how-it-works-section">
        <div className="section-header-center">
          <h2>How It Works</h2>
          <p>Three simple steps to your alternate credit & business feasibility score</p>
        </div>

        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Share Your Details</h3>
            <p>
              Fill a simple form with your location (village, block, district), business category & available capital. No complex paperwork required.
            </p>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>AI Analyzes Your Profile</h3>
            <p>
              Our Gemini AI & spatial engine evaluates local demand, competition, and financial feasibility to generate a fair credit score from 0 to 100.
            </p>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Get Your Score, Schemes & PDF</h3>
            <p>
              Receive your feasibility score with a plain language explanation, matched government schemes (PMEGP, MUDRA), and a downloadable bank proposal PDF.
            </p>
          </div>
        </div>
      </section>

      {/* ── UN SDGs SECTION (Dark) ── */}
      <section className="sdg-section">
        <div className="section-header-center light">
          <h2>Aligned with UN Sustainable Development Goals</h2>
          <p>Our mission directly contributes to two critical global goals</p>
        </div>

        <div className="sdg-grid">
          <div className="sdg-card">
            <div className="sdg-icon-badge">🎯</div>
            <h3>SDG 1: No Poverty</h3>
            <p>
              Direct business advisory & credit access enables rural Indians to escape predatory moneylenders and build sustainable micro-enterprise livelihoods.
            </p>
          </div>

          <div className="sdg-card">
            <div className="sdg-icon-badge">👥</div>
            <h3>SDG 10: Reduced Inequalities</h3>
            <p>
              Fair credit scoring based on real demand & financial feasibility — not formal employment — reduces systemic financial exclusion in rural India.
            </p>
          </div>
        </div>
      </section>

      {/* ── RESPONSIBLE AI PRINCIPLES SECTION (Light with Accent Borders) ── */}
      <section className="ai-principles-section">
        <div className="section-header-center">
          <h2>Built on Responsible AI Principles</h2>
          <p>Every feature demonstrates ethical, inclusive AI design</p>
        </div>

        <div className="principles-grid">
          <div className="principle-card border-purple">
            <div className="principle-icon">💙</div>
            <h3>Equity & Inclusion</h3>
            <p>
              Designed specifically for 63M+ excluded Indians — farmers, daily wage workers, SHG women, & rural youth.
            </p>
          </div>

          <div className="principle-card border-blue">
            <div className="principle-icon">👁️</div>
            <h3>Transparency & Explainability</h3>
            <p>
              Every score comes with a plain language explanation powered by Google Gemini AI — in Hindi, English, or 16 Indian languages.
            </p>
          </div>

          <div className="principle-card border-darkblue">
            <div className="principle-icon">🔒</div>
            <h3>Privacy by Design</h3>
            <p>
              Consent-first approach. We never store unauthorized data. Your information is encrypted & privacy protected.
            </p>
          </div>

          <div className="principle-card border-orange">
            <div className="principle-icon">🛡️</div>
            <h3>Bias Mitigation</h3>
            <p>
              Gender, caste, and region do not influence your score. Our model is continuously monitored for regional & demographic fairness.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <span className="brand-logo-icon">🛡️</span>
              <span className="brand-name">GramVyapar <span className="brand-ai-badge">AI</span></span>
            </div>
            <p className="footer-desc">
              GramVyapar AI is an educational project demonstrating responsible AI for rural financial & business inclusion. It helps rural micro-entrepreneurs make smart business decisions.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><button onClick={handleStartAnalysis} className="btn-link-footer">Start Feasibility Analysis</button></li>
              <li><Link to="/schemes">Government Schemes</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Data Privacy</h4>
            <p className="privacy-text">
              Your data is processed securely with your explicit consent and is never shared with third-party advertisers.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 GramVyapar AI. Built with ❤️ for rural India.</p>
          <p className="festival-tag">India AI Impact Festival 2026</p>
        </div>
      </footer>
    </div>
  );
}
