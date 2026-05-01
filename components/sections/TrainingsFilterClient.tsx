'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { JobCard } from './JobCard'

type Training = {
  id: number
  title: string
  sector: string
  location: string
  duration: string
  startDate: string
}

export function TrainingsFilterClient({ trainings, locale }: { trainings: Training[]; locale: string }) {
  const t = useTranslations('training')
  const [search, setSearch] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')

  const locations = useMemo(
    () => [...new Set(trainings.map((tr) => tr.location).filter(Boolean))].sort(),
    [trainings]
  )

  const durations = useMemo(
    () => [...new Set(trainings.map((tr) => tr.duration).filter(Boolean))].sort(),
    [trainings]
  )

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return trainings.filter((tr) => {
      const matchSearch =
        q === '' ||
        tr.title.toLowerCase().includes(q) ||
        tr.sector.toLowerCase().includes(q)
      const matchLocation = selectedLocation === '' || tr.location === selectedLocation
      const matchDuration = selectedDuration === '' || tr.duration === selectedDuration
      return matchSearch && matchLocation && matchDuration
    })
  }, [trainings, search, selectedLocation, selectedDuration])

  const hasFilters = search !== '' || selectedLocation !== '' || selectedDuration !== ''

  function clearAll() {
    setSearch('')
    setSelectedLocation('')
    setSelectedDuration('')
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

          {/* Duration */}
          {durations.length > 1 && (
            <div className="mb-6">
              <label className="block text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                {t('filter.duration')}
              </label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-white cursor-pointer appearance-none"
                >
                  <option value="">{t('filter.allDurations')}</option>
                  {durations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

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

          {/* Clear */}
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
        {/* Count + active filter chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 min-h-[2rem]">
          <p className="text-sm text-muted">
            <span className="font-bold text-foreground text-base">{filtered.length}</span>
            {' '}{t('found', { count: filtered.length })}
            {hasFilters && trainings.length !== filtered.length && (
              <span className="text-muted"> {t('foundOf', { total: trainings.length })}</span>
            )}
          </p>

          {hasFilters && (
            <div className="flex flex-wrap gap-1.5">
              {selectedDuration && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {selectedDuration}
                  <button onClick={() => setSelectedDuration('')}
                    className="hover:text-accent ml-0.5 cursor-pointer leading-none">×</button>
                </span>
              )}
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
            {filtered.map((tr) => (
              <JobCard
                key={tr.id}
                id={tr.id}
                title={tr.title}
                company={tr.sector}
                location={tr.location}
                contractType={tr.duration}
                type="training"
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
