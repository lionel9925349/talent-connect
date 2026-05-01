'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { JobCard } from './JobCard'

type Job = {
  id: number
  title: string
  company: string
  location: string
  contractType: string
}

const CONTRACT_TYPES = ['Vollzeit', 'Teilzeit', 'Minijob']

export function JobsFilterClient({ jobs }: { jobs: Job[] }) {
  const t = useTranslations('jobs')
  const tContracts = useTranslations('contractTypes')
  const [search, setSearch] = useState('')
  const [selectedContracts, setSelectedContracts] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState('')

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location).filter(Boolean))].sort(),
    [jobs]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return jobs.filter((job) => {
      const matchSearch =
        q === '' ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q)
      const matchContract =
        selectedContracts.length === 0 || selectedContracts.includes(job.contractType)
      const matchLocation = selectedLocation === '' || job.location === selectedLocation
      return matchSearch && matchContract && matchLocation
    })
  }, [jobs, search, selectedContracts, selectedLocation])

  const hasFilters = search !== '' || selectedContracts.length > 0 || selectedLocation !== ''

  function toggleContract(type: string) {
    setSelectedContracts((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  function clearAll() {
    setSearch('')
    setSelectedContracts([])
    setSelectedLocation('')
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* ── Sidebar Filters ─────────────────────────────── */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">

          {/* Search */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
              Suche
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder={t('filter.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder:text-muted"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Contract type */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
              {t('filter.contractType')}
            </label>
            <div className="flex flex-col gap-2">
              {CONTRACT_TYPES.map((type) => {
                const active = selectedContracts.includes(type)
                return (
                  <button
                    key={type}
                    onClick={() => toggleContract(type)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer text-left ${
                      active
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'bg-surface text-muted hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      active ? 'bg-primary border-primary' : 'border-gray-300'
                    }`}>
                      {active && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </span>
                    {tContracts(type as 'Vollzeit' | 'Teilzeit' | 'Minijob')}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Location */}
          {locations.length > 1 && (
            <div className="mb-6">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                {t('filter.location')}
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer appearance-none"
                >
                  <option value="">{t('filter.allLocations')}</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Clear button */}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="w-full py-2 text-sm text-muted hover:text-accent border border-gray-200 rounded-xl hover:border-accent/30 transition-colors cursor-pointer"
            >
              {t('filter.clearAll')}
            </button>
          )}
        </div>
      </aside>

      {/* ── Results ─────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Active filters + count bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 min-h-[2rem]">
          <p className="text-sm text-muted">
            <span className="font-bold text-foreground text-base">{filtered.length}</span>
            {' '}{t('found', { count: filtered.length })}
            {hasFilters && jobs.length !== filtered.length && (
              <span className="text-muted"> {t('foundOf', { total: jobs.length })}</span>
            )}
          </p>

          {hasFilters && (
            <div className="flex flex-wrap gap-1.5">
              {selectedContracts.map((type) => (
                <span key={type}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                >
                  {type}
                  <button onClick={() => toggleContract(type)}
                    className="hover:text-accent ml-0.5 cursor-pointer leading-none">×</button>
                </span>
              ))}
              {selectedLocation && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {selectedLocation}
                  <button onClick={() => setSelectedLocation('')}
                    className="hover:text-accent ml-0.5 cursor-pointer leading-none">×</button>
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  &ldquo;{search}&rdquo;
                  <button onClick={() => setSearch('')}
                    className="hover:text-accent ml-0.5 cursor-pointer leading-none">×</button>
                </span>
              )}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            <p className="font-semibold text-foreground text-lg mb-1">{t('filter.noResults')}</p>
            <p className="text-muted text-sm mb-6 max-w-xs mx-auto">{t('filter.noResultsHint')}</p>
            <button
              onClick={clearAll}
              className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors cursor-pointer"
            >
              {t('filter.resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                contractType={job.contractType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
