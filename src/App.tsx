import { AppRoutes } from './app/routes'
import { SiteProvider } from './app/core/SiteProvider'

export default function App() {
  return (
    <SiteProvider>
      <AppRoutes />
    </SiteProvider>
  )
}
