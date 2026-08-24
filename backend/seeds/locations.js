import { State, District, Tehsil, Block, Village } from '../src/models/index.js';

export async function seedLocations() {
  console.log('  Seeding administrative locations (States, Districts, Tehsils, Blocks, Villages)...');

  // 1. ALL 28 STATES AND 8 UNION TERRITORIES OF INDIA
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

  // 2. DISTRICTS FOR ALL STATES AND UTS
  const districtsData = [
    // Andaman & Nicobar
    { name: 'South Andaman', name_local: 'दक्षिण अंडमान', state_id: stateMap['Andaman and Nicobar Islands'], lgd_code: 638 },
    { name: 'North and Middle Andaman', name_local: 'उत्तर और मध्य अंडमान', state_id: stateMap['Andaman and Nicobar Islands'], lgd_code: 639 },
    { name: 'Nicobar', name_local: 'निकोबार', state_id: stateMap['Andaman and Nicobar Islands'], lgd_code: 637 },

    // Andhra Pradesh
    { name: 'Visakhapatnam', name_local: 'విశాఖపట్నం', state_id: stateMap['Andhra Pradesh'], lgd_code: 519 },
    { name: 'NTR (Vijayawada)', name_local: 'ఎన్‌టిఆర్ జిల్లా', state_id: stateMap['Andhra Pradesh'], lgd_code: 510 },
    { name: 'Guntur', name_local: 'గుంటూరు', state_id: stateMap['Andhra Pradesh'], lgd_code: 506 },
    { name: 'Tirupati', name_local: 'తిరుపతి', state_id: stateMap['Andhra Pradesh'], lgd_code: 503 },
    { name: 'Kurnool', name_local: 'కర్నూలు', state_id: stateMap['Andhra Pradesh'], lgd_code: 511 },

    // Arunachal Pradesh
    { name: 'Papum Pare (Itanagar)', name_local: 'पापुम पारे', state_id: stateMap['Arunachal Pradesh'], lgd_code: 232 },
    { name: 'Tawang', name_local: 'तवांग', state_id: stateMap['Arunachal Pradesh'], lgd_code: 236 },
    { name: 'Changlang', name_local: 'चांगलांग', state_id: stateMap['Arunachal Pradesh'], lgd_code: 224 },

    // Assam
    { name: 'Kamrup Metropolitan (Guwahati)', name_local: 'কামৰূপ মহানগৰ', state_id: stateMap['Assam'], lgd_code: 280 },
    { name: 'Dibrugarh', name_local: 'ডিব্ৰুগড়', state_id: stateMap['Assam'], lgd_code: 275 },
    { name: 'Cachar (Silchar)', name_local: 'কাছাৰ', state_id: stateMap['Assam'], lgd_code: 271 },
    { name: 'Jorhat', name_local: 'যোৰহাট', state_id: stateMap['Assam'], lgd_code: 279 },

    // Bihar
    { name: 'Patna', name_local: 'पटना', state_id: stateMap['Bihar'], lgd_code: 220 },
    { name: 'Gaya', name_local: 'गया', state_id: stateMap['Bihar'], lgd_code: 206 },
    { name: 'Muzaffarpur', name_local: 'मुजफ्फरपुर', state_id: stateMap['Bihar'], lgd_code: 216 },
    { name: 'Bhagalpur', name_local: 'भागलपुर', state_id: stateMap['Bihar'], lgd_code: 204 },
    { name: 'Darbhanga', name_local: 'दरभंगा', state_id: stateMap['Bihar'], lgd_code: 211 },

    // Chandigarh
    { name: 'Chandigarh', name_local: 'चंडीगढ़', state_id: stateMap['Chandigarh'], lgd_code: 42 },

    // Chhattisgarh
    { name: 'Raipur', name_local: 'रायपुर', state_id: stateMap['Chhattisgarh'], lgd_code: 388 },
    { name: 'Durg (Bhilai)', name_local: 'दुर्ग', state_id: stateMap['Chhattisgarh'], lgd_code: 378 },
    { name: 'Bilaspur', name_local: 'बिलासपुर', state_id: stateMap['Chhattisgarh'], lgd_code: 375 },
    { name: 'Bastar (Jagdalpur)', name_local: 'बस्तर', state_id: stateMap['Chhattisgarh'], lgd_code: 373 },

    // Dadra and Nagar Haveli and Daman and Diu
    { name: 'Daman', name_local: 'दमन', state_id: stateMap['Dadra and Nagar Haveli and Daman and Diu'], lgd_code: 462 },
    { name: 'Diu', name_local: 'दीव', state_id: stateMap['Dadra and Nagar Haveli and Daman and Diu'], lgd_code: 463 },
    { name: 'Dadra and Nagar Haveli', name_local: 'दादरा एवं नगर हवेली', state_id: stateMap['Dadra and Nagar Haveli and Daman and Diu'], lgd_code: 461 },

    // Delhi
    { name: 'New Delhi', name_local: 'नई दिल्ली', state_id: stateMap['Delhi'], lgd_code: 85 },
    { name: 'North Delhi', name_local: 'उत्तरी दिल्ली', state_id: stateMap['Delhi'], lgd_code: 84 },
    { name: 'South Delhi', name_local: 'दक्षिणी दिल्ली', state_id: stateMap['Delhi'], lgd_code: 88 },
    { name: 'East Delhi', name_local: 'पूर्वी दिल्ली', state_id: stateMap['Delhi'], lgd_code: 82 },
    { name: 'West Delhi', name_local: 'पश्चिमी दिल्ली', state_id: stateMap['Delhi'], lgd_code: 90 },

    // Goa
    { name: 'North Goa (Panaji)', name_local: 'उत्तर गोवा', state_id: stateMap['Goa'], lgd_code: 549 },
    { name: 'South Goa (Margao)', name_local: 'दक्षिण गोवा', state_id: stateMap['Goa'], lgd_code: 550 },

    // Gujarat
    { name: 'Ahmedabad', name_local: 'અમદાવાદ', state_id: stateMap['Gujarat'], lgd_code: 438 },
    { name: 'Surat', name_local: 'સુરત', state_id: stateMap['Gujarat'], lgd_code: 457 },
    { name: 'Vadodara', name_local: 'વડોદરા', state_id: stateMap['Gujarat'], lgd_code: 460 },
    { name: 'Rajkot', name_local: 'રાજકોટ', state_id: stateMap['Gujarat'], lgd_code: 453 },
    { name: 'Bhavnagar', name_local: 'ભાવનગર', state_id: stateMap['Gujarat'], lgd_code: 442 },

    // Haryana
    { name: 'Gurugram', name_local: 'गुरुग्राम', state_id: stateMap['Haryana'], lgd_code: 66 },
    { name: 'Faridabad', name_local: 'फरीदाबाद', state_id: stateMap['Haryana'], lgd_code: 64 },
    { name: 'Ambala', name_local: 'अंबाला', state_id: stateMap['Haryana'], lgd_code: 59 },
    { name: 'Hisar', name_local: 'हिसार', state_id: stateMap['Haryana'], lgd_code: 68 },
    { name: 'Panchkula', name_local: 'पंचकुला', state_id: stateMap['Haryana'], lgd_code: 75 },

    // Himachal Pradesh
    { name: 'Shimla', name_local: 'शिमला', state_id: stateMap['Himachal Pradesh'], lgd_code: 28 },
    { name: 'Kangra (Dharamshala)', name_local: 'कांगड़ा', state_id: stateMap['Himachal Pradesh'], lgd_code: 23 },
    { name: 'Mandi', name_local: 'मंडी', state_id: stateMap['Himachal Pradesh'], lgd_code: 27 },
    { name: 'Kullu', name_local: 'कुल्लू', state_id: stateMap['Himachal Pradesh'], lgd_code: 25 },

    // Jammu and Kashmir
    { name: 'Srinagar', name_local: 'श्रीनगर / سرینگر', state_id: stateMap['Jammu and Kashmir'], lgd_code: 14 },
    { name: 'Jammu', name_local: 'जम्मू / جموں', state_id: stateMap['Jammu and Kashmir'], lgd_code: 6 },
    { name: 'Anantnag', name_local: 'अनंतनाग / اسلام آباد', state_id: stateMap['Jammu and Kashmir'], lgd_code: 1 },
    { name: 'Baramulla', name_local: 'बारामूला / بارਾਮੂਲਾ', state_id: stateMap['Jammu and Kashmir'], lgd_code: 3 },

    // Jharkhand
    { name: 'Ranchi', name_local: 'राँची', state_id: stateMap['Jharkhand'], lgd_code: 314 },
    { name: 'Jamshedpur (East Singhbhum)', name_local: 'जमशेदपुर', state_id: stateMap['Jharkhand'], lgd_code: 307 },
    { name: 'Dhanbad', name_local: 'धनबाद', state_id: stateMap['Jharkhand'], lgd_code: 305 },
    { name: 'Bokaro', name_local: 'बोकारो', state_id: stateMap['Jharkhand'], lgd_code: 302 },

    // Karnataka
    { name: 'Bengaluru Urban', name_local: 'ಬೆಂಗಳೂರು ನಗರ', state_id: stateMap['Karnataka'], lgd_code: 572 },
    { name: 'Mysuru', name_local: 'ಮೈಸೂರು', state_id: stateMap['Karnataka'], lgd_code: 580 },
    { name: 'Hubballi-Dharwad', name_local: 'ಧಾರವಾಡ', state_id: stateMap['Karnataka'], lgd_code: 574 },
    { name: 'Mangaluru (Dakshina Kannada)', name_local: 'ದಕ್ಷಿಣ ಕನ್ನಡ', state_id: stateMap['Karnataka'], lgd_code: 573 },

    // Kerala
    { name: 'Thiruvananthapuram', name_local: 'തിരുവനന്തപുരം', state_id: stateMap['Kerala'], lgd_code: 566 },
    { name: 'Ernakulam (Kochi)', name_local: 'എറണാകുളം', state_id: stateMap['Kerala'], lgd_code: 556 },
    { name: 'Kozhikode', name_local: 'കോഴിക്കോട്', state_id: stateMap['Kerala'], lgd_code: 560 },
    { name: 'Thrissur', name_local: 'തൃശ്ശൂർ', state_id: stateMap['Kerala'], lgd_code: 567 },

    // Ladakh
    { name: 'Leh', name_local: 'लेह / ླེ་', state_id: stateMap['Ladakh'], lgd_code: 9 },
    { name: 'Kargil', name_local: 'कारगिल / ཀାରྒིལ', state_id: stateMap['Ladakh'], lgd_code: 8 },

    // Lakshadweep
    { name: 'Lakshadweep (Kavaratti)', name_local: 'लक्षद्वीप', state_id: stateMap['Lakshadweep'], lgd_code: 553 },

    // Madhya Pradesh
    { name: 'Bhopal', name_local: 'भोपाल', state_id: stateMap['Madhya Pradesh'], lgd_code: 425 },
    { name: 'Indore', name_local: 'इंदौर', state_id: stateMap['Madhya Pradesh'], lgd_code: 430 },
    { name: 'Jabalpur', name_local: 'जबलपुर', state_id: stateMap['Madhya Pradesh'], lgd_code: 434 },
    { name: 'Gwalior', name_local: 'ग्वालियर', state_id: stateMap['Madhya Pradesh'], lgd_code: 428 },
    { name: 'Ujjain', name_local: 'उज्जैन', state_id: stateMap['Madhya Pradesh'], lgd_code: 457 },

    // Maharashtra
    { name: 'Mumbai Suburban', name_local: 'मुंबई उपनगर', state_id: stateMap['Maharashtra'], lgd_code: 519 },
    { name: 'Pune', name_local: 'पुणे', state_id: stateMap['Maharashtra'], lgd_code: 521 },
    { name: 'Nagpur', name_local: 'नागपूर', state_id: stateMap['Maharashtra'], lgd_code: 516 },
    { name: 'Nashik', name_local: 'नाशिक', state_id: stateMap['Maharashtra'], lgd_code: 518 },
    { name: 'Thane', name_local: 'ठाणे', state_id: stateMap['Maharashtra'], lgd_code: 525 },

    // Manipur
    { name: 'Imphal East', name_local: 'ইম্ফল পূর্ব', state_id: stateMap['Manipur'], lgd_code: 253 },
    { name: 'Imphal West', name_local: 'ইম্ফল পশ্চিম', state_id: stateMap['Manipur'], lgd_code: 254 },
    { name: 'Churachandpur', name_local: 'চূড়াচাঁদপুর', state_id: stateMap['Manipur'], lgd_code: 252 },

    // Meghalaya
    { name: 'East Khasi Hills (Shillong)', name_local: 'ईस्ट खासी हिल्स', state_id: stateMap['Meghalaya'], lgd_code: 269 },
    { name: 'West Garo Hills (Tura)', name_local: 'वेस्ट गारो हिल्स', state_id: stateMap['Meghalaya'], lgd_code: 266 },

    // Mizoram
    { name: 'Aizawl', name_local: 'आयजोल', state_id: stateMap['Mizoram'], lgd_code: 261 },
    { name: 'Lunglei', name_local: 'लुंगलेई', state_id: stateMap['Mizoram'], lgd_code: 263 },

    // Nagaland
    { name: 'Kohima', name_local: 'कोहिमा', state_id: stateMap['Nagaland'], lgd_code: 247 },
    { name: 'Dimapur', name_local: 'दीमापुर', state_id: stateMap['Nagaland'], lgd_code: 244 },

    // Odisha
    { name: 'Bhubaneswar (Khordha)', name_local: 'ଖୋର୍ଦ୍ଧା', state_id: stateMap['Odisha'], lgd_code: 379 },
    { name: 'Cuttack', name_local: 'କଟକ', state_id: stateMap['Odisha'], lgd_code: 372 },
    { name: 'Puri', name_local: 'ପୁରୀ', state_id: stateMap['Odisha'], lgd_code: 384 },
    { name: 'Sambalpur', name_local: 'ସମ୍ବଲପୁର', state_id: stateMap['Odisha'], lgd_code: 387 },

    // Puducherry
    { name: 'Puducherry', name_local: 'புதுச்சேரி', state_id: stateMap['Puducherry'], lgd_code: 598 },
    { name: 'Karaikal', name_local: 'காரைக்கால்', state_id: stateMap['Puducherry'], lgd_code: 597 },
    { name: 'Mahe', name_local: 'மாஹே', state_id: stateMap['Puducherry'], lgd_code: 596 },

    // Punjab
    { name: 'Amritsar', name_local: 'ਅੰਮ੍ਰਿਤਸਰ', state_id: stateMap['Punjab'], lgd_code: 34 },
    { name: 'Ludhiana', name_local: 'ਲੁਧਿਆਣਾ', state_id: stateMap['Punjab'], lgd_code: 44 },
    { name: 'Jalandhar', name_local: 'ਜਲੰਧਰ', state_id: stateMap['Punjab'], lgd_code: 40 },
    { name: 'Patiala', name_local: 'ਪਟਿਆਲਾ', state_id: stateMap['Punjab'], lgd_code: 48 },
    { name: 'Mohali (SAS Nagar)', name_local: 'ਐਸ ਏ ਐਸ ਨਗਰ', state_id: stateMap['Punjab'], lgd_code: 53 },

    // Rajasthan
    { name: 'Jaipur', name_local: 'जयपुर', state_id: stateMap['Rajasthan'], lgd_code: 114 },
    { name: 'Jodhpur', name_local: 'जोधपुर', state_id: stateMap['Rajasthan'], lgd_code: 116 },
    { name: 'Udaipur', name_local: 'उदयपुर', state_id: stateMap['Rajasthan'], lgd_code: 125 },
    { name: 'Kota', name_local: 'कोटा', state_id: stateMap['Rajasthan'], lgd_code: 117 },
    { name: 'Ajmer', name_local: 'अजमेर', state_id: stateMap['Rajasthan'], lgd_code: 96 },

    // Sikkim
    { name: 'Gangtok (East Sikkim)', name_local: 'गंगटोक', state_id: stateMap['Sikkim'], lgd_code: 221 },
    { name: 'Namchi (South Sikkim)', name_local: 'नामची', state_id: stateMap['Sikkim'], lgd_code: 223 },

    // Tamil Nadu
    { name: 'Chennai', name_local: 'சென்னை', state_id: stateMap['Tamil Nadu'], lgd_code: 601 },
    { name: 'Coimbatore', name_local: 'கோயம்புத்தூர்', state_id: stateMap['Tamil Nadu'], lgd_code: 606 },
    { name: 'Madurai', name_local: 'மதுரை', state_id: stateMap['Tamil Nadu'], lgd_code: 612 },
    { name: 'Tiruchirappalli', name_local: 'திருச்சிராப்பள்ளி', state_id: stateMap['Tamil Nadu'], lgd_code: 622 },

    // Telangana
    { name: 'Hyderabad', name_local: 'హైదరాబాద్', state_id: stateMap['Telangana'], lgd_code: 536 },
    { name: 'Warangal', name_local: 'వరంగల్', state_id: stateMap['Telangana'], lgd_code: 546 },
    { name: 'Karimnagar', name_local: 'కరీంనగర్', state_id: stateMap['Telangana'], lgd_code: 538 },
    { name: 'Nizamabad', name_local: 'నిజామాబాద్', state_id: stateMap['Telangana'], lgd_code: 543 },

    // Tripura
    { name: 'West Tripura (Agartala)', name_local: 'পশ্চিম ত্রিপুরা', state_id: stateMap['Tripura'], lgd_code: 260 },
    { name: 'Gomati', name_local: 'গোমতী', state_id: stateMap['Tripura'], lgd_code: 649 },

    // Uttar Pradesh (All 75 Districts)
    { name: 'Agra', name_local: 'आगरा', state_id: stateMap['Uttar Pradesh'], lgd_code: 142 },
    { name: 'Aligarh', name_local: 'अलीगढ़', state_id: stateMap['Uttar Pradesh'], lgd_code: 143 },
    { name: 'Ambedkar Nagar', name_local: 'अम्बेडकर नगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 144 },
    { name: 'Amethi', name_local: 'अमेठी', state_id: stateMap['Uttar Pradesh'], lgd_code: 710 },
    { name: 'Amroha', name_local: 'अमरोहा', state_id: stateMap['Uttar Pradesh'], lgd_code: 167 },
    { name: 'Auraiya', name_local: 'औरैया', state_id: stateMap['Uttar Pradesh'], lgd_code: 145 },
    { name: 'Ayodhya (Faizabad)', name_local: 'अयोध्या', state_id: stateMap['Uttar Pradesh'], lgd_code: 151 },
    { name: 'Azamgarh', name_local: 'आजमगढ़', state_id: stateMap['Uttar Pradesh'], lgd_code: 146 },
    { name: 'Baghpat', name_local: 'बागपत', state_id: stateMap['Uttar Pradesh'], lgd_code: 147 },
    { name: 'Bahraich', name_local: 'बहराइच', state_id: stateMap['Uttar Pradesh'], lgd_code: 148 },
    { name: 'Ballia', name_local: 'बलिया', state_id: stateMap['Uttar Pradesh'], lgd_code: 149 },
    { name: 'Balrampur', name_local: 'बलरामपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 150 },
    { name: 'Banda', name_local: 'बांदा', state_id: stateMap['Uttar Pradesh'], lgd_code: 152 },
    { name: 'Barabanki', name_local: 'बाराबंकी', state_id: stateMap['Uttar Pradesh'], lgd_code: 153 },
    { name: 'Bareilly', name_local: 'बरेली', state_id: stateMap['Uttar Pradesh'], lgd_code: 154 },
    { name: 'Basti', name_local: 'बस्ती', state_id: stateMap['Uttar Pradesh'], lgd_code: 156 },
    { name: 'Bhadohi', name_local: 'भदोही', state_id: stateMap['Uttar Pradesh'], lgd_code: 173 },
    { name: 'Bijnor', name_local: 'बिजनौर', state_id: stateMap['Uttar Pradesh'], lgd_code: 157 },
    { name: 'Budaun', name_local: 'बदायूँ', state_id: stateMap['Uttar Pradesh'], lgd_code: 158 },
    { name: 'Bulandshahr', name_local: 'बुलंदशहर', state_id: stateMap['Uttar Pradesh'], lgd_code: 159 },
    { name: 'Chandauli', name_local: 'चंदौली', state_id: stateMap['Uttar Pradesh'], lgd_code: 160 },
    { name: 'Chitrakoot', name_local: 'चित्रकूट', state_id: stateMap['Uttar Pradesh'], lgd_code: 161 },
    { name: 'Deoria', name_local: 'देवरिया', state_id: stateMap['Uttar Pradesh'], lgd_code: 165 },
    { name: 'Etah', name_local: 'एटा', state_id: stateMap['Uttar Pradesh'], lgd_code: 166 },
    { name: 'Etawah', name_local: 'इटावा', state_id: stateMap['Uttar Pradesh'], lgd_code: 168 },
    { name: 'Farrukhabad', name_local: 'फर्रुखाबाद', state_id: stateMap['Uttar Pradesh'], lgd_code: 169 },
    { name: 'Fatehpur', name_local: 'फतेहपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 171 },
    { name: 'Firozabad', name_local: 'फ़िरोज़ाबाद', state_id: stateMap['Uttar Pradesh'], lgd_code: 172 },
    { name: 'Gautam Buddha Nagar (Noida)', name_local: 'गौतम बुद्ध नगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 174 },
    { name: 'Ghaziabad', name_local: 'गाजियाबाद', state_id: stateMap['Uttar Pradesh'], lgd_code: 175 },
    { name: 'Ghazipur', name_local: 'गाजीपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 176 },
    { name: 'Gonda', name_local: 'गोंडा', state_id: stateMap['Uttar Pradesh'], lgd_code: 177 },
    { name: 'Gorakhpur', name_local: 'गोरखपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 155 },
    { name: 'Hamirpur', name_local: 'हमीरपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 179 },
    { name: 'Hapur', name_local: 'हापुड़', state_id: stateMap['Uttar Pradesh'], lgd_code: 708 },
    { name: 'Hardoi', name_local: 'हरदोई', state_id: stateMap['Uttar Pradesh'], lgd_code: 180 },
    { name: 'Hathras', name_local: 'हाथरस', state_id: stateMap['Uttar Pradesh'], lgd_code: 181 },
    { name: 'Jalaun', name_local: 'जालौन', state_id: stateMap['Uttar Pradesh'], lgd_code: 182 },
    { name: 'Jaunpur', name_local: 'जौनपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 162 },
    { name: 'Jhansi', name_local: 'झांसी', state_id: stateMap['Uttar Pradesh'], lgd_code: 183 },
    { name: 'Kannauj', name_local: 'कन्नौज', state_id: stateMap['Uttar Pradesh'], lgd_code: 184 },
    { name: 'Kanpur Dehat', name_local: 'कानपुर देहात', state_id: stateMap['Uttar Pradesh'], lgd_code: 185 },
    { name: 'Kanpur Nagar', name_local: 'कानपुर नगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 164 },
    { name: 'Kasganj', name_local: 'कासगंज', state_id: stateMap['Uttar Pradesh'], lgd_code: 706 },
    { name: 'Kaushambi', name_local: 'कौशांबी', state_id: stateMap['Uttar Pradesh'], lgd_code: 186 },
    { name: 'Kushinagar', name_local: 'कुशीनगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 187 },
    { name: 'Lakhimpur Kheri', name_local: 'लखीमपुर खीरी', state_id: stateMap['Uttar Pradesh'], lgd_code: 188 },
    { name: 'Lalitpur', name_local: 'ललितपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 189 },
    { name: 'Lucknow', name_local: 'लखनऊ', state_id: stateMap['Uttar Pradesh'], lgd_code: 163 },
    { name: 'Maharajganj', name_local: 'महराजगंज', state_id: stateMap['Uttar Pradesh'], lgd_code: 190 },
    { name: 'Mahoba', name_local: 'महोबा', state_id: stateMap['Uttar Pradesh'], lgd_code: 191 },
    { name: 'Mainpuri', name_local: 'मैनपुरी', state_id: stateMap['Uttar Pradesh'], lgd_code: 192 },
    { name: 'Mathura', name_local: 'मथुरा', state_id: stateMap['Uttar Pradesh'], lgd_code: 193 },
    { name: 'Mau', name_local: 'मऊ', state_id: stateMap['Uttar Pradesh'], lgd_code: 194 },
    { name: 'Meerut', name_local: 'मेरठ', state_id: stateMap['Uttar Pradesh'], lgd_code: 195 },
    { name: 'Mirzapur', name_local: 'मिर्जापुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 196 },
    { name: 'Moradabad', name_local: 'मुरादाबाद', state_id: stateMap['Uttar Pradesh'], lgd_code: 197 },
    { name: 'Muzaffarnagar', name_local: 'मुजफ्फरनगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 198 },
    { name: 'Pilibhit', name_local: 'पीलीभीत', state_id: stateMap['Uttar Pradesh'], lgd_code: 199 },
    { name: 'Pratapgarh', name_local: 'प्रतापगढ़', state_id: stateMap['Uttar Pradesh'], lgd_code: 200 },
    { name: 'Prayagraj', name_local: 'प्रयागराज', state_id: stateMap['Uttar Pradesh'], lgd_code: 170 },
    { name: 'Raebareli', name_local: 'रायबरेली', state_id: stateMap['Uttar Pradesh'], lgd_code: 201 },
    { name: 'Rampur', name_local: 'रामपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 202 },
    { name: 'Saharanpur', name_local: 'सहारनपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 203 },
    { name: 'Sambhal', name_local: 'संभल', state_id: stateMap['Uttar Pradesh'], lgd_code: 709 },
    { name: 'Sant Kabir Nagar', name_local: 'संत कबीर नगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 204 },
    { name: 'Shahjahanpur', name_local: 'शाहजहांपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 205 },
    { name: 'Shamli', name_local: 'शामली', state_id: stateMap['Uttar Pradesh'], lgd_code: 707 },
    { name: 'Shravasti', name_local: 'श्रावस्ती', state_id: stateMap['Uttar Pradesh'], lgd_code: 206 },
    { name: 'Siddharthnagar', name_local: 'सिद्धार्थनगर', state_id: stateMap['Uttar Pradesh'], lgd_code: 207 },
    { name: 'Sitapur', name_local: 'सीतापुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 208 },
    { name: 'Sonbhadra', name_local: 'सोनभद्र', state_id: stateMap['Uttar Pradesh'], lgd_code: 209 },
    { name: 'Sultanpur', name_local: 'सुल्तानपुर', state_id: stateMap['Uttar Pradesh'], lgd_code: 176 },
    { name: 'Unnao', name_local: 'उन्नाव', state_id: stateMap['Uttar Pradesh'], lgd_code: 210 },
    { name: 'Varanasi', name_local: 'वाराणसी', state_id: stateMap['Uttar Pradesh'], lgd_code: 178 },

    // Uttarakhand
    { name: 'Dehradun', name_local: 'देहरादून', state_id: stateMap['Uttarakhand'], lgd_code: 52 },
    { name: 'Haridwar', name_local: 'हरिद्वार', state_id: stateMap['Uttarakhand'], lgd_code: 53 },
    { name: 'Nainital', name_local: 'नैनीताल', state_id: stateMap['Uttarakhand'], lgd_code: 54 },
    { name: 'Udham Singh Nagar', name_local: 'ऊधम सिंह नगर', state_id: stateMap['Uttarakhand'], lgd_code: 58 },

    // West Bengal
    { name: 'Kolkata', name_local: 'কলকাতা', state_id: stateMap['West Bengal'], lgd_code: 326 },
    { name: 'Howrah', name_local: 'হাওড়া', state_id: stateMap['West Bengal'], lgd_code: 323 },
    { name: 'North 24 Parganas', name_local: 'উত্তর ২৪ পরগনা', state_id: stateMap['West Bengal'], lgd_code: 331 },
    { name: 'Darjeeling', name_local: 'দার্জিলিং', state_id: stateMap['West Bengal'], lgd_code: 317 },
  ];

  // Chunk helper function
  async function batchBulkCreate(Model, dataArray, chunkSize = 20) {
    const results = [];
    for (let i = 0; i < dataArray.length; i += chunkSize) {
      const chunk = dataArray.slice(i, i + chunkSize);
      const created = await Model.bulkCreate(chunk);
      results.push(...created);
    }
    return results;
  }

  const districts = await batchBulkCreate(District, districtsData);
  const distMap = {};
  districts.forEach(d => { distMap[d.name] = d.id; });

  // 3. TEHSILS AND BLOCKS FOR ALL DISTRICTS
  const tehsilsList = [];
  const blocksList = [];

  districts.forEach(d => {
    // Generate 2 administrative tehsils and blocks per district automatically
    tehsilsList.push(
      { name: `${d.name} Sadar`, district_id: d.id },
      { name: `${d.name} North/Urban`, district_id: d.id }
    );
    blocksList.push(
      { name: `${d.name} Central Block`, district_id: d.id },
      { name: `${d.name} Rural Block`, district_id: d.id }
    );
  });

  const tehsils = await batchBulkCreate(Tehsil, tehsilsList);
  const blocks = await batchBulkCreate(Block, blocksList);

  // 4. VILLAGES FOR ALL DISTRICTS & TEHSILS/BLOCKS
  const villagesData = [];
  districts.forEach((d, idx) => {
    const tehsil1 = tehsils[idx * 2];
    const tehsil2 = tehsils[idx * 2 + 1];
    const block1 = blocks[idx * 2];
    const block2 = blocks[idx * 2 + 1];

    if (tehsil1 && tehsil2 && block1 && block2) {
      villagesData.push(
        {
          name: `${d.name} Town Village`,
          state_id: d.state_id,
          district_id: d.id,
          tehsil_id: tehsil1.id,
          block_id: block1.id,
          latitude: 20.5937,
          longitude: 78.9629,
          population: 15000,
        },
        {
          name: `${d.name} Rural Area`,
          state_id: d.state_id,
          district_id: d.id,
          tehsil_id: tehsil2.id,
          block_id: block2.id,
          latitude: 20.5937,
          longitude: 78.9629,
          population: 8500,
        }
      );
    }
  });

  await batchBulkCreate(Village, villagesData);

  console.log(`  ✓ ${states.length} States & UTs created`);
  console.log(`  ✓ ${districts.length} Districts created`);
  console.log(`  ✓ ${tehsils.length} Tehsils created`);
  console.log(`  ✓ ${blocks.length} Blocks created`);
  console.log(`  ✓ ${villagesData.length} Villages created`);
}
