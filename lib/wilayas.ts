export type DeliveryType = "home" | "desk";

export interface Wilaya {
  code: number;
  name: string; // French (used for carriers)
  ar: string; // Arabic (shown to customers)
  desk: number; 
  home: number; 
}

export const wilayas: Wilaya[] = [
  { code: 20, name: "Saïda", ar: "سعيدة", desk: 0, home: 0 },
  { code: 16, name: "Alger", ar: "الجزائر", desk: 450, home: 850 },
  { code: 2, name: "Chlef", ar: "الشلف", desk: 450, home: 850 },
  { code: 9, name: "Blida", ar: "البليدة", desk: 450, home: 850 },
  { code: 10, name: "Bouira", ar: "البويرة", desk: 450, home: 850 },
  { code: 15, name: "Tizi Ouzou", ar: "تيزي وزو", desk: 450, home: 850 },
  { code: 19, name: "Sétif", ar: "سطيف", desk: 450, home: 850 },
  { code: 25, name: "Constantine", ar: "قسنطينة", desk: 450, home: 850 },
  { code: 26, name: "Médéa", ar: "المدية", desk: 450, home: 850 },
  { code: 31, name: "Oran", ar: "وهران", desk: 450, home: 850 },
  { code: 34, name: "Bordj Bou Arréridj", ar: "برج بوعريريج", desk: 450, home: 850 },
  { code: 35, name: "Boumerdès", ar: "بومرداس", desk: 450, home: 850 },
  { code: 42, name: "Tipaza", ar: "تيبازة", desk: 450, home: 850 },
  { code: 44, name: "Aïn Defla", ar: "عين الدفلى", desk: 450, home: 850 },
  { code: 4, name: "Oum El Bouaghi", ar: "أم البواقي", desk: 500, home: 850 },
  { code: 5, name: "Batna", ar: "باتنة", desk: 500, home: 850 },
  { code: 6, name: "Béjaïa", ar: "بجاية", desk: 500, home: 850 },
  { code: 13, name: "Tlemcen", ar: "تلمسان", desk: 500, home: 850 },
  { code: 14, name: "Tiaret", ar: "تيارت", desk: 500, home: 850 },
  { code: 18, name: "Jijel", ar: "جيجل", desk: 500, home: 850 },
  { code: 21, name: "Skikda", ar: "سكيكدة", desk: 500, home: 850 },
  { code: 22, name: "Sidi Bel Abbès", ar: "سيدي بلعباس", desk: 500, home: 850 },
  { code: 23, name: "Annaba", ar: "عنابة", desk: 500, home: 850 },
  { code: 27, name: "Mostaganem", ar: "مستغانم", desk: 500, home: 850 },
  { code: 28, name: "M'Sila", ar: "المسيلة", desk: 500, home: 850 },
  { code: 38, name: "Tissemsilt", ar: "تيسمسيلت", desk: 500, home: 850 },
  { code: 43, name: "Mila", ar: "ميلة", desk: 500, home: 850 },
  { code: 48, name: "Relizane", ar: "غليزان", desk: 500, home: 850 },
  { code: 32, name: "El Bayadh", ar: "البيض", desk: 450, home: 900 },
  { code: 17, name: "Djelfa", ar: "الجلفة", desk: 600, home: 900 },
  { code: 24, name: "Guelma", ar: "قالمة", desk: 600, home: 900 },
  { code: 29, name: "Mascara", ar: "معسكر", desk: 600, home: 900 },
  { code: 40, name: "Khenchela", ar: "خنشلة", desk: 600, home: 900 },
  { code: 41, name: "Souk Ahras", ar: "سوق أهراس", desk: 600, home: 900 },
  { code: 46, name: "Aïn Témouchent", ar: "عين تموشنت", desk: 600, home: 950 },
  { code: 7, name: "Biskra", ar: "بسكرة", desk: 600, home: 950 },
  { code: 12, name: "Tébessa", ar: "تبسة", desk: 600, home: 950 },
  { code: 36, name: "El Tarf", ar: "الطارف", desk: 700, home: 1000 },
  { code: 34, name: "Laghouat", ar: "الأغواط", desk: 700, home: 1000 }, // (Note: Code 3 mapped from list)
  { code: 3, name: "Laghouat", ar: "الأغواط", desk: 700, home: 1000 },
  { code: 51, name: "Ouled Djellal", ar: "أولاد جلال", desk: 800, home: 1100 },
  { code: 30, name: "Ouargla", ar: "ورقلة", desk: 800, home: 1100 },
  { code: 39, name: "El Oued", ar: "الوادي", desk: 800, home: 1100 },
  { code: 45, name: "Naâma", ar: "النعامة", desk: 800, home: 1100 },
  { code: 47, name: "Ghardaïa", ar: "غرداية", desk: 800, home: 1100 },
  { code: 55, name: "Touggourt", ar: "تقرت", desk: 800, home: 1100 },
  { code: 56, name: "El M'Ghair", ar: "المغير", desk: 1000, home: 1300 },
  { code: 57, name: "El Meniaa", ar: "المنيعة", desk: 1100, home: 1400 },
  { code: 58, name: "Adrar", ar: "أدرار", desk: 1100, home: 1400 },
  { code: 8, name: "Béchar", ar: "بشار", desk: 1100, home: 1400 },
  { code: 49, name: "Timimoun", ar: "تيميمون", desk: 1100, home: 1400 },
  { code: 54, name: "Béni Abbès", ar: "بني عباس", desk: 1100, home: 1400 },
  { code: 52, name: "In Salah", ar: "عين صالح", desk: 1400, home: 1800 },
  { code: 53, name: "Tamanrasset", ar: "تمنراست", desk: 1400, home: 1800 },
  { code: 11, name: "Tindouf", ar: "تندوف", desk: 1700, home: 2000 },
  { code: 33, name: "Illizi", ar: "إليزي", desk: 1700, home: 2000 },
  { code: 50, name: "Bordj Badji Mokhtar", ar: "برج باجي مختار", desk: 1700, home: 2000 },
  { code: 57, name: "Djanet", ar: "جانت", desk: 1700, home: 2000 },
];


export const getWilaya = (code: number) => wilayas.find((w) => w.code === code);

// ---- Delivery pricing -------------------------------------------------------
// PLACEHOLDER VALUES: replace with your delivery company's real tariff.
const NORTH = [2, 4, 5, 6, 9, 10, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 34, 35, 36, 38, 40, 41, 42, 43, 44, 46, 48];
const FAR_SOUTH = [1, 8, 11, 33, 37, 50, 52, 53, 54, 56, 57, 58];

const FEES = {
  north: { home: 600, desk: 350 },
  south: { home: 800, desk: 500 },
  farSouth: { home: 1400, desk: 900 },
} as const;

export function deliveryFee(wilayaCode: number | string, type: "home" | "desk"): number {
  const code = Number(wilayaCode);
  const found = wilayas.find((w) => w.code === code);
  if (!found) return 0;
  return type === "home" ? found.home : found.desk;
}