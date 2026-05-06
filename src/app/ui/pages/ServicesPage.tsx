import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { FadeIn } from '../components/FadeIn'
import { useSite } from '../../core/useSite'
import type { ServiceCategory } from '../../core/types'

const heroImg =
  './public/Klinika.png' // 'https://images.unsplash.com/photo-1587502536263-3f0eeefc9b9b?auto=format&fit=crop&w=1600&q=80'

const labImg =
  './public/tashrif.png' // 'https://images.unsplash.com/photo-1581093588401-ecfd9c0e7b9c?auto=format&fit=crop&w=1600&q=80'

const categories: { id: ServiceCategory; subtitle: string }[] = [
  { id: 'Oftalmologiya', subtitle: 'Ko‘z salomatligi va diagnostika' },
  { id: 'Kardiologiya', subtitle: 'Yurak-qon tomir tekshiruvi' },
  { id: 'Nevrologiya', subtitle: 'Asab tizimi davolash' },
  { id: 'Pediatriya', subtitle: 'Bolalar salomatligi' },
  { id: 'Ginekologiya', subtitle: 'Ayollar salomatligi' },
  { id: 'Stomatologiya', subtitle: 'Tish va og‘iz bo‘shlig‘i' },
  { id: 'Xirurgiya', subtitle: 'Amaliy jarrohlik' },
  { id: 'Laboratoriya', subtitle: 'Analizlar va tahlillar' },
]

