'use client'

const TOKEN_KEY = 'vr_admin_token'
const USER_KEY = 'vr_admin_user'

export interface AdminUser {
  email: string
  name: string
  role: 'admin'
}

export function setSession(user: AdminUser, token = 'mock-token') {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getSession(): { token: string | null; user: AdminUser | null } {
  if (typeof window === 'undefined') return { token: null, user: null }
  const token = localStorage.getItem(TOKEN_KEY)
  const rawUser = localStorage.getItem(USER_KEY)
  let user: AdminUser | null = null
  if (rawUser) {
    try {
      user = JSON.parse(rawUser) as AdminUser
    } catch {}
  }
  return { token, user }
}

export function clearSession() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAuthenticated(): boolean {
  return Boolean(getSession().token)
}
