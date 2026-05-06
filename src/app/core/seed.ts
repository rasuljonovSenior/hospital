import type { Doctor, Service, SiteSettings } from './types'

export const SEED_SETTINGS: SiteSettings = {
  siteName: 'AYÍA Clinic',
  tagline: 'Premium Medical Humanism',
  lang: 'UZ',
  contact: {
    addressTitle: 'Manzil',
    addressLine1: 'Yunusobod tumani, 14-mavze, 45-uy',
    addressLine2: 'Toshkent shahri',
    phone1: '+998 (71) 200-00-00',
    phone2: '+998 (90) 115-25-25',
    workHoursWeek: 'Dush–Shan: 08:30 – 20:00',
    workHoursWeekend: 'Yakshanba: Dam olish kuni',
    email: 'info@anfa.uz',
  },
}

// Note: Using safe placeholder images; you can replace later in Admin.
const doctorImg = (seed: number) =>
  `https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80&sig=${seed}`


console.log(doctorImg)
export const SEED_DOCTORS: Doctor[] = [
  {
    id: 'aziz-karimov',
    fullName: 'Dr. Aziz Karimov',
    title: 'Bosh kardiolog',
    specialty: 'Kardiolog',
    years: 15,
    rating: 4.9,
    reviewsCount: 240,
    badge: 'Top mutaxassis',
    imageUrl: doctorImg(1), // ,
    bio: "Yurak-qon tomir kasalliklarini tashxislash va davolash bo‘yicha yuqori malakali mutaxassis. Innovatsion yondashuv, klinik protokollar va xalqaro standartlar asosida ishlaydi.",
    certificates: [
      { title: 'ESC Certification', subtitle: 'European Society of Cardiology, 2018' },
      { title: 'Yil kardiologi 2021', subtitle: "O‘zbekistonda sog‘liqni saqlash vazirligi" },
    ],
    education: [
      { title: 'Toshkent Davlat Tibbiyot Akademiyasi', subtitle: '2005–2011' },
      { title: 'Berlin Charité Kardiologiya Markazi', subtitle: 'Xalqaro ordinatura, 2012–2014' },
    ],
    directions: [
      { icon: 'heart', label: 'EKG va EXOKG tahlili' },
      { icon: 'shield', label: 'Gipertoniya bilan kurash' },
      { icon: 'plus', label: 'Yurak yetishmovchiligi' },
      { icon: 'spark', label: 'Post-infarkt reabilitatsiya' },
    ],
    addressLine: 'Toshkent sh., Mirzo Ulug‘bek tumani, Mustaqillik shoh ko‘chasi, 15-uy',
    branchName: 'ANFA Clinic Main Branch',
    priceUzs: 250_000,
  },
  {
    id: 'malika-saidova',
    fullName: 'Dr. Malika Saidova',
    title: 'Oftalmolog',
    specialty: 'Oftalmolog',
    years: 11,
    rating: 4.9,
    reviewsCount: 112,
    badge: 'Mutaxassis',
    imageUrl:  doctorImg(2), // doctorImg(2),
    bio: "Ko‘z salomatligi bo‘yicha tashxis va davolash: ko‘rish tekshiruvi, quruq ko‘z sindromi, refraksion muammolar. Bemor bilan yumshoq va tushunarli muloqot.",
    certificates: [{ title: 'ICO Assessment', subtitle: 'International Council of Ophthalmology, 2019' }],
    education: [{ title: 'Toshkent Tibbiyot Instituti', subtitle: '2010–2016' }],
    directions: [
      { icon: 'heart', label: 'Ko‘rish tekshiruvi' },
      { icon: 'shield', label: 'Glaukoma nazorati' },
      { icon: 'spark', label: 'Dry eye terapiya' },
      { icon: 'plus', label: 'Refraksiya' },
    ],
    addressLine: 'Toshkent sh., Yashnobod tumani, 12-uy',
    branchName: 'ANFA Clinic',
    priceUzs: 200_000,
  },
  {
    id: 'aziz-karimov-2',
    fullName: 'Dr. Aziz Karimov',
    title: 'Nevrolog-professor',
    specialty: 'Nevrolog',
    years: 18,
    rating: 4.8,
    reviewsCount: 190,
    badge: 'Tajriba talaba',
    imageUrl: doctorImg(3), // doctorImg(3),
    bio: "Nevrologik kasalliklar bo‘yicha chuqur tajriba: migren, nevralgiya, uyqu buzilishi. Dalillarga asoslangan yondashuv va individual reja.",
    certificates: [{ title: 'Neuro Board', subtitle: '2020' }],
    education: [{ title: 'TTA', subtitle: '2003–2009' }],
    directions: [
      { icon: 'spark', label: 'Migren terapiyasi' },
      { icon: 'shield', label: 'Nevropatiya' },
      { icon: 'plus', label: 'Reabilitatsiya' },
      { icon: 'heart', label: 'Profilaktika' },
    ],
    addressLine: 'Toshkent sh., Yunusobod tumani, 5-uy',
    branchName: 'ANFA Clinic',
    priceUzs: 280_000,
  },
  {
    id: 'nigora-sobirova',
    fullName: 'Dr. Nigora Sobirova',
    title: 'Pediatr',
    specialty: 'Pediatr',
    years: 10,
    rating: 4.9,
    reviewsCount: 98,
    badge: 'Oliy toifa',
    imageUrl: doctorImg(4), // doctorImg(4),
    bio: "Bolalar salomatligi bo‘yicha konsultatsiya, immunitet, profilaktika va o‘sish-rivojlanish nazorati. Ota-onalar bilan tushunarli tavsiyalar.",
    certificates: [{ title: 'Pediatrics CPD', subtitle: '2022' }],
    education: [{ title: 'Samarqand TMI', subtitle: '2011–2017' }],
    directions: [
      { icon: 'plus', label: 'Profilaktika' },
      { icon: 'shield', label: 'Immunitet' },
      { icon: 'spark', label: 'Allergiya' },
      { icon: 'heart', label: 'Rivojlanish' },
    ],
    addressLine: 'Toshkent sh., Sergeli tumani, 9-uy',
    branchName: 'ANFA Clinic',
    priceUzs: 180_000,
  },
]

export const SEED_SERVICES: Service[] = [
  { id: 'oft', title: 'Ko‘z diagnostikasi', category: 'Oftalmologiya', priceFromUzs: 120_000, unit: 'dan' },
  { id: 'kard', title: 'EKG (elektrokardiogramma)', category: 'Kardiologiya', priceFromUzs: 80_000, unit: 'dan' },
  { id: 'nev', title: 'Nevrolog konsultatsiya', category: 'Nevrologiya', priceFromUzs: 150_000, unit: 'dan' },
  { id: 'ped', title: 'Pediatr ko‘rigi', category: 'Pediatriya', priceFromUzs: 120_000, unit: 'dan' },
  { id: 'gyn', title: 'Ginekolog ko‘rigi', category: 'Ginekologiya', priceFromUzs: 160_000, unit: 'dan' },
  { id: 'sto', title: 'Stomatolog ko‘rigi', category: 'Stomatologiya', priceFromUzs: 90_000, unit: 'dan' },
  { id: 'sur', title: 'Xirurg konsultatsiya', category: 'Xirurgiya', priceFromUzs: 200_000, unit: 'dan' },
  { id: 'lab', title: 'Laboratoriya tahlillari', category: 'Laboratoriya', priceFromUzs: 60_000, unit: 'dan' },
]

