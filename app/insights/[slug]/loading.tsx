export default function ArticleLoading() {
  return (
    <main className="min-h-screen bg-navy text-ivory">
      <div className="pt-36 lg:pt-44 pb-12 max-w-4xl mx-auto px-6">
        <div className="h-3 w-32 bg-ivory/10 animate-pulse mb-8" />
        <div className="h-6 w-24 bg-ivory/10 animate-pulse mb-7" />
        <div className="h-12 w-full bg-ivory/10 animate-pulse mb-3" />
        <div className="h-12 w-3/4 bg-ivory/10 animate-pulse mb-7" />
        <div className="h-3 w-full bg-ivory/10 animate-pulse mb-2" />
        <div className="h-3 w-5/6 bg-ivory/10 animate-pulse" />
      </div>
      <div className="aspect-[16/7] max-w-6xl mx-auto bg-ivory/5 animate-pulse" />
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-3 w-full bg-ivory/10 animate-pulse" />
        ))}
      </div>
    </main>
  )
}
