export type BlogCategory = 'blog' | 'case-study' | 'legal-update' | 'news'

export type BlogStatus = 'draft' | 'published'

export interface BlogAuthor {
  name: string
  avatar?: string
  title?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: BlogCategory
  status: BlogStatus
  featuredImage: string
  ogImage?: string
  author: BlogAuthor
  tags: string[]
  seoTitle?: string
  metaDescription?: string
  publishedAt: string | null
  scheduledFor?: string | null
  createdAt: string
  updatedAt: string
  views: number
  featured?: boolean
  readingMinutes: number
}

export type BlogInput = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'> & {
  id?: string
}

export interface BlogListResponse {
  data: BlogPost[]
  total: number
  page: number
  pageSize: number
}

export interface BlogFilters {
  category?: BlogCategory | 'all'
  status?: BlogStatus | 'all'
  search?: string
  page?: number
  pageSize?: number
  featured?: boolean
}

export const CATEGORY_META: Record<BlogCategory, { label: string; short: string }> = {
  'blog': { label: 'Blog', short: 'Blog' },
  'case-study': { label: 'Case Study', short: 'Case' },
  'legal-update': { label: 'Legal Update', short: 'Update' },
  'news': { label: 'News', short: 'News' },
}

export const CATEGORY_ORDER: BlogCategory[] = [
  'blog',
  'case-study',
  'legal-update',
  'news',
]
