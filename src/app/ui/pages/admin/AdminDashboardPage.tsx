import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeftOnRectangleIcon,
  BuildingOffice2Icon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useSite } from '../../../core/useSite'
import type { Doctor, DoctorSpecialty, Service, ServiceCategory, SiteSettings } from '../../../core/types'
import { setAdminAuthed } from '../../../core/storage'

type TabId = 'settings' | 'doctors' | 'services'

const specialties: DoctorSpecialty[] = [
  'Kardiolog',
  'Oftalmolog',
  'Nevrolog',
  'Pediatr',
  'Ginekolog',
  'Stomatolog',
  'Ortoped',
  'Endokrinolog',
  'Umumiy jarroh',
]

const categories: ServiceCategory[] = [
  'Oftalmologiya',
  'Kardiologiya',
  'Nevrologiya',
  'Pediatriya',
  'Ginekologiya',
  'Stomatologiya',
  'Xirurgiya',
  'Laboratoriya',
]

function fmtUzs(n: number) {
  return n.toLocaleString('uz-UZ')
}

export function AdminDashboardPage() {
  const { settings, setSettings, doctors, setDoctors, services, setServices } = useSite()
  const navigate = useNavigate()
  const [tab, setTab] = useState<TabId>('settings')

  const [draftSettings, setDraftSettings] = useState<SiteSettings>(settings)
  const settingsDirty = useMemo(
    () => JSON.stringify(draftSettings) !== JSON.stringify(settings),
    [draftSettings, settings],
  )

  const [doctorCreateOpen, setDoctorCreateOpen] = useState(false)
  const [doctorDraft, setDoctorDraft] = useState<Doctor>(() => ({
    id: crypto.randomUUID(),
    fullName: '',
    title: 'Mutaxassis',
    specialty: 'Kardiolog',
    years: 5,
    rating: 4.9,
    reviewsCount: 0,
    badge: 'Mutaxassis',
    imageUrl:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80',
    bio: '',
    certificates: [{ title: 'Sertifikat', subtitle: '2024' }],
    education: [{ title: 'Tibbiyot Akademiyasi', subtitle: '2012–2018' }],
    directions: [
      { icon: 'heart', label: 'Konsultatsiya' },
      { icon: 'shield', label: 'Diagnostika' },
      { icon: 'spark', label: 'Profilaktika' },
      { icon: 'plus', label: 'Reabilitatsiya' },
    ],
    addressLine: draftSettings.contact.addressLine1,
    branchName: settings.siteName,
    priceUzs: 250_000,
  }))

  const [editingServiceId, setEditingServiceId] = useState<string | null>(null)
  const [serviceEdit, setServiceEdit] = useState<Service | null>(null)

  return (
    <div className="min-h-screen bg-soft-grid">
      <header className="sticky top-0 z-40 border-b border-[rgba(15,76,129,0.10)] bg-white/85 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary-strong)]">
              <BuildingOffice2Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[14px] font-extrabold text-[var(--text-strong)]">
                Admin panel
              </div>
              <div className="text-[12px] text-[var(--muted)]">{settings.siteName}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn-ghost focus-ring h-10 px-4 text-[12px] font-semibold"
              onClick={() => navigate('/')}
            >
              Saytga o‘tish
            </button>
            <button
              type="button"
              className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[12px] font-semibold text-[var(--primary-strong)] transition hover:bg-[rgba(11,90,146,0.06)]"
              onClick={() => {
                setAdminAuthed(false)
                navigate('/admin', { replace: true })
              }}
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <main className="container-page py-8">
        <div className="grid gap-5 md:grid-cols-[260px_1fr] md:items-start">
          <aside className="card p-4">
            {(
              [
                { id: 'settings', label: 'Sozlamalar', icon: BuildingOffice2Icon },
                { id: 'doctors', label: 'Shifokorlar', icon: UserGroupIcon },
                { id: 'services', label: 'Xizmatlar', icon: ClipboardDocumentListIcon },
              ] as const
            ).map((t) => {
              const active = tab === t.id
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  type="button"
                  className={clsx(
                    'focus-ring flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[12px] font-semibold transition',
                    active
                      ? 'bg-[var(--primary-strong)] text-white'
                      : 'text-[var(--text-strong)] hover:bg-[rgba(11,90,146,0.06)]',
                  )}
                  onClick={() => setTab(t.id)}
                >
                  <Icon className={clsx('h-5 w-5', active ? 'text-white' : 'text-[var(--primary)]')} />
                  {t.label}
                </button>
              )
            })}
          </aside>

          <section className="space-y-5">
            {tab === 'settings' ? (
              <div className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[16px] font-extrabold text-[var(--text-strong)]">
                      Sayt sozlamalari
                    </div>
                    <div className="mt-1 text-[12px] text-[var(--muted)]">
                      Bu yerda nom, manzil, telefon, ish tartibi va boshqa umumiy ma’lumotlarni o‘zgartirasiz.
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={!settingsDirty}
                      className={clsx(
                        'focus-ring inline-flex h-10 items-center gap-2 rounded-full px-4 text-[12px] font-semibold transition',
                        settingsDirty
                          ? 'btn-primary'
                          : 'cursor-not-allowed border border-[rgba(15,76,129,0.12)] bg-white text-[var(--muted)]',
                      )}
                      onClick={() => setSettings(draftSettings)}
                    >
                      <CheckIcon className="h-4 w-4" />
                      Saqlash
                    </button>
                    <button
                      type="button"
                      className="btn-ghost focus-ring h-10 px-4 text-[12px] font-semibold"
                      onClick={() => setDraftSettings(settings)}
                    >
                      Bekor qilish
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <label className="text-left">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Sayt nomi</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.siteName}
                      onChange={(e) => setDraftSettings((s) => ({ ...s, siteName: e.target.value }))}
                    />
                  </label>
                  <label className="text-left">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Tagline</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.tagline}
                      onChange={(e) => setDraftSettings((s) => ({ ...s, tagline: e.target.value }))}
                    />
                  </label>

                  <label className="text-left md:col-span-2">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Manzil (1-qator)</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.contact.addressLine1}
                      onChange={(e) =>
                        setDraftSettings((s) => ({
                          ...s,
                          contact: { ...s.contact, addressLine1: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label className="text-left md:col-span-2">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Manzil (2-qator)</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.contact.addressLine2 ?? ''}
                      onChange={(e) =>
                        setDraftSettings((s) => ({
                          ...s,
                          contact: { ...s.contact, addressLine2: e.target.value || undefined },
                        }))
                      }
                    />
                  </label>
                  <label className="text-left">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Telefon 1</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.contact.phone1}
                      onChange={(e) =>
                        setDraftSettings((s) => ({
                          ...s,
                          contact: { ...s.contact, phone1: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label className="text-left">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Telefon 2</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.contact.phone2 ?? ''}
                      onChange={(e) =>
                        setDraftSettings((s) => ({
                          ...s,
                          contact: { ...s.contact, phone2: e.target.value || undefined },
                        }))
                      }
                    />
                  </label>
                  <label className="text-left">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Ish tartibi (hafta)</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.contact.workHoursWeek}
                      onChange={(e) =>
                        setDraftSettings((s) => ({
                          ...s,
                          contact: { ...s.contact, workHoursWeek: e.target.value },
                        }))
                      }
                    />
                  </label>
                  <label className="text-left">
                    <div className="text-[11px] font-semibold text-[var(--muted)]">Ish tartibi (dam olish)</div>
                    <input
                      className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                      value={draftSettings.contact.workHoursWeekend}
                      onChange={(e) =>
                        setDraftSettings((s) => ({
                          ...s,
                          contact: { ...s.contact, workHoursWeekend: e.target.value },
                        }))
                      }
                    />
                  </label>
                </div>
              </div>
            ) : null}

            {tab === 'doctors' ? (
              <div className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[16px] font-extrabold text-[var(--text-strong)]">
                      Shifokorlar
                    </div>
                    <div className="mt-1 text-[12px] text-[var(--muted)]">
                      Card qo‘shish/o‘chirish va ma’lumotlarni tahrirlash.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-primary focus-ring inline-flex h-10 items-center gap-2 px-4 text-[12px] font-semibold"
                    onClick={() => {
                      setDoctorDraft((d) => ({ ...d, id: crypto.randomUUID() }))
                      setDoctorCreateOpen(true)
                    }}
                  >
                    <PlusIcon className="h-4 w-4" />
                    Qo‘shish
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {doctors.map((d) => (
                    <div key={d.id} className="card overflow-hidden">
                      <div className="relative h-[120px] overflow-hidden">
                        <img src={d.imageUrl} alt="" className="h-full w-full object-cover" />
                        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-[var(--primary-strong)]">
                          {d.specialty}
                        </div>
                      </div>
                      <div className="p-4 text-left">
                        <div className="text-[13px] font-extrabold text-[var(--text-strong)]">
                          {d.fullName}
                        </div>
                        <div className="mt-1 text-[12px] text-[var(--muted)]">{d.title}</div>

                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            className="btn-ghost focus-ring inline-flex h-9 flex-1 items-center justify-center gap-2 text-[12px] font-semibold"
                            onClick={() => {
                              setDoctorDraft(d)
                              setDoctorCreateOpen(true)
                            }}
                          >
                            <PencilSquareIcon className="h-4 w-4" /> Tahrirlash
                          </button>
                          <button
                            type="button"
                            className="focus-ring inline-flex h-9 w-12 items-center justify-center rounded-2xl border border-[rgba(242,0,0,0.18)] bg-[rgba(242,0,0,0.06)] text-[rgb(154,28,28)] transition hover:bg-[rgba(242,0,0,0.10)]"
                            onClick={() => setDoctors(doctors.filter((x) => x.id !== d.id))}
                            aria-label="O‘chirish"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {doctorCreateOpen ? (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                      className="absolute inset-0 bg-[rgba(12,47,74,0.38)]"
                      onClick={() => setDoctorCreateOpen(false)}
                    />
                    <div className="relative card w-full max-w-2xl p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[15px] font-extrabold text-[var(--text-strong)]">
                            Shifokor ma’lumoti
                          </div>
                          <div className="mt-1 text-[12px] text-[var(--muted)]">
                            Rasm URL’ini keyin o‘zingiz almashtirasiz.
                          </div>
                        </div>
                        <button
                          type="button"
                          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white text-[var(--muted)] hover:bg-[rgba(11,90,146,0.06)]"
                          onClick={() => setDoctorCreateOpen(false)}
                          aria-label="Yopish"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <label className="text-left md:col-span-2">
                          <div className="text-[11px] font-semibold text-[var(--muted)]">To‘liq ism</div>
                          <input
                            className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                            value={doctorDraft.fullName}
                            onChange={(e) => setDoctorDraft((d) => ({ ...d, fullName: e.target.value }))}
                          />
                        </label>

                        <label className="text-left">
                          <div className="text-[11px] font-semibold text-[var(--muted)]">Lavozim</div>
                          <input
                            className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                            value={doctorDraft.title}
                            onChange={(e) => setDoctorDraft((d) => ({ ...d, title: e.target.value }))}
                          />
                        </label>

                        <label className="text-left">
                          <div className="text-[11px] font-semibold text-[var(--muted)]">Mutaxassislik</div>
                          <select
                            className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                            value={doctorDraft.specialty}
                            onChange={(e) => setDoctorDraft((d) => ({ ...d, specialty: e.target.value as DoctorSpecialty }))}
                          >
                            {specialties.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </label>

                        <label className="text-left">
                          <div className="text-[11px] font-semibold text-[var(--muted)]">Tajriba (yil)</div>
                          <input
                            className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                            type="number"
                            min={0}
                            value={doctorDraft.years}
                            onChange={(e) => setDoctorDraft((d) => ({ ...d, years: Number(e.target.value) }))}
                          />
                        </label>
                        <label className="text-left">
                          <div className="text-[11px] font-semibold text-[var(--muted)]">Narx (UZS)</div>
                          <input
                            className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                            type="number"
                            min={0}
                            value={doctorDraft.priceUzs}
                            onChange={(e) => setDoctorDraft((d) => ({ ...d, priceUzs: Number(e.target.value) }))}
                          />
                        </label>

                        <label className="text-left md:col-span-2">
                          <div className="text-[11px] font-semibold text-[var(--muted)]">Rasm URL</div>
                          <input
                            className="focus-ring mt-2 h-11 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 text-[13px] text-[var(--text-strong)]"
                            value={doctorDraft.imageUrl}
                            onChange={(e) => setDoctorDraft((d) => ({ ...d, imageUrl: e.target.value }))}
                          />
                        </label>

                        <label className="text-left md:col-span-2">
                          <div className="text-[11px] font-semibold text-[var(--muted)]">Bio</div>
                          <textarea
                            className="focus-ring mt-2 min-h-[100px] w-full resize-none rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-4 py-3 text-[13px] text-[var(--text-strong)]"
                            value={doctorDraft.bio}
                            onChange={(e) => setDoctorDraft((d) => ({ ...d, bio: e.target.value }))}
                          />
                        </label>
                      </div>

                      <div className="mt-6 flex justify-end gap-2">
                        <button
                          type="button"
                          className="btn-ghost focus-ring h-10 px-4 text-[12px] font-semibold"
                          onClick={() => setDoctorCreateOpen(false)}
                        >
                          Yopish
                        </button>
                        <button
                          type="button"
                          className="btn-primary focus-ring h-10 px-5 text-[12px] font-semibold"
                          onClick={() => {
                            const exists = doctors.some((x) => x.id === doctorDraft.id)
                            if (exists) {
                              setDoctors(doctors.map((x) => (x.id === doctorDraft.id ? doctorDraft : x)))
                            } else {
                              setDoctors([doctorDraft, ...doctors])
                            }
                            setDoctorCreateOpen(false)
                          }}
                        >
                          Saqlash
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {tab === 'services' ? (
              <div className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[16px] font-extrabold text-[var(--text-strong)]">Xizmatlar</div>
                    <div className="mt-1 text-[12px] text-[var(--muted)]">
                      Narxlar va kategoriyalarni o‘zgartirish.
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-primary focus-ring inline-flex h-10 items-center gap-2 px-4 text-[12px] font-semibold"
                    onClick={() => {
                      const s: Service = {
                        id: crypto.randomUUID(),
                        title: 'Yangi xizmat',
                        category: 'Kardiologiya',
                        priceFromUzs: 100_000,
                        unit: 'dan',
                      }
                      setServices([s, ...services])
                    }}
                  >
                    <PlusIcon className="h-4 w-4" /> Qo‘shish
                  </button>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[rgba(15,76,129,0.12)] bg-white">
                  <div className="grid grid-cols-[1fr_170px_140px_130px] gap-0 border-b border-[rgba(15,76,129,0.10)] bg-[rgba(11,90,146,0.04)] px-4 py-3 text-[11px] font-extrabold text-[var(--muted)]">
                    <div>Xizmat</div>
                    <div>Tur</div>
                    <div>Narx</div>
                    <div></div>
                  </div>

                  {services.map((s) => {
                    const isEditing = editingServiceId === s.id
                    const edit = isEditing ? serviceEdit : null
                    return (
                      <div key={s.id} className="grid grid-cols-[1fr_170px_140px_130px] items-center gap-0 px-4 py-3 text-[12px] text-[var(--muted)]">
                        <div className="font-semibold text-[var(--text-strong)]">
                          {isEditing ? (
                            <input
                              className="focus-ring h-10 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-3 text-[13px] text-[var(--text-strong)]"
                              value={edit?.title ?? ''}
                              onChange={(e) => setServiceEdit((v) => (v ? { ...v, title: e.target.value } : v))}
                            />
                          ) : (
                            s.title
                          )}
                        </div>
                        <div>
                          {isEditing ? (
                            <select
                              className="focus-ring h-10 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-3 text-[13px] text-[var(--text-strong)]"
                              value={edit?.category ?? 'Kardiologiya'}
                              onChange={(e) =>
                                setServiceEdit((v) =>
                                  v ? { ...v, category: e.target.value as ServiceCategory } : v,
                                )
                              }
                            >
                              {categories.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          ) : (
                            s.category
                          )}
                        </div>
                        <div className="font-semibold text-[var(--primary-strong)]">
                          {isEditing ? (
                            <input
                              className="focus-ring h-10 w-full rounded-2xl border border-[rgba(15,76,129,0.14)] bg-white px-3 text-[13px] text-[var(--text-strong)]"
                              type="number"
                              min={0}
                              value={edit?.priceFromUzs ?? 0}
                              onChange={(e) =>
                                setServiceEdit((v) => (v ? { ...v, priceFromUzs: Number(e.target.value) } : v))
                              }
                            />
                          ) : (
                            `${fmtUzs(s.priceFromUzs)} UZS`
                          )}
                        </div>
                        <div className="flex justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                className="btn-primary focus-ring inline-flex h-9 items-center gap-2 px-4 text-[12px] font-semibold"
                                onClick={() => {
                                  if (!serviceEdit) return
                                  setServices(services.map((x) => (x.id === serviceEdit.id ? serviceEdit : x)))
                                  setEditingServiceId(null)
                                  setServiceEdit(null)
                                }}
                              >
                                <CheckIcon className="h-4 w-4" /> Saqlash
                              </button>
                              <button
                                type="button"
                                className="btn-ghost focus-ring inline-flex h-9 items-center gap-2 px-4 text-[12px] font-semibold"
                                onClick={() => {
                                  setEditingServiceId(null)
                                  setServiceEdit(null)
                                }}
                              >
                                Bekor
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn-ghost focus-ring inline-flex h-9 items-center gap-2 px-4 text-[12px] font-semibold"
                                onClick={() => {
                                  setEditingServiceId(s.id)
                                  setServiceEdit(s)
                                }}
                              >
                                <PencilSquareIcon className="h-4 w-4" /> Edit
                              </button>
                              <button
                                type="button"
                                className="focus-ring inline-flex h-9 w-11 items-center justify-center rounded-2xl border border-[rgba(242,0,0,0.18)] bg-[rgba(242,0,0,0.06)] text-[rgb(154,28,28)] transition hover:bg-[rgba(242,0,0,0.10)]"
                                onClick={() => setServices(services.filter((x) => x.id !== s.id))}
                                aria-label="O‘chirish"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  )
}

