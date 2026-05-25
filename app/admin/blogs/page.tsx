'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { PlusCircle } from 'lucide-react'
import { BlogTable } from '@/components/admin/blog-table'

export default function AdminBlogsPage() {
  return (
    <div className="space-y-8">
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
            All Articles
          </p>
          <h1 className="text-ivory text-3xl lg:text-4xl font-light">Blogs</h1>
          <p
            className="text-ivory/45 text-sm mt-2"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Manage drafts, published articles, and scheduled posts.
          </p>
        </div>
        <Link
          href="/admin/blogs/create"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gold text-navy rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-gold-light transition-colors"
        >
          <PlusCircle size={14} />
          New Blog
        </Link>
      </motion.div>

      <BlogTable />
    </div>
  )
}
