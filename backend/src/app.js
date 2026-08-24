import express from 'express';
import helmet from 'helmet';
import corsMiddleware from './config/cors.js';
import { generalLimiter } from './middleware/rateLimiter.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import financialRoutes from './routes/financialRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import i18nRoutes from './routes/i18nRoutes.js';

const app = express();

// Global middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SIH Advisory Platform API is running', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/business-categories', (req, res, next) => {
  // Redirect /api/business-categories to the business categories endpoint
  req.url = '/categories';
  businessRoutes(req, res, next);
});
app.use('/api/schemes', schemeRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/reports', analysisRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/i18n', i18nRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
