'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react'
import { setSession } from '@/lib/admin-auth'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 700))
      const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      setSession({ email, name: name || 'Admin', role: 'admin' })
      router.replace('/admin/dashboard')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-navy text-ivory relative overflow-hidden flex items-center justify-center px-6 py-12">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, oklch(0.65 0.12 70 / 0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.65 0.12 70 / 0.12) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-gold/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-7">
            <div className="w-12 h-12 bg-gold flex items-center justify-center text-navy font-serif text-xl leading-none">
              VR
            </div>
          </Link>
          <p
            className="text-gold text-[11px] tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            CMS Administration
          </p>
          <h1 className="text-ivory text-3xl lg:text-4xl font-light">
            Welcome back
          </h1>
          <p
            className="text-ivory/50 text-sm mt-2"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Sign in to manage editorial content.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={onSubmit}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded p-8 shadow-2xl"
        >
          {error && (
            <div className="mb-5 px-3 py-2.5 border border-red-400/30 bg-red-400/5 text-red-300 text-sm rounded">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label
              className="block text-gold text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Email
            </label>
            <div className="relative">
              <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@vr-lawfirm.com"
                className="w-full bg-white/[0.04] border border-white/10 focus:border-gold pl-11 pr-4 py-3 text-ivory text-sm outline-none transition-colors rounded placeholder:text-ivory/35"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              className="block text-gold text-[10px] tracking-[0.3em] uppercase mb-2"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Password
            </label>
            <div className="relative">
              <Lock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" />
              <input
                type={show ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.04] border border-white/10 focus:border-gold pl-11 pr-12 py-3 text-ivory text-sm outline-none transition-colors rounded placeholder:text-ivory/35"
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/45 hover:text-gold"
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-7">
            <label className="inline-flex items-center gap-2 cursor-pointer text-ivory/65 text-xs">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="accent-gold"
              />
              <span style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-gold/80 hover:text-gold text-xs"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-gold text-navy text-[11px] tracking-[0.28em] uppercase font-medium rounded hover:bg-gold-light transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={14} />
              </>
            )}
          </button>

          <p
            className="text-center text-ivory/35 text-xs mt-6"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Authorised personnel only. All activity is logged.
          </p>
        </motion.form>

        <Link
          href="/"
          className="block text-center text-ivory/45 hover:text-gold text-[11px] tracking-[0.22em] uppercase mt-8 transition-colors"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          ← Back to website
        </Link>
      </motion.div>
    </main>
  )
}
