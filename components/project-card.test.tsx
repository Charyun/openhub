import { render, screen } from '@testing-library/react'
import { ProjectCard } from './project-card'
import type { Project } from '@/types'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

const mockProject: Project = {
  id: '1', github_full_name: 'makeplane/plane', display_name: 'Plane',
  description_zh: '开源版Jira，适合小团队协作', industry_id: 'productivity',
  scene_id: 'prod-pm', tags: ['团队协作', '看板'], stars: 28500,
  language: 'TypeScript', license: 'AGPL-3.0', updated_at: '2026-06-10',
  deploy_level: 'L2', deploy_difficulty: 2, chinese_support: 'partial',
  screenshots: [], alternative_to: ['Jira'], target_users: ['项目经理'],
  use_cases: ['敏捷开发'], features: ['看板视图'], github_url: 'https://github.com/makeplane/plane',
  homepage: 'https://plane.so', deploy_command: null, quality_score: 85,
  status: 'published', created_at: '2022-01-15', published_at: '2026-01-01',
}

describe('ProjectCard', () => {
  it('renders project name and description', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Plane')).toBeInTheDocument()
    expect(screen.getByText('开源版Jira，适合小团队协作')).toBeInTheDocument()
  })

  it('renders star count formatted', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('28.5k')).toBeInTheDocument()
  })

  it('renders deploy badge for L2', () => {
    render(<ProjectCard project={mockProject} />)
    expect(screen.getByText('Docker')).toBeInTheDocument()
  })
})
