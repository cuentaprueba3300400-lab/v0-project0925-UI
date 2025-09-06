import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProjectsList } from "@/components/projects/projects-list"

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectsList />
    </DashboardLayout>
  )
}
