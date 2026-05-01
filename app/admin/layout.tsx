import { AdminSidebar } from '@/components/layout/AdminSidebar'
import { isAdminAuthenticated } from '@/lib/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const auth = await isAdminAuthenticated()

  if (!auth) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}
