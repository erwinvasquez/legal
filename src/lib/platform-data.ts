export interface Stat {
    id: string
    label: string
    value: number | string
    icon: string // Lucide icon name
  }
  
  export interface Case {
    id: string
    title: string
    description: string
    status: "active" | "closed" | "pending"
    createdAt: string
    updatedAt: string
    organizationId: string
    // Add more case-specific fields as needed
  }
  
  export interface UserProfile {
    id: string
    name: string
    email: string
    organizationId: string
    role: "admin" | "user" // Example roles
  }
  
  // Mock data
  const mockStats: Stat[] = [
    { id: "active-cases", label: "Active Cases", value: 12, icon: "Briefcase" },
    { id: "registered-people", label: "Registered People", value: 85, icon: "Users" },
    { id: "uploaded-docs", label: "Uploaded Documents", value: 345, icon: "FileText" },
    { id: "generated-letters", label: "Generated Letters", value: 56, icon: "Mail" },
  ]
  
  const mockCases: Case[] = [
    {
      id: "case-1",
      title: "Personal Injury - John Doe",
      description: "Car accident claim, severe whiplash.",
      status: "active",
      createdAt: "2023-01-15",
      updatedAt: "2023-10-20",
      organizationId: "org-123",
    },
    {
      id: "case-2",
      title: "Medical Malpractice - Jane Smith",
      description: "Surgical error, ongoing litigation.",
      status: "pending",
      createdAt: "2023-03-01",
      updatedAt: "2023-11-05",
      organizationId: "org-123",
    },
    {
      id: "case-3",
      title: "Slip and Fall - Bob Johnson",
      description: "Supermarket incident, minor injuries.",
      status: "closed",
      createdAt: "2023-05-10",
      updatedAt: "2023-09-12",
      organizationId: "org-123",
    },
    {
      id: "case-4",
      title: "Workplace Injury - Alice Brown",
      description: "Construction site accident, back injury.",
      status: "active",
      createdAt: "2023-07-22",
      updatedAt: "2023-12-01",
      organizationId: "org-123",
    },
  ]
  
  export async function getDashboardStats(organizationId: string): Promise<Stat[]> {
    // In a real app, fetch from Firestore, filtered by organizationId
    console.log(`Fetching stats for organization: ${organizationId}`)
    return new Promise((resolve) => setTimeout(() => resolve(mockStats), 500))
  }
  
  export async function getCasesByOrganizationId(organizationId: string): Promise<Case[]> {
    // In a real app, fetch from Firestore, filtered by organizationId
    console.log(`Fetching cases for organization: ${organizationId}`)
    return new Promise((resolve) => setTimeout(() => resolve(mockCases), 700))
  }
  
  export async function getCaseDetails(caseId: string, organizationId: string): Promise<Case | null> {
    // In a real app, fetch from Firestore, filtered by organizationId and caseId
    console.log(`Fetching details for case: ${caseId} in organization: ${organizationId}`)
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(mockCases.find((c) => c.id === caseId && c.organizationId === organizationId) || null),
        300,
      ),
    )
  }
  
  export async function createNewCase(data: Partial<Case>, organizationId: string): Promise<Case> {
    console.log(`Creating new case for organization: ${organizationId}`, data)
    const newCase: Case = {
      id: `case-${mockCases.length + 1}`,
      title: data.title || "New Case",
      description: data.description || "No description provided.",
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      organizationId: organizationId,
    }
    mockCases.push(newCase) // Add to mock data
    return new Promise((resolve) => setTimeout(() => resolve(newCase), 200))
  }
  