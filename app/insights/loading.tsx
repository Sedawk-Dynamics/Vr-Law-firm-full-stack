export default function InsightsLoading() {
  return (
    <main className="min-h-screen bg-navy text-ivory">
      <div className="pt-36 lg:pt-44 pb-20 lg:pb-28 max-w-6xl mx-auto px-6 text-center">
        <div className="h-3 w-40 mx-auto bg-ivory/10 animate-pulse mb-7" />
        <div className="h-14 lg:h-20 w-full bg-ivory/10 animate-pulse mb-5" />
        <div className="h-3 w-3/4 mx-auto bg-ivory/10 animate-pulse mb-3" />
        <div className="h-3 w-1/2 mx-auto bg-ivory/10 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="aspect-[16/7] bg-ivory/5 animate-pulse mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border border-ivory/10">
              <div className="aspect-[16/10] bg-ivory/5 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-ivory/10 animate-pulse" />
                <div className="h-5 w-full bg-ivory/10 animate-pulse" />
                <div className="h-3 w-full bg-ivory/10 animate-pulse" />
                <div className="h-3 w-3/4 bg-ivory/10 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
