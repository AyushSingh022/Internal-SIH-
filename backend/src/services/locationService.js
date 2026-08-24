import { State, District, Tehsil, Block, Village } from '../models/index.js';

export async function getStates() {
  return await State.findAll({ order: [['name', 'ASC']] });
}

export async function getDistricts(stateId) {
  return await District.findAll({
    where: { state_id: stateId },
    order: [['name', 'ASC']],
  });
}

export async function getTehsils(districtId) {
  return await Tehsil.findAll({
    where: { district_id: districtId },
    order: [['name', 'ASC']],
  });
}

export async function getBlocks(districtId) {
  return await Block.findAll({
    where: { district_id: districtId },
    order: [['name', 'ASC']],
  });
}

export async function getVillages(filters) {
  const where = {};
  if (filters.tehsilId) where.tehsil_id = filters.tehsilId;
  if (filters.blockId) where.block_id = filters.blockId;
  if (filters.districtId) where.district_id = filters.districtId;

  return await Village.findAll({
    where,
    order: [['name', 'ASC']],
    limit: 500,
  });
}

export async function getVillageById(id) {
  return await Village.findByPk(id, {
    include: [
      { model: State, attributes: ['id', 'name'] },
      { model: District, attributes: ['id', 'name'] },
      { model: Tehsil, attributes: ['id', 'name'] },
      { model: Block, attributes: ['id', 'name'] },
    ],
  });
}
