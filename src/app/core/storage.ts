import type { Doctor, Service, SiteSettings } from './types'
import { SEED_DOCTORS, SEED_SERVICES, SEED_SETTINGS } from './seed'

const KEY = {
  settings: 'anfa.settings.v1',
  doctors: 'anfa.doctors.v1',
  services: 'anfa.services.v1',
  admin: 'anfa.admin.v1',
} as const

function safeJsonParse<T>(raw: string | null): T | undefined {
  if (!raw) return undefined
  try {
    return JSON.parse(raw) as T
  } catch {
    return undefined
  }
}

export function loadSettings(): SiteSettings {
  const saved = safeJsonParse<SiteSettings>(localStorage.getItem(KEY.settings))
  return saved ?? SEED_SETTINGS
}
export function saveSettings(v: SiteSettings) {
  localStorage.setItem(KEY.settings, JSON.stringify(v))
}

export function loadDoctors(): Doctor[] {
  const saved = safeJsonParse<Doctor[]>(localStorage.getItem(KEY.doctors))
  return saved && Array.isArray(saved) && saved.length ? saved : SEED_DOCTORS
}
export function saveDoctors(v: Doctor[]) {
  localStorage.setItem(KEY.doctors, JSON.stringify(v))
}

export function loadServices(): Service[] {
  const saved = safeJsonParse<Service[]>(localStorage.getItem(KEY.services))
  return saved && Array.isArray(saved) && saved.length ? saved : SEED_SERVICES
}
export function saveServices(v: Service[]) {
  localStorage.setItem(KEY.services, JSON.stringify(v))
}

export type AdminSession = { isAuthed: boolean; at: number }

export function loadAdminSession(): AdminSession {
  const saved = safeJsonParse<AdminSession>(localStorage.getItem(KEY.admin))
  return saved?.isAuthed ? saved : { isAuthed: false, at: 0 }
}
export function setAdminAuthed(isAuthed: boolean) {
  localStorage.setItem(KEY.admin, JSON.stringify({ isAuthed, at: Date.now() }))
}

