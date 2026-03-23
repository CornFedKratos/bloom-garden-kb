import { GetStaticProps } from 'next'
import DocViewer, { DocEntry } from '../components/DocViewer'

const DOCS = [
  { slug: 'mission',                    title: 'Mission',                       path: 'docs/04_mds/MISSION.md' },
  { slug: 'clinical-integrity-layer',   title: 'Clinical Integrity Layer',      path: 'docs/04_mds/CLINICAL-INTEGRITY-LAYER.md' },
  { slug: 'hipaa-architecture',         title: 'HIPAA Architecture Decisions',  path: 'docs/04_mds/HIPAA-ARCHITECTURE-DECISIONS.md' },
  { slug: 'founding-session-log',       title: 'Founding Session Log',          path: 'docs/04_mds/FOUNDING-SESSION-LOG.md' },
]

const REPO_RAW = 'https://raw.githubusercontent.com/CornFedKratos/bloom-garden-kb/main'

async function fetchDoc(filePath: string, title: string, slug: string): Promise<DocEntry> {
  try {
    const headers: Record<string, string> = {}
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }
    const res = await fetch(`${REPO_RAW}/${filePath}`, { headers })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const raw = await res.text()
    // Strip frontmatter if present
    const content = raw.replace(/^---[\s\S]*?---\n*/m, '')
    return { slug, title, content }
  } catch {
    return { slug, title, content: '', error: true }
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const docs = await Promise.all(
    DOCS.map(d => fetchDoc(d.path, d.title, d.slug))
  )
  return { props: { docs } }
}

export default function FoundationPage({ docs }: { docs: DocEntry[] }) {
  return (
    <DocViewer
      title="Foundation"
      subtitle="Mission, governing principles, Clinical Integrity Layer, and HIPAA architecture decisions."
      docs={docs}
    />
  )
}
