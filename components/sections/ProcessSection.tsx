import { SectionHeading } from '@/components/ui/SectionHeading'

interface ProcessSectionProps {
  title: string
  subtitle: string
  steps: { title: string; description: string }[]
}

export function ProcessSection({ title, subtitle, steps }: ProcessSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          align="center"
          className="mb-14"
        />

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative text-center md:px-4">
              {/* Ligne de liaison entre les étapes (desktop) */}
              {i < steps.length - 1 && (
                <span
                  className="hidden md:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] border-t-2 border-dashed border-border"
                  aria-hidden="true"
                />
              )}
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-full bg-primary text-white font-heading font-bold text-xl shadow-[var(--shadow-soft)]">
                {i + 1}
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg mb-2">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
