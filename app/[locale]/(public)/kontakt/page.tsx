'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { useTranslations, useLocale } from 'next-intl'
import { HeroSection } from '@/components/sections/HeroSection'
import { Input, Textarea } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { siteConfig, telHref } from '@/lib/config'
import { submitContactAction, type ContactState } from './actions'

const INITIAL: ContactState = { status: 'idle' }

function SubmitContact({ label, sending }: { label: string; sending: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full">
      {pending ? sending : label}
    </Button>
  )
}

export default function KontaktPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const [state, formAction] = useActionState(submitContactAction, INITIAL)

  const contactItems: { icon: React.ReactNode; label: string; value: string; href?: string }[] = [
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: t('labelContactPerson'),
      value: siteConfig.contactPerson,
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: t('labelEmail'),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: t('labelPhone'),
      value: siteConfig.phone,
      href: telHref(siteConfig.phone),
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      label: t('labelMobile'),
      value: siteConfig.mobile,
      href: telHref(siteConfig.mobile),
    },
    {
      icon: (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: t('labelAddress'),
      value: siteConfig.address + ', Deutschland',
    },
  ]

  const isError = state.status === 'error'
  const isSuccess = state.status === 'success'

  return (
    <>
      <HeroSection title={t('heroTitle')} subtitle={t('heroSubtitle')} size="medium" />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                {t('formTitle')}
              </h2>

              {isSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <p className="text-green-800 font-semibold text-lg">{t('successTitle')}</p>
                  <p className="text-green-700 text-sm mt-2">{t('successText')}</p>
                </div>
              ) : (
                <form action={formAction} className="space-y-4">
                  <input type="hidden" name="locale" value={locale} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label={t('firstName')} name="firstName" required placeholder={t('firstNamePlaceholder')} />
                    <Input label={t('lastName')} name="lastName" required placeholder={t('lastNamePlaceholder')} />
                  </div>
                  <Input label={t('email')} name="email" type="email" required placeholder={t('emailPlaceholder')} />
                  <Input label={t('phone')} name="phone" type="tel" placeholder={t('phonePlaceholder')} />
                  <Select label={t('iam')} name="type" defaultValue="sonstiges">
                    <option value="bewerber">{t('typeApplicant')}</option>
                    <option value="unternehmen">{t('typeCompany')}</option>
                    <option value="sonstiges">{t('typeOther')}</option>
                  </Select>
                  <Textarea label={t('message')} name="message" required placeholder={t('messagePlaceholder')} rows={5} />
                  {isError && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      {t('errorText')}
                    </p>
                  )}
                  <SubmitContact label={t('send')} sending={t('sending')} />
                </form>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {t('infoTitle')}
              </h2>
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-foreground hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
