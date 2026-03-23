import { GetStaticProps } from 'next'
import DocViewer, { DocEntry } from '../components/DocViewer'

const DOCS = [
  { slug: 'competitor-analysis', title: 'Competitor Analysis', path: 'docs/02_product-decisions/COMPETITOR-ANALYSIS.md' },
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

export default function ProductDecisionsPage({ docs }: { docs: DocEntry[] }) {
  return (
    <DocViewer
      title="Product Decisions"
      subtitle="Structured decision records for significant feature and architecture choices."
      docs={docs}
    />
  )
}
