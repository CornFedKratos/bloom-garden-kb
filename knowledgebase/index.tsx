import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface KBSection {
  id:          string
  title:       string
  description: string
  icon:        string
  status:      'complete' | 'active' | 'planned'
  docCount:    number
  path:        string
  accent:      string
}

interface SearchResult {
  title:   string
  excerpt: string
  section: string
  path:    string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const KB_SECTIONS: KBSection[] = [
  {
    id:          'foundation',
    title:       'Foundation',
    description: 'Mission, governing principles, Clinical Integrity Layer, and HIPAA architecture decisions. The constitutional layer — everything else is built on this.',
    icon:        '◈',
    status:      'complete',
    docCount:    4,
    path:        '/foundation',
    accent:      '#4a7c59',
  },
  {
    id:          'clinical-evidence',
    title:       'Clinical Evidence',
    description: 'Peer-reviewed research briefs for every therapeutic mechanic in Bloom Garden. OT-validated, population-specific, contraindications documented.',
    icon:        '⟁',
    status:      'active',
    docCount:    0,
    path:        '/clinical-evidence',
    accent:      '#7fb08a',
  },
  {
    id:          'product-decisions',
    title:       'Product Decisions',
    description: 'Structured decision records for every significant feature and architecture choice. What was decided, why, what alternatives were considered, and what would trigger a revisit.',
    icon:        '◇',
    status:      'active',
    docCount:    0,
    path:        '/product-decisions',
    accent:      '#c8a4a5',
  },
  {
    id:          'exercise-library',
    title:       'Exercise Library',
    description: 'The most extensive clinically-validated OT exercise library for neurodivergent children in any app today. Searchable by sensory system, regulation goal, and child profile.',
    icon:        '❋',
    status:      'active',
    docCount:    0,
    path:        '/exercise-library',
    accent:      '#d4a843',
  },
  {
    id:          'ot-collaboration',
    title:       'OT Collaboration',
    description: 'Pilot structure, advisor roles, CIL approval log, and feedback session records. The clinical partnership layer that governs what ships.',
    icon:        '⌘',
    status:      'planned',
    docCount:    0,
    path:        '/ot-collaboration',
    accent:      '#6b4f3a',
  },
  {
    id:          'compliance',
    title:       'Compliance',
    description: 'HIPAA decision log, COPPA compliance record, BAA tracker, and data classification register. Built from day one, not retrofitted.',
    icon:        '◉',
    status:      'planned',
    docCount:    0,
    path:        '/compliance',
    accent:      '#4a5568',
  },
]

const STATUS_CONFIG = {
  complete: { label: 'Complete',  bg: 'bg-garden-moss/10',   text: 'text-garden-moss',  dot: 'bg-garden-moss'  },
  active:   { label: 'In Progress', bg: 'bg-garden-firefly/10', text: 'text-garden-soil', dot: 'bg-garden-firefly' },
  planned:  { label: 'Planned',   bg: 'bg-garden-bloom/20',  text: 'text-garden-bloom', dot: 'bg-garden-bloom'  },
}

const PRINCIPLES = [
  'Every clinical claim requires evidence before it enters spec',
  'HIPAA compliance is architectural, not additive',
  'No feature places emotional burden on the child',
  'No failure states, ever',
  'The child\'s data is sacred',
  'AI summarizes, patterns, and flags — never diagnoses or prescribes',
]

// ─── Organic SVG background particles ────────────────────────────────────────
const GardenParticles = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Slow floating circles */}
    <circle cx="8%"  cy="20%" r="180" fill="rgba(74,124,89,0.04)"  className="animate-float-slow"   />
    <circle cx="88%" cy="15%" r="140" fill="rgba(200,164,165,0.06)" className="animate-float-medium" />
    <circle cx="75%" cy="70%" r="200" fill="rgba(74,124,89,0.03)"  className="animate-float-fast"   />
    <circle cx="15%" cy="75%" r="120" fill="rgba(212,168,67,0.04)" className="animate-float-slow"   style={{ animationDelay: '3s' }} />
    <circle cx="50%" cy="45%" r="300" fill="rgba(200,164,165,0.03)" className="animate-breathe"      />

    {/* Leaf-like organic shapes */}
    <ellipse cx="92%" cy="45%" rx="60" ry="100" fill="rgba(74,124,89,0.04)"  transform="rotate(-20,920,450)" className="animate-float-medium" />
    <ellipse cx="5%"  cy="55%" rx="50" ry="80"  fill="rgba(107,79,58,0.03)"  transform="rotate(15,50,550)"   className="animate-float-slow"   />

    {/* Tiny dots — fireflies */}
    {[
      { cx: '20%', cy: '30%', r: 3, delay: '0s'   },
      { cx: '65%', cy: '25%', r: 2, delay: '1.5s' },
      { cx: '40%', cy: '80%', r: 3, delay: '3s'   },
      { cx: '80%', cy: '60%', r: 2, delay: '0.8s' },
      { cx: '12%', cy: '65%', r: 2, delay: '2.2s' },
      { cx: '55%', cy: '15%', r: 3, delay: '4s'   },
    ].map((dot, i) => (
      <circle
        key={i}
        cx={dot.cx} cy={dot.cy} r={dot.r}
        fill="#d4a843"
        opacity="0.5"
        className="animate-shimmer"
        style={{ animationDelay: dot.delay }}
      />
    ))}
  </svg>
)