export function ServicesPage() {
  const { services } = useSite()
  const navigate = useNavigate()

  const grouped = useMemo(() => {
    const m = new Map<ServiceCategory, typeof services>()
    for (const s of services) {
      const arr = m.get(s.category) ?? []
      arr.push(s)
      m.set(s.category, arr)
    }
    return m
  }, [services])

  const priceRows = useMemo(() => services.slice(0, 6), [services])

  return (
    <div className="container-page">
      <section className="pt-10 md:pt-12">
        <FadeIn>
          <div className="card overflow-hidden">
            <div className="relative h-[220px] md:h-[260px]">
              <img src={heroImg} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(12,47,74,0.78)] via-[rgba(12,47,74,0.40)] to-[rgba(12,47,74,0.15)]" />
              <div className="absolute inset-0 p-7 md:p-10">
                <div className="max-w-2xl text-left text-white">
                  <div className="text-[12px] font-semibold text-white/80">
                    AYÍA Clinic
                  </div>
                  <h1 className="mt-3 text-balance text-[26px] font-extrabold leading-[1.05] md:text-[40px]">
                    Klinikamiz Xizmatlari
                  </h1>
                  <p className="mt-4 text-[13px] leading-6 text-white/80">
                    Biz zamonaviy diagnostika, davolash va profilaktika xizmatlarini taklif
                    qilamiz. Klinika mutaxassislari har bir bemor uchun individual yondashuvni ta’minlaydi.
                  </p>
                  <button
                    type="button"
                    className="btn-ghost focus-ring mt-6 h-11 px-6 text-[12px] font-semibold"
                    onClick={() => navigate('/boglanish')}
                  >
                    Konsultatsiyaga yoziling
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mt-8 md:mt-10">
        <FadeIn>
          <div className="text-left">
            <div className="text-[12px] font-semibold text-[var(--muted)]">
              Mutaxassislik yo‘nalishlari
            </div>
          </div>
        </FadeIn>

        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {categories.map((c, idx) => (
            <FadeIn key={c.id} delay={0.02 * idx}>
              <button
                type="button"
                className="card focus-ring group w-full text-left transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(12,47,74,0.12)]"
                onClick={() => {
                  const el = document.getElementById('prices')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(11,90,146,0.10)] text-[var(--primary-strong)]">
                      <ArrowRightIcon className="h-5 w-5" />
                    </div>
                    <div className="text-[11px] font-semibold text-[var(--muted)]">
                      {grouped.get(c.id)?.length ?? 0} xizmat
                    </div>
                  </div>
                  <div className="mt-3 text-[14px] font-extrabold text-[var(--text-strong)]">
                    {c.id}
                  </div>
                  <div className="mt-2 text-[12px] leading-5 text-[var(--muted)]">
                    {c.subtitle}
                  </div>
                  <div className="mt-4 text-[12px] font-semibold text-[var(--primary-strong)]">
                    Batafsil →
                  </div>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mt-10 md:mt-12">
        <FadeIn>
          <div className="grid gap-5 md:grid-cols-[1fr_520px] md:items-stretch">
            <div className="card p-6 text-left">
              <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
                Tashrifga tayyorgarlik
              </div>
              <div className="mt-5 space-y-3">
                {[
                  { t: 'Hujjatlar', d: 'Pasport yoki shaxsni tasdiqlovchi hujjatni olib keling.' },
                  { t: 'Vaqtga rioya', d: 'Qabuldan 10–15 daqiqa oldin kelish tavsiya etiladi.' },
                  { t: 'Savollar tayyorlang', d: 'Shikoyat va dorilar ro‘yxatini yozib oling.' },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="flex gap-3 rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white p-4"
                  >
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 text-[var(--success)]" />
                    <div>
                      <div className="text-[12px] font-semibold text-[var(--text-strong)]">
                        {x.t}
                      </div>
                      <div className="mt-1 text-[12px] leading-5 text-[var(--muted)]">
                        {x.d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card overflow-hidden">
              <img src={labImg} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        </FadeIn>
      </section>

      <section id="prices" className="mt-10 pb-14 md:mt-12">
        <FadeIn>
          <div className="text-center">
            <div className="text-[12px] font-semibold text-[var(--muted)]">
              Xizmatlar narxi
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.04}>
          <div className="mx-auto mt-6 max-w-3xl">
            <div className="card p-5">
              <div className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted)]" />
                <input
                  className="focus-ring h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white pl-12 pr-4 text-[13px] text-[var(--text-strong)]"
                  placeholder="Xizmat nomini yozib qidiring..."
                  disabled
                />
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white">
                <div className="grid grid-cols-[1fr_130px_110px] gap-0 border-b border-[rgba(15,76,129,0.10)] bg-[rgba(11,90,146,0.04)] px-4 py-3 text-[11px] font-extrabold text-[var(--muted)]">
                  <div>Xizmat nomi</div>
                  <div>Tur</div>
                  <div>Narxi</div>
                </div>
                {priceRows.map((s) => (
                  <div
                    key={s.id}
                    className="grid grid-cols-[1fr_130px_110px] gap-0 px-4 py-3 text-[12px] text-[var(--muted)]"
                  >
                    <div className="font-semibold text-[var(--text-strong)]">{s.title}</div>
                    <div>{s.category}</div>
                    <div className="font-semibold text-[var(--primary-strong)]">
                      {s.priceFromUzs.toLocaleString('uz-UZ')} UZS
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  className="btn-ghost focus-ring h-10 px-6 text-[12px] font-semibold"
                  onClick={() => navigate('/boglanish')}
                >
                  Barcha narxlarni ko‘rish (PDF)
                </button>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="mt-10">
            <div className="card overflow-hidden bg-gradient-to-r from-[var(--primary-strong)] to-[var(--primary)] p-6 text-white md:p-8">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <div className="text-[18px] font-extrabold">
                    Sog‘lig‘ingizga bugun g‘amxo‘rlik qiling
                  </div>
                  <div className="mt-2 text-[13px] text-white/85">
                    Mutaxassisimizga murojaat qiling va tekshiruvni boshlang.
                  </div>
                </div>
                <button
                  type="button"
                  className="focus-ring rounded-full bg-white px-6 py-3 text-[12px] font-extrabold text-[var(--primary-strong)]"
                  onClick={() => navigate('/shifokorlar')}
                >
                  Hozir yozilish
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

