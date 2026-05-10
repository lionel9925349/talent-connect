import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { isAdminAuthenticated } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await isAdminAuthenticated()

  if (!auth) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-surface lg:flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0">
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  )
}
