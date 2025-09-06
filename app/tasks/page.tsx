import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { TasksManagement } from "@/components/tasks/tasks-management"

export default function TasksPage() {
  return (
    <DashboardLayout>
      <TasksManagement />
    </DashboardLayout>
  )
}
