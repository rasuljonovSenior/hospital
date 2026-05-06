import { useMemo, useState } from 'react'
import type { Doctor, Service, SiteSettings } from './types'
import {
  loadDoctors,
  loadServices,
  loadSettings,
  saveDoctors,
  saveServices,
  saveSettings,
} from './storage'
import { SiteContext } from './siteContext'

export type SiteContextValue = {
  settings: SiteSettings
  doctors: Doctor[]
  services: Service[]
  setSettings: (next: SiteSettings) => void
  setDoctors: (next: Doctor[]) => void
  setServices: (next: Service[]) => void
}

export function SiteProvider(props: { children: React.ReactNode }) {
  const [settings, _setSettings] = useState<SiteSettings>(() => loadSettings())
  const [doctors, _setDoctors] = useState<Doctor[]>(() => loadDoctors())
  const [services, _setServices] = useState<Service[]>(() => loadServices())

  const value = useMemo<SiteContextValue>(() => {
    return {
      settings,
      doctors,
      services,
      setSettings: (next) => {
        _setSettings(next)
        saveSettings(next)
      },
      setDoctors: (next) => {
        _setDoctors(next)
        saveDoctors(next)
      },
      setServices: (next) => {
        _setServices(next)
        saveServices(next)
      },
    }
  }, [doctors, services, settings])

  return <SiteContext value={value}>{props.children}</SiteContext>
}

