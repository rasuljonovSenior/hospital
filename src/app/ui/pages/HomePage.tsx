import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AcademicCapIcon,
  ArrowRightIcon,
  CheckBadgeIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FadeIn } from '../components/FadeIn'
import { useSite } from '../../core/useSite'

const heroImg =
  './public/Anfa.png' // 'https://images.unsplash.com/photo-1587502536263-3f0eeefc9b9b?auto=format&fit=crop&w=1600&q=80'

const mapImg =
  'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80'

type AppointmentDraft = {
  fullName: string
  phone: string
  doctorId: string
  note: string
}

export function HomePage() {
  const { settings, doctors, services } = useSite()
  const navigate = useNavigate()

  const topDoctors = useMemo(() => doctors.slice(0, 4), [doctors])
  const topServices = useMemo(() => services.slice(0, 3), [services])

  const [draft, setDraft] = useState<AppointmentDraft>({
    fullName: '',
    phone: '',
    doctorId: topDoctors[0]?.id ?? '',
    note: '',
  })
  const [sent, setSent] = useState(false)

  return (
    <div className="container-page">
      <section className="pt-10 md:pt-14">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <FadeIn>
            <div className="text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,76,129,0.14)] bg-white/70 px-3 py-1 text-[11px] font-semibold text-[var(--primary-strong)]">
                <CheckBadgeIcon className="h-4 w-4" />
                Eng yaxshi mutaxassislar premium klinika
              </div>

              <h1 className="mt-4 text-balance text-[34px] font-extrabold leading-[1.05] tracking-tight text-[var(--text-strong)] md:text-[44px]">
                Salomatligingiz — <br />
                <span className="text-[var(--primary)]">bizning ustuvorligimiz</span>
              </h1>

              <p className="mt-4 max-w-xl text-[14px] leading-6 text-[var(--muted)]">
                {settings.siteName} sizga zamonaviy diagnostika, tajribali shifokorlar va
                xalqaro standartlarga mos xizmatni taklif qiladi.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="btn-primary focus-ring h-11 px-6 text-[13px] font-semibold"
                  onClick={() => navigate('/shifokorlar')}
                >
                  Qabulga yozilish
                </button>
                <button
                  type="button"
                  className="btn-ghost focus-ring h-11 px-6 text-[13px] font-semibold"
                  onClick={() => navigate('/xizmatlar')}
                >
                  Xizmatlar bilan tanish
                </button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-[12px] text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 text-[var(--warning)]" />
                  <span className="font-semibold text-[var(--text-strong)]">4.9</span>
                  <span>(240+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="h-5 w-5 text-[var(--primary)]" />
                  <span className="font-semibold text-[var(--text-strong)]">10 000+</span>
                  <span>bemor</span>
                </div>
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="h-5 w-5 text-[var(--primary)]" />
                  <span className="font-semibold text-[var(--text-strong)]">15+</span>
                  <span>yillik tajriba</span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="relative">
              <div className="card-soft overflow-hidden p-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={heroImg}
                    alt=""
                    className="h-[240px] w-full object-cover md:h-[290px]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[rgba(11,90,146,0.10)] via-transparent to-[rgba(255,255,255,0.45)]" />
                </div>

                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[
                    { k: '50+', v: 'Mutaxassislar' },
                    { k: '40+', v: 'Xizmatlar' },
                    { k: '10 000+', v: 'Bemorlar' },
                    { k: '4.9', v: 'Reyting' },
                  ].map((s) => (
                    <div
                      key={s.v}
                      className="rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white px-3 py-3 text-center"
                    >
                      <div className="text-[13px] font-extrabold text-[var(--text-strong)]">
                        {s.k}
                      </div>
                      <div className="mt-0.5 text-[10px] leading-4 text-[var(--muted)]">
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mt-10 md:mt-14">
        <FadeIn>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[12px] font-semibold text-[var(--muted)]">
                Bizning xizmatlar
              </div>
              <h2 className="mt-1 text-[22px] font-extrabold text-[var(--text-strong)] md:text-[26px]">
                Zamonaviy diagnostika va davolash
              </h2>
            </div>
            <button
              type="button"
              className="hidden items-center gap-2 text-[12px] font-semibold text-[var(--primary-strong)] hover:opacity-80 md:flex"
              onClick={() => navigate('/xizmatlar')}
            >
              Barcha xizmatlar <ArrowRightIcon className="h-4 w-4" />
            </button>
          </div>
        </FadeIn>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {topServices.map((s, idx) => (
            <FadeIn key={s.id} delay={0.03 * idx}>
              <button
                type="button"
                className={clsx(
                  'card focus-ring group w-full text-left transition',
                  'hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(12,47,74,0.12)]',
                )}
                onClick={() => navigate('/xizmatlar')}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] font-semibold text-[var(--muted)]">
                      {s.category}
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary-strong)] transition group-hover:scale-[1.03]">
                      <ArrowRightIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-[16px] font-extrabold text-[var(--text-strong)]">
                    {s.title}
                  </div>
                  <div className="mt-2 text-[12px] text-[var(--muted)]">
                    Narx: <span className="font-semibold text-[var(--text-strong)]">{s.priceFromUzs.toLocaleString('uz-UZ')}</span>{' '}
                    UZS {s.unit ?? 'dan'}
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mt-12 md:mt-16">
        <FadeIn>
          <div className="text-center">
            <div className="text-[12px] font-semibold text-[var(--muted)]">
              Bizning shifokorlar
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold text-[var(--text-strong)] md:text-[28px]">
              Malakali mutaxassislarimiz
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-6 text-[var(--muted)]">
              Har bir shifokor — tajriba, ehtiyotkorlik va insonparvarlik uyg‘unligi. Siz
              uchun eng mos mutaxassisni tanlang.
            </p>
          </div>
        </FadeIn>

        <div className="mt-7 grid gap-4 md:grid-cols-4">
          {topDoctors.map((d, idx) => (
            <FadeIn key={d.id} delay={0.03 * idx}>
              <button
                type="button"
                className={clsx(
                  'card focus-ring group w-full overflow-hidden text-left transition',
                  'hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(12,47,74,0.12)]',
                )}
                onClick={() => navigate(`/shifokorlar/${d.id}`)}
              >
                <div className="relative h-[150px] overflow-hidden">
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
                  <div className="mt-1 text-[14px] font-extrabold text-[var(--text-strong)]">
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

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            className="btn-ghost focus-ring h-10 px-6 text-[12px] font-semibold"
            onClick={() => navigate('/shifokorlar')}
          >
            Barcha shifokorlar
          </button>
        </div>
      </section>

      <section className="mt-12 md:mt-16">
        <FadeIn>
          <div className="text-center">
            <div className="text-[12px] font-semibold text-[var(--muted)]">
              Onlayn qabulga yozilish
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold text-[var(--text-strong)] md:text-[28px]">
              Tez va qulay
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="card p-6">
              <form
                className="grid gap-4 md:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                  setTimeout(() => setSent(false), 2200)
                  setDraft((d) => ({ ...d, note: '' }))
                }}
              >
                <label className="text-left">
                  <div className="text-[11px] font-semibold text-[var(--muted)]">
                    Ism-familiya
                  </div>
                  <input
                    className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                    value={draft.fullName}
                    onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
                    placeholder="Ismingizni kiriting"
                    required
                  />
                </label>
                <label className="text-left">
                  <div className="text-[11px] font-semibold text-[var(--muted)]">
                    Telefon
                  </div>
                  <input
                    className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                    value={draft.phone}
                    onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                    placeholder="+998 __ ___ __ __"
                    required
                  />
                </label>
                <label className="text-left md:col-span-2">
                  <div className="text-[11px] font-semibold text-[var(--muted)]">
                    Shifokor tanlang
                  </div>
                  <select
                    className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                    value={draft.doctorId}
                    onChange={(e) => setDraft((d) => ({ ...d, doctorId: e.target.value }))}
                    required
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.fullName} — {d.specialty}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-left md:col-span-2">
                  <div className="text-[11px] font-semibold text-[var(--muted)]">
                    Izoh (ixtiyoriy)
                  </div>
                  <textarea
                    className="focus-ring mt-2 min-h-[90px] w-full resize-none rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 py-3 text-[13px] text-[var(--text-strong)]"
                    value={draft.note}
                    onChange={(e) => setDraft((d) => ({ ...d, note: e.target.value }))}
                    placeholder="Shikoyat yoki qo‘shimcha ma’lumot..."
                  />
                </label>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="btn-primary focus-ring h-11 w-full text-[13px] font-semibold"
                  >
                    Yuborish
                  </button>
                  <div
                    className={clsx(
                      'mt-3 text-center text-[12px] font-semibold',
                      sent ? 'text-[var(--success)]' : 'text-[var(--muted)]',
                    )}
                  >
                    {sent ? 'So‘rov yuborildi. Operatorimiz tez orada bog‘lanadi.' : 'Ma’lumotlar demo rejimida saqlanmaydi.'}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mt-12 md:mt-16">
        <FadeIn>
          <div className="text-center">
            <div className="text-[12px] font-semibold text-[var(--muted)]">
              Bemorlarimiz fikrlari
            </div>
            <h2 className="mt-1 text-[22px] font-extrabold text-[var(--text-strong)] md:text-[28px]">
              Ishonch va natija
            </h2>
          </div>
        </FadeIn>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            {
              name: 'Nodira Fayzullayeva',
              text: '“Klinikadagi xizmatlar juda yuqori darajada. Shifokorlar hushmuomala va professional.”',
            },
            {
              name: 'Ulug‘bek Karimov',
              text: '“Qabul tez, diagnostika aniq. Tavsiyalar tushunarli va natija sezildi.”',
            },
            {
              name: 'Saidmurod Tojiyev',
              text: '“Toza, zamonaviy, navbat muammosi yo‘q. Qabulga yozilish juda qulay.”',
            },
          ].map((r, idx) => (
            <FadeIn key={r.name} delay={0.03 * idx}>
              <div className="card p-5 text-left">
                <div className="flex items-center gap-1 text-[var(--warning)]">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <div className="mt-3 text-[13px] leading-6 text-[var(--muted)]">
                  {r.text}
                </div>
                <div className="mt-4 text-[12px] font-semibold text-[var(--text-strong)]">
                  {r.name}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mt-12 pb-14 md:mt-16">
        <FadeIn>
          <div className="grid gap-5 md:grid-cols-[380px_1fr] md:items-stretch">
            <div className="card p-6 text-left">
              <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
                Bizning manzil
              </div>
              <div className="mt-5 space-y-4 text-[12px] text-[var(--muted)]">
                <div className="flex gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--text-strong)]">
                      {settings.contact.addressLine2 ?? 'Toshkent shahri'}
                    </div>
                    <div>{settings.contact.addressLine1}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <PhoneIcon className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--text-strong)]">Telefon</div>
                    <div>{settings.contact.phone2 ?? settings.contact.phone1}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ClockIcon className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                  <div>
                    <div className="font-semibold text-[var(--text-strong)]">
                      Ish tartibi
                    </div>
                    <div>{settings.contact.workHoursWeek}</div>
                    <div>{settings.contact.workHoursWeekend}</div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary focus-ring mt-6 h-11 w-full text-[13px] font-semibold"
                onClick={() => navigate('/boglanish')}
              >
                Bog‘lanish sahifasi
              </button>
            </div>

            <div className="card overflow-hidden">
              <div className="relative h-full min-h-[260px]">
                <img src={mapImg} alt="" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(12,47,74,0.25)] via-transparent to-transparent" />
                <div className="absolute left-6 top-6 rounded-2xl bg-white/92 px-4 py-3 text-[12px] font-semibold text-[var(--text-strong)] shadow-[0_20px_50px_rgba(12,47,74,0.18)]">
                  {settings.siteName}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

