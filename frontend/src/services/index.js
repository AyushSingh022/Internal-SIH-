import api from './api';

export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const INDIAN_STATES_FALLBACK = [
  { id: 1, name: 'Andaman and Nicobar Islands', name_local: 'अंडमान और निकोबार द्वीप समूह' },
  { id: 2, name: 'Andhra Pradesh', name_local: 'ఆంధ్ర ప్రదేశ్' },
  { id: 3, name: 'Arunachal Pradesh', name_local: 'अरुणाचल प्रदेश' },
  { id: 4, name: 'Assam', name_local: 'অসম' },
  { id: 5, name: 'Bihar', name_local: 'बिहार' },
  { id: 6, name: 'Chandigarh', name_local: 'चंडीगढ़' },
  { id: 7, name: 'Chhattisgarh', name_local: 'छत्तीसगढ़' },
  { id: 8, name: 'Dadra and Nagar Haveli and Daman and Diu', name_local: 'दादरा और नगर हवेली और दमन और दीव' },
  { id: 9, name: 'Delhi', name_local: 'दिल्ली' },
  { id: 10, name: 'Goa', name_local: 'गोवा' },
  { id: 11, name: 'Gujarat', name_local: 'ગુજરાત' },
  { id: 12, name: 'Haryana', name_local: 'हरियाणा' },
  { id: 13, name: 'Himachal Pradesh', name_local: 'हिमाचल प्रदेश' },
  { id: 14, name: 'Jammu and Kashmir', name_local: 'जम्मू और कश्मीर' },
  { id: 15, name: 'Jharkhand', name_local: 'झारखण्ड' },
  { id: 16, name: 'Karnataka', name_local: 'ಕರ್ನಾಟಕ' },
  { id: 17, name: 'Kerala', name_local: 'കേരളം' },
  { id: 18, name: 'Ladakh', name_local: 'लद्दाख' },
  { id: 19, name: 'Lakshadweep', name_local: 'लक्षद्वीप' },
  { id: 20, name: 'Madhya Pradesh', name_local: 'मध्य प्रदेश' },
  { id: 21, name: 'Maharashtra', name_local: 'महाराष्ट्र' },
  { id: 22, name: 'Manipur', name_local: 'मणिपुर' },
  { id: 23, name: 'Meghalaya', name_local: 'मेघालय' },
  { id: 24, name: 'Mizoram', name_local: 'मिज़ोरम' },
  { id: 25, name: 'Nagaland', name_local: 'नागालैंड' },
  { id: 26, name: 'Odisha', name_local: 'ଓଡ଼ିଶା' },
  { id: 27, name: 'Puducherry', name_local: 'पुदुचेरी' },
  { id: 28, name: 'Punjab', name_local: 'ਪੰਜਾਬ' },
  { id: 29, name: 'Rajasthan', name_local: 'राजस्थान' },
  { id: 30, name: 'Sikkim', name_local: 'सिक्किम' },
  { id: 31, name: 'Tamil Nadu', name_local: 'தமிழ்நாடு' },
  { id: 32, name: 'Telangana', name_local: 'తెలంగాణ' },
  { id: 33, name: 'Tripura', name_local: 'त्रिपुरा' },
  { id: 34, name: 'Uttar Pradesh', name_local: 'उत्तर प्रदेश' },
  { id: 35, name: 'Uttarakhand', name_local: 'उत्तराखंड' },
  { id: 36, name: 'West Bengal', name_local: 'पश्चिमबंग' },
];

