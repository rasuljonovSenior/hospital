import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { setAdminAuthed } from '../../../core/storage'
import { useSite } from '../../../core/useSite'

export function AdminLoginPage() {
  const { settings } = useSite()
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-soft-grid">
      <div className="container-page flex min-h-screen items-center justify-center py-12">
        <div className="card w-full max-w-md p-6 md:p-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary-strong)]">
              <LockClosedIcon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
                Admin panel
              </div>
              <div className="text-[12px] text-[var(--muted)]">{settings.siteName}</div>
            </div>
          </div>

          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              if (login === 'demo' && password === '1234') {
                setAdminAuthed(true)
                navigate('/admin/panel', { replace: true })
                return
              }
              setError('Login yoki parol noto‘g‘ri.')
            }}
          >
            <input
              className="focus-ring h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoComplete="username"
            />
            <input
              className="focus-ring h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />

            {error ? (
              <div className="rounded-2xl border border-[rgba(242,0,0,0.12)] bg-[rgba(242,0,0,0.06)] px-4 py-3 text-[12px] font-semibold text-[rgb(154,28,28)]">
                {error}
              </div>
            ) : (
              <div className="text-[12px] text-[var(--muted)]">
                Demo kirish: <span className="font-semibold text-[var(--text-strong)]">demo</span> /{' '}
                <span className="font-semibold text-[var(--text-strong)]">1234</span>
              </div>
            )}

            <button type="submit" className="btn-primary focus-ring h-11 w-full text-[13px] font-semibold">
              Kirish
            </button>

            <button
              type="button"
              className={clsx(
                'focus-ring h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white text-[12px] font-semibold text-[var(--primary-strong)] transition',
                'hover:bg-[rgba(11,90,146,0.06)]',
              )}
              onClick={() => navigate('/', { replace: true })}
            >
              Saytga qaytish
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

