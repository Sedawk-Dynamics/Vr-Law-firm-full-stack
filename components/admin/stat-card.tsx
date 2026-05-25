'use client'

import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'

export function StatCard({
  label,
  value,
  Icon,
  trend,
  index = 0,
}: {
  label: string
  value: string | number
  Icon: LucideIcon
  trend?: { value: number; direction: 'up' | 'down' }
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 hover:border-gold/30 transition-colors p-6 rounded relative overflow-hidden group"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors duration-500" />
      <div className="relative flex items-start justify-between mb-5">
        <p
          className="text-ivory/45 text-[10px] tracking-[0.25em] uppercase"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {label}
        </p>
        <div className="w-9 h-9 rounded bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
          <Icon size={16} />
        </div>
      </div>
      <p className="text-ivory text-3xl lg:text-4xl font-light leading-none mb-3">{value}</p>
      {trend && (
        <p
          className={`inline-flex items-center gap-1 text-xs ${
            trend.direction === 'up' ? 'text-gold' : 'text-red-400/80'
          }`}
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          {trend.direction === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {trend.value}% vs last month
        </p>
      )}
    </motion.div>
  )
}
