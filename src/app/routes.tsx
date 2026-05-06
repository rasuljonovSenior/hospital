import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicLayout } from './ui/PublicLayout'
import { HomePage } from './ui/pages/HomePage'
import { DoctorsPage } from './ui/pages/DoctorsPage'
import { DoctorDetailPage } from './ui/pages/DoctorDetailPage'
import { ServicesPage } from './ui/pages/ServicesPage'
import { ContactPage } from './ui/pages/ContactPage'
import { AdminLoginPage } from './ui/pages/admin/AdminLoginPage'
import { AdminDashboardPage } from './ui/pages/admin/AdminDashboardPage'
import { RequireAdmin } from './ui/pages/admin/RequireAdmin'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="xizmatlar" element={<ServicesPage />} />
        <Route path="shifokorlar" element={<DoctorsPage />} />
        <Route path="shifokorlar/:id" element={<DoctorDetailPage />} />
        <Route path="boglanish" element={<ContactPage />} />
      </Route>

      <Route path="admin" element={<AdminLoginPage />} />
      <Route
        path="admin/panel"
        element={
          <RequireAdmin>
            <AdminDashboardPage />
          </RequireAdmin>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

