'use client';

import { useAuth } from "@/hooks/useAuth"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { usePathname } from "next/navigation"

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <div className="h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}