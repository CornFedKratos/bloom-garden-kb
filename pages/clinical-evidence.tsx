import { GetStaticProps } from 'next'
import DocViewer, { DocEntry } from '../components/DocViewer'

const DOCS = [
  { slug: 'ceb-001-co-regulation',              title: 'CEB-001: Co-Regulation',              path: 'docs/03_briefs/CEB-001-co-regulation.md' },
  { slug: 'ceb-002-projective-play',            title: 'CEB-002: Projective Play',            path: 'docs/03_briefs/CEB-002-projective-play.md' },
  { slug: 'ceb-003-diaphragmatic-breathing',    title: 'CEB-003: Diaphragmatic Breathing',    path: 'docs/03_briefs/CEB-003-diaphragmatic-breathing.md' },
  { slug: 'ceb-004-proprioceptive-regulation',  title: 'CEB-004: Proprioceptive Regulation',  path: 'docs/03_briefs/CEB-004-proprioceptive-regulation.md' },
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

export default function ClinicalEvidencePage({ docs }: { docs: DocEntry[] }) {
  return (
    <DocViewer
      title="Clinical Evidence"
      subtitle="Peer-reviewed research briefs for every therapeutic mechanic in Bloom Garden."
      docs={docs}
    />
  )
}
