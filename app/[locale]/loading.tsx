export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center py-32" role="status" aria-label="Laden">
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-[#1A3A6B] animate-spin" />
    </div>
  )
}
