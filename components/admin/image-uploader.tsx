'use client'

import { useRef, useState } from 'react'
import { Upload, X, Link2 } from 'lucide-react'

export function ImageUploader({
  value,
  onChange,
  label = 'Upload Image',
  aspect = '16/9',
}: {
  value?: string
  onChange: (url: string) => void
  label?: string
  aspect?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')

  function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) handleFile(file)
  }

  return (
    <div>
      {value ? (
        <div
          className="relative w-full bg-cover bg-center border border-ivory/15"
          style={{ backgroundImage: `url(${value})`, aspectRatio: aspect }}
        >
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-3 right-3 w-9 h-9 bg-navy/90 border border-ivory/20 rounded text-ivory hover:text-gold hover:border-gold/40 transition-colors flex items-center justify-center"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-1 mb-3">
            {(['upload', 'url'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase transition-colors rounded ${
                  mode === m
                    ? 'bg-gold/10 text-gold border border-gold/30'
                    : 'text-ivory/45 hover:text-ivory border border-ivory/10'
                }`}
                style={{ fontFamily: 'var(--font-inter), sans-serif' }}
              >
                {m === 'upload' ? 'Upload' : 'URL'}
              </button>
            ))}
          </div>

          {mode === 'upload' ? (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="border border-dashed border-ivory/20 hover:border-gold/40 transition-colors cursor-pointer text-center p-10 bg-ivory/[0.02]"
              style={{ aspectRatio: aspect }}
            >
              <div className="flex flex-col items-center justify-center h-full gap-3 text-ivory/55">
                <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                  <Upload size={16} />
                </div>
                <p className="text-sm">{label}</p>
                <p
                  className="text-xs text-ivory/35"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                >
                  Drag &amp; drop, or click to browse
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleFile(f)
                }}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40"
                />
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://…"
                  className="w-full bg-[oklch(0.12_0.018_255)] border border-ivory/15 focus:border-gold pl-9 pr-4 py-2.5 text-ivory text-sm outline-none rounded transition-colors placeholder:text-ivory/35"
                  style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (urlInput.trim()) onChange(urlInput.trim())
                }}
                className="px-4 py-2.5 bg-gold text-navy text-[11px] tracking-[0.22em] uppercase font-medium rounded hover:bg-gold-light transition-colors"
              >
                Set
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
