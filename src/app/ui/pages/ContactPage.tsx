import { useState } from 'react'
import {
  ClockIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FadeIn } from '../components/FadeIn'
import { useSite } from '../../core/useSite'

const mapImg =
  'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1600&q=80'

type ContactDraft = {
  fullName: string
  phone: string
  message: string
}

export function ContactPage() {
  const { settings } = useSite()
  const [draft, setDraft] = useState<ContactDraft>({
    fullName: '',
    phone: '',
    message: '',
  })
  const [sent, setSent] = useState(false)

  return (
    <div className="container-page">
      <section className="pt-10 md:pt-12">
        <FadeIn>
          <div className="text-left">
            <div className="text-[12px] font-semibold text-[var(--primary-strong)]">
              Biz bilan bog‘laning
            </div>
            <div className="mt-2 text-[13px] text-[var(--muted)]">
              Sizning sog‘lig‘ingiz — bizning ustuvor vazifamiz. Savollaringiz bormi?
              Mutaxassislarimiz yordam berishga tayyor.
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mt-6 pb-14">
        <div className="grid gap-5 md:grid-cols-[380px_1fr] md:items-start">
          <div className="space-y-5">
            <FadeIn delay={0.02}>
              <div className="card p-6 text-left">
                <div className="space-y-4 text-[12px] text-[var(--muted)]">
                  <div className="flex gap-3">
                    <MapPinIcon className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                    <div>
                      <div className="text-[11px] font-extrabold tracking-wide text-[var(--muted)]">
                        MANZIL
                      </div>
                      <div className="mt-1 font-semibold text-[var(--text-strong)]">
                        {settings.contact.addressLine2 ?? 'Toshkent shahri'}
                      </div>
                      <div>{settings.contact.addressLine1}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <PhoneIcon className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                    <div>
                      <div className="text-[11px] font-extrabold tracking-wide text-[var(--muted)]">
                        TELEFON
                      </div>
                      <div className="mt-1 font-semibold text-[var(--text-strong)]">
                        {settings.contact.phone2 ?? settings.contact.phone1}
                      </div>
                      <div>{settings.contact.phone1}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <ClockIcon className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                    <div>
                      <div className="text-[11px] font-extrabold tracking-wide text-[var(--muted)]">
                        ISH TARTIBI
                      </div>
                      <div className="mt-1 font-semibold text-[var(--text-strong)]">
                        {settings.contact.workHoursWeek}
                      </div>
                      <div>{settings.contact.workHoursWeekend}</div>
                    </div>
                  </div>

                  {settings.contact.email ? (
                    <div className="flex gap-3">
                      <EnvelopeIcon className="mt-0.5 h-5 w-5 text-[var(--primary)]" />
                      <div>
                        <div className="text-[11px] font-extrabold tracking-wide text-[var(--muted)]">
                          EMAIL
                        </div>
                        <div className="mt-1 font-semibold text-[var(--text-strong)]">
                          {settings.contact.email}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.04}>
              <div className="card p-6 text-left">
                <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
                  Savolingiz bormi?
                </div>
                <form
                  className="mt-5 space-y-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSent(true)
                    setTimeout(() => setSent(false), 2200)
                    setDraft({ fullName: '', phone: '', message: '' })
                  }}
                >
                  <input
                    className="focus-ring h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                    placeholder="Ism-familiya"
                    value={draft.fullName}
                    onChange={(e) => setDraft((d) => ({ ...d, fullName: e.target.value }))}
                    required
                  />
                  <input
                    className="focus-ring h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                    placeholder="Telefon raqam"
                    value={draft.phone}
                    onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                    required
                  />
                  <textarea
                    className="focus-ring min-h-[110px] w-full resize-none rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 py-3 text-[13px] text-[var(--text-strong)]"
                    placeholder="Xabaringiz..."
                    value={draft.message}
                    onChange={(e) => setDraft((d) => ({ ...d, message: e.target.value }))}
                    required
                  />

                  <button
                    type="submit"
                    className="btn-primary focus-ring h-11 w-full text-[13px] font-semibold"
                  >
                    Xabarni yuborish
                  </button>

                  <div
                    className={clsx(
                      'text-center text-[12px] font-semibold',
                      sent ? 'text-[var(--success)]' : 'text-[var(--muted)]',
                    )}
                  >
                    {sent ? 'Xabar yuborildi.' : 'Javob uchun operatorimiz bog‘lanadi.'}
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.03}>
            <div className="card overflow-hidden">
              <div className="relative h-[520px]">
                <img src={mapImg} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,47,74,0.22)] via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="card-soft flex items-center justify-between gap-4 px-5 py-4">
                    <div className="text-left">
                      <div className="text-[12px] font-extrabold text-[var(--text-strong)]">
                        Yo‘nalishni hisoblash
                      </div>
                      <div className="mt-1 text-[12px] text-[var(--muted)]">
                        Eng qulay yo‘lni xaritada ko‘ring
                      </div>
                    </div>
                    <button type="button" className="btn-primary focus-ring h-11 px-5 text-[12px] font-extrabold">
                      Yo‘nalishni olish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

