import { Navigate } from 'react-router-dom'
import { loadAdminSession } from '../../../core/storage'

export function RequireAdmin(props: { children: React.ReactNode }) {
  const session = loadAdminSession()
  if (!session.isAuthed) return <Navigate to="/admin" replace />
  return props.children
}
