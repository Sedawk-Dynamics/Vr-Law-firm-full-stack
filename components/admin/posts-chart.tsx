'use client'

import { motion } from 'framer-motion'
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const monthlyData = [
  { month: 'Dec', posts: 2, views: 380 },
  { month: 'Jan', posts: 4, views: 612 },
  { month: 'Feb', posts: 3, views: 521 },
  { month: 'Mar', posts: 5, views: 1567 },
  { month: 'Apr', posts: 6, views: 2104 },
  { month: 'May', posts: 4, views: 1284 },
]

const categoryData = [
  { name: 'Blog', value: 12 },
  { name: 'Case Study', value: 5 },
  { name: 'Legal Update', value: 8 },
  { name: 'News', value: 3 },
]

const GOLD = 'oklch(0.65 0.12 70)'
const GOLD_SOFT = 'oklch(0.65 0.12 70 / 0.4)'

export function PostsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 p-6 lg:p-8 rounded"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
        <div>
          <p
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-1.5"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Last 6 months
          </p>
          <h3 className="text-ivory text-xl lg:text-2xl font-light">Publishing activity</h3>
        </div>
        <div className="flex items-center gap-4">
          <Legend color={GOLD} label="Views" />
          <Legend color={GOLD_SOFT} label="Posts" />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={290}>
        <ComposedChart data={monthlyData} margin={{ top: 24, right: 16, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GOLD} stopOpacity={0.45} />
              <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.98 0.004 80 / 0.06)" />
          <XAxis
            dataKey="month"
            stroke="oklch(0.98 0.004 80 / 0.4)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="left"
            stroke="oklch(0.98 0.004 80 / 0.4)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="oklch(0.98 0.004 80 / 0.4)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'oklch(0.14 0.02 255)',
              border: '1px solid oklch(0.98 0.004 80 / 0.15)',
              borderRadius: 4,
              fontSize: 12,
              color: 'oklch(0.98 0.004 80)',
            }}
            cursor={{ stroke: GOLD, strokeOpacity: 0.4 }}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="views"
            name="Views"
            stroke={GOLD}
            strokeWidth={2}
            fill="url(#viewsGradient)"
            dot={{ fill: GOLD, stroke: GOLD, r: 4 }}
            activeDot={{ r: 6, fill: GOLD, stroke: 'oklch(0.14 0.02 255)', strokeWidth: 2 }}
          >
            <LabelList
              dataKey="views"
              position="top"
              offset={10}
              fill="oklch(0.98 0.004 80 / 0.85)"
              fontSize={11}
            />
          </Area>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="posts"
            name="Posts"
            stroke={GOLD_SOFT}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={{ fill: GOLD_SOFT, stroke: GOLD_SOFT, r: 3 }}
            activeDot={{ r: 5, fill: GOLD_SOFT }}
          >
            <LabelList
              dataKey="posts"
              position="bottom"
              offset={10}
              fill="oklch(0.98 0.004 80 / 0.55)"
              fontSize={10}
            />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export function CategoryChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 p-6 lg:p-8 rounded"
    >
      <div className="mb-6">
        <p
          className="text-gold text-[10px] tracking-[0.3em] uppercase mb-1.5"
          style={{ fontFamily: 'var(--font-inter), sans-serif' }}
        >
          Distribution
        </p>
        <h3 className="text-ivory text-xl lg:text-2xl font-light">Posts by category</h3>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={categoryData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 6" stroke="oklch(0.98 0.004 80 / 0.06)" />
          <XAxis
            dataKey="name"
            stroke="oklch(0.98 0.004 80 / 0.4)"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="oklch(0.98 0.004 80 / 0.4)"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'oklch(0.14 0.02 255)',
              border: '1px solid oklch(0.98 0.004 80 / 0.15)',
              borderRadius: 4,
              fontSize: 12,
              color: 'oklch(0.98 0.004 80)',
            }}
            cursor={{ fill: 'oklch(0.65 0.12 70 / 0.08)' }}
          />
          <Bar dataKey="value" fill={GOLD} radius={[3, 3, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-ivory/55"
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      {label}
    </div>
  )
}
