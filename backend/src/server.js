import app from './app.js';
import env from './config/environment.js';
import sequelize from './config/database.js';

// Import models to ensure they are registered
import './models/index.js';

async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync models (create tables if not exist)
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized');

    // Start Express server
    app.listen(env.port, () => {
      console.log(`🚀 SIH Advisory Platform API running on http://localhost:${env.port}`);
      console.log(`   Environment: ${env.nodeEnv}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
