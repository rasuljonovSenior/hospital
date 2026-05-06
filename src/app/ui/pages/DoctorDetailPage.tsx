import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CheckBadgeIcon,
  StarIcon,
  ClockIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  SparklesIcon,
  PlusCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FadeIn } from '../components/FadeIn'
import { useSite } from '../../core/useSite'

const dirIcon = (k: string) => {
  switch (k) {
    case 'heart':
      return <PlusCircleIcon className="h-5 w-5 text-[var(--primary)]" />
    case 'shield':
      return <ShieldCheckIcon className="h-5 w-5 text-[var(--primary)]" />
    case 'spark':
      return <SparklesIcon className="h-5 w-5 text-[var(--primary)]" />
    default:
      return <CheckBadgeIcon className="h-5 w-5 text-[var(--primary)]" />
  }
}

const days = [
  { k: 'DUSH', v: 12 },
  { k: 'SESH', v: 13 },
  { k: 'CHOR', v: 14 },
  { k: 'PAY', v: 15 },
]

const times = ['09:00', '10:30', '14:00']

export function DoctorDetailPage() {
  const { id } = useParams()
  const { doctors } = useSite()
  const navigate = useNavigate()

  const doctor = useMemo(() => doctors.find((d) => d.id === id), [doctors, id])

  const [activeTab, setActiveTab] = useState<'info' | 'spec' | 'reviews'>('info')
  const [dayIdx, setDayIdx] = useState(2)
  const [time, setTime] = useState(times[2]!)
  const [booked, setBooked] = useState(false)

  if (!doctor) {
    return (
      <div className="container-page py-10">
        <div className="card p-6">
          <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
            Shifokor topilmadi
          </div>
          <button
            type="button"
            className="btn-ghost focus-ring mt-4 h-10 px-6 text-[12px] font-semibold"
            onClick={() => navigate('/shifokorlar')}
          >
            Orqaga
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-page">
      <section className="pt-10 md:pt-12">
        <div className="grid gap-5 md:grid-cols-[1fr_380px] md:items-start">
          <FadeIn>
            <div className="card p-6 md:p-7">
              <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
                <div className="overflow-hidden rounded-3xl border border-[rgba(15,76,129,0.12)] bg-white">
                  <img
                    src={doctor.imageUrl}
                    alt=""
                    className="h-[220px] w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="text-left">
                  <div className="text-[28px] font-extrabold leading-tight text-[var(--text-strong)] md:text-[36px]">
                    {doctor.fullName}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[var(--muted)]">
                    <span className="rounded-full bg-[rgba(11,90,146,0.08)] px-3 py-1 font-semibold text-[var(--primary-strong)]">
                      {doctor.title}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(15,76,129,0.16)] bg-white px-3 py-1 font-semibold">
                      <ClockIcon className="h-4 w-4 text-[var(--primary)]" />
                      {doctor.years} yil tajriba
                    </span>
                  </div>

                  <p className="mt-4 max-w-xl text-[13px] leading-6 text-[var(--muted)]">
                    {doctor.bio}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(11,143,106,0.10)] px-3 py-2 text-[12px] font-semibold text-[var(--success)]">
                      <CheckBadgeIcon className="h-5 w-5" />
                      Xalqaro sertifikat
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(242,178,0,0.12)] px-3 py-2 text-[12px] font-semibold text-[var(--text-strong)]">
                      <StarIcon className="h-5 w-5 text-[var(--warning)]" />
                      {doctor.rating.toFixed(1)} ({doctor.reviewsCount} sharhlar)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="card p-6">
              <div className="text-left">
                <div className="text-[18px] font-extrabold text-[var(--text-strong)]">
                  Qabulga yozilish
                </div>
                <div className="mt-2 flex items-center justify-between text-[12px] text-[var(--muted)]">
                  <span>Konsultatsiya narxi</span>
                  <span className="font-extrabold text-[var(--primary-strong)]">
                    {doctor.priceUzs.toLocaleString('uz-UZ')} UZS
                  </span>
                </div>

                <div className="mt-5 text-[11px] font-semibold text-[var(--muted)]">
                  Sana tanlang
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {days.map((d, i) => {
                    const on = i === dayIdx
                    return (
                      <button
                        key={d.k}
                        type="button"
                        className={clsx(
                          'focus-ring rounded-2xl border px-3 py-2 text-center transition',
                          on
                            ? 'border-transparent bg-[var(--primary-strong)] text-white'
                            : 'border-[rgba(15,76,129,0.14)] bg-white text-[var(--text-strong)] hover:bg-[rgba(11,90,146,0.06)]',
                        )}
                        onClick={() => setDayIdx(i)}
                      >
                        <div className="text-[10px] font-extrabold">{d.k}</div>
                        <div className="mt-0.5 text-[12px] font-extrabold">{d.v}</div>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-5 text-[11px] font-semibold text-[var(--muted)]">
                  Vaqtni tanlang
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {times.map((t) => {
                    const on = t === time
                    return (
                      <button
                        key={t}
                        type="button"
                        className={clsx(
                          'focus-ring h-10 rounded-2xl border text-[12px] font-semibold transition',
                          on
                            ? 'border-transparent bg-[var(--primary-strong)] text-white'
                            : 'border-[rgba(15,76,129,0.14)] bg-white text-[var(--text-strong)] hover:bg-[rgba(11,90,146,0.06)]',
                        )}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  className="btn-primary focus-ring mt-5 h-11 w-full text-[13px] font-semibold"
                  onClick={() => {
                    setBooked(true)
                    setTimeout(() => setBooked(false), 2400)
                  }}
                >
                  Band qilish
                </button>

                <div className="mt-3 text-center text-[11px] text-[var(--muted)]">
                  Tasdiqlash uchun operatorimiz bog‘lanadi
                </div>
                {booked ? (
                  <div className="mt-2 text-center text-[12px] font-semibold text-[var(--success)]">
                    So‘rov qabul qilindi. Vaqt: {days[dayIdx]!.k} {days[dayIdx]!.v}, {time}
                  </div>
                ) : null}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mt-6 md:mt-8">
        <FadeIn>
          <div className="flex gap-6 border-b border-[rgba(15,76,129,0.12)] text-[13px] font-semibold">
            {[
              { id: 'info', label: "Ma'lumot" },
              { id: 'spec', label: 'Mutaxassisligi' },
              { id: 'reviews', label: 'Bemorlar fikrlari' },
            ].map((t) => {
              const active = activeTab === t.id
              return (
                <button
                  key={t.id}
                  type="button"
                  className={clsx(
                    'relative pb-4 text-[var(--muted)] transition',
                    active && 'text-[var(--primary-strong)]',
                  )}
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                >
                  {t.label}
                  {active ? (
                    <span className="absolute -bottom-[1px] left-0 h-[2px] w-full rounded-full bg-[var(--primary-strong)]" />
                  ) : null}
                </button>
              )
            })}
          </div>
        </FadeIn>
      </section>

      <section className="mt-6 pb-14">
        <div className="grid gap-5 md:grid-cols-[1fr_380px]">
          <FadeIn delay={0.02}>
            <div className="card p-6">
              {activeTab === 'info' ? (
                <div className="text-left">
                  <div className="flex items-center gap-2 text-[14px] font-extrabold text-[var(--text-strong)]">
                    <AcademicCapIcon className="h-5 w-5 text-[var(--primary)]" />
                    Ta’lim va malaka
                  </div>
                  <div className="mt-4 space-y-3">
                    {doctor.education.map((e) => (
                      <div key={e.title} className="rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white p-4">
                        <div className="text-[12px] font-semibold text-[var(--text-strong)]">
                          {e.title}
                        </div>
                        <div className="mt-1 text-[12px] text-[var(--muted)]">
                          {e.subtitle}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-[14px] font-extrabold text-[var(--text-strong)]">
                    Amaliyot yo‘nalishlari
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {doctor.directions.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-center gap-3 rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white p-4"
                      >
                        {dirIcon(d.icon)}
                        <div className="text-[12px] font-semibold text-[var(--text-strong)]">
                          {d.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : activeTab === 'spec' ? (
                <div className="text-left">
                  <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
                    Mutaxassisligi
                  </div>
                  <div className="mt-3 text-[13px] leading-6 text-[var(--muted)]">
                    {doctor.specialty} yo‘nalishi bo‘yicha tashxis va davolash xizmatlari.
                    Qabul rejalari individual, klinik protokollar asosida tuziladi.
                  </div>
                </div>
              ) : (
                <div className="text-left">
                  <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
                    So‘nggi sharhlar
                  </div>
                  <div className="mt-4 rounded-2xl border border-[rgba(15,76,129,0.12)] bg-[rgba(11,90,146,0.04)] p-5">
                    <div className="flex items-center gap-2 text-[11px] text-[var(--muted)]">
                      <div className="font-semibold">2 kun avval</div>
                      <div className="flex items-center gap-1 text-[var(--warning)]">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="h-4 w-4" />
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 text-[13px] leading-6 text-[var(--primary-strong)]">
                      “Doktor {doctor.fullName.split(' ')[1] ?? doctor.fullName} juda bilimli va e’tiborli
                      shifokor. Klinikadagi sharoitlar ham a’lo darajada.”
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-strong)] text-[12px] font-extrabold text-white">
                        N
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold text-[var(--text-strong)]">
                          Nigora Usmonova
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          <div className="space-y-5">
            <FadeIn delay={0.03}>
              <div className="card p-6 text-left">
                <div className="text-[11px] font-extrabold tracking-wide text-[var(--muted)]">
                  SERTIFIKATLAR
                </div>
                <div className="mt-4 space-y-3">
                  {doctor.certificates.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white p-4"
                    >
                      <div className="text-[12px] font-semibold text-[var(--text-strong)]">
                        {c.title}
                      </div>
                      <div className="mt-1 text-[12px] text-[var(--muted)]">
                        {c.subtitle}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="card overflow-hidden text-left">
                <div className="p-6">
                  <div className="text-[12px] font-extrabold tracking-wide text-[var(--muted)]">
                    Qabul manzili
                  </div>
                  <div className="mt-3 text-[13px] font-semibold text-[var(--text-strong)]">
                    {doctor.addressLine}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-[var(--primary-strong)] to-[var(--primary)] p-6 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-[12px] font-semibold">
                    <MapPinIcon className="h-4 w-4" />
                    {doctor.branchName}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  )
}