// ─── Search ───────────────────────────────────────────────────────────────────
const SearchBar = () => {
  const [query,    setQuery]    = useState('')
  const [results,  setResults]  = useState<SearchResult[]>([])
  const [loading,  setLoading]  = useState(false)
  const [focused,  setFocused]  = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async (q: string) => {
    setQuery(q)
    if (q.length < 3) { setResults([]); return }
    setLoading(true)
    // Placeholder — wires to Supabase vector search when Edge Function is deployed
    await new Promise(r => setTimeout(r, 400))
    setResults([])
    setLoading(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative transition-all duration-300 ${focused ? 'scale-[1.01]' : ''}`}>
        {/* Search icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-garden-moss/60 pointer-events-none">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => handleSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Search clinical evidence, decisions, exercises…"
          className="search-input w-full pl-12 pr-6 py-4 rounded-2xl text-garden-dusk font-body text-sm placeholder:text-garden-moss/40"
        />

        {/* Loading indicator */}
        {loading && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-garden-moss/30 border-t-garden-moss rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Results dropdown */}
      {focused && query.length >= 3 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-garden-moss/15 shadow-xl overflow-hidden z-50">
          {results.length > 0 ? (
            results.map((r, i) => (
              <a key={i} href={r.path}
                className="block px-6 py-4 hover:bg-garden-mist transition-colors border-b border-garden-moss/8 last:border-0">
                <div className="text-xs text-garden-moss font-body mb-1">{r.section}</div>
                <div className="text-sm text-garden-dusk font-body font-medium">{r.title}</div>
                <div className="text-xs text-garden-slate/60 mt-1 line-clamp-2">{r.excerpt}</div>
              </a>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <div className="text-garden-moss/40 text-2xl mb-2">◈</div>
              <p className="text-sm text-garden-slate/50 font-body">
                Semantic search activates when the KB is connected.<br/>
                <span className="text-garden-moss/60">Vector indexing in progress.</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── KB Section Card ──────────────────────────────────────────────────────────
const SectionCard = ({ section, index }: { section: KBSection; index: number }) => {
  const s = STATUS_CONFIG[section.status]
  const delayClass = [
    'animate-fade-up',
    'animate-fade-up-delay-1',
    'animate-fade-up-delay-2',
    'animate-fade-up-delay-3',
    'animate-fade-up-delay-4',
    'animate-fade-up-delay-4',
  ][index] ?? 'animate-fade-up'

  return (
    <a
      href={section.path}
      className={`kb-card rounded-2xl p-6 block group ${delayClass}`}
      style={{ '--accent': section.accent } as React.CSSProperties}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-display transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${section.accent}18`, color: section.accent }}
        >
          {section.icon}
        </div>
        <span className={`status-pill px-2.5 py-1 rounded-full ${s.bg} ${s.text} flex items-center gap-1.5`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl text-garden-dusk mb-2 font-medium group-hover:text-garden-moss transition-colors duration-300">
        {section.title}
      </h3>
      <p className="text-sm text-garden-slate/70 leading-relaxed font-body">
        {section.description}
      </p>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-garden-moss/8 flex items-center justify-between">
        <span className="text-xs font-mono text-garden-moss/50">
          {section.docCount > 0 ? `${section.docCount} document${section.docCount !== 1 ? 's' : ''}` : 'Initializing'}
        </span>
        <span
          className="text-xs font-body flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: section.accent }}
        >
          Explore
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </a>
  )
}

