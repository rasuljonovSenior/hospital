import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  StarIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FadeIn } from '../components/FadeIn'
import { useSite } from '../../core/useSite'
import type { DoctorSpecialty } from '../../core/types'

const tabs: { id: 'all' | DoctorSpecialty; label: string }[] = [
  { id: 'all', label: 'Barchasi' },
  { id: 'Kardiolog', label: 'Kardiologiya' },
  { id: 'Oftalmolog', label: 'Oftalmologiya' },
  { id: 'Nevrolog', label: 'Nevrologiya' },
  { id: 'Pediatr', label: 'Pediatriya' },
]

export function DoctorsPage() {
  const { doctors } = useSite()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('all')

  const filtered = useMemo(() => {
    const qn = q.trim().toLowerCase()
    return doctors.filter((d) => {
      const okTab = active === 'all' ? true : d.specialty === active
      const okQ =
        !qn ||
        d.fullName.toLowerCase().includes(qn) ||
        d.specialty.toLowerCase().includes(qn) ||
        d.title.toLowerCase().includes(qn)
      return okTab && okQ
    })
  }, [active, doctors, q])

  const [page, setPage] = useState(1)
  const perPage = 8
  const paged = useMemo(() => filtered.slice(0, page * perPage), [filtered, page])
  const hasMore = paged.length < filtered.length

  return (
    <div className="container-page">
      <section className="pt-10 md:pt-12">
        <FadeIn>
          <div className="text-center">
            <div className="inline-flex rounded-full bg-[var(--primary-soft)] px-3 py-1 text-[10px] font-extrabold tracking-wide text-[var(--primary-strong)]">
              MUTAXASSISLARIMIZ
            </div>
            <h1 className="mt-3 text-balance text-[30px] font-extrabold leading-[1.1] text-[var(--text-strong)] md:text-[44px]">
              Bizning malakali <br className="hidden md:block" />
              mutaxassislarimiz
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-6 text-[var(--muted)]">
              ANFA Clinic shifokorlari — bu o‘z sohasining ustalari, ko‘p yillik tajribaga
              ega va xalqaro standartlar asosida xizmat ko‘rsatuvchi professionallar jamoasi.
            </p>
          </div>
        </FadeIn>
      </section>

      <section className="mt-7">
        <FadeIn delay={0.04}>
          <div className="card p-4">
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
              <div className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  className="focus-ring h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white pl-12 pr-4 text-[13px] text-[var(--text-strong)]"
                  placeholder="Shifokor ismini qidiring..."
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value)
                    setPage(1)
                  }}
                />
              </div>

              <button
                type="button"
                className="btn-ghost focus-ring h-11 px-4 text-[12px] font-semibold"
              >
                <span className="inline-flex items-center gap-2">
                  <AdjustmentsHorizontalIcon className="h-4 w-4" /> Tajriba bo‘yicha
                </span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {tabs.map((t) => {
                const isActive = active === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={clsx(
                      'focus-ring rounded-full px-4 py-2 text-[12px] font-semibold transition',
                      isActive
                        ? 'bg-[var(--primary-strong)] text-white'
                        : 'bg-[rgba(11,90,146,0.06)] text-[var(--primary-strong)] hover:bg-[rgba(11,90,146,0.10)]',
                    )}
                    onClick={() => {
                      setActive(t.id)
                      setPage(1)
                    }}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mt-7 pb-14">
        <div className="grid gap-4 md:grid-cols-4">
          {paged.map((d, idx) => (
            <FadeIn key={d.id} delay={0.015 * Math.min(idx, 8)}>
              <button
                type="button"
                className={clsx(
                  'card focus-ring group w-full overflow-hidden text-left transition',
                  'hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(12,47,74,0.12)]',
                )}
                onClick={() => navigate(`/shifokorlar/${d.id}`)}
              >
                <div className="relative h-[170px] overflow-hidden">
                  <img
                    src={d.imageUrl}
                    alt=""
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-[var(--primary-strong)]">
                    {d.badge ?? 'Mutaxassis'}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-[10px] font-semibold text-[var(--muted)]">
                    {d.specialty.toUpperCase()}
                  </div>
                  <div className="mt-1 text-[13px] font-extrabold text-[var(--text-strong)]">
                    {d.fullName}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--muted)]">
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="h-4 w-4 text-[var(--primary)]" />
                      {d.years} yil
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StarIcon className="h-4 w-4 text-[var(--warning)]" />
                      <span className="font-semibold text-[var(--text-strong)]">
                        {d.rating.toFixed(1)}
                      </span>
                      <span>({d.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="btn-ghost inline-flex h-9 w-full items-center justify-center text-[12px] font-semibold">
                      Qabulga yozilish
                    </div>
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          {hasMore ? (
            <button
              type="button"
              className="btn-ghost focus-ring h-11 px-8 text-[12px] font-semibold"
              onClick={() => setPage((p) => p + 1)}
            >
              Yana yuklash
            </button>
          ) : (
            <div className="text-[12px] font-semibold text-[var(--muted)]">
              Hammasi ko‘rsatildi
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

