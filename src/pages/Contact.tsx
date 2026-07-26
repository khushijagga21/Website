import { useState } from 'react'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { FiMail, FiArrowUpRight, FiMapPin } from 'react-icons/fi'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useMagnetic } from '../hooks/useMagnetic'
import { CONTACT, contactLinks } from '../config/contact'

function formatPhoneE164(e164: string) {
  const s = e164.replace(/\D/g, '')
  if (s.startsWith('91') && s.length === 12) {
    const local = s.slice(2)
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`
  }
  return `+${s}`
}

const CHANNELS = [
  {
    key: 'whatsapp',
    tag: 'Chat',
    title: 'WhatsApp',
    value: formatPhoneE164(CONTACT.whatsappNumber),
    icon: FaWhatsapp,
    color: 'var(--sage)',
    href: contactLinks.whatsapp('Hello ARQO, I would like to discuss a project.'),
  },
  {
    key: 'instagram',
    tag: 'Follow',
    title: 'Instagram',
    value: `@${CONTACT.instagramHandle}`,
    icon: FaInstagram,
    color: 'var(--terracotta)',
    href: contactLinks.instagram(),
  },
  {
    key: 'email',
    tag: 'Write',
    title: 'Email',
    value: CONTACT.email,
    icon: FiMail,
    color: 'var(--steel)',
    href: contactLinks.email('Project Inquiry — ARQO'),
  },
  {
    key: 'location',
    tag: 'Visit',
    title: 'Location',
    value: CONTACT.location,
    icon: FiMapPin,
    color: 'var(--gold)',
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.location)}`,
  },
] as const

function ChannelCard({
  channel,
}: {
  channel: (typeof CHANNELS)[number]
}) {
  const Icon = channel.icon
  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      data-cursor="hover"
      className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--glass))] px-3.5 py-2 backdrop-blur-xl transition-all duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1"
      style={{
        boxShadow: '0 0 0 1px rgb(var(--border)), 0 16px 40px rgb(var(--shadow))',
      }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute -inset-16"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgb(${channel.color} / 0.28), transparent 60%)`,
          }}
        />
      </div>

      <span
        className="relative grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[rgb(var(--border))] text-base"
        style={{
          color: `rgb(${channel.color})`,
          background: `rgb(${channel.color} / 0.08)`,
        }}
      >
        <Icon />
      </span>

      <div className="relative min-w-0 flex-1 leading-tight">
        <span className="text-[9px] tracking-[0.22em] text-[rgb(var(--muted))]">
          {channel.tag.toUpperCase()}
        </span>
        <h3 className="font-[var(--font-display)] text-[0.95rem] font-normal tracking-[-0.01em]">
          {channel.title}
        </h3>
        <p className="text-[12px] leading-snug text-[rgb(var(--muted))]">
          {channel.value}
        </p>
      </div>

      <FiArrowUpRight className="relative shrink-0 text-base text-[rgb(var(--muted))] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[rgb(var(--text))]" />
    </a>
  )
}

