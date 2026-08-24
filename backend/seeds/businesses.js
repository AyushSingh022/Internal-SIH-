import { Business, BusinessCategory, Village } from '../src/models/index.js';

export async function seedBusinesses() {
  console.log('  Seeding sample businesses...');

  const categories = await BusinessCategory.findAll();
  const catMap = {};
  categories.forEach(c => { catMap[c.name] = c.id; });

  const villages = await Village.findAll();
  if (villages.length === 0) {
    console.log('  ⚠ No villages found, skipping business seeding');
    return;
  }

  const businesses = [];

  // Generate a few businesses near each village
  for (const village of villages) {
    if (!village.latitude || !village.longitude) continue;
    const lat = parseFloat(village.latitude);
    const lng = parseFloat(village.longitude);

    // 2-4 businesses near each village
    const sampleBiz = [
      { name: `${village.name} Kirana Store`, catKey: 'Grocery / Kirana', offset: [0.002, 0.003] },
      { name: `${village.name} Dairy`, catKey: 'Dairy', offset: [-0.003, 0.001] },
      { name: `${village.name} Tailor Shop`, catKey: 'Tailoring', offset: [0.004, -0.002] },
      { name: `${village.name} Mobile Point`, catKey: 'Mobile Repair', offset: [-0.001, 0.005] },
      { name: `${village.name} Tea Corner`, catKey: 'Tea Stall / Small Restaurant', offset: [0.001, -0.004] },
    ];

    // Pick 2-4 random businesses per village
    const count = 2 + Math.floor(Math.random() * 3);
    const shuffled = sampleBiz.sort(() => Math.random() - 0.5).slice(0, count);

    for (const biz of shuffled) {
      if (!catMap[biz.catKey]) continue;
      businesses.push({
        name: biz.name,
        category_id: catMap[biz.catKey],
        latitude: lat + biz.offset[0],
        longitude: lng + biz.offset[1],
        village_id: village.id,
        district_id: village.district_id,
        state_id: village.state_id,
        tehsil_id: village.tehsil_id,
        source: 'seed',
        verification_status: 'unverified',
      });
    }
  }

  if (businesses.length > 0) {
    await Business.bulkCreate(businesses);
  }

  console.log(`  ✓ ${businesses.length} sample businesses created`);
}
