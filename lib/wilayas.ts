export type DeliveryType = "home" | "desk";

export interface Wilaya {
  code: number;
  name: string; // French (used for carriers)
  ar: string; // Arabic (shown to customers)
}

export const wilayas: Wilaya[] = [
  [1, "Adrar", "أدرار"], [2, "Chlef", "الشلف"], [3, "Laghouat", "الأغواط"], [4, "Oum El Bouaghi", "أم البواقي"], [5, "Batna", "باتنة"],
  [6, "Béjaïa", "بجاية"], [7, "Biskra", "بسكرة"], [8, "Béchar", "بشار"], [9, "Blida", "البليدة"], [10, "Bouira", "البويرة"],
  [11, "Tamanrasset", "تمنراست"], [12, "Tébessa", "تبسة"], [13, "Tlemcen", "تلمسان"], [14, "Tiaret", "تيارت"], [15, "Tizi Ouzou", "تيزي وزو"],
  [16, "Alger", "الجزائر"], [17, "Djelfa", "الجلفة"], [18, "Jijel", "جيجل"], [19, "Sétif", "سطيف"], [20, "Saïda", "سعيدة"],
  [21, "Skikda", "سكيكدة"], [22, "Sidi Bel Abbès", "سيدي بلعباس"], [23, "Annaba", "عنابة"], [24, "Guelma", "قالمة"], [25, "Constantine", "قسنطينة"],
  [26, "Médéa", "المدية"], [27, "Mostaganem", "مستغانم"], [28, "M'Sila", "المسيلة"], [29, "Mascara", "معسكر"], [30, "Ouargla", "ورقلة"],
  [31, "Oran", "وهران"], [32, "El Bayadh", "البيض"], [33, "Illizi", "إليزي"], [34, "Bordj Bou Arréridj", "برج بوعريريج"], [35, "Boumerdès", "بومرداس"],
  [36, "El Tarf", "الطارف"], [37, "Tindouf", "تندوف"], [38, "Tissemsilt", "تيسمسيلت"], [39, "El Oued", "الوادي"], [40, "Khenchela", "خنشلة"],
  [41, "Souk Ahras", "سوق أهراس"], [42, "Tipaza", "تيبازة"], [43, "Mila", "ميلة"], [44, "Aïn Defla", "عين الدفلى"], [45, "Naâma", "النعامة"],
  [46, "Aïn Témouchent", "عين تموشنت"], [47, "Ghardaïa", "غرداية"], [48, "Relizane", "غليزان"], [49, "El M'Ghair", "المغير"], [50, "El Meniaa", "المنيعة"],
  [51, "Ouled Djellal", "أولاد جلال"], [52, "Bordj Badji Mokhtar", "برج باجي مختار"], [53, "Béni Abbès", "بني عباس"], [54, "Timimoun", "تيميمون"],
  [55, "Touggourt", "تقرت"], [56, "Djanet", "جانت"], [57, "In Salah", "عين صالح"], [58, "In Guezzam", "عين قزام"],
].map(([code, name, ar]) => ({ code: code as number, name: name as string, ar: ar as string }));

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

export function deliveryFee(wilayaCode: number, type: DeliveryType): number {
  const zone = NORTH.includes(wilayaCode) ? "north" : FAR_SOUTH.includes(wilayaCode) ? "farSouth" : "south";
  return FEES[zone][type];
}
