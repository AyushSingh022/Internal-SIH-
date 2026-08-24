/**
 * Master seed script — populates all tables with demo data.
 * Run with: bun seeds/index.js
 */
import dotenv from 'dotenv';
dotenv.config();

import sequelize from '../src/config/database.js';
import '../src/models/index.js';
import { seedLocations } from './locations.js';
import { seedCategories } from './categories.js';
import { seedSchemes } from './schemes.js';
import { seedTranslations } from './translations.js';
import { seedBusinesses } from './businesses.js';

async function runSeeds() {
  try {
    console.log('🌱 Starting database seed...\n');

    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Force sync to recreate tables
    await sequelize.sync({ force: true });
    console.log('✅ Tables recreated\n');

    await seedLocations();
    console.log('✅ Locations seeded\n');

    await seedCategories();
    console.log('✅ Business categories seeded\n');

    await seedSchemes();
    console.log('✅ Government schemes seeded\n');

    await seedBusinesses();
    console.log('✅ Sample businesses seeded\n');

    await seedTranslations();
    console.log('✅ Languages & translations seeded\n');

    console.log('🎉 All seeds completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

runSeeds();
