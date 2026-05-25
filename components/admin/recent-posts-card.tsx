'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Edit3, ArrowUpRight } from 'lucide-react'
import { CATEGORY_META, type BlogPost } from '@/lib/blog-types'
import { formatDate } from '@/lib/blog-api'

export function RecentPostsCard({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[oklch(0.12_0.018_255)] border border-ivory/10 rounded overflow-hidden"
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-ivory/10">
        <div>
          <p
            className="text-gold text-[10px] tracking-[0.3em] uppercase mb-1.5"
            style={{ fontFamily: 'var(--font-inter), sans-serif' }}
          >
            Latest activity
          </p>
          <h3 className="text-ivory text-xl font-light">Recent posts</h3>
        </div>
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.22em] uppercase hover:gap-3 transition-all"
        >
          View All
          <ArrowUpRight size={13} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ivory/10 bg-ivory/[0.02]">
              {['Article', 'Status', 'Category', 'Date', ''].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-gold text-[10px] tracking-[0.22em] uppercase font-medium"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr
                key={p.id}
                className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 bg-cover bg-center border border-ivory/10 flex-shrink-0"
                      style={{ backgroundImage: `url(${p.featuredImage})` }}
                    />
                    <div className="min-w-0">
                      <Link
                        href={`/admin/blogs/edit/${p.id}`}
                        className="text-ivory hover:text-gold transition-colors line-clamp-1 font-medium block"
                      >
                        {p.title}
                      </Link>
                      <p
                        className="text-ivory/40 text-xs mt-0.5"
                        style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                      >
                        {p.author.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] tracking-[0.2em] uppercase ${
                      p.status === 'published'
                        ? 'bg-gold/10 text-gold border border-gold/30'
                        : 'bg-ivory/5 text-ivory/65 border border-ivory/15'
                    }`}
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        p.status === 'published' ? 'bg-gold' : 'bg-ivory/55'
                      }`}
                    />
                    {p.status}
                  </span>
                </td>
                <td
                  className="px-6 py-4 text-ivory/65 text-xs tracking-wider uppercase"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {CATEGORY_META[p.category].label}
                </td>
                <td
                  className="px-6 py-4 text-ivory/55 text-xs"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  {formatDate(p.publishedAt ?? p.updatedAt)}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/blogs/edit/${p.id}`}
                    className="w-8 h-8 rounded text-ivory/55 hover:text-gold hover:bg-gold/10 transition-colors flex items-center justify-center ml-auto"
                    aria-label="Edit"
                  >
                    <Edit3 size={14} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
