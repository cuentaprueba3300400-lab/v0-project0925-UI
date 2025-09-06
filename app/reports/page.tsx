import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ReportsGenerator } from "@/components/reports/reports-generator"

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <ReportsGenerator />
    </DashboardLayout>
  )
}
