export type Lang = 'UZ' | 'RU' | 'EN'

export type DoctorSpecialty =
  | 'Kardiolog'
  | 'Oftalmolog'
  | 'Nevrolog'
  | 'Pediatr'
  | 'Ginekolog'
  | 'Stomatolog'
  | 'Ortoped'
  | 'Endokrinolog'
  | 'Umumiy jarroh'

export type Doctor = {
  id: string
  fullName: string
  title: string
  specialty: DoctorSpecialty
  years: number
  rating: number
  reviewsCount: number
  badge?: string
  imageUrl: string
  bio: string
  certificates: { title: string; subtitle: string }[]
  education: { title: string; subtitle: string }[]
  directions: { icon: 'heart' | 'shield' | 'spark' | 'plus'; label: string }[]
  addressLine: string
  branchName: string
  priceUzs: number
}

export type ServiceCategory =
  | 'Oftalmologiya'
  | 'Kardiologiya'
  | 'Nevrologiya'
  | 'Pediatriya'
  | 'Ginekologiya'
  | 'Stomatologiya'
  | 'Xirurgiya'
  | 'Laboratoriya'

export type Service = {
  id: string
  title: string
  category: ServiceCategory
  priceFromUzs: number
  unit?: string
}

export type SiteContact = {
  addressTitle: string
  addressLine1: string
  addressLine2?: string
  phone1: string
  phone2?: string
  workHoursWeek: string
  workHoursWeekend: string
  email?: string
}

export type SiteSettings = {
  siteName: string
  tagline: string
  lang: Lang
  contact: SiteContact
}