export const INDIAN_DISTRICTS_FALLBACK = {
  'Andaman and Nicobar Islands': [
    { id: 101, name: 'South Andaman' }, { id: 102, name: 'North and Middle Andaman' }, { id: 103, name: 'Nicobar' }
  ],
  'Andhra Pradesh': [
    { id: 104, name: 'Visakhapatnam' }, { id: 105, name: 'NTR (Vijayawada)' }, { id: 106, name: 'Guntur' },
    { id: 107, name: 'Tirupati' }, { id: 108, name: 'Kurnool' }, { id: 1081, name: 'Anantapur' },
    { id: 1082, name: 'Chittoor' }, { id: 1083, name: 'East Godavari (Rajahmundry)' }, { id: 1084, name: 'Eluru' },
    { id: 1085, name: 'Kakinada' }, { id: 1086, name: 'Krishna (Machilipatnam)' }, { id: 1087, name: 'Nandyal' },
    { id: 1088, name: 'Nellore (SPSR Nellore)' }, { id: 1089, name: 'Prakasam (Ongole)' }, { id: 1090, name: 'Srikakulam' },
    { id: 1091, name: 'Vizianagaram' }, { id: 1092, name: 'West Godavari' }, { id: 1093, name: 'YSR Kadapa' }
  ],
  'Arunachal Pradesh': [
    { id: 109, name: 'Papum Pare (Itanagar)' }, { id: 110, name: 'Tawang' }, { id: 111, name: 'Changlang' },
    { id: 1111, name: 'West Kameng' }, { id: 1112, name: 'East Kameng' }, { id: 1113, name: 'Lower Subansiri' },
    { id: 1114, name: 'Upper Subansiri' }, { id: 1115, name: 'West Siang' }, { id: 1116, name: 'East Siang' },
    { id: 1117, name: 'Lohit' }, { id: 1118, name: 'Tirap' }
  ],
  'Assam': [
    { id: 112, name: 'Kamrup Metropolitan (Guwahati)' }, { id: 113, name: 'Dibrugarh' }, { id: 114, name: 'Cachar (Silchar)' },
    { id: 115, name: 'Jorhat' }, { id: 1151, name: 'Nagaon' }, { id: 1152, name: 'Tinsukia' }, { id: 1153, name: 'Sonitpur (Tezpur)' },
    { id: 1154, name: 'Barpeta' }, { id: 1155, name: 'Kamrup' }, { id: 1156, name: 'Darrang' }, { id: 1157, name: 'Dhubri' },
    { id: 1158, name: 'Golaghat' }, { id: 1159, name: 'Karimganj' }, { id: 1160, name: 'Lakhimpur' }, { id: 1161, name: 'Sivasagar' }
  ],
  'Bihar': [
    { id: 116, name: 'Patna' }, { id: 117, name: 'Gaya' }, { id: 118, name: 'Muzaffarpur' }, { id: 119, name: 'Bhagalpur' },
    { id: 120, name: 'Darbhanga' }, { id: 1201, name: 'Araria' }, { id: 1202, name: 'Arwal' }, { id: 1203, name: 'Aurangabad' },
    { id: 1204, name: 'Banka' }, { id: 1205, name: 'Begusarai' }, { id: 1206, name: 'Bhojpur (Arrah)' }, { id: 1207, name: 'Buxar' },
    { id: 1208, name: 'East Champaran (Motihari)' }, { id: 1209, name: 'Gopalganj' }, { id: 1210, name: 'Jamui' },
    { id: 1211, name: 'Jehanabad' }, { id: 1212, name: 'Kaimur' }, { id: 1213, name: 'Katihar' }, { id: 1214, name: 'Khagaria' },
    { id: 1215, name: 'Kishanganj' }, { id: 1216, name: 'Lakhisarai' }, { id: 1217, name: 'Madhepura' }, { id: 1218, name: 'Madhubani' },
    { id: 1219, name: 'Munger' }, { id: 1220, name: 'Nalanda' }, { id: 1221, name: 'Nawada' }, { id: 1222, name: 'Purnia' },
    { id: 1223, name: 'Rohtas (Sasaram)' }, { id: 1224, name: 'Saharsa' }, { id: 1225, name: 'Samastipur' }, { id: 1226, name: 'Saran (Chhapra)' },
    { id: 1227, name: 'Sheikhpura' }, { id: 1228, name: 'Sheohar' }, { id: 1229, name: 'Sitamarhi' }, { id: 1230, name: 'Siwan' },
    { id: 1231, name: 'Supaul' }, { id: 1232, name: 'Vaishali (Hajipur)' }, { id: 1233, name: 'West Champaran (Bettiah)' }
  ],
  'Chandigarh': [{ id: 121, name: 'Chandigarh' }],
  'Chhattisgarh': [
    { id: 122, name: 'Raipur' }, { id: 123, name: 'Durg (Bhilai)' }, { id: 124, name: 'Bilaspur' }, { id: 125, name: 'Bastar (Jagdalpur)' },
    { id: 1251, name: 'Rajnandgaon' }, { id: 1252, name: 'Korba' }, { id: 1253, name: 'Raigarh' }, { id: 1254, name: 'Surguja (Ambikapur)' },
    { id: 1255, name: 'Dhamtari' }, { id: 1256, name: 'Mahasamund' }, { id: 1257, name: 'Janjgir-Champa' }, { id: 1258, name: 'Kanker' }
  ],
  'Dadra and Nagar Haveli and Daman and Diu': [
    { id: 126, name: 'Daman' }, { id: 127, name: 'Diu' }, { id: 128, name: 'Dadra and Nagar Haveli' }
  ],
  'Delhi': [
    { id: 129, name: 'New Delhi' }, { id: 130, name: 'North Delhi' }, { id: 131, name: 'South Delhi' }, { id: 132, name: 'East Delhi' },
    { id: 133, name: 'West Delhi' }, { id: 1331, name: 'Central Delhi' }, { id: 1332, name: 'North East Delhi' },
    { id: 1333, name: 'North West Delhi' }, { id: 1334, name: 'South East Delhi' }, { id: 1335, name: 'South West Delhi' },
    { id: 1336, name: 'Shahdara' }
  ],
  'Goa': [{ id: 134, name: 'North Goa (Panaji)' }, { id: 135, name: 'South Goa (Margao)' }],
  'Gujarat': [
    { id: 136, name: 'Ahmedabad' }, { id: 137, name: 'Surat' }, { id: 138, name: 'Vadodara' }, { id: 139, name: 'Rajkot' },
    { id: 140, name: 'Bhavnagar' }, { id: 1401, name: 'Amreli' }, { id: 1402, name: 'Anand' }, { id: 1403, name: 'Banaskantha (Palanpur)' },
    { id: 1404, name: 'Bharuch' }, { id: 1405, name: 'Dahod' }, { id: 1406, name: 'Gandhinagar' }, { id: 1407, name: 'Jamnagar' },
    { id: 1408, name: 'Junagadh' }, { id: 1409, name: 'Kheda (Nadiad)' }, { id: 1410, name: 'Kutch (Bhuj)' }, { id: 1411, name: 'Mehsana' },
    { id: 1412, name: 'Morbi' }, { id: 1413, name: 'Navsari' }, { id: 1414, name: 'Patan' }, { id: 1415, name: 'Porbandar' },
    { id: 1416, name: 'Sabarkantha (Himmatnagar)' }, { id: 1417, name: 'Surendranagar' }, { id: 1418, name: 'Valsad' }
  ],
  'Haryana': [
    { id: 141, name: 'Gurugram' }, { id: 142, name: 'Faridabad' }, { id: 143, name: 'Ambala' }, { id: 144, name: 'Hisar' },
    { id: 145, name: 'Panchkula' }, { id: 1451, name: 'Bhiwani' }, { id: 1452, name: 'Fatehabad' }, { id: 1453, name: 'Jhajjar' },
    { id: 1454, name: 'Jind' }, { id: 1455, name: 'Kaithal' }, { id: 1456, name: 'Karnal' }, { id: 1457, name: 'Kurukshetra' },
    { id: 1458, name: 'Mahendragarh (Narnaul)' }, { id: 1459, name: 'Palwal' }, { id: 1460, name: 'Panipat' }, { id: 1461, name: 'Rewari' },
    { id: 1462, name: 'Rohtak' }, { id: 1463, name: 'Sirsa' }, { id: 1464, name: 'Sonipat' }, { id: 1465, name: 'Yamunanagar' }
  ],
  'Himachal Pradesh': [
    { id: 146, name: 'Shimla' }, { id: 147, name: 'Kangra (Dharamshala)' }, { id: 148, name: 'Mandi' }, { id: 149, name: 'Kullu' },
    { id: 1491, name: 'Bilaspur' }, { id: 1492, name: 'Chamba' }, { id: 1493, name: 'Hamirpur' }, { id: 1494, name: 'Solan' },
    { id: 1495, name: 'Una' }, { id: 1496, name: 'Sirmaur (Nahan)' }
  ],
  'Jammu and Kashmir': [
    { id: 150, name: 'Srinagar' }, { id: 151, name: 'Jammu' }, { id: 152, name: 'Anantnag' }, { id: 153, name: 'Baramulla' },
    { id: 1531, name: 'Budgam' }, { id: 1532, name: 'Doda' }, { id: 1533, name: 'Kathua' }, { id: 1534, name: 'Kupwara' },
    { id: 1535, name: 'Poonch' }, { id: 1536, name: 'Pulwama' }, { id: 1537, name: 'Rajouri' }, { id: 1538, name: 'Udhampur' }
  ],
  'Jharkhand': [
    { id: 154, name: 'Ranchi' }, { id: 155, name: 'Jamshedpur (East Singhbhum)' }, { id: 156, name: 'Dhanbad' }, { id: 157, name: 'Bokaro' },
    { id: 1571, name: 'Deoghar' }, { id: 1572, name: 'Dumka' }, { id: 1573, name: 'Garhwa' }, { id: 1574, name: 'Giridih' },
    { id: 1575, name: 'Hazaribagh' }, { id: 1576, name: 'Palamu (Daltonganj)' }, { id: 1577, name: 'Ramgarh' }, { id: 1578, name: 'West Singhbhum (Chaibasa)' }
  ],
  'Karnataka': [
    { id: 158, name: 'Bengaluru Urban' }, { id: 159, name: 'Mysuru' }, { id: 160, name: 'Hubballi-Dharwad' }, { id: 161, name: 'Mangaluru (Dakshina Kannada)' },
    { id: 1611, name: 'Bagalkot' }, { id: 1612, name: 'Ballari' }, { id: 1613, name: 'Belagavi' }, { id: 1614, name: 'Bengaluru Rural' },
    { id: 1615, name: 'Bidar' }, { id: 1616, name: 'Chikkamagaluru' }, { id: 1617, name: 'Davanagere' }, { id: 1618, name: 'Hassan' },
    { id: 1619, name: 'Kalaburagi (Gulbarga)' }, { id: 1620, name: 'Kolar' }, { id: 1621, name: 'Mandya' }, { id: 1622, name: 'Raichur' },
    { id: 1623, name: 'Shivamogga' }, { id: 1624, name: 'Tumakuru' }, { id: 1625, name: 'Udupi' }, { id: 1626, name: 'Vijayapura' }
  ],
  'Kerala': [
    { id: 162, name: 'Thiruvananthapuram' }, { id: 163, name: 'Ernakulam (Kochi)' }, { id: 164, name: 'Kozhikode' }, { id: 165, name: 'Thrissur' },
    { id: 1651, name: 'Alappuzha' }, { id: 1652, name: 'Idukki' }, { id: 1653, name: 'Kannur' }, { id: 1654, name: 'Kasaragod' },
    { id: 1655, name: 'Kollam' }, { id: 1656, name: 'Kottayam' }, { id: 1657, name: 'Malappuram' }, { id: 1658, name: 'Palakkad' },
    { id: 1659, name: 'Pathanamthitta' }, { id: 1660, name: 'Wayanad' }
  ],
  'Ladakh': [{ id: 166, name: 'Leh' }, { id: 167, name: 'Kargil' }],
  'Lakshadweep': [{ id: 168, name: 'Lakshadweep (Kavaratti)' }],
  'Madhya Pradesh': [
    { id: 169, name: 'Bhopal' }, { id: 170, name: 'Indore' }, { id: 171, name: 'Jabalpur' }, { id: 172, name: 'Gwalior' },
    { id: 173, name: 'Ujjain' }, { id: 1731, name: 'Balaghat' }, { id: 1732, name: 'Betul' }, { id: 1733, name: 'Chhatarpur' },
    { id: 1734, name: 'Chhindwara' }, { id: 1735, name: 'Damoh' }, { id: 1736, name: 'Datia' }, { id: 1737, name: 'Dewas' },
    { id: 1738, name: 'Dhar' }, { id: 1739, name: 'Hoshangabad (Narmadapuram)' }, { id: 1740, name: 'Katni' }, { id: 1741, name: 'Khandwa' },
    { id: 1742, name: 'Khargone' }, { id: 1743, name: 'Mandsaur' }, { id: 1744, name: 'Morena' }, { id: 1745, name: 'Neemuch' },
    { id: 1746, name: 'Ratlam' }, { id: 1747, name: 'Rewa' }, { id: 1748, name: 'Sagar' }, { id: 1749, name: 'Satna' },
    { id: 1750, name: 'Sehore' }, { id: 1751, name: 'Shivpuri' }, { id: 1752, name: 'Singrauli' }, { id: 1753, name: 'Vidisha' }
  ],
  'Maharashtra': [
    { id: 174, name: 'Mumbai Suburban' }, { id: 175, name: 'Pune' }, { id: 176, name: 'Nagpur' }, { id: 177, name: 'Nashik' },
    { id: 178, name: 'Thane' }, { id: 1781, name: 'Ahmednagar' }, { id: 1782, name: 'Akola' }, { id: 1783, name: 'Amravati' },
    { id: 1784, name: 'Aurangabad (Chhatrapati Sambhajinagar)' }, { id: 1785, name: 'Beed' }, { id: 1786, name: 'Bhandara' },
    { id: 1787, name: 'Buldhana' }, { id: 1788, name: 'Chandrapur' }, { id: 1789, name: 'Dhule' }, { id: 1790, name: 'Gadchiroli' },
    { id: 1791, name: 'Jalgaon' }, { id: 1792, name: 'Jalna' }, { id: 1793, name: 'Kolhapur' }, { id: 1794, name: 'Latur' },
    { id: 1795, name: 'Mumbai City' }, { id: 1796, name: 'Nanded' }, { id: 1797, name: 'Nandurbar' }, { id: 1798, name: 'Osmanabad (Dharashiv)' },
    { id: 1799, name: 'Palghar' }, { id: 1800, name: 'Parbhani' }, { id: 1801, name: 'Raigad' }, { id: 1802, name: 'Ratnagiri' },
    { id: 1803, name: 'Sangli' }, { id: 1804, name: 'Satara' }, { id: 1805, name: 'Sindhudurg' }, { id: 1806, name: 'Solapur' },
    { id: 1807, name: 'Wardha' }, { id: 1808, name: 'Washim' }, { id: 1809, name: 'Yavatmal' }
  ],
  'Manipur': [{ id: 179, name: 'Imphal East' }, { id: 180, name: 'Imphal West' }, { id: 181, name: 'Churachandpur' }, { id: 1811, name: 'Thoubal' }, { id: 1812, name: 'Bishnupur' }],
  'Meghalaya': [{ id: 182, name: 'East Khasi Hills (Shillong)' }, { id: 183, name: 'West Garo Hills (Tura)' }, { id: 1831, name: 'West Khasi Hills' }, { id: 1832, name: 'Ri-Bhoi' }],
  'Mizoram': [{ id: 184, name: 'Aizawl' }, { id: 185, name: 'Lunglei' }, { id: 1851, name: 'Champhai' }, { id: 1852, name: 'Serchhip' }],
  'Nagaland': [{ id: 186, name: 'Kohima' }, { id: 187, name: 'Dimapur' }, { id: 1871, name: 'Mokokchung' }, { id: 1872, name: 'Tuensang' }],
  'Odisha': [
    { id: 188, name: 'Bhubaneswar (Khordha)' }, { id: 189, name: 'Cuttack' }, { id: 190, name: 'Puri' }, { id: 191, name: 'Sambalpur' },
    { id: 1911, name: 'Angul' }, { id: 1912, name: 'Balasore' }, { id: 1913, name: 'Bargarh' }, { id: 1914, name: 'Bhadrak' },
    { id: 1915, name: 'Bolangir' }, { id: 1916, name: 'Dhenkanal' }, { id: 1917, name: 'Ganjam (Berhampur)' }, { id: 1918, name: 'Jagatsinghpur' },
    { id: 1919, name: 'Jajpur' }, { id: 1920, name: 'Jharsuguda' }, { id: 1921, name: 'Kalahandi' }, { id: 1922, name: 'Kendrapara' },
    { id: 1923, name: 'Keonjhar' }, { id: 1924, name: 'Koraput' }, { id: 1925, name: 'Mayurbhanj (Baripada)' }, { id: 1926, name: 'Nayagarh' },
    { id: 1927, name: 'Rayagada' }, { id: 1928, name: 'Sundargarh (Rourkela)' }
  ],
  'Puducherry': [{ id: 192, name: 'Puducherry' }, { id: 193, name: 'Karaikal' }, { id: 194, name: 'Mahe' }, { id: 1941, name: 'Yanam' }],
  'Punjab': [
    { id: 195, name: 'Amritsar' }, { id: 196, name: 'Ludhiana' }, { id: 197, name: 'Jalandhar' }, { id: 198, name: 'Patiala' },
    { id: 199, name: 'Mohali (SAS Nagar)' }, { id: 1991, name: 'Barnala' }, { id: 1992, name: 'Bathinda' }, { id: 1993, name: 'Faridkot' },
    { id: 1994, name: 'Fatehgarh Sahib' }, { id: 1995, name: 'Fazilka' }, { id: 1996, name: 'Firozpur' }, { id: 1997, name: 'Gurdaspur' },
    { id: 1998, name: 'Hoshiarpur' }, { id: 1999, name: 'Kapurthala' }, { id: 2000, name: 'Mansa' }, { id: 2001, name: 'Moga' },
    { id: 2002, name: 'Pathankot' }, { id: 2003, name: 'Ropar (Rupnagar)' }, { id: 2004, name: 'Sangrur' }, { id: 2005, name: 'Tarn Taran' }
  ],
  'Rajasthan': [
    { id: 200, name: 'Jaipur' }, { id: 201, name: 'Jodhpur' }, { id: 202, name: 'Udaipur' }, { id: 203, name: 'Kota' },
    { id: 204, name: 'Ajmer' }, { id: 2041, name: 'Alwar' }, { id: 2042, name: 'Banswara' }, { id: 2043, name: 'Barmer' },
    { id: 2044, name: 'Bharatpur' }, { id: 2045, name: 'Bhilwara' }, { id: 2046, name: 'Bikaner' }, { id: 2047, name: 'Bundi' },
    { id: 2048, name: 'Chittorgarh' }, { id: 2049, name: 'Churu' }, { id: 2050, name: 'Dausa' }, { id: 2051, name: 'Dholpur' },
    { id: 2052, name: 'Dungarpur' }, { id: 2053, name: 'Hanumangarh' }, { id: 2054, name: 'Jaisalmer' }, { id: 2055, name: 'Jalore' },
    { id: 2056, name: 'Jhalawar' }, { id: 2057, name: 'Jhunjhunu' }, { id: 2058, name: 'Nagaur' }, { id: 2059, name: 'Pali' },
    { id: 2060, name: 'Sawai Madhopur' }, { id: 2061, name: 'Sikar' }, { id: 2062, name: 'Sirohi' }, { id: 2063, name: 'Sri Ganganagar' },
    { id: 2064, name: 'Tonk' }
  ],
  'Sikkim': [{ id: 205, name: 'Gangtok (East Sikkim)' }, { id: 206, name: 'Namchi (South Sikkim)' }, { id: 2061, name: 'Mangan (North Sikkim)' }, { id: 2062, name: 'Gyalshing (West Sikkim)' }],
  'Tamil Nadu': [
    { id: 207, name: 'Chennai' }, { id: 208, name: 'Coimbatore' }, { id: 209, name: 'Madurai' }, { id: 210, name: 'Tiruchirappalli' },
    { id: 2101, name: 'Chengalpattu' }, { id: 2102, name: 'Cuddalore' }, { id: 2103, name: 'Dharmapuri' }, { id: 2104, name: 'Dindigul' },
    { id: 2105, name: 'Erode' }, { id: 2106, name: 'Kanchipuram' }, { id: 2107, name: 'Kanyakumari' }, { id: 2108, name: 'Karur' },
    { id: 2109, name: 'Krishnagiri' }, { id: 2110, name: 'Nagapattinam' }, { id: 2111, name: 'Namakkal' }, { id: 2112, name: 'Nilgiris (Ooty)' },
    { id: 2113, name: 'Pudukkottai' }, { id: 2114, name: 'Ramanathapuram' }, { id: 2115, name: 'Salem' }, { id: 2116, name: 'Sivaganga' },
    { id: 2117, name: 'Thanjavur' }, { id: 2118, name: 'Theni' }, { id: 2119, name: 'Thoothukudi' }, { id: 2120, name: 'Tirunelveli' },
    { id: 2121, name: 'Tiruppur' }, { id: 2122, name: 'Tiruvallur' }, { id: 2123, name: 'Tiruvannamalai' }, { id: 2124, name: 'Vellore' },
    { id: 2125, name: 'Villupuram' }, { id: 2126, name: 'Virudhunagar' }
  ],
  'Telangana': [
    { id: 211, name: 'Hyderabad' }, { id: 212, name: 'Warangal' }, { id: 213, name: 'Karimnagar' }, { id: 214, name: 'Nizamabad' },
    { id: 2141, name: 'Adilabad' }, { id: 2142, name: 'Bhadradri Kothagudem' }, { id: 2143, name: 'Jagtial' }, { id: 2144, name: 'Kamareddy' },
    { id: 2145, name: 'Khammam' }, { id: 2146, name: 'Mahbubnagar' }, { id: 2147, name: 'Mancherial' }, { id: 2148, name: 'Medak' },
    { id: 2149, name: 'Nalgonda' }, { id: 2150, name: 'Nirmal' }, { id: 2151, name: 'Peddapalli' }, { id: 2152, name: 'Rangareddy' },
    { id: 2153, name: 'Sangareddy' }, { id: 2154, name: 'Siddipet' }, { id: 2155, name: 'Suryapet' }
  ],
  'Tripura': [{ id: 215, name: 'West Tripura (Agartala)' }, { id: 216, name: 'Gomati' }, { id: 2161, name: 'Dhalai' }, { id: 2162, name: 'Unakoti' }],
  'Uttar Pradesh': [
    { id: 217, name: 'Lucknow' }, { id: 218, name: 'Varanasi' }, { id: 219, name: 'Gorakhpur' }, { id: 220, name: 'Prayagraj' },
    { id: 221, name: 'Kanpur Nagar' }, { id: 222, name: 'Agra' }, { id: 22201, name: 'Aligarh' }, { id: 22202, name: 'Ambedkar Nagar' },
    { id: 22203, name: 'Amethi' }, { id: 22204, name: 'Amroha' }, { id: 22205, name: 'Auraiya' }, { id: 22206, name: 'Ayodhya (Faizabad)' },
    { id: 22207, name: 'Azamgarh' }, { id: 22208, name: 'Baghpat' }, { id: 22209, name: 'Bahraich' }, { id: 22210, name: 'Ballia' },
    { id: 22211, name: 'Balrampur' }, { id: 22212, name: 'Banda' }, { id: 22213, name: 'Barabanki' }, { id: 22214, name: 'Bareilly' },
    { id: 22215, name: 'Basti' }, { id: 22216, name: 'Bhadohi' }, { id: 22217, name: 'Bijnor' }, { id: 22218, name: 'Budaun' },
    { id: 22219, name: 'Bulandshahr' }, { id: 22220, name: 'Chandauli' }, { id: 22221, name: 'Chitrakoot' }, { id: 22222, name: 'Deoria' },
    { id: 22223, name: 'Etah' }, { id: 22224, name: 'Etawah' }, { id: 22225, name: 'Farrukhabad' }, { id: 22226, name: 'Fatehpur' },
    { id: 22227, name: 'Firozabad' }, { id: 22228, name: 'Gautam Buddha Nagar (Noida)' }, { id: 22229, name: 'Ghaziabad' },
    { id: 22230, name: 'Ghazipur' }, { id: 22231, name: 'Gonda' }, { id: 22232, name: 'Hamirpur' }, { id: 22233, name: 'Hapur' },
    { id: 22234, name: 'Hardoi' }, { id: 22235, name: 'Hathras' }, { id: 22236, name: 'Jalaun' }, { id: 22237, name: 'Jaunpur' },
    { id: 22238, name: 'Jhansi' }, { id: 22239, name: 'Kannauj' }, { id: 22240, name: 'Kanpur Dehat' }, { id: 22241, name: 'Kasganj' },
    { id: 22242, name: 'Kaushambi' }, { id: 22243, name: 'Kushinagar' }, { id: 22244, name: 'Lakhimpur Kheri' }, { id: 22245, name: 'Lalitpur' },
    { id: 22246, name: 'Maharajganj' }, { id: 22247, name: 'Mahoba' }, { id: 22248, name: 'Mainpuri' }, { id: 22249, name: 'Mathura' },
    { id: 22250, name: 'Mau' }, { id: 22251, name: 'Meerut' }, { id: 22252, name: 'Mirzapur' }, { id: 22253, name: 'Moradabad' },
    { id: 22254, name: 'Muzaffarnagar' }, { id: 22255, name: 'Pilibhit' }, { id: 22256, name: 'Pratapgarh' }, { id: 22257, name: 'Raebareli' },
    { id: 22258, name: 'Rampur' }, { id: 22259, name: 'Saharanpur' }, { id: 22260, name: 'Sambhal' }, { id: 22261, name: 'Sant Kabir Nagar' },
    { id: 22262, name: 'Shahjahanpur' }, { id: 22263, name: 'Shamli' }, { id: 22264, name: 'Shravasti' }, { id: 22265, name: 'Siddharthnagar' },
    { id: 22266, name: 'Sitapur' }, { id: 22267, name: 'Sonbhadra' }, { id: 22268, name: 'Sultanpur' }, { id: 22269, name: 'Unnao' }
  ],
  'Uttarakhand': [
    { id: 223, name: 'Dehradun' }, { id: 224, name: 'Haridwar' }, { id: 225, name: 'Nainital' }, { id: 226, name: 'Udham Singh Nagar' },
    { id: 2261, name: 'Almora' }, { id: 2262, name: 'Bageshwar' }, { id: 2263, name: 'Chamoli' }, { id: 2264, name: 'Champawat' },
    { id: 2265, name: 'Pauri Garhwal' }, { id: 2266, name: 'Pithoragarh' }, { id: 2267, name: 'Rudraprayag' }, { id: 2268, name: 'Tehri Garhwal' },
    { id: 2269, name: 'Uttarkashi' }
  ],
  'West Bengal': [
    { id: 227, name: 'Kolkata' }, { id: 228, name: 'Howrah' }, { id: 229, name: 'North 24 Parganas' }, { id: 230, name: 'Darjeeling' },
    { id: 2301, name: 'Bankura' }, { id: 2302, name: 'Birbhum' }, { id: 2303, name: 'Cooch Behar' }, { id: 2304, name: 'Dakshin Dinajpur' },
    { id: 2305, name: 'Hooghly' }, { id: 2306, name: 'Jalpaiguri' }, { id: 2307, name: 'Jhargram' }, { id: 2308, name: 'Kalimpong' },
    { id: 2309, name: 'Malda' }, { id: 2310, name: 'Murshidabad' }, { id: 2311, name: 'Nadia' }, { id: 2312, name: 'Paschim Bardhaman' },
    { id: 2313, name: 'Paschim Medinipur' }, { id: 2314, name: 'Purba Bardhaman' }, { id: 2315, name: 'Purba Medinipur' },
    { id: 2316, name: 'Purulia' }, { id: 2317, name: 'South 24 Parganas' }, { id: 2318, name: 'Uttar Dinajpur' }
  ],
};

