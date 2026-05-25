'use client'

import { useEffect, useRef } from 'react'
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link2,
  Image as ImageIcon,
  Minus,
  Undo,
  Redo,
} from 'lucide-react'

type Cmd =
  | {
      type: 'simple'
      cmd: string
      Icon: typeof Bold
      label: string
    }
  | {
      type: 'block'
      tag: string
      Icon: typeof Heading2
      label: string
    }
  | {
      type: 'list'
      cmd:
        | 'insertUnorderedList'
        | 'insertOrderedList'
      Icon: typeof List
      label: string
    }
  | {
      type: 'link'
      Icon: typeof Link2
      label: string
    }
  | {
      type: 'image'
      Icon: typeof ImageIcon
      label: string
    }
  | {
      type: 'rule'
      Icon: typeof Minus
      label: string
    }

const COMMANDS: Cmd[] = [
  {
    type: 'simple',
    cmd: 'bold',
    Icon: Bold,
    label: 'Bold',
  },
  {
    type: 'simple',
    cmd: 'italic',
    Icon: Italic,
    label: 'Italic',
  },
  {
    type: 'block',
    tag: 'h2',
    Icon: Heading2,
    label: 'Heading 2',
  },
  {
    type: 'block',
    tag: 'h3',
    Icon: Heading3,
    label: 'Heading 3',
  },
  {
    type: 'block',
    tag: 'blockquote',
    Icon: Quote,
    label: 'Quote',
  },
  {
    type: 'list',
    cmd: 'insertUnorderedList',
    Icon: List,
    label: 'Bullet List',
  },
  {
    type: 'list',
    cmd: 'insertOrderedList',
    Icon: ListOrdered,
    label: 'Numbered List',
  },
  {
    type: 'link',
    Icon: Link2,
    label: 'Link',
  },
  {
    type: 'image',
    Icon: ImageIcon,
    label: 'Image',
  },
  {
    type: 'rule',
    Icon: Minus,
    label: 'Divider',
  },
]

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Begin writing…',
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const lastValue = useRef<string | null>(
    null
  )

  useEffect(() => {
    if (
      ref.current &&
      lastValue.current !== value
    ) {
      ref.current.innerHTML = value
      lastValue.current = value
    }
  }, [value])

  function exec(
    cmd: string,
    arg?: string
  ) {
    ref.current?.focus()

    document.execCommand(
      cmd,
      false,
      arg
    )

    handleInput()
  }

  function execBlock(tag: string) {
    exec('formatBlock', tag)
  }

  function handleAction(c: Cmd) {
    if (c.type === 'simple') {
      exec(c.cmd)
    } else if (c.type === 'block') {
      execBlock(c.tag)
    } else if (c.type === 'list') {
      exec(c.cmd)
    } else if (c.type === 'link') {
      const url =
        window.prompt('Enter URL')

      if (url) {
        exec('createLink', url)
      }
    } else if (c.type === 'image') {
      const url = window.prompt(
        'Enter image URL'
      )

      if (url) {
        exec('insertImage', url)
      }
    } else if (c.type === 'rule') {
      exec('insertHorizontalRule')
    }
  }

  function handleInput() {
    if (ref.current) {
      const html = ref.current.innerHTML

      lastValue.current = html
      onChange(html)
    }
  }

  return (
    <div className="border border-ivory/15 bg-[oklch(0.12_0.018_255)] rounded overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 px-3 py-2 border-b border-ivory/10 bg-ivory/[0.02]">
        {COMMANDS.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() =>
              handleAction(c)
            }
            title={c.label}
            aria-label={c.label}
            className="w-8 h-8 text-ivory/55 hover:text-gold hover:bg-gold/10 rounded transition-colors flex items-center justify-center"
          >
            <c.Icon size={14} />
          </button>
        ))}

        <div className="w-px h-5 bg-ivory/10 mx-2" />

        <button
          type="button"
          onClick={() => exec('undo')}
          title="Undo"
          aria-label="Undo"
          className="w-8 h-8 text-ivory/55 hover:text-gold hover:bg-gold/10 rounded transition-colors flex items-center justify-center"
        >
          <Undo size={14} />
        </button>

        <button
          type="button"
          onClick={() => exec('redo')}
          title="Redo"
          aria-label="Redo"
          className="w-8 h-8 text-ivory/55 hover:text-gold hover:bg-gold/10 rounded transition-colors flex items-center justify-center"
        >
          <Redo size={14} />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        spellCheck
        dir="ltr"
        data-placeholder={placeholder}
        className="
          min-h-[420px]
          max-h-[700px]
          overflow-y-auto
          p-6
          text-ivory/85
          leading-relaxed
          outline-none
          text-left
          [direction:ltr]
          [unicode-bidi:normal]

          [&_h2]:text-ivory
          [&_h2]:text-2xl
          [&_h2]:font-light
          [&_h2]:mt-6
          [&_h2]:mb-3
          [&_h2]:text-left

          [&_h3]:text-ivory
          [&_h3]:text-xl
          [&_h3]:font-light
          [&_h3]:mt-5
          [&_h3]:mb-2
          [&_h3]:text-left

          [&_p]:mb-3
          [&_p]:text-left

          [&_a]:text-gold
          [&_a]:underline

          [&_ul]:list-disc
          [&_ul]:pl-6
          [&_ul]:my-3
          [&_ul]:marker:text-gold/60
          [&_ul]:text-left

          [&_ol]:list-decimal
          [&_ol]:pl-6
          [&_ol]:my-3
          [&_ol]:marker:text-gold/60
          [&_ol]:text-left

          [&_li]:text-left
          [&_li]:leading-relaxed

          [&_blockquote]:border-l-2
          [&_blockquote]:border-gold
          [&_blockquote]:pl-4
          [&_blockquote]:italic
          [&_blockquote]:text-ivory/80
          [&_blockquote]:my-4
          [&_blockquote]:text-left

          [&_hr]:my-6
          [&_hr]:border-ivory/15

          [&_img]:my-4
          [&_img]:max-w-full
          [&_img]:rounded

          empty:before:content-[attr(data-placeholder)]
          empty:before:text-ivory/35
          empty:before:pointer-events-none
        "
        style={{
          fontFamily:
            'var(--font-inter), sans-serif',
          direction: 'ltr',
          textAlign: 'left',
          unicodeBidi: 'normal',
          writingMode: 'horizontal-tb',
        }}
      />
    </div>
  )
}