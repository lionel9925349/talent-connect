'use client'

import { useActionState, useRef, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { submitApplyAction, type ApplyState } from '@/app/[locale]/(public)/jobangebote/[id]/actions'

interface ApplyFormProps {
  jobId: number
}

const INITIAL: ApplyState = { status: 'idle' }

const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const MAX_FILES = 5

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileIcon() {
  return (
    <svg className="w-5 h-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

export function ApplyForm({ jobId }: ApplyFormProps) {
  const t = useTranslations('apply')
  const locale = useLocale()
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [state, formAction, isPending] = useActionState(submitApplyAction, INITIAL)
  const status: 'success' | 'error' | 'idle' =
    state.status === 'success' ? 'success' : state.status === 'error' ? 'error' : 'idle'

  // Les fichiers viennent du state React (drag-drop + bouton). On les
  // injecte dans la FormData avant d'appeler le dispatch.
  function handleAction(formData: FormData) {
    formData.delete('files')
    for (const f of files) formData.append('files', f, f.name)
    formData.set('jobId', String(jobId))
    formData.set('locale', locale)
    return formAction(formData)
  }

  function addFiles(incoming: File[]) {
    setFileError('')
    const errors: string[] = []
    const valid: File[] = []

    for (const file of incoming) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(t('filesTypeError'))
        continue
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: ${t('filesSizeError')}`)
        continue
      }
      if (files.length + valid.length >= MAX_FILES) {
        errors.push(t('filesLimitError'))
        break
      }
      if (!files.some((f) => f.name === file.name && f.size === file.size)) {
        valid.push(file)
      }
    }

    if (errors.length) setFileError(errors[0])
    if (valid.length) setFiles((prev) => [...prev, ...valid].slice(0, MAX_FILES))
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setFileError('')
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-green-800 font-bold text-lg mb-1">{t('successTitle')}</p>
        <p className="text-green-700 text-sm">{t('successText')}</p>
      </div>
    )
  }

  return (
    <form action={handleAction} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label={t('firstName')} name="firstName" required placeholder={t('firstNamePlaceholder')} />
        <Input label={t('lastName')} name="lastName" required placeholder={t('lastNamePlaceholder')} />
      </div>
      <Input label={t('email')} name="email" type="email" required placeholder={t('emailPlaceholder')} />
      <div>
        <Input
          label={t('phone')}
          name="phone"
          type="tel"
          required
          placeholder={t('phonePlaceholder')}
          pattern="^\+[0-9\s\-]{6,20}$"
          title={t('phoneFormatHint')}
        />
        <p className="mt-1 text-xs text-muted">{t('phoneFormatHint')}</p>
      </div>

      {/* File upload zone */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-medium text-foreground">
            {t('filesLabel')}
          </label>
          <span className="text-xs text-muted">{files.length}/{MAX_FILES}</span>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-primary/40 hover:bg-surface'
          }`}
        >
          <div className="flex flex-col items-center gap-1.5">
            <svg className="w-8 h-8 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-sm font-medium text-foreground">
              <span className="text-primary">{t('filesAdd')}</span>{' '}
              <span className="text-muted">{t('filesDrop')}</span>
            </p>
            <p className="text-xs text-muted">{t('filesHint')}</p>
            <p className="text-xs text-muted/70">{t('filesMax')}</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => addFiles(Array.from(e.target.files || []))}
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {fileError && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {fileError}
          </p>
        )}

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((file, i) => (
              <li key={`${file.name}-${i}`}
                className="flex items-center gap-3 bg-surface rounded-lg px-3 py-2 border border-gray-100">
                <FileIcon />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-muted hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                  aria-label="Remove file"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {t('errorText')}
        </p>
      )}

      <Button type="submit" disabled={isPending} size="lg" className="w-full">
        {isPending ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('sending')}
          </span>
        ) : t('send')}
      </Button>
    </form>
  )
}
