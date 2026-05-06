import { Fragment, useMemo } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ScrollToTop } from './ScrollToTop'
import { useSite } from '../core/useSite'
import type { Lang } from '../core/types'

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    'link-nav text-[14px] font-medium',
    isActive && 'text-[var(--primary-strong)]',
  )

export function PublicLayout() {
  const { settings, setSettings } = useSite()
  const navigate = useNavigate()

  const langs: Lang[] = useMemo(() => ['UZ', 'RU', 'EN'], [])

  return (
    <div className="min-h-screen bg-soft-grid">
      <ScrollToTop />

      <header className="sticky top-0 z-40 border-b border-[rgba(15,76,129,0.10)] bg-white/80 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <button
            type="button"
            className="focus-ring flex items-center gap-2 rounded-xl px-2 py-1 text-left"
            onClick={() => navigate('/')}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-soft)] text-[var(--primary-strong)]">
              <span className="text-[12px] font-bold">+</span>
            </div>
            <div className="leading-tight">
              <div className="text-[14px] font-semibold text-[var(--text-strong)]">
                {settings.siteName}
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            <NavLink to="/" className={navItemClass}>
              Bosh sahifa
            </NavLink>
            <NavLink to="/xizmatlar" className={navItemClass}>
              Xizmatlar
            </NavLink>
            <NavLink to="/shifokorlar" className={navItemClass}>
              Shifokorlar
            </NavLink>
            <NavLink to="/boglanish" className={navItemClass}>
              Bog‘lanish
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="focus-ring hidden h-10 w-10 items-center justify-center rounded-full border border-[rgba(15,76,129,0.12)] bg-white text-[var(--muted)] transition hover:bg-[rgba(11,90,146,0.06)] md:flex"
              aria-label="Qidirish"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <Menu as="div" className="relative hidden md:block">
              <MenuButton className="focus-ring flex h-10 items-center gap-2 rounded-full border border-[rgba(15,76,129,0.12)] bg-white px-4 text-[13px] font-semibold text-[var(--text-strong)]">
                {settings.lang}
                <span className="text-[10px] text-[var(--muted)]">/</span>
                <span className="text-[var(--muted)]">
                  {langs.filter((l) => l !== settings.lang)[0]}
                </span>
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white p-1 shadow-[0_20px_50px_rgba(12,47,74,0.18)] focus:outline-none">
                {langs.map((l) => (
                  <MenuItem key={l} as={Fragment}>
                    {({ focus }) => (
                      <button
                        type="button"
                        className={clsx(
                          'w-full rounded-xl px-3 py-2 text-left text-[13px] font-semibold',
                          focus ? 'bg-[rgba(11,90,146,0.08)]' : '',
                          l === settings.lang ? 'text-[var(--primary-strong)]' : 'text-[var(--text-strong)]',
                        )}
                        onClick={() => setSettings({ ...settings, lang: l })}
                      >
                        {l}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            <button
              type="button"
              className="btn-primary focus-ring h-10 px-4 text-[13px] font-semibold"
              onClick={() => navigate('/shifokorlar')}
            >
              Qabulga yozilish
            </button>
          </div>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pb-16"
      >
        <Outlet />
      </motion.main>

      <footer className="border-t border-[rgba(15,76,129,0.10)] bg-white">
        <div className="container-page grid gap-10 py-10 md:grid-cols-4">
          <div>
            <div className="text-[14px] font-semibold text-[var(--text-strong)]">
              {settings.siteName}
            </div>
            <div className="mt-2 text-[12px] leading-5 text-[var(--muted)]">
              {settings.tagline}
            </div>
          </div>

          <div>
            <div className="text-[12px] font-semibold tracking-wide text-[var(--text-strong)]">
              Xizmatlar
            </div>
            <div className="mt-3 space-y-2 text-[12px] text-[var(--muted)]">
              <NavLink className="block link-nav" to="/xizmatlar">
                Kardiologiya
              </NavLink>
              <NavLink className="block link-nav" to="/xizmatlar">
                Nevrologiya
              </NavLink>
              <NavLink className="block link-nav" to="/xizmatlar">
                Pediatriya
              </NavLink>
            </div>
          </div>

          <div>
            <div className="text-[12px] font-semibold tracking-wide text-[var(--text-strong)]">
              Klinika
            </div>
            <div className="mt-3 space-y-2 text-[12px] text-[var(--muted)]">
              <NavLink className="block link-nav" to="/shifokorlar">
                Shifokorlar
              </NavLink>
              <NavLink className="block link-nav" to="/boglanish">
                Bog‘lanish
              </NavLink>
            </div>
          </div>

          <div>
            <div className="text-[12px] font-semibold tracking-wide text-[var(--text-strong)]">
              Aloqa
            </div>
            <div className="mt-3 space-y-2 text-[12px] text-[var(--muted)]">
              <div>{settings.contact.phone1}</div>
              <div>{settings.contact.workHoursWeek}</div>
              <div>{settings.contact.workHoursWeekend}</div>
            </div>
          </div>
        </div>

        <div className="border-t border-[rgba(15,76,129,0.10)] py-4">
          <div className="container-page text-[11px] text-[var(--muted)]">
            © {new Date().getFullYear()} {settings.siteName}. {settings.tagline}
          </div>
        </div>
      </footer>
    </div>
  )
}

