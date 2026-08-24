import { State, District, Tehsil, Block, Village } from '../src/models/index.js';

export async function seedLocations() {
  console.log('  Seeding locations...');

  // All 28 States and 8 Union Territories of India
  const states = await State.bulkCreate([
    { name: 'Andaman and Nicobar Islands', name_local: 'अंडमान और निकोबार द्वीप समूह', lgd_code: 35 },
    { name: 'Andhra Pradesh', name_local: 'ఆంధ్ర ప్రదేశ్', lgd_code: 28 },
    { name: 'Arunachal Pradesh', name_local: 'अरुणाचल प्रदेश', lgd_code: 12 },
    { name: 'Assam', name_local: 'অসম', lgd_code: 18 },
    { name: 'Bihar', name_local: 'बिहार', lgd_code: 10 },
    { name: 'Chandigarh', name_local: 'चंडीगढ़', lgd_code: 4 },
    { name: 'Chhattisgarh', name_local: 'छत्तीसगढ़', lgd_code: 22 },
    { name: 'Dadra and Nagar Haveli and Daman and Diu', name_local: 'दादरा और नगर हवेली और दमन और दीव', lgd_code: 38 },
    { name: 'Delhi', name_local: 'दिल्ली', lgd_code: 7 },
    { name: 'Goa', name_local: 'गोवा', lgd_code: 30 },
    { name: 'Gujarat', name_local: 'ગુજરાત', lgd_code: 24 },
    { name: 'Haryana', name_local: 'हरियाणा', lgd_code: 6 },
    { name: 'Himachal Pradesh', name_local: 'हिमाचल प्रदेश', lgd_code: 2 },
    { name: 'Jammu and Kashmir', name_local: 'जम्मू और कश्मीर', lgd_code: 1 },
    { name: 'Jharkhand', name_local: 'झारखण्ड', lgd_code: 20 },
    { name: 'Karnataka', name_local: 'ಕರ್ನಾಟಕ', lgd_code: 29 },
    { name: 'Kerala', name_local: 'കേരളം', lgd_code: 32 },
    { name: 'Ladakh', name_local: 'लद्दाख', lgd_code: 37 },
    { name: 'Lakshadweep', name_local: 'लक्षद्वीप', lgd_code: 31 },
    { name: 'Madhya Pradesh', name_local: 'मध्य प्रदेश', lgd_code: 23 },
    { name: 'Maharashtra', name_local: 'महाराष्ट्र', lgd_code: 27 },
    { name: 'Manipur', name_local: 'मणिपुर', lgd_code: 14 },
    { name: 'Meghalaya', name_local: 'मेघालय', lgd_code: 17 },
    { name: 'Mizoram', name_local: 'मिज़ोरम', lgd_code: 15 },
    { name: 'Nagaland', name_local: 'नागालैंड', lgd_code: 13 },
    { name: 'Odisha', name_local: 'ଓଡ଼ିଶା', lgd_code: 21 },
    { name: 'Puducherry', name_local: 'पुदुचेरी', lgd_code: 34 },
    { name: 'Punjab', name_local: 'ਪੰਜਾਬ', lgd_code: 3 },
    { name: 'Rajasthan', name_local: 'राजस्थान', lgd_code: 8 },
    { name: 'Sikkim', name_local: 'सिक्किम', lgd_code: 11 },
    { name: 'Tamil Nadu', name_local: 'தமிழ்நாடு', lgd_code: 33 },
    { name: 'Telangana', name_local: 'తెలంగాణ', lgd_code: 36 },
    { name: 'Tripura', name_local: 'त्रिपुरा', lgd_code: 16 },
    { name: 'Uttar Pradesh', name_local: 'उत्तर प्रदेश', lgd_code: 9 },
    { name: 'Uttarakhand', name_local: 'उत्तराखंड', lgd_code: 5 },
    { name: 'West Bengal', name_local: 'পশ্চিমবঙ্গ', lgd_code: 19 },
  ]);

  const stateMap = {};
  states.forEach(s => { stateMap[s.name] = s.id; });

  // ── UTTAR PRADESH ──
  const upDistricts = await District.bulkCreate([
    { name: 'Lucknow', name_local: 'लखनऊ', state_id: stateMap['Uttar Pradesh'], lgd_code: 163 },
    { name: 'Varanasi', name_local: 'वाराणसी', state_id: stateMap['Uttar Pradesh'], lgd_code: 178 },
    { name: 'Gorakhpur', name_local: 'गोरखपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 155 },
    { name: 'Prayagraj', name_local: 'प्रयागराज', state_id: stateMap['Uttar Pradesh'], lgd_code: 170 },
    { name: 'Kanpur Nagar', name_local: 'कानपुर नगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 164 },
    { name: 'Agra', name_local: 'आगरा', state_id: stateMap['Uttar Pradesh'], lgd_code: 142 },
    { name: 'Jaunpur', name_local: 'जौनपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 162 },
    { name: 'Sultanpur', name_local: 'सुल्तानपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 176 },
  ]);
  const upDistMap = {};
  upDistricts.forEach(d => { upDistMap[d.name] = d.id; });

  // Tehsils for UP districts
  const upTehsils = await Tehsil.bulkCreate([
    { name: 'Lucknow', district_id: upDistMap['Lucknow'] },
    { name: 'Mohanlalganj', district_id: upDistMap['Lucknow'] },
    { name: 'Bakshi Ka Talab', district_id: upDistMap['Lucknow'] },
    { name: 'Varanasi', district_id: upDistMap['Varanasi'] },
    { name: 'Pindra', district_id: upDistMap['Varanasi'] },
    { name: 'Rajatalab', district_id: upDistMap['Varanasi'] },
    { name: 'Gorakhpur', district_id: upDistMap['Gorakhpur'] },
    { name: 'Sahjanwa', district_id: upDistMap['Gorakhpur'] },
    { name: 'Khajni', district_id: upDistMap['Gorakhpur'] },
    { name: 'Soraon', district_id: upDistMap['Prayagraj'] },
    { name: 'Phulpur', district_id: upDistMap['Prayagraj'] },
    { name: 'Kanpur', district_id: upDistMap['Kanpur Nagar'] },
    { name: 'Bilhaur', district_id: upDistMap['Kanpur Nagar'] },
    { name: 'Agra', district_id: upDistMap['Agra'] },
    { name: 'Fatehabad', district_id: upDistMap['Agra'] },
    { name: 'Jaunpur', district_id: upDistMap['Jaunpur'] },
    { name: 'Machhalishahar', district_id: upDistMap['Jaunpur'] },
    { name: 'Sultanpur', district_id: upDistMap['Sultanpur'] },
    { name: 'Kadipur', district_id: upDistMap['Sultanpur'] },
  ]);
  const upTehsilMap = {};
  upTehsils.forEach(t => { upTehsilMap[t.name + '_' + t.district_id] = t.id; });

  // Blocks for UP
  const upBlocks = await Block.bulkCreate([
    { name: 'Chinhat', district_id: upDistMap['Lucknow'] },
    { name: 'Mohanlalganj', district_id: upDistMap['Lucknow'] },
    { name: 'Gosainganj', district_id: upDistMap['Lucknow'] },
    { name: 'Pindra', district_id: upDistMap['Varanasi'] },
    { name: 'Sevapuri', district_id: upDistMap['Varanasi'] },
    { name: 'Araziline', district_id: upDistMap['Varanasi'] },
    { name: 'Campierganj', district_id: upDistMap['Gorakhpur'] },
    { name: 'Sahjanwa', district_id: upDistMap['Gorakhpur'] },
    { name: 'Jaunpur City', district_id: upDistMap['Jaunpur'] },
    { name: 'Machhalishahar', district_id: upDistMap['Jaunpur'] },
  ]);
  const upBlockMap = {};
  upBlocks.forEach(b => { upBlockMap[b.name] = b.id; });

  // Villages for UP
  await Village.bulkCreate([
    { name: 'Chinhat', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Lucknow'], tehsil_id: upTehsils[0].id, block_id: upBlocks[0].id, latitude: 26.8800, longitude: 81.0500, population: 15000 },
    { name: 'Amausi', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Lucknow'], tehsil_id: upTehsils[0].id, block_id: upBlocks[0].id, latitude: 26.7600, longitude: 80.8800, population: 8000 },
    { name: 'Mohanlalganj', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Lucknow'], tehsil_id: upTehsils[1].id, block_id: upBlocks[1].id, latitude: 26.7500, longitude: 80.9800, population: 12000 },
    { name: 'Gosainganj', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Lucknow'], tehsil_id: upTehsils[2].id, block_id: upBlocks[2].id, latitude: 26.7800, longitude: 80.7500, population: 10000 },
    { name: 'Ramnagar', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Varanasi'], tehsil_id: upTehsils[3].id, block_id: upBlocks[3].id, latitude: 25.2700, longitude: 83.0300, population: 18000 },
    { name: 'Pindra', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Varanasi'], tehsil_id: upTehsils[4].id, block_id: upBlocks[3].id, latitude: 25.3500, longitude: 83.1200, population: 9000 },
    { name: 'Sevapuri', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Varanasi'], tehsil_id: upTehsils[5].id, block_id: upBlocks[4].id, latitude: 25.2200, longitude: 83.1500, population: 7500 },
    { name: 'Campierganj', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Gorakhpur'], tehsil_id: upTehsils[6].id, block_id: upBlocks[5].id, latitude: 26.8600, longitude: 83.5400, population: 11000 },
    { name: 'Sahjanwa', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Gorakhpur'], tehsil_id: upTehsils[7].id, block_id: upBlocks[6].id, latitude: 26.8200, longitude: 83.2200, population: 14000 },
    { name: 'Khajni', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Gorakhpur'], tehsil_id: upTehsils[8].id, block_id: upBlocks[6].id, latitude: 26.7400, longitude: 83.4600, population: 6000 },
    { name: 'Soraon', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Prayagraj'], tehsil_id: upTehsils[9].id, latitude: 25.5100, longitude: 81.8400, population: 16000 },
    { name: 'Phulpur', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Prayagraj'], tehsil_id: upTehsils[10].id, latitude: 25.5500, longitude: 82.0700, population: 13000 },
    { name: 'Jaunpur City', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Jaunpur'], tehsil_id: upTehsils[15].id, block_id: upBlocks[7].id, latitude: 25.7464, longitude: 82.6837, population: 20000 },
    { name: 'Machhalishahar', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Jaunpur'], tehsil_id: upTehsils[16].id, block_id: upBlocks[8].id, latitude: 25.6800, longitude: 82.8200, population: 11000 },
    { name: 'Sultanpur Town', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Sultanpur'], tehsil_id: upTehsils[17].id, latitude: 26.2648, longitude: 82.0727, population: 17000 },
    { name: 'Kadipur', state_id: stateMap['Uttar Pradesh'], district_id: upDistMap['Sultanpur'], tehsil_id: upTehsils[18].id, latitude: 26.2100, longitude: 82.1200, population: 8000 },
  ]);

  // ── BIHAR ──
  const biharDistricts = await District.bulkCreate([
    { name: 'Patna', name_local: 'पटना', state_id: stateMap['Bihar'], lgd_code: 220 },
    { name: 'Gaya', name_local: 'गया', state_id: stateMap['Bihar'], lgd_code: 206 },
    { name: 'Muzaffarpur', name_local: 'मुजफ्फरपुर', state_id: stateMap['Bihar'], lgd_code: 216 },
    { name: 'Bhagalpur', name_local: 'भागलपुर', state_id: stateMap['Bihar'], lgd_code: 204 },
    { name: 'Darbhanga', name_local: 'दरभंगा', state_id: stateMap['Bihar'], lgd_code: 211 },
  ]);
  const biharDistMap = {};
  biharDistricts.forEach(d => { biharDistMap[d.name] = d.id; });

  const biharTehsils = await Tehsil.bulkCreate([
    { name: 'Patna Sadar', district_id: biharDistMap['Patna'] },
    { name: 'Danapur', district_id: biharDistMap['Patna'] },
    { name: 'Gaya Town', district_id: biharDistMap['Gaya'] },
    { name: 'Bodh Gaya', district_id: biharDistMap['Gaya'] },
    { name: 'Muzaffarpur Sadar', district_id: biharDistMap['Muzaffarpur'] },
  ]);

  const biharBlocks = await Block.bulkCreate([
    { name: 'Patna Sadar', district_id: biharDistMap['Patna'] },
    { name: 'Danapur', district_id: biharDistMap['Patna'] },
    { name: 'Gaya Town', district_id: biharDistMap['Gaya'] },
    { name: 'Bodh Gaya', district_id: biharDistMap['Gaya'] },
    { name: 'Mushari', district_id: biharDistMap['Muzaffarpur'] },
  ]);

  await Village.bulkCreate([
    { name: 'Danapur', state_id: stateMap['Bihar'], district_id: biharDistMap['Patna'], tehsil_id: biharTehsils[1].id, block_id: biharBlocks[1].id, latitude: 25.6217, longitude: 85.0500, population: 25000 },
    { name: 'Phulwari Sharif', state_id: stateMap['Bihar'], district_id: biharDistMap['Patna'], tehsil_id: biharTehsils[0].id, block_id: biharBlocks[0].id, latitude: 25.5800, longitude: 85.1100, population: 18000 },
    { name: 'Bodh Gaya', state_id: stateMap['Bihar'], district_id: biharDistMap['Gaya'], tehsil_id: biharTehsils[3].id, block_id: biharBlocks[3].id, latitude: 24.6961, longitude: 84.9869, population: 30000 },
    { name: 'Tekari', state_id: stateMap['Bihar'], district_id: biharDistMap['Gaya'], tehsil_id: biharTehsils[2].id, block_id: biharBlocks[2].id, latitude: 24.9428, longitude: 84.8400, population: 12000 },
    { name: 'Mushari', state_id: stateMap['Bihar'], district_id: biharDistMap['Muzaffarpur'], tehsil_id: biharTehsils[4].id, block_id: biharBlocks[4].id, latitude: 26.1209, longitude: 85.3647, population: 9000 },
  ]);

  // ── JHARKHAND ──
  const jhDistricts = await District.bulkCreate([
    { name: 'Ranchi', name_local: 'राँची', state_id: stateMap['Jharkhand'], lgd_code: 314 },
    { name: 'Jamshedpur (East Singhbhum)', name_local: 'जमशेदपुर', state_id: stateMap['Jharkhand'], lgd_code: 307 },
    { name: 'Dhanbad', name_local: 'धनबाद', state_id: stateMap['Jharkhand'], lgd_code: 305 },
  ]);
  const jhDistMap = {};
  jhDistricts.forEach(d => { jhDistMap[d.name] = d.id; });

  const jhTehsils = await Tehsil.bulkCreate([
    { name: 'Ranchi Sadar', district_id: jhDistMap['Ranchi'] },
    { name: 'Kanke', district_id: jhDistMap['Ranchi'] },
    { name: 'Jamshedpur', district_id: jhDistMap['Jamshedpur (East Singhbhum)'] },
    { name: 'Dhanbad', district_id: jhDistMap['Dhanbad'] },
  ]);

  const jhBlocks = await Block.bulkCreate([
    { name: 'Ranchi', district_id: jhDistMap['Ranchi'] },
    { name: 'Kanke', district_id: jhDistMap['Ranchi'] },
  ]);

  await Village.bulkCreate([
    { name: 'Kanke', state_id: stateMap['Jharkhand'], district_id: jhDistMap['Ranchi'], tehsil_id: jhTehsils[1].id, block_id: jhBlocks[1].id, latitude: 23.3900, longitude: 85.3200, population: 15000 },
    { name: 'Namkum', state_id: stateMap['Jharkhand'], district_id: jhDistMap['Ranchi'], tehsil_id: jhTehsils[0].id, block_id: jhBlocks[0].id, latitude: 23.3100, longitude: 85.3800, population: 12000 },
    { name: 'Gamharia', state_id: stateMap['Jharkhand'], district_id: jhDistMap['Jamshedpur (East Singhbhum)'], tehsil_id: jhTehsils[2].id, latitude: 22.7800, longitude: 86.1700, population: 20000 },
  ]);

  // ── ODISHA ──
  const odDistricts = await District.bulkCreate([
    { name: 'Bhubaneswar (Khordha)', name_local: 'ଖୋର୍ଦ୍ଧା', state_id: stateMap['Odisha'], lgd_code: 379 },
    { name: 'Cuttack', name_local: 'କଟକ', state_id: stateMap['Odisha'], lgd_code: 372 },
    { name: 'Puri', name_local: 'ପୁରୀ', state_id: stateMap['Odisha'], lgd_code: 384 },
  ]);
  const odDistMap = {};
  odDistricts.forEach(d => { odDistMap[d.name] = d.id; });

  const odTehsils = await Tehsil.bulkCreate([
    { name: 'Bhubaneswar', district_id: odDistMap['Bhubaneswar (Khordha)'] },
    { name: 'Jatni', district_id: odDistMap['Bhubaneswar (Khordha)'] },
    { name: 'Cuttack Sadar', district_id: odDistMap['Cuttack'] },
    { name: 'Puri Sadar', district_id: odDistMap['Puri'] },
  ]);

  const odBlocks = await Block.bulkCreate([
    { name: 'Bhubaneswar Block', district_id: odDistMap['Bhubaneswar (Khordha)'] },
    { name: 'Jatni Block', district_id: odDistMap['Bhubaneswar (Khordha)'] },
    { name: 'Cuttack Block', district_id: odDistMap['Cuttack'] },
    { name: 'Puri Block', district_id: odDistMap['Puri'] },
  ]);

  await Village.bulkCreate([
    { name: 'Jatni', state_id: stateMap['Odisha'], district_id: odDistMap['Bhubaneswar (Khordha)'], tehsil_id: odTehsils[1].id, block_id: odBlocks[1].id, latitude: 20.1700, longitude: 85.7200, population: 22000 },
    { name: 'Pipili', state_id: stateMap['Odisha'], district_id: odDistMap['Puri'], tehsil_id: odTehsils[3].id, block_id: odBlocks[3].id, latitude: 20.1200, longitude: 85.8300, population: 14000 },
  ]);

  // ── TAMIL NADU ──
  const tnDistricts = await District.bulkCreate([
    { name: 'Chennai', name_local: 'சென்னை', state_id: stateMap['Tamil Nadu'], lgd_code: 601 },
    { name: 'Coimbatore', name_local: 'கோயம்புத்தூர்', state_id: stateMap['Tamil Nadu'], lgd_code: 606 },
    { name: 'Madurai', name_local: 'மதுரை', state_id: stateMap['Tamil Nadu'], lgd_code: 612 },
  ]);
  const tnDistMap = {};
  tnDistricts.forEach(d => { tnDistMap[d.name] = d.id; });

  const tnTehsils = await Tehsil.bulkCreate([
    { name: 'Ambattur', district_id: tnDistMap['Chennai'] },
    { name: 'Coimbatore South', district_id: tnDistMap['Coimbatore'] },
    { name: 'Madurai North', district_id: tnDistMap['Madurai'] },
  ]);

  const tnBlocks = await Block.bulkCreate([
    { name: 'Ambattur Block', district_id: tnDistMap['Chennai'] },
    { name: 'Sulur Block', district_id: tnDistMap['Coimbatore'] },
    { name: 'Thirumangalam Block', district_id: tnDistMap['Madurai'] },
  ]);

  await Village.bulkCreate([
    { name: 'Ambattur', state_id: stateMap['Tamil Nadu'], district_id: tnDistMap['Chennai'], tehsil_id: tnTehsils[0].id, block_id: tnBlocks[0].id, latitude: 13.1143, longitude: 80.1548, population: 35000 },
    { name: 'Sulur', state_id: stateMap['Tamil Nadu'], district_id: tnDistMap['Coimbatore'], tehsil_id: tnTehsils[1].id, block_id: tnBlocks[1].id, latitude: 11.0362, longitude: 77.1230, population: 18000 },
    { name: 'Thirumangalam', state_id: stateMap['Tamil Nadu'], district_id: tnDistMap['Madurai'], tehsil_id: tnTehsils[2].id, block_id: tnBlocks[2].id, latitude: 9.8135, longitude: 77.9850, population: 12000 },
  ]);

  // ── MADHYA PRADESH ──
  const mpDistricts = await District.bulkCreate([
    { name: 'Bhopal', name_local: 'भोपाल', state_id: stateMap['Madhya Pradesh'], lgd_code: 425 },
    { name: 'Indore', name_local: 'इंदौर', state_id: stateMap['Madhya Pradesh'], lgd_code: 430 },
    { name: 'Jabalpur', name_local: 'जबलपुर', state_id: stateMap['Madhya Pradesh'], lgd_code: 434 },
  ]);
  const mpDistMap = {};
  mpDistricts.forEach(d => { mpDistMap[d.name] = d.id; });

  const mpTehsils = await Tehsil.bulkCreate([
    { name: 'Bhopal', district_id: mpDistMap['Bhopal'] },
    { name: 'Huzur', district_id: mpDistMap['Bhopal'] },
    { name: 'Indore', district_id: mpDistMap['Indore'] },
    { name: 'Jabalpur', district_id: mpDistMap['Jabalpur'] },
  ]);

  const mpBlocks = await Block.bulkCreate([
    { name: 'Huzur Block', district_id: mpDistMap['Bhopal'] },
    { name: 'Mhow Block', district_id: mpDistMap['Indore'] },
    { name: 'Sihora Block', district_id: mpDistMap['Jabalpur'] },
  ]);

  await Village.bulkCreate([
    { name: 'Huzur', state_id: stateMap['Madhya Pradesh'], district_id: mpDistMap['Bhopal'], tehsil_id: mpTehsils[1].id, block_id: mpBlocks[0].id, latitude: 23.2599, longitude: 77.4126, population: 20000 },
    { name: 'Mhow', state_id: stateMap['Madhya Pradesh'], district_id: mpDistMap['Indore'], tehsil_id: mpTehsils[2].id, block_id: mpBlocks[1].id, latitude: 22.5500, longitude: 75.7600, population: 15000 },
    { name: 'Sihora', state_id: stateMap['Madhya Pradesh'], district_id: mpDistMap['Jabalpur'], tehsil_id: mpTehsils[3].id, block_id: mpBlocks[2].id, latitude: 23.4900, longitude: 80.1000, population: 10000 },
  ]);

  // ── TELANGANA ──
  const tsDistricts = await District.bulkCreate([
    { name: 'Hyderabad', name_local: 'హైదరాబాద్', state_id: stateMap['Telangana'], lgd_code: 536 },
    { name: 'Warangal', name_local: 'వరంగల్', state_id: stateMap['Telangana'], lgd_code: 546 },
  ]);
  const tsDistMap = {};
  tsDistricts.forEach(d => { tsDistMap[d.name] = d.id; });

  const tsTehsils = await Tehsil.bulkCreate([
    { name: 'Hyderabad', district_id: tsDistMap['Hyderabad'] },
    { name: 'Warangal Urban', district_id: tsDistMap['Warangal'] },
  ]);

  const tsBlocks = await Block.bulkCreate([
    { name: 'Uppal Block', district_id: tsDistMap['Hyderabad'] },
    { name: 'Hanamkonda Block', district_id: tsDistMap['Warangal'] },
  ]);

  await Village.bulkCreate([
    { name: 'Uppal', state_id: stateMap['Telangana'], district_id: tsDistMap['Hyderabad'], tehsil_id: tsTehsils[0].id, block_id: tsBlocks[0].id, latitude: 17.4065, longitude: 78.5590, population: 40000 },
    { name: 'Hanamkonda', state_id: stateMap['Telangana'], district_id: tsDistMap['Warangal'], tehsil_id: tsTehsils[1].id, block_id: tsBlocks[1].id, latitude: 17.9835, longitude: 79.5760, population: 25000 },
  ]);

  // ── KARNATAKA ──
  const kaDistricts = await District.bulkCreate([
    { name: 'Bengaluru Urban', name_local: 'ಬೆಂಗಳೂರು ನಗರ', state_id: stateMap['Karnataka'], lgd_code: 572 },
    { name: 'Mysuru', name_local: 'ಮೈಸೂರು', state_id: stateMap['Karnataka'], lgd_code: 580 },
  ]);
  const kaDistMap = {};
  kaDistricts.forEach(d => { kaDistMap[d.name] = d.id; });

  const kaTehsils = await Tehsil.bulkCreate([
    { name: 'Bengaluru North', district_id: kaDistMap['Bengaluru Urban'] },
    { name: 'Bengaluru South', district_id: kaDistMap['Bengaluru Urban'] },
    { name: 'Mysuru', district_id: kaDistMap['Mysuru'] },
  ]);

  const kaBlocks = await Block.bulkCreate([
    { name: 'Yelahanka Block', district_id: kaDistMap['Bengaluru Urban'] },
    { name: 'Nanjangud Block', district_id: kaDistMap['Mysuru'] },
  ]);

  await Village.bulkCreate([
    { name: 'Yelahanka', state_id: stateMap['Karnataka'], district_id: kaDistMap['Bengaluru Urban'], tehsil_id: kaTehsils[0].id, block_id: kaBlocks[0].id, latitude: 13.1007, longitude: 77.5963, population: 50000 },
    { name: 'Nanjangud', state_id: stateMap['Karnataka'], district_id: kaDistMap['Mysuru'], tehsil_id: kaTehsils[2].id, block_id: kaBlocks[1].id, latitude: 12.1161, longitude: 76.6831, population: 18000 },
  ]);

  console.log('  ✓ States & UTs: 36, Districts: ~30, Tehsils: ~40, Blocks: ~30, Villages: ~35');
}
