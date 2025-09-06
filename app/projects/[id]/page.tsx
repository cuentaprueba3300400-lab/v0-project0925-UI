import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProjectDetails } from "@/components/projects/project-details"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <DashboardLayout>
      <ProjectDetails projectId={params.id} />
    </DashboardLayout>
  )
}
