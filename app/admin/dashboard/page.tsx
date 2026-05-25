'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  FileText,
  CheckCircle2,
  Edit3,
  Eye,
  FolderTree,
  ImagePlus,
  PlusCircle,
} from 'lucide-react'
import { listBlogs } from '@/lib/blog-api'
import type { BlogPost } from '@/lib/blog-types'
import { StatCard } from '@/components/admin/stat-card'
import { PostsChart, CategoryChart } from '@/components/admin/posts-chart'
import { RecentPostsCard } from '@/components/admin/recent-posts-card'

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listBlogs({ pageSize: 100 })
      .then((res) => setPosts(res.data))
      .finally(() => setLoading(false))
  }, [])

  const total = posts.length
  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status === 'draft').length
  const views = posts.reduce((s, p) => s + (p.views || 0), 0)
  const categories = new Set(posts.map((p) => p.category)).size
  const recent = posts.slice(0, 5)

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Editorial Overview
          </p>
          <h1 className="text-ivory text-3xl lg:text-4xl font-light">Dashboard</h1>
          <p
            className="text-ivory/45 text-sm mt-2"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            A snapshot of editorial output, audience reach, and pending work.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/blogs/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-navy rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-gold-light transition-colors"
          >
            <PlusCircle size={14} />
            Create Blog
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gold/40 text-gold rounded text-[11px] tracking-[0.22em] uppercase hover:bg-gold/10 transition-colors"
          >
            <ImagePlus size={14} />
            Upload Media
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
        <StatCard
          label="Total Blogs"
          value={loading ? '—' : total}
          Icon={FileText}
          trend={{ value: 12, direction: 'up' }}
          index={0}
        />
        <StatCard
          label="Published"
          value={loading ? '—' : published}
          Icon={CheckCircle2}
          trend={{ value: 8, direction: 'up' }}
          index={1}
        />
        <StatCard
          label="Drafts"
          value={loading ? '—' : drafts}
          Icon={Edit3}
          index={2}
        />
        {/* <StatCard
          label="Total Views"
          value={loading ? '—' : views.toLocaleString()}
          Icon={Eye}
          trend={{ value: 23, direction: 'up' }}
          index={3}
        /> */}
        <StatCard
          label="Categories"
          value={loading ? '—' : categories}
          Icon={FolderTree}
          index={4}
        />
      </div>
{/* 
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <PostsChart />
        <CategoryChart />
      </div> */}

      <RecentPostsCard posts={recent} />
    </div>
  )
}
