import { Op } from 'sequelize';
import { Business, BusinessCategory } from '../models/index.js';
import { haversineDistance, getBoundingBox } from '../utils/geo.js';

export async function getCategories() {
  return await BusinessCategory.findAll({ order: [['name', 'ASC']] });
}

export async function getNearbyBusinesses(lat, lng, radiusKm = 10, categoryId = null) {
  if (!lat || !lng) return [];

  const bbox = getBoundingBox(parseFloat(lat), parseFloat(lng), radiusKm);

  const where = {
    latitude: { [Op.between]: [bbox.minLat, bbox.maxLat] },
    longitude: { [Op.between]: [bbox.minLng, bbox.maxLng] },
  };
  if (categoryId) {
    where.category_id = categoryId;
  }

  const businesses = await Business.findAll({
    where,
    include: [{ model: BusinessCategory, attributes: ['id', 'name', 'icon'] }],
  });

  // Precise Haversine filter
  const results = businesses
    .map(b => {
      const dist = haversineDistance(
        parseFloat(lat), parseFloat(lng),
        parseFloat(b.latitude), parseFloat(b.longitude)
      );
      return { ...b.toJSON(), distance_km: Math.round(dist * 100) / 100 };
    })
    .filter(b => b.distance_km <= radiusKm)
    .sort((a, b) => a.distance_km - b.distance_km);

  return results;
}

export async function getCompetitorAnalysis(lat, lng, radiusKm, categoryId) {
  const allNearby = await getNearbyBusinesses(lat, lng, radiusKm);
  const sameCategoryNearby = categoryId
    ? allNearby.filter(b => b.category_id === parseInt(categoryId))
    : [];

  // Distribution by category
  const distribution = {};
  allNearby.forEach(b => {
    const catName = b.BusinessCategory?.name || 'Unknown';
    distribution[catName] = (distribution[catName] || 0) + 1;
  });

  const competitionLevel = sameCategoryNearby.length === 0
    ? 'None'
    : sameCategoryNearby.length <= 2
      ? 'Low'
      : sameCategoryNearby.length <= 5
        ? 'Medium'
        : 'High';

  return {
    total_nearby: allNearby.length,
    same_category_count: sameCategoryNearby.length,
    competition_level: competitionLevel,
    competitors: sameCategoryNearby,
    all_nearby: allNearby,
    distribution,
    search_radius_km: radiusKm,
  };
}
