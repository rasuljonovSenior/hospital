import { createContext } from 'react'
import type { SiteContextValue } from './SiteProvider'

export const SiteContext = createContext<SiteContextValue | null>(null)