export const locationService = {
  getStates: () =>
    api.get('/locations/states').catch(() => ({ data: INDIAN_STATES_FALLBACK })),
  getDistricts: (stateVal) => {
    return api.get(`/locations/districts?stateId=${stateVal}`).then(res => {
      if (res.data && res.data.length > 0) return res;
      // Fallback by State Name or ID
      const stateObj = INDIAN_STATES_FALLBACK.find(s => String(s.id) === String(stateVal) || s.name === stateVal);
      const fallbackList = stateObj ? (INDIAN_DISTRICTS_FALLBACK[stateObj.name] || []) : (INDIAN_DISTRICTS_FALLBACK[stateVal] || []);
      return { data: fallbackList };
    }).catch(() => {
      const stateObj = INDIAN_STATES_FALLBACK.find(s => String(s.id) === String(stateVal) || s.name === stateVal);
      const fallbackList = stateObj ? (INDIAN_DISTRICTS_FALLBACK[stateObj.name] || []) : (INDIAN_DISTRICTS_FALLBACK[stateVal] || []);
      return { data: fallbackList };
    });
  },
  getTehsils: (districtId) => api.get(`/locations/tehsils?districtId=${districtId}`),
  getBlocks: (districtId) => api.get(`/locations/blocks?districtId=${districtId}`),
  getVillages: (params) => api.get('/locations/villages', { params }),
};

export const businessService = {
  getCategories: () => api.get('/businesses/categories'),
  getNearby: (params) => api.get('/businesses/nearby', { params }),
  getCompetitors: (params) => api.get('/businesses/competitors', { params }),
};

export const schemeService = {
  getAll: (params) => api.get('/schemes', { params }),
  getById: (id) => api.get(`/schemes/${id}`),
  getEligible: (params) => api.get('/schemes/eligible', { params }),
  compare: (ids) => api.get(`/schemes/compare?ids=${ids.join(',')}`),
};

export const financialService = {
  calculate: (data) => api.post('/financial/calculate', data),
  repayment: (data) => api.post('/financial/repayment', data),
};

export const analysisService = {
  generate: (data) => api.post('/analysis/generate', data),
  getReports: () => api.get('/reports'),
  getReport: (id) => api.get(`/reports/${id}`),
  downloadPDF: (id) => api.get(`/reports/${id}/pdf`, { responseType: 'blob' }),
};

export const i18nService = {
  getLanguages: () => api.get('/i18n/languages'),
  getTranslations: (locale) => api.get(`/i18n/${locale}`),
};