export function Contact() {
  const channelsRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 })
  const formRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08, variant: 'fade-up' })
  const waBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.18, scale: 1.03 })
  const mailBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.18, scale: 1.03 })

  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const composed = () => {
    const lines = [
      `Name: ${form.name || '—'}`,
      `Email: ${form.email || '—'}`,
      '',
      form.message || 'I would like to discuss a project.',
    ]
    return lines.join('\n')
  }

  const sendEmail = () => {
    const subject = `Project Inquiry from ${form.name || 'Website'} — ARQO`
    window.location.href = contactLinks.email(subject, composed())
  }

  const sendWhatsApp = () => {
    window.open(contactLinks.whatsapp(composed()), '_blank', 'noopener,noreferrer')
  }

  const inputClass =
    'w-full rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.5)] px-5 py-3.5 text-sm text-[rgb(var(--text))] outline-none transition-all duration-300 placeholder:text-[rgb(var(--muted))] focus:border-[rgb(var(--accent)/0.5)] focus:bg-[rgb(var(--surface)/0.8)]'

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-24 md:pt-32">
        <div
          className="relative overflow-hidden rounded-[36px] border border-[rgb(var(--border))] bg-[rgb(var(--glass))] backdrop-blur-xl"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--glass)), rgb(var(--surface2)/0.55))',
            boxShadow: '0 0 0 1px rgb(var(--border)), 0 48px 120px rgb(var(--shadow))',
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.14),transparent_62%)] blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgb(var(--accent2)/0.12),transparent_62%)] blur-3xl" />
          </div>

          <div className="relative grid gap-8 p-7 md:p-10 lg:grid-cols-12 lg:gap-10">
            {/* left column */}
            <div ref={channelsRef} className="lg:col-span-5">
              <p data-reveal className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">
                DIRECT
              </p>
              <h2
                data-reveal
                className="mt-3 font-[var(--font-display)] text-[clamp(1.6rem,3vw,2.2rem)] font-normal tracking-[-0.01em]"
              >
                Reach us instantly.
              </h2>
              <p
                data-reveal
                className="mt-3 max-w-sm text-[var(--text-body-lg)] leading-[1.8] text-[rgb(var(--muted))]"
              >
                WhatsApp, Instagram, or email—pick what’s easiest.
              </p>

              <div className="mt-5 flex flex-col gap-2">
                {CHANNELS.map((channel) => (
                  <ChannelCard key={channel.key} channel={channel} />
                ))}
              </div>
            </div>

            {/* right column */}
            <div ref={formRef} className="lg:col-span-7">
              <div
                data-reveal
                className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--surface)/0.35)] p-7 backdrop-blur-xl md:p-9"
                style={{ boxShadow: '0 0 0 1px rgb(var(--border)), 0 28px 70px rgb(var(--shadow))' }}
              >
                <p className="text-[11px] tracking-[0.32em] text-[rgb(var(--muted))]">SEND A MESSAGE</p>
                <h3 className="mt-3 font-[var(--font-display)] text-[clamp(1.35rem,2.4vw,1.9rem)] font-normal tracking-[-0.01em]">
                  Tell us about your project.
                </h3>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      className={inputClass}
                      placeholder="Your name"
                      value={form.name}
                      onChange={update('name')}
                      data-cursor="hover"
                    />
                    <input
                      className={inputClass}
                      placeholder="Your email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      data-cursor="hover"
                    />
                  </div>
                  <textarea
                    className={`${inputClass} min-h-[130px] resize-y`}
                    placeholder="Tell us a little about what you have in mind..."
                    value={form.message}
                    onChange={update('message')}
                    data-cursor="hover"
                  />
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    ref={waBtnRef}
                    type="button"
                    onClick={sendWhatsApp}
                    data-cursor="hover"
                    className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-[linear-gradient(135deg,rgb(var(--accent)),rgb(var(--glow)))] px-6 py-3.5 text-sm tracking-[0.16em] text-[rgb(var(--bg))] transition-transform duration-300 [transition-timing-function:var(--ease-out)] active:translate-y-[1px]"
                    style={{ boxShadow: '0 18px 50px rgb(var(--shadow)), 0 0 0 1px rgb(var(--border))' }}
                  >
                    <FaWhatsapp className="relative z-10 text-lg" />
                    <span className="relative z-10">Send via WhatsApp</span>
                    <span className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.25),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
                  </button>

                  <button
                    ref={mailBtnRef}
                    type="button"
                    onClick={sendEmail}
                    data-cursor="hover"
                    className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--glass))] px-6 py-3.5 text-sm tracking-[0.16em] text-[rgb(var(--text))] backdrop-blur-xl transition-transform duration-300 [transition-timing-function:var(--ease-out)] active:translate-y-[1px]"
                    style={{ boxShadow: '0 18px 50px rgb(var(--shadow)), 0 0 0 1px rgb(var(--border))' }}
                  >
                    <FiMail className="relative z-10 text-lg" />
                    <span className="relative z-10">Send via Email</span>
                    <span className="absolute inset-0 -translate-x-[120%] bg-[linear-gradient(90deg,transparent,rgb(var(--accent)/0.15),transparent)] transition-transform duration-700 group-hover:translate-x-[120%]" />
                  </button>
                </div>

                <p className="mt-3 text-[13px] leading-relaxed text-[rgb(var(--muted))]">
                  This opens WhatsApp or your email app with details pre-filled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}
