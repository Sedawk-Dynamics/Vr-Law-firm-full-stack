'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Check } from 'lucide-react'
import { getSession } from '@/lib/admin-auth'

interface SettingsState {
  profile: { name: string; email: string; title: string }
  seo: { siteTitle: string; siteDescription: string; metaImage: string }
  social: { linkedin: string; twitter: string; instagram: string; facebook: string }
  brand: { primary: string; accent: string; logoUrl: string }
  email: { fromName: string; fromEmail: string; smtpHost: string; smtpPort: string }
}

const DEFAULTS: SettingsState = {
  profile: { name: '', email: '', title: 'Editor' },
  seo: {
    siteTitle: 'VR Law Firm | Expert Legal Counsel',
    siteDescription:
      'Authoritative legal expertise in criminal litigation and civil matters.',
    metaImage: '',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/vr-law-firmm',
    twitter: 'https://x.com/vrlawfirm_/',
    instagram: 'https://www.instagram.com/vrlawfirmofficial/',
    facebook: 'https://www.facebook.com/vrlawfirm',
  },
  brand: { primary: '#0B1426', accent: '#D4AF37', logoUrl: '' },
  email: { fromName: 'VR Law Firm', fromEmail: 'support@vr-lawfirm.com', smtpHost: '', smtpPort: '587' },
}

export default function AdminSettingsPage() {
  const [state, setState] = useState<SettingsState>(DEFAULTS)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('vr_settings') : null
    if (raw) {
      try {
        setState({ ...DEFAULTS, ...JSON.parse(raw) })
      } catch {}
    }
    const { user } = getSession()
    if (user) {
      setState((s) => ({
        ...s,
        profile: { ...s.profile, name: user.name, email: user.email },
      }))
    }
  }, [])

  function update<K extends keyof SettingsState>(section: K, patch: Partial<SettingsState[K]>) {
    setState((s) => ({ ...s, [section]: { ...s[section], ...patch } }))
  }

  function save() {
    localStorage.setItem('vr_settings', JSON.stringify(state))
    setSaved(true)
    setTimeout(() => setSaved(false), 2400)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Configuration
          </p>
          <h1 className="text-ivory text-3xl lg:text-4xl font-light">Settings</h1>
        </div>
        <button
          onClick={save}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-gold-light transition-colors"
        >
          {saved ? <Check size={14} /> : <Save size={14} />}
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </motion.div>

      <Section title="Admin Profile" subtitle="Personal details that appear with published articles.">
        <FieldGrid>
          <Field label="Name">
            <Input value={state.profile.name} onChange={(v) => update('profile', { name: v })} />
          </Field>
          <Field label="Email">
            <Input value={state.profile.email} onChange={(v) => update('profile', { email: v })} />
          </Field>
          <Field label="Title">
            <Input value={state.profile.title} onChange={(v) => update('profile', { title: v })} />
          </Field>
        </FieldGrid>
      </Section>

      <Section title="Website SEO Defaults" subtitle="Used as fallback meta tags when posts do not set their own.">
        <Field label="Default Site Title">
          <Input value={state.seo.siteTitle} onChange={(v) => update('seo', { siteTitle: v })} />
        </Field>
        <Field label="Default Description">
          <Textarea
            value={state.seo.siteDescription}
            onChange={(v) => update('seo', { siteDescription: v })}
          />
        </Field>
        <Field label="Default OG Image URL">
          <Input value={state.seo.metaImage} onChange={(v) => update('seo', { metaImage: v })} />
        </Field>
      </Section>

      <Section title="Social Links" subtitle="Footer and share-card links.">
        <FieldGrid>
          <Field label="LinkedIn">
            <Input value={state.social.linkedin} onChange={(v) => update('social', { linkedin: v })} />
          </Field>
          <Field label="Twitter / X">
            <Input value={state.social.twitter} onChange={(v) => update('social', { twitter: v })} />
          </Field>
          <Field label="Instagram">
            <Input
              value={state.social.instagram}
              onChange={(v) => update('social', { instagram: v })}
            />
          </Field>
          <Field label="Facebook">
            <Input value={state.social.facebook} onChange={(v) => update('social', { facebook: v })} />
          </Field>
        </FieldGrid>
      </Section>

      <Section title="Brand Settings" subtitle="Brand colour tokens and primary logo.">
        <FieldGrid>
          <Field label="Primary (Navy)">
            <ColorInput value={state.brand.primary} onChange={(v) => update('brand', { primary: v })} />
          </Field>
          <Field label="Accent (Gold)">
            <ColorInput value={state.brand.accent} onChange={(v) => update('brand', { accent: v })} />
          </Field>
          <Field label="Logo URL">
            <Input value={state.brand.logoUrl} onChange={(v) => update('brand', { logoUrl: v })} />
          </Field>
        </FieldGrid>
      </Section>

      <Section title="Email Settings" subtitle="Transactional and lead-form delivery (Supabase / SMTP).">
        <FieldGrid>
          <Field label="From Name">
            <Input value={state.email.fromName} onChange={(v) => update('email', { fromName: v })} />
          </Field>
          <Field label="From Email">
            <Input value={state.email.fromEmail} onChange={(v) => update('email', { fromEmail: v })} />
          </Field>
          <Field label="SMTP Host">
            <Input value={state.email.smtpHost} onChange={(v) => update('email', { smtpHost: v })} />
          </Field>
          <Field label="SMTP Port">
            <Input value={state.email.smtpPort} onChange={(v) => update('email', { smtpPort: v })} />
          </Field>
        </FieldGrid>
      </Section>
    </div>
  )
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 rounded p-6 lg:p-8"
    >
      <div className="mb-6 pb-5 border-b border-ivory/10">
        <h2 className="text-ivory text-xl font-light mb-1">{title}</h2>
        {subtitle && (
          <p
            className="text-ivory/45 text-sm"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </motion.section>
  )
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="block text-gold text-[10px] tracking-[0.28em] uppercase mb-2"
        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
      >
        {label}
      </span>
      {children}
    </label>
  )
}

function Input({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[oklch(0.14_0.02_255)] border border-ivory/15 focus:border-gold rounded px-3 py-2.5 text-ivory text-sm outline-none transition-colors"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    />
  )
}

function Textarea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={3}
      className="w-full bg-[oklch(0.14_0.02_255)] border border-ivory/15 focus:border-gold rounded px-3 py-2.5 text-ivory text-sm outline-none transition-colors resize-none"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    />
  )
}

function ColorInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded bg-transparent border border-ivory/15 cursor-pointer"
      />
      <Input value={value} onChange={onChange} />
    </div>
  )
}
