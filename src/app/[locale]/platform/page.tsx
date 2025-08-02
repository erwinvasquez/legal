"use client"

import { useTranslations } from "next-intl"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DollarSign, Users, FolderOpen, FileText } from "lucide-react"
import { Section } from "@/components/ui/section"

export default function PlatformDashboardPage() {
  const t = useTranslations("Platform")

  // Mock data for demonstration
  const stats = [
    {
      title: t("dashboard.totalCases"),
      value: "1,234",
      icon: FolderOpen,
      description: "Last 30 days",
    },
    {
      title: t("dashboard.involvedPeople"),
      value: "567",
      icon: Users,
      description: "Across all cases",
    },
    {
      title: t("dashboard.uploadedDocuments"),
      value: "8,910",
      icon: FileText,
      description: "Total documents",
    },
    {
      title: "Revenue (Mock)", // Placeholder for actual revenue
      value: "$45,231",
      icon: DollarSign,
      description: "Last 30 days",
    },
  ]

  return (
    <Section className="flex-1 flex flex-col">
      <h1 className="text-display-sm font-bold text-foreground mb-6 md:text-display-md">{t("dashboard.title")}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-heading-sm font-bold text-foreground mb-4 md:text-heading-md">
          {t("dashboard.recentActivity")}
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Recent Case Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Case #101: Document "Medical Report_JohnDoe.pdf" uploaded.</li>
              <li>Case #105: New timeline entry added for "Treatment Plan".</li>
              <li>Case #098: Letter "Demand Letter_JaneSmith" generated.</li>
              <li>Case #112: AI Chat session initiated for "Liability Analysis".</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