// ─── Principle Row ────────────────────────────────────────────────────────────
const PrincipleRow = ({ text, index }: { text: string; index: number }) => (
  <div
    className="flex items-start gap-3 py-3 border-b border-garden-moss/8 last:border-0 animate-fade-up"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <span className="text-garden-moss mt-0.5 text-xs flex-shrink-0">◆</span>
    <p className="text-sm text-garden-slate/80 font-body leading-relaxed">{text}</p>
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <>
      <Head>
        <title>Bloom Garden — Knowledge Base</title>
        <meta name="description" content="Clinical knowledge base for Bloom Garden — a HIPAA-compliant pediatric emotional regulation platform for autistic children." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`min-h-screen bg-texture transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

        {/* ── Nav ─────────────────────────────────────────────────────────── */}
        <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-garden-moss/15 flex items-center justify-center animate-breathe">
                <span className="text-garden-moss text-sm">❋</span>
              </div>
              <span className="font-display text-garden-dusk font-medium tracking-wide">
                Bloom Garden <span className="text-garden-moss/50 font-light">/ KB</span>
              </span>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-xs font-mono text-garden-moss/50 hidden sm:block">
                codename: BLO
              </span>
              <a
                href="/internal"
                className="text-xs font-body text-garden-slate/50 hover:text-garden-moss transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-garden-moss/8"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Internal
              </a>
            </div>
          </div>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
          <GardenParticles />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-garden-moss/10 border border-garden-moss/20 mb-8 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-garden-moss animate-breathe" />
              <span className="text-xs font-mono text-garden-moss tracking-widest uppercase">
                Clinical Knowledge Base — v0.1
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-garden-dusk leading-[0.95] tracking-tight mb-6 animate-fade-up-delay-1">
              Bloom
              <span className="block italic text-garden-moss font-light">Garden</span>
            </h1>

            {/* Tagline */}
            <p className="font-body text-lg sm:text-xl text-garden-slate/70 max-w-2xl mx-auto leading-relaxed mb-4 animate-fade-up-delay-2">
              A HIPAA-compliant pediatric emotional regulation platform
              supporting autistic children, their parents, and their
              occupational therapists as a connected care system.
            </p>

            {/* Mission statement */}
            <p className="font-display text-base italic text-garden-moss/80 animate-fade-up-delay-3 mb-12">
              "We help children. We do not seek validation for ourselves."
            </p>

            {/* Search */}
            <div className="animate-fade-up-delay-4 w-full">
              <SearchBar />
              <p className="text-xs text-garden-moss/40 mt-3 font-mono">
                Semantic search · Powered by pgvector
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float-slow">
            <span className="text-xs font-mono text-garden-moss/30 tracking-widest">scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-garden-moss/30 to-transparent" />
          </div>
        </section>

        {/* ── KB Sections ─────────────────────────────────────────────────── */}
        <section className="px-6 pb-24 max-w-6xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-16">
            <div className="leaf-divider mb-8">
              <span className="text-garden-moss/40 text-sm">◈</span>
            </div>
            <h2 className="font-display text-4xl text-garden-dusk mb-3">
              Knowledge Sections
            </h2>
            <p className="text-sm text-garden-slate/60 font-body max-w-lg mx-auto">
              Every clinical claim, product decision, and compliance requirement documented
              before a single line of code is written.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
            {KB_SECTIONS.map((section, i) => (
              <SectionCard key={section.id} section={section} index={i} />
            ))}
          </div>

          {/* ── Non-Negotiables ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Principles */}
            <div>
              <div className="leaf-divider mb-8">
                <span className="text-garden-moss/40 text-sm">◆</span>
              </div>
              <h2 className="font-display text-3xl text-garden-dusk mb-2">
                Non-Negotiables
              </h2>
              <p className="text-sm text-garden-slate/60 font-body mb-8">
                These govern every feature, every agent, every session.
              </p>
              <div className="kb-card rounded-2xl p-6">
                {PRINCIPLES.map((p, i) => (
                  <PrincipleRow key={i} text={p} index={i} />
                ))}
              </div>
            </div>

            {/* Project Status */}
            <div>
              <div className="leaf-divider mb-8">
                <span className="text-garden-moss/40 text-sm">◉</span>
              </div>
              <h2 className="font-display text-3xl text-garden-dusk mb-2">
                Project Status
              </h2>
              <p className="text-sm text-garden-slate/60 font-body mb-8">
                Current phase and milestone tracking.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'KB Foundation',         status: 'complete', note: 'Mission, CIL, HIPAA, Founding Log' },
                  { label: 'Clinical Evidence Briefs', status: 'active', note: 'Co-regulation, projective play, breathing' },
                  { label: 'Competitor Analysis',   status: 'active',   note: 'In progress' },
                  { label: 'AIDLC Spec Phase',       status: 'planned',  note: 'Awaiting evidence briefs' },
                  { label: 'OT Pilot Recruitment',   status: 'planned',  note: '3–5 OTs, 2–3 families each' },
                  { label: 'Prototype Build',         status: 'planned',  note: 'Flutter, companion + 4 mini-games' },
                  { label: 'Clinical Gate (OT validation)', status: 'planned', note: 'Post-prototype, pre-production' },
                ].map((item, i) => {
                  const s = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG]
                  return (
                    <div key={i} className="kb-card rounded-xl px-5 py-4 flex items-center gap-4">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body text-garden-dusk font-medium truncate">{item.label}</p>
                        <p className="text-xs text-garden-slate/50 font-body truncate">{item.note}</p>
                      </div>
                      <span className={`status-pill px-2 py-0.5 rounded-full ${s.bg} ${s.text} flex-shrink-0`}>
                        {s.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-garden-moss/10 px-6 py-10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-garden-moss/40 animate-breathe">❋</span>
              <span className="text-xs font-mono text-garden-slate/40">
                Bloom Garden KB · v0.1 · {new Date().toISOString().split('T')[0]}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono text-garden-moss/40">BLO</span>
              <a href="https://linear.app/chickentindy/team/BLO/all"
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-body text-garden-slate/40 hover:text-garden-moss transition-colors">
                Linear →
              </a>
              <a href="/internal"
                className="text-xs font-body text-garden-slate/40 hover:text-garden-moss transition-colors">
                Internal →
              </a>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}
