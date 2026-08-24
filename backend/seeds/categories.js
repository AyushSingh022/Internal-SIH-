import { BusinessCategory } from '../src/models/index.js';

export async function seedCategories() {
  console.log('  Seeding business categories...');

  await BusinessCategory.bulkCreate([
    { name: 'Dairy', description: 'Milk production, dairy products', icon: '🥛', sector: 'Agriculture' },
    { name: 'Grocery / Kirana', description: 'General provisions and grocery stores', icon: '🏪', sector: 'Retail' },
    { name: 'Poultry', description: 'Chicken, egg farming', icon: '🐔', sector: 'Agriculture' },
    { name: 'Tailoring', description: 'Clothing stitching and alteration', icon: '🧵', sector: 'Service' },
    { name: 'Food Processing', description: 'Pickles, papad, snacks, spices', icon: '🏭', sector: 'Manufacturing' },
    { name: 'Flour Mill (Atta Chakki)', description: 'Wheat and grain milling', icon: '🌾', sector: 'Manufacturing' },
    { name: 'Mobile Repair', description: 'Smartphone and electronics repair', icon: '📱', sector: 'Service' },
    { name: 'Clothing & Garments', description: 'Ready-made garments retail', icon: '👕', sector: 'Retail' },
    { name: 'Bakery', description: 'Bread, biscuits, cakes', icon: '🍞', sector: 'Manufacturing' },
    { name: 'Agriculture Inputs', description: 'Seeds, fertilizer, pesticide shop', icon: '🌱', sector: 'Retail' },
    { name: 'Handicrafts', description: 'Traditional crafts and artisan products', icon: '🎨', sector: 'Manufacturing' },
    { name: 'Beauty Salon / Parlour', description: 'Hair, beauty and grooming services', icon: '💇', sector: 'Service' },
    { name: 'Auto Repair / Garage', description: 'Vehicle repair and servicing', icon: '🔧', sector: 'Service' },
    { name: 'Welding & Fabrication', description: 'Metal works and fabrication', icon: '⚙️', sector: 'Manufacturing' },
    { name: 'Tea Stall / Small Restaurant', description: 'Tea, snacks, small eatery', icon: '☕', sector: 'Service' },
    { name: 'Pharmacy / Medical Store', description: 'Medicines and health products', icon: '💊', sector: 'Retail' },
    { name: 'Stationery & Printing', description: 'Books, stationery, photocopy', icon: '📚', sector: 'Retail' },
    { name: 'Carpentry / Furniture', description: 'Wooden furniture making', icon: '🪵', sector: 'Manufacturing' },
    { name: 'Street Vending', description: 'Mobile or street-based selling', icon: '🛒', sector: 'Retail' },
    { name: 'Fishery', description: 'Fish farming and sales', icon: '🐟', sector: 'Agriculture' },
  ]);

  console.log('  ✓ 20 business categories created');
}
