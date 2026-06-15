import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types'

const DEPLOY_LABELS: Record<string, { label: string; color: string }> = {
  L1: { label: '直接下载', color: 'bg-green-100 text-green-800' },
  L2: { label: 'Docker', color: 'bg-blue-100 text-blue-800' },
  L3: { label: '脚本安装', color: 'bg-yellow-100 text-yellow-800' },
  L4: { label: '打包运行', color: 'bg-purple-100 text-purple-800' },
}

export function DeployBadge({ level }: { level: Project['deploy_level'] }) {
  if (!level) return null
  const { label, color } = DEPLOY_LABELS[level] ?? { label: level, color: '' }
  return <Badge className={color}>{label}</Badge>
}
