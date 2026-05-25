'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Search,
  PlusCircle,
  ChevronRight,
} from 'lucide-react'
import { clearSession, getSession, type AdminUser } from '@/lib/admin-auth'

const NAV = [
  { href: '/admin/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/admin/blogs', label: 'Blogs', Icon: FileText },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [ready, setReady] = useState(false)
  const [search, setSearch] = useState('')

  const isLogin = pathname === '/admin/login'

  useEffect(() => {
    const { token, user } = getSession()
    if (!isLogin && !token) {
      router.replace('/admin/login')
      return
    }
    if (isLogin && token) {
      router.replace('/admin/dashboard')
      return
    }
    setUser(user)
    setReady(true)
  }, [isLogin, router, pathname])

  if (isLogin) {
    return <>{children}</>
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-ivory/40 text-sm tracking-[0.25em] uppercase">
          Loading…
        </div>
      </div>
    )
  }

  function logout() {
    clearSession()
    router.replace('/admin/login')
  }

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = search.trim()
    router.push(q ? `/admin/blogs?q=${encodeURIComponent(q)}` : '/admin/blogs')
  }

  return (
    <div className="min-h-screen bg-navy text-ivory flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-ivory/10 bg-[oklch(0.11_0.018_255)] sticky top-0 h-screen">
        <SidebarContent pathname={pathname} onLogout={logout} user={user} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-72 bg-[oklch(0.11_0.018_255)] border-r border-ivory/10 z-50 lg:hidden flex flex-col"
            >
              <SidebarContent
                pathname={pathname}
                onLogout={logout}
                user={user}
                onNavigate={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="border-b border-ivory/10 bg-navy/95 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center justify-between px-5 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-ivory p-1.5 hover:text-gold transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <Breadcrumb pathname={pathname} />
            </div>
            <div className="flex items-center gap-3">
              <form onSubmit={onSearchSubmit} className="relative hidden md:block" role="search">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40"
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search blogs…"
                  aria-label="Search blogs"
                  className="bg-ivory/5 border border-ivory/10 focus:border-gold pl-9 pr-4 py-2 text-ivory text-sm outline-none transition-colors rounded placeholder:text-ivory/40 w-56"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                />
              </form>
              <Link
                href="/admin/blogs/create"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-gold text-navy text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-gold-light transition-colors rounded"
              >
                <PlusCircle size={14} />
                New Blog
              </Link>
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-ivory/10">
                <div className="text-right">
                  <p className="text-ivory text-sm font-medium leading-tight">
                    {user?.name ?? 'Admin'}
                  </p>
                  <p
                    className="text-ivory/40 text-[10px] tracking-[0.2em] uppercase"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    Admin
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-medium text-sm">
                  {(user?.name ?? 'A').slice(0, 1).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function SidebarContent({
  pathname,
  onLogout,
  user,
  onNavigate,
}: {
  pathname: string
  onLogout: () => void
  user: AdminUser | null
  onNavigate?: () => void
}) {
  return (
    <>
      <div className="p-6 border-b border-ivory/10 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={onNavigate}>
          <div className="w-9 h-9 bg-gold flex items-center justify-center text-navy font-serif text-lg leading-none">
            VR
          </div>
          <div>
            <p className="text-ivory text-sm font-medium leading-tight">VR Law Firm</p>
            <p
              className="text-gold text-[9px] tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              CMS Admin
            </p>
          </div>
        </Link>
        {onNavigate && (
          <button
            onClick={onNavigate}
            className="text-ivory/40 hover:text-gold lg:hidden p-1"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-4 py-3 text-sm rounded transition-colors ${
                active
                  ? 'bg-gold/10 text-gold border-l-2 border-gold pl-[14px]'
                  : 'text-ivory/65 hover:text-ivory hover:bg-ivory/5'
              }`}
              style={{ fontFamily: 'var(--font-inter), sans-serif' }}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-ivory/10">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-medium text-sm">
            {(user?.name ?? 'A').slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-ivory text-sm font-medium truncate">{user?.name ?? 'Admin'}</p>
            <p className="text-ivory/45 text-xs truncate">{user?.email ?? ''}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-ivory/55 hover:text-gold hover:bg-ivory/5 rounded transition-colors"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </>
  )
}

function Breadcrumb({ pathname }: { pathname: string }) {
  const parts = pathname.split('/').filter(Boolean)
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-ivory/50"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={11} className="text-ivory/30" />}
          <span className={i === parts.length - 1 ? 'text-gold' : 'text-ivory/50'}>
            {p.replace(/-/g, ' ')}
          </span>
        </span>
      ))}
    </nav>
  )
}
