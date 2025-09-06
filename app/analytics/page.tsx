import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { GanttChartView } from "@/components/gantt/gantt-chart-view"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <GanttChartView />
    </DashboardLayout>
  )
}
