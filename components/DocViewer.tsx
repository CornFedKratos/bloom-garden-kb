import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import Head from 'next/head'

// ─── Types ──────────────────────────────────────────────────────────────────
export interface DocEntry {
  slug:    string
  title:   string
  content: string
  error?:  boolean
}

interface DocViewerProps {
  title:       string
  subtitle:    string
  docs:        DocEntry[]
  backLabel?:  string
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function DocViewer({ title, subtitle, docs, backLabel = 'Knowledge Base' }: DocViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = docs[activeIndex]

  return (
    <>
      <Head>
        <title>{title} — Bloom Garden KB</title>
        <meta name="description" content={subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-texture">
        {/* ── Nav ──────────────────────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 bg-[#f5ede0]/80 backdrop-blur-sm border-b border-[rgba(74,124,89,0.1)]">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-garden-moss/15 flex items-center justify-center">
                  <span className="text-garden-moss text-sm">❋</span>
                </div>
                <span className="font-display text-garden-dusk font-medium tracking-wide">
                  Bloom Garden <span className="text-garden-moss/50 font-light">/ KB</span>
                </span>
              </Link>
              <span className="text-garden-moss/30 hidden sm:inline">/</span>
              <span className="text-sm font-body text-garden-moss/70 hidden sm:inline">{title}</span>
            </div>
            <Link
              href="/"
              className="text-xs font-body text-garden-slate/50 hover:text-garden-moss transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-garden-moss/8"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              {backLabel}
            </Link>
          </div>
        </nav>

        {/* ── Layout ───────────────────────────────────────────────────────── */}
        <div className="pt-20 max-w-6xl mx-auto px-6 pb-24">

          {/* Page header */}
          <div className="mb-8 pt-4">
            <h1 className="font-display text-4xl text-garden-dusk mb-2">{title}</h1>
            <p className="text-sm text-garden-slate/60 font-body">{subtitle}</p>
          </div>

          {/* Mobile dropdown (< 768px) */}
          <div className="md:hidden mb-6">
            <select
              value={activeIndex}
              onChange={e => setActiveIndex(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-[rgba(74,124,89,0.15)] bg-white/80 text-sm font-body text-garden-dusk appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234a7c59' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
            >
              {docs.map((doc, i) => (
                <option key={doc.slug} value={i}>{doc.title}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-8">
            {/* Sidebar (desktop) */}
            <aside className="hidden md:block w-60 flex-shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-mono text-garden-moss/40 tracking-widest uppercase mb-4">Documents</p>
                <nav className="space-y-1">
                  {docs.map((doc, i) => (
                    <button
                      key={doc.slug}
                      onClick={() => setActiveIndex(i)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-200 ${
                        i === activeIndex
                          ? 'bg-[rgba(74,124,89,0.1)] text-[#2d3b2e] font-medium'
                          : 'text-[#6b4f3a]/70 hover:bg-[rgba(74,124,89,0.05)] hover:text-[#2d3b2e]'
                      }`}
                    >
                      {doc.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              {active?.error ? (
                <div className="kb-card rounded-2xl p-8 text-center">
                  <div className="text-garden-moss/30 text-3xl mb-3">◈</div>
                  <p className="text-sm text-garden-slate/60 font-body">
                    This document could not be loaded at build time.
                  </p>
                  <p className="text-xs text-garden-moss/40 font-mono mt-2">
                    {active.title}
                  </p>
                </div>
              ) : (
                <article className="kb-card rounded-2xl p-6 sm:p-8 md:p-10">
                  <div className="prose prose-sm max-w-none
                    prose-headings:font-display prose-headings:text-[#2d3b2e] prose-headings:font-medium
                    prose-h1:text-3xl prose-h1:mb-6 prose-h1:pb-4 prose-h1:border-b prose-h1:border-[rgba(74,124,89,0.12)]
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-[#6b4f3a] prose-p:font-light prose-p:leading-relaxed
                    prose-a:text-[#4a7c59] prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-[#2d3b2e]
                    prose-li:text-[#6b4f3a] prose-li:font-light
                    prose-table:text-sm
                    prose-th:bg-[rgba(74,124,89,0.08)] prose-th:text-[#2d3b2e] prose-th:font-medium prose-th:px-3 prose-th:py-2
                    prose-td:px-3 prose-td:py-2 prose-td:text-[#6b4f3a] prose-td:border-[rgba(74,124,89,0.1)]
                    prose-code:text-[#4a7c59] prose-code:bg-[rgba(74,124,89,0.06)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-[#2d3b2e] prose-pre:rounded-xl prose-pre:text-sm
                    prose-blockquote:border-[#4a7c59] prose-blockquote:bg-[rgba(74,124,89,0.04)] prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:text-[#6b4f3a] prose-blockquote:font-light
                    prose-hr:border-[rgba(74,124,89,0.12)]
                  ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {active?.content ?? ''}
                    </ReactMarkdown>
                  </div>
                </article>
              )}
            </main>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────────────── */}
        <footer className="border-t border-garden-moss/10 px-6 py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <span className="text-xs font-mono text-garden-slate/40">
              Bloom Garden KB · {title}
            </span>
            <Link href="/" className="text-xs font-body text-garden-slate/40 hover:text-garden-moss transition-colors">
              ← Back to Knowledge Base
            </Link>
          </div>
        </footer>
      </div>
    </>
  )
}
