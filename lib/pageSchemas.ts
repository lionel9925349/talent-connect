import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export type FieldType = 'text' | 'textarea' | 'list' | 'card-list' | 'step-list'

export interface FieldDef {
  id: string
  label: string
  type: FieldType
  hint?: string
}

export interface PageSchema {
  slug: string
  label: string
  description?: string
  locales: readonly string[]
  fields: FieldDef[]
  defaults: Record<string, Record<string, unknown>>
}

const fuerUnternehmenFields: FieldDef[] = [
  { id: 'heroTitle', label: 'Hero — Titel', type: 'text' },
  { id: 'heroSubtitle', label: 'Hero — Untertitel', type: 'textarea' },
  { id: 'heroCtaText', label: 'Hero — CTA-Button', type: 'text' },

  { id: 'introHeadline', label: 'Intro — Überschrift', type: 'text' },
  { id: 'introText', label: 'Intro — Beschreibung', type: 'textarea' },
  { id: 'painPoints', label: 'Schmerzpunkte (Liste)', type: 'list', hint: 'Eine Aussage pro Zeile' },
  { id: 'introClosing', label: 'Intro — Abschluss-Satz', type: 'textarea' },

  { id: 'whyTitle', label: 'Vorteile — Titel', type: 'text' },
  { id: 'whySubtitle', label: 'Vorteile — Untertitel', type: 'textarea' },
  { id: 'benefits', label: 'Ihre Vorteile (Karten)', type: 'card-list', hint: 'Pro Karte: title und description' },

  { id: 'howTitle', label: 'Prozess — Titel', type: 'text' },
  { id: 'howSubtitle', label: 'Prozess — Untertitel', type: 'textarea' },
  { id: 'steps', label: 'Prozess-Schritte', type: 'step-list', hint: 'Pro Schritt: num, title, desc' },

  { id: 'extraTitle', label: 'Weitere Vorteile — Titel', type: 'text' },
  { id: 'extras', label: 'Weitere Vorteile (Karten)', type: 'card-list' },

  { id: 'relocationTitle', label: 'Relocation — Titel', type: 'text' },
  { id: 'relocationSubtitle', label: 'Relocation — Untertitel', type: 'textarea' },
  { id: 'relocation', label: 'Relocation-Services (Karten)', type: 'card-list' },

  { id: 'finalTitle', label: 'Abschluss — Titel', type: 'text' },
  { id: 'finalText', label: 'Abschluss — Text', type: 'textarea' },
  { id: 'requestBtn', label: 'CTA-Button (Anfrage)', type: 'text' },
]

const forApplicantsFields: FieldDef[] = [
  { id: 'heroTitle', label: 'Hero — Titel', type: 'text' },
  { id: 'heroSubtitle', label: 'Hero — Untertitel', type: 'textarea' },
  { id: 'heroCtaText', label: 'Hero — CTA-Button', type: 'text' },

  { id: 'welcomeHeadline', label: 'Begrüßung — Überschrift', type: 'text' },
  { id: 'welcomeText', label: 'Begrüßung — Fließtext', type: 'textarea' },

  { id: 'checklistTitle', label: 'Checkliste — Titel', type: 'text' },
  { id: 'checklistSubtitle', label: 'Checkliste — Untertitel', type: 'textarea' },
  {
    id: 'checklistGroups',
    label: 'Checkliste — Gruppen',
    type: 'card-list',
    hint: 'Pro Gruppe: Titel + Beschreibung (eine Anforderung pro Zeile in der Beschreibung).',
  },

  { id: 'supportTitle', label: 'Wie wir unterstützen — Titel', type: 'text' },
  { id: 'supportSubtitle', label: 'Wie wir unterstützen — Untertitel', type: 'textarea' },
  { id: 'support', label: 'Unsere Unterstützung (Karten)', type: 'card-list' },

  { id: 'commitmentTitle', label: 'Versprechen — Titel', type: 'text' },
  { id: 'commitmentText', label: 'Versprechen — Text', type: 'textarea' },

  { id: 'stepsTitle', label: 'Prozess — Titel', type: 'text' },
  { id: 'stepsSubtitle', label: 'Prozess — Untertitel', type: 'textarea' },
  { id: 'steps', label: 'Prozess-Schritte', type: 'step-list' },

  { id: 'eligibilityTitle', label: 'Voraussetzungen — Titel', type: 'text' },
  { id: 'eligibility', label: 'Voraussetzungen (Liste)', type: 'list' },

  { id: 'readyTitle', label: 'Abschluss — Titel', type: 'text' },
  { id: 'readySubtitle', label: 'Abschluss — Untertitel', type: 'textarea' },
  { id: 'viewJobs', label: 'Button — Jobangebote', type: 'text' },
  { id: 'viewTrainings', label: 'Button — Ausbildungen', type: 'text' },
]

const ueberUnsFields: FieldDef[] = [
  { id: 'heroTitle', label: 'Hero — Titel', type: 'text' },
  { id: 'heroSubtitle', label: 'Hero — Untertitel', type: 'textarea' },

  { id: 'missionTitle', label: 'Mission — Titel', type: 'text' },
  { id: 'missionText1', label: 'Mission — Absatz 1', type: 'textarea' },
  { id: 'missionText2', label: 'Mission — Absatz 2', type: 'textarea' },
  { id: 'missionText3', label: 'Mission — Absatz 3', type: 'textarea' },
  { id: 'missionBtn', label: 'Mission — Button', type: 'text' },

  { id: 'challengeTitle', label: 'Herausforderung — Titel', type: 'text' },
  { id: 'challengeText1', label: 'Herausforderung — Absatz 1', type: 'textarea' },
  { id: 'challengeText2', label: 'Herausforderung — Absatz 2', type: 'textarea' },

  { id: 'responseTitle', label: 'Unsere Antwort — Titel', type: 'text' },
  { id: 'responseText1', label: 'Unsere Antwort — Absatz 1', type: 'textarea' },
  { id: 'responseText2', label: 'Unsere Antwort — Absatz 2', type: 'textarea' },

  { id: 'bridgeTitle', label: 'Brücken bauen — Titel', type: 'text' },
  { id: 'bridgeText1', label: 'Brücken bauen — Absatz 1', type: 'textarea' },
  { id: 'bridgeText2', label: 'Brücken bauen — Absatz 2', type: 'textarea' },

  { id: 'futureTitle', label: 'Abschluss — Titel', type: 'text' },
  { id: 'futureText', label: 'Abschluss — Text', type: 'textarea' },
]

const homeFields: FieldDef[] = [
  { id: 'servicesTitle', label: 'Leistungen — Titel', type: 'text' },
  { id: 'servicesSubtitle', label: 'Leistungen — Untertitel', type: 'textarea' },
  { id: 'services', label: 'Leistungen (Karten)', type: 'card-list', hint: 'Pro Karte: title und description' },

  { id: 'processTitle', label: 'Ablauf — Titel', type: 'text' },
  { id: 'processSubtitle', label: 'Ablauf — Untertitel', type: 'textarea' },
  { id: 'processSteps', label: 'Ablauf-Schritte (Karten)', type: 'card-list', hint: 'Pro Karte: title und description' },

  { id: 'ctaTitle', label: 'Abschluss-CTA — Titel', type: 'text' },
  { id: 'ctaSubtitle', label: 'Abschluss-CTA — Untertitel', type: 'textarea' },
  { id: 'ctaContact', label: 'Abschluss-CTA — Button Kontakt', type: 'text' },
  { id: 'ctaLearnMore', label: 'Abschluss-CTA — Button Mehr erfahren', type: 'text' },
]

export const pageSchemas: Record<string, PageSchema> = {
  'fuer-unternehmen': {
    slug: 'fuer-unternehmen',
    label: 'Für Unternehmen',
    description: 'Komplette Inhalte der Seite "Für Unternehmen"',
    locales: ['de', 'en'] as const,
    fields: fuerUnternehmenFields,
    defaults: {
      de: {
        heroTitle: 'Fachkräfte finden statt suchen',
        heroSubtitle:
          'Ihr Partner für passgenaue Vermittlung von Talenten und Azubis. Wir bringen Sie mit den Menschen zusammen, die Ihr Unternehmen voranbringen.',
        heroCtaText: 'Kandidaten anfragen',

        introHeadline: 'Schluss mit dem Fachkräftemangel',
        introText:
          'Offene Stellen kosten Geld, Zeit und Nerven. Wir nehmen Ihnen die mühsame Suche ab und präsentieren Ihnen ausschließlich vorqualifizierte Kandidaten – fachlich und kulturell auf Ihr Unternehmen abgestimmt.',
        painPoints: [
          'Unbesetzte Stellen kosten Geld – bis zu 29.000 € pro Vakanz.',
          'Hoher Zeitaufwand bei der Sichtung unpassender Bewerbungen.',
          'Schwierigkeit, junge Menschen für eine Ausbildung zu begeistern.',
        ],
        introClosing:
          'Also, Schluss mit dem Fachkräftemangel. Wir bringen Sie mit den Talenten zusammen, die Ihr Unternehmen voranbringen.',

        whyTitle: 'Ihre Vorteile',
        whySubtitle: 'Was Ihnen die Zusammenarbeit mit M&F Talent Connect bringt:',
        benefits: [
          {
            title: 'Zeitersparnis',
            description:
              'Wir übernehmen die Vorauswahl und präsentieren nur passende Profile – ganz nach Ihrem Wunsch.',
          },
          {
            title: 'Qualitätsgarantie',
            description: 'Vorabprüfung der Qualifikationen und der Motivation aller Kandidaten.',
          },
          {
            title: 'Netzwerkzugang',
            description:
              'Zugriff auf einen Pool an Fachkräften und Ausbildungssuchenden, die nicht über klassische Anzeigen erreichbar sind.',
          },
          {
            title: 'Risikominimierung',
            description: 'Sie zahlen erst bei erfolgreicher Vermittlung – kein finanzielles Risiko.',
          },
          {
            title: 'Entlastung in der Probezeit',
            description:
              'Wir präsentieren nur Kandidaten, die wir persönlich auf Fachkompetenz und Cultural Fit geprüft haben – das senkt Ihre Kündigungsquote in der Probezeit erheblich.',
          },
          {
            title: 'Zugang zu „passiven" Kandidaten',
            description:
              'Viele der besten Fachkräfte suchen nicht aktiv. Wir erreichen sie – gezielt und persönlich.',
          },
          {
            title: 'Entlastung von Geschäftsführung und HR',
            description:
              'Konzentrieren Sie sich auf Ihr Business. Wir übernehmen Screening, Terminierung und das gesamte Bewerbermanagement.',
          },
          {
            title: 'Fokus auf Ausbildung',
            description:
              'Eigene Ausbildung ist die nachhaltigste Personalentwicklung. Wir finden motivierte Azubis, die zu Ihrem Betrieb passen – Know-how von morgen, schon heute.',
          },
        ],

        howTitle: 'Unser Prozess',
        howSubtitle:
          'Transparenz ist die Basis unserer Zusammenarbeit. So effizient begleiten wir Sie von der Vakanz bis zur Vertragsunterzeichnung.',
        steps: [
          {
            num: '01',
            title: 'Bedarfsanalyse',
            desc:
              'In einem kurzen Erstgespräch definieren wir nicht nur die fachlichen Qualifikationen, sondern auch den Cultural Fit – damit der neue Kollege wirklich zu Ihrem Team passt.',
          },
          {
            num: '02',
            title: 'Gezieltes Sourcing',
            desc:
              'Wir aktivieren unser Netzwerk und nutzen moderne Recruiting-Kanäle (Social Media, Datenbanken, Partner), um gezielt Fachkräfte und Ausbildungssuchende anzusprechen.',
          },
          {
            num: '03',
            title: 'Vorauswahl',
            desc:
              'Jeder Kandidat durchläuft ein Erstinterview. Wir prüfen Dokumente, Sprachkenntnisse, Motivation und Verfügbarkeit. Sie erhalten ein aussagekräftiges Kurzprofil samt unserer Einschätzung.',
          },
          {
            num: '04',
            title: 'Kennenlernen und Interview',
            desc:
              'Wir koordinieren die Termine. Sie führen die Vorstellungsgespräche – persönlich oder digital. Auf Wunsch nehmen wir beratend teil.',
          },
          {
            num: '05',
            title: 'Erfolgreiches Onboarding',
            desc:
              'Wir begleiten den Prozess bis zur Vertragsunterschrift – und auf Wunsch bleiben wir auch in den ersten Wochen Ihr Ansprechpartner.',
          },
        ],

        extraTitle: 'Weitere Vorteile auf einen Blick',
        extras: [
          {
            title: 'Exklusiver Talentpool',
            description:
              'Greifen Sie auf Fachkräfte und motivierte Azubis zu, die auf dem klassischen Stellenmarkt oft unsichtbar sind.',
          },
          {
            title: 'Qualität statt Quantität',
            description:
              'Sparen Sie Zeit – wir präsentieren ausschließlich vorqualifizierte Kandidaten, die fachlich und menschlich perfekt passen.',
          },
          {
            title: 'Risikofreie Partnerschaft',
            description:
              'Unsere Vermittlung ist erfolgsbasiert. Sie investieren erst, wenn wir das perfekte Match gefunden haben.',
          },
        ],

        relocationTitle: 'Unsere Relocation-Services',
        relocationSubtitle:
          'Wir begleiten Ihre neuen Mitarbeitenden auf jedem Schritt – von der Visumsfrage bis zum Einzug in Deutschland.',
        relocation: [
          {
            title: '1. Pre-Arrival und Visum-Management',
            description:
              'Behördenservice beim Visumantrag, Vorabprüfung aller Zeugnisse und Anerkennungsverfahren sowie Briefing zu Leben und Arbeiten in Deutschland (Versicherungen, Steuern, Kultur).',
          },
          {
            title: '2. Welcome-Service: Ankunft am Flughafen',
            description:
              'Persönlicher Empfang am Gate, Transfer zur ersten Unterkunft und auf Wunsch ein Welcome-Package mit lokaler SIM-Karte und Orientierungshilfen für die Region.',
          },
          {
            title: '3. Integration und Behördengänge',
            description:
              'Begleitung zum Einwohnermeldeamt, Eröffnung eines Girokontos, Suche nach möbliertem Wohnen oder Mietwohnungen und Unterstützung bei der Wahl der Krankenkasse.',
          },
        ],

        finalTitle: 'Wir finden den passenden Mitarbeiter – nicht irgendeinen.',
        finalText:
          'Wir bringen hochmotivierte Ausbildungssuchende und Fachkräfte aus dem Ausland direkt in Ihren Betrieb – inklusive Visum-Support und Ankunfts-Begleitung. Neugierig auf unser Konzept oder bereit für eine Zusammenarbeit? Wir freuen uns auf Ihre Nachricht.',
        requestBtn: 'Jetzt unverbindlich anfragen',
      },
      en: {
        heroTitle: 'Stop searching — start finding skilled workers',
        heroSubtitle:
          'Your partner for tailor-made placement of professionals and apprentices. We connect you with the people who will move your company forward.',
        heroCtaText: 'Request candidates',

        introHeadline: 'End the skilled worker shortage',
        introText:
          'Vacant positions cost money, time and energy. We take the painful search off your hands and present only pre-qualified candidates — aligned with your company professionally and culturally.',
        painPoints: [
          'Unfilled positions cost money — up to €29,000 per vacancy.',
          'Heavy time investment screening unsuitable applications.',
          'Difficulty inspiring young people about an apprenticeship.',
        ],
        introClosing:
          'Enough of the talent shortage. We connect you with the talent that will move your business forward.',

        whyTitle: 'Your benefits',
        whySubtitle: 'What working with M&F Talent Connect brings you:',
        benefits: [
          { title: 'Save time', description: 'We pre-screen and present only matching profiles — exactly to your wishes.' },
          { title: 'Quality guarantee', description: 'Up-front check of qualifications and motivation of every candidate.' },
          { title: 'Network access', description: 'Reach professionals and apprenticeship seekers who are not visible on classic job boards.' },
          { title: 'Risk minimisation', description: 'You only pay on successful placement — no financial risk.' },
          { title: 'Fewer probation drop-outs', description: 'We only present candidates we have personally checked for skills and cultural fit, reducing probation-period terminations.' },
          { title: 'Access to passive talent', description: 'Many of the best people don’t actively search. Through our network we reach them directly.' },
          { title: 'Relief for management and HR', description: 'Focus on your business — we handle screening, scheduling, and the entire candidate management.' },
          { title: 'Apprenticeship focus', description: 'Training your own people is the most sustainable form of HR. We find motivated apprentices who fit your craft and your team.' },
        ],

        howTitle: 'Our process',
        howSubtitle:
          'Transparency is the basis of our collaboration. This is how we accompany you from vacancy to signed contract.',
        steps: [
          { num: '01', title: 'Needs analysis', desc: 'In a short kick-off call we define both the technical qualifications and the cultural fit — so the new hire really matches your team.' },
          { num: '02', title: 'Targeted sourcing', desc: 'We activate our network and modern recruiting channels (social, databases, partners) to reach the right professionals and apprenticeship seekers.' },
          { num: '03', title: 'Pre-selection', desc: 'Each candidate goes through an interview with us. We check documents, language skills, motivation and availability. You receive a clear short profile and our recommendation.' },
          { num: '04', title: 'Meet and interview', desc: 'We coordinate scheduling. You conduct the interviews — in person or remotely. On request we sit in as advisors.' },
          { num: '05', title: 'Smooth onboarding', desc: 'We accompany the process all the way to the signed contract — and stay your contact during the first weeks if you wish.' },
        ],

        extraTitle: 'More benefits at a glance',
        extras: [
          { title: 'Exclusive talent pool', description: 'Access professionals and motivated apprentices who are usually invisible on classic job markets.' },
          { title: 'Quality over quantity', description: 'Save time — we only present pre-qualified candidates who fit professionally and personally.' },
          { title: 'Risk-free partnership', description: 'Our placement is success-based. You only invest when we’ve found the perfect match.' },
        ],

        relocationTitle: 'Our relocation services',
        relocationSubtitle:
          'We accompany your new hires every step of the way — from visa to moving in.',
        relocation: [
          { title: '1. Pre-arrival and visa management', description: 'Authority service for the visa application, pre-check of all certificates and recognition procedures, plus briefing on living and working in Germany.' },
          { title: '2. Welcome service at the airport', description: 'Personal pick-up at the gate, transfer to the first accommodation and an optional welcome package with local SIM and orientation help.' },
          { title: '3. Integration and administration', description: 'Help with city-hall registration, bank account, temporary or long-term housing, and selecting a public health insurance.' },
        ],

        finalTitle: 'We find the right person — not just anyone.',
        finalText:
          'We bring highly motivated apprentice seekers and professionals from abroad directly to your business — including visa support and arrival assistance. Curious about our approach, or ready to talk about a partnership? We look forward to hearing from you.',
        requestBtn: 'Submit a non-binding request',
      },
    },
  },
  'fuer-bewerber': {
    slug: 'fuer-bewerber',
    label: 'Für Bewerber',
    description: 'Komplette Inhalte der Seite "Für Bewerber"',
    locales: ['de', 'en'] as const,
    fields: forApplicantsFields,
    defaults: {
      de: {
        heroTitle: 'M&F Talent Connect – Your bridge to a career in Germany.',
        heroSubtitle:
          'Träumen Sie von einer Karriere in Deutschland? Wir machen es möglich. Von der Suche nach dem passenden Ausbildungsplatz bis zur Unterstützung beim Visum — M&F Talent Connect ist Ihr verlässlicher Partner für den Neustart in Europa.',
        heroCtaText: 'Jetzt bewerben',

        welcomeHeadline: 'Herzlich willkommen bei M&F Talent Connect!',
        welcomeText:
          'Suchen Sie nicht einfach nur irgendeinen Job, sondern den perfekten Start in Ihre Karriere? Egal ob Sie Ihren ersten Ausbildungsplatz suchen oder den nächsten Schritt in Ihrem Berufsleben planen — wir sind an Ihrer Seite. Von der Suche nach dem passenden Arbeits- oder Ausbildungsplatz bis zur Unterstützung beim Visum: M&F Talent Connect ist Ihr verlässlicher Partner für den Neustart in Deutschland. Profitieren Sie von unserem Netzwerk und einer individuellen Betreuung, die über die reine Vermittlung hinausgeht. Entdecken Sie jetzt unsere aktuellen Stellenangebote und starten Sie mit uns durch.',

        checklistTitle: 'Checkliste: Ihr Weg zum Job in Deutschland',
        checklistSubtitle: 'Bereitgestellt von M&F Talent Connect — alles, was Sie für Ihre Bewerbung wirklich brauchen.',
        checklistGroups: [
          {
            title: '1. Basis-Dokumente (für alle)',
            description:
              '• Reisepass: gültig für mindestens 12 Monate.\n• Lebenslauf (CV): tabellarisches Format, idealerweise nach EU-Standard / Europass.\n• Motivationsschreiben: Warum möchten Sie in Deutschland arbeiten oder lernen?\n• Sprachzertifikat: Nachweis der Deutschkenntnisse (Goethe, Telc, ÖSD).\n  – Azubis: mind. B1 (empfohlen B2, besser C1).\n  – Fachkräfte: mind. B1/B2 je nach Branche.',
          },
          {
            title: '2. Speziell für Azubi-Bewerber (Ausbildung)',
            description:
              '• Schulabschlusszeugnisse: das letzte Abschlusszeugnis Ihrer Schule.\n• Übersetzungen: alle Zeugnisse von einem vereidigten Übersetzer ins Deutsche übersetzt.\n• Anerkennung / Bewertung: Nachweis, dass Ihr Schulabschluss einem deutschen Abschluss entspricht (z.B. über die Zeugnisanerkennungsstelle).\n• Praktikumsnachweise: falls vorhanden — sehr hilfreich für die Bewerbung.',
          },
          {
            title: '3. Speziell für Fachkräfte (Arbeitsplatz)',
            description:
              '• Berufsabschluss / Diplom: Urkunden über Ausbildung oder Studium.\n• Detaillierte Fächerübersicht (Transcript of Records): wichtig für das Anerkennungsverfahren.\n• Arbeitszeugnisse: Referenzen früherer Arbeitgeber.\n• Berufserlaubnis: nur für reglementierte Berufe (Pflege, Ärzte, Ingenieure) — Nachweis, dass Sie den Beruf ausüben dürfen.',
          },
        ],

        supportTitle: 'Wie wir Sie unterstützen',
        supportSubtitle:
          'Mehr als Vermittlung — eine echte Begleitung. Wir nehmen Sie an die Hand, von der Bewerbung bis zur Ankunft in Deutschland.',
        support: [
          {
            title: '1. Unterstützung im Bewerbungsprozess',
            description:
              '• Check der Unterlagen: Wir prüfen Ihren Lebenslauf und Ihr Motivationsschreiben nach deutschen Standards.\n• Interview-Training: Wir bereiten Sie in Video-Gesprächen gezielt auf die Vorstellungsgespräche bei deutschen Arbeitgebern vor.\n• Direkter Draht: Wir präsentieren Ihr Profil direkt den Entscheidern in den Unternehmen — das spart Zeit und vermeidet anonyme Online-Portale.',
          },
          {
            title: '2. Hilfe bei Visum und Bürokratie',
            description:
              '• Visum-Begleitung: Wir unterstützen Sie beim Zusammenstellen aller Dokumente für die deutsche Botschaft.\n• Anerkennungs-Service: Wir helfen Ihnen, Ihre ausländischen Abschlüsse in Deutschland offiziell anerkennen zu lassen.\n• Behörden-Guide: Wir erklären Ihnen, wie Sie sich nach der Ankunft anmelden und eine Krankenversicherung abschließen.',
          },
          {
            title: '3. Start in Deutschland (Relocation)',
            description:
              '• Wohnungssuche: Wir unterstützen Sie dabei, eine erste Unterkunft oder ein Zimmer in einer WG zu finden.\n• Abhol-Service: Wenn möglich organisieren wir, dass Sie bei Ihrer Ankunft in Deutschland in Empfang genommen werden.\n• Bankkonto & Handy: Wir helfen bei den ersten praktischen Schritten wie Kontoeröffnung und SIM-Karte.',
          },
          {
            title: '4. Integration und Sprache',
            description:
              '• Sprachschul-Vermittlung: Falls Ihr Deutsch noch nicht reicht, vermitteln wir passende Online-Sprachkurse bei unseren Partnern.\n• Kultur-Coaching: Wir geben Ihnen Tipps für Leben und Arbeiten in Deutschland, damit Sie sich schnell wie zu Hause fühlen.',
          },
        ],

        commitmentTitle: 'Ihr Erfolg ist unser Ziel — wir begleiten Sie Schritt für Schritt.',
        commitmentText:
          'Ein Umzug in ein neues Land ist ein großer Schritt. Bei M&F Talent Connect lassen wir Sie nicht allein. Von der Optimierung Ihrer Bewerbung über das anspruchsvolle Visumsverfahren bis hin zur Suche nach Ihrer ersten Wohnung in Deutschland: wir sind Ihr persönlicher Partner. Unser Ziel ist es, dass Sie sich voll und ganz auf Ihren neuen Job oder Ihre Ausbildung konzentrieren können — wir kümmern uns um den Rest.',

        stepsTitle: 'Ihr Weg in 5 Schritten',
        stepsSubtitle: 'So einfach starten Sie mit uns durch.',
        steps: [
          { num: '01', title: 'Kostenloses Erstgespräch', desc: 'Wir lernen uns kennen und besprechen Ihre Ziele, Ihre Qualifikationen und Ihre Wünsche.' },
          { num: '02', title: 'Unterlagen-Check', desc: 'Wir prüfen Ihre Dokumente, beraten Sie zu Übersetzungen und Anerkennung.' },
          { num: '03', title: 'Job-Matching', desc: 'Wir präsentieren Ihr Profil passenden deutschen Arbeitgebern und organisieren die Interviews.' },
          { num: '04', title: 'Visum-Support', desc: 'Wir begleiten Sie bei den Anträgen und Behördengängen bis zur Erteilung des Visums.' },
          { num: '05', title: 'Ankunft in Deutschland', desc: 'Wir unterstützen Sie beim Start vor Ort: Wohnung, Anmeldung, Bankkonto, Krankenversicherung.' },
        ],

        eligibilityTitle: 'Wer kann sich bewerben?',
        eligibility: [
          'Fachkräfte mit anerkanntem oder anerkennungsfähigem Abschluss',
          'Ausbildungssuchende mit guter Schulbildung',
          'Personen mit Deutschkenntnissen ab B1',
          'Motivierte Kandidaten mit klarem Berufsziel',
        ],

        readyTitle: 'Bereit loszulegen?',
        readySubtitle:
          'Schauen Sie sich unsere aktuellen Angebote an oder nehmen Sie direkt Kontakt mit uns auf.',
        viewJobs: 'Jobangebote ansehen',
        viewTrainings: 'Ausbildungsangebote',
      },
      en: {
        heroTitle: 'M&F Talent Connect — Your bridge to a career in Germany.',
        heroSubtitle:
          'Dreaming of a career in Germany? We make it happen. From finding the right apprenticeship to handling your visa, M&F Talent Connect is your reliable partner for a fresh start in Europe.',
        heroCtaText: 'Apply now',

        welcomeHeadline: 'Welcome to M&F Talent Connect!',
        welcomeText:
          'Looking not for just any job, but for the perfect start of your career? Whether you are searching for your first apprenticeship or planning the next step in your professional life, we are at your side. From finding the right job or training to visa support — we are your reliable partner for a fresh start in Germany. Benefit from our network and personal guidance that goes beyond simple placement. Discover our current offers and start your journey with us.',

        checklistTitle: 'Checklist: Your path to a job in Germany',
        checklistSubtitle: 'Provided by M&F Talent Connect — everything you really need for your application.',
        checklistGroups: [
          {
            title: '1. Core documents (for everyone)',
            description:
              '• Passport: valid for at least 12 months.\n• CV: tabular format, ideally EU standard / Europass.\n• Motivation letter: why do you want to work or study in Germany?\n• Language certificate: proof of German skills (Goethe, Telc, ÖSD).\n  – Apprentices: at least B1 (B2 recommended, C1 ideal).\n  – Professionals: at least B1/B2 depending on the field.',
          },
          {
            title: '2. Specific to apprenticeship applicants',
            description:
              '• School leaving certificates: your most recent diploma.\n• Translations: all certificates translated into German by a sworn translator.\n• Recognition / evaluation: proof that your diploma matches a German qualification (e.g. via the Zeugnisanerkennungsstelle).\n• Internship records: very helpful for your application if available.',
          },
          {
            title: '3. Specific to skilled professionals',
            description:
              '• Professional qualification / diploma: certificates of training or studies.\n• Detailed transcript of records: essential for the recognition procedure.\n• Work references: from previous employers.\n• Professional licence: only for regulated professions (nursing, doctors, engineers) — proof that you may practise the profession.',
          },
        ],

        supportTitle: 'How we support you',
        supportSubtitle:
          'More than placement — true guidance. We hold your hand from application to arrival.',
        support: [
          {
            title: '1. Application support',
            description:
              '• Document review: we check your CV and motivation letter against German standards.\n• Interview training: targeted video sessions to prepare you for interviews with German employers.\n• Direct line: we present your profile straight to decision makers — saving time vs. anonymous online portals.',
          },
          {
            title: '2. Visa and administration',
            description:
              '• Visa support: we help you assemble all documents for the German embassy.\n• Recognition service: we help officially recognise your foreign qualifications in Germany.\n• Authorities guide: we explain how to register and choose health insurance after arrival.',
          },
          {
            title: '3. Start in Germany (relocation)',
            description:
              '• Housing search: we help you find a first place to stay or a room in a shared flat.\n• Pick-up service: where possible we organise to meet you on arrival in Germany.\n• Bank account & phone: we help with the first practical steps — bank account, SIM card and more.',
          },
          {
            title: '4. Integration and language',
            description:
              '• Language school referral: if your German is not yet enough we connect you with our partner courses.\n• Cultural coaching: tips for living and working in Germany so you feel at home quickly.',
          },
        ],

        commitmentTitle: 'Your success is our goal — we walk with you, step by step.',
        commitmentText:
          'Moving to a new country is a big step. At M&F Talent Connect we never leave you alone. From sharpening your application through the demanding visa process to finding your first home in Germany, we are your personal partner. Our goal is that you can fully focus on your new job or training — we take care of the rest.',

        stepsTitle: 'Your journey in 5 steps',
        stepsSubtitle: 'How easy it is to start with us.',
        steps: [
          { num: '01', title: 'Free first call', desc: 'We get to know each other and discuss your goals, qualifications and wishes.' },
          { num: '02', title: 'Documents check', desc: 'We review your documents and advise on translations and recognition.' },
          { num: '03', title: 'Job matching', desc: 'We present your profile to suitable German employers and arrange interviews.' },
          { num: '04', title: 'Visa support', desc: 'We accompany you through applications and authorities until your visa is issued.' },
          { num: '05', title: 'Arrival in Germany', desc: 'We help with housing, registration, bank account and health insurance once you land.' },
        ],

        eligibilityTitle: 'Who can apply?',
        eligibility: [
          'Professionals with a recognised or recognisable qualification',
          'Apprenticeship seekers with a solid school education',
          'Persons with German skills from B1 level',
          'Motivated candidates with a clear career goal',
        ],

        readyTitle: 'Ready to get started?',
        readySubtitle: 'Browse our current offers or get in touch directly.',
        viewJobs: 'View job offers',
        viewTrainings: 'Apprenticeship offers',
      },
    },
  },
  'ueber-uns': {
    slug: 'ueber-uns',
    label: 'Über uns',
    description: 'Komplette Inhalte der Seite "Über uns"',
    locales: ['de', 'en'] as const,
    fields: ueberUnsFields,
    defaults: {
      de: {
        heroTitle: 'Über M&F Talent Connect',
        heroSubtitle: 'Wir glauben an eine Welt, in der Talent keine Grenzen kennt.',
        missionTitle: 'Unsere Mission',
        missionText1: 'Bei M&F Talent Connect glauben wir daran, dass Erfolg mit Menschen beginnt. Unsere Leidenschaft ist es, Brücken zu bauen – zwischen engagierten Fachkräften und Unternehmen, die echte Perspektiven bieten.',
        missionText2: 'Wir verstehen, dass hinter jeder Bewerbung ein Traum steht und hinter jeder offenen Stelle eine Chance. Darum begleiten wir unsere Kandidaten mit Empathie, Erfahrung und echter Begeisterung – von der ersten Kontaktaufnahme bis zur erfolgreichen Integration.',
        missionText3: 'Unser Ziel ist mehr als nur Vermittlung: Wir schaffen Verbindungen, die Zukunft gestalten – für Menschen, für Unternehmen, für nachhaltigen Erfolg.',
        missionBtn: 'Kontakt aufnehmen',
        challengeTitle: 'Fachkräftemangel in Deutschland – eine Herausforderung, die Unternehmen spürt',
        challengeText1: 'Der deutsche Arbeitsmarkt steht vor einer der größten Herausforderungen unserer Zeit: Gut ausgebildete Fachkräfte fehlen – in nahezu allen Branchen. Unternehmen kämpfen darum, offene Stellen zu besetzen, Projekte voranzubringen und ihre Wettbewerbsfähigkeit zu sichern. Besonders schwer wiegt der Mangel an qualifizierten Auszubildenden und Fachkräften, die die Basis für die Zukunft eines jeden Betriebs bilden.',
        challengeText2: 'Viele Betriebe investieren bereits enorme Ressourcen in Recruiting, doch die Realität bleibt dieselbe: Die richtigen Talente zu finden, wird immer schwieriger. Demografischer Wandel, steigende Anforderungen und ein intensiver Wettbewerb um die besten Köpfe verschärfen die Situation zusätzlich.',
        responseTitle: 'Unsere Antwort auf diese Entwicklung',
        responseText1: 'Bei M&F Talent Connect haben wir uns darauf spezialisiert, Unternehmen genau dort zu unterstützen, wo der Bedarf am größten ist. Wir öffnen Türen zu einem Talentpool, der in Deutschland oft übersehen wird – und gleichzeitig volles Potenzial steckt: Auszubildende und Fachkräfte aus dem Ausland, nämlich Kamerun und Senegal.',
        responseText2: 'In beiden Ländern gibt es eine hohe Nachfrage nach beruflichen Perspektiven in Deutschland, verbunden mit einer beeindruckenden Zahl motivierter, gut ausgebildeter junger Menschen. Sie bringen nicht nur fachliche Kompetenz mit, sondern auch Leidenschaft, Lernbereitschaft und den Wunsch, sich langfristig zu integrieren.',
        bridgeTitle: 'Wir verbinden Unternehmen mit Talenten, die wirklich wollen',
        bridgeText1: 'Unser Ziel ist es, Brücken zu bauen – zwischen deutschen Unternehmen, die dringend Verstärkung benötigen, und engagierten Fachkräften sowie Auszubildenden, die bereit sind, ihre Zukunft aktiv zu gestalten.',
        bridgeText2: 'Wir begleiten beide Seiten professionell, transparent und zuverlässig: Von der Auswahl geeigneter Kandidaten über die Vorbereitung auf den deutschen Arbeitsmarkt bis hin zur erfolgreichen Integration im Unternehmen.',
        futureTitle: 'Gemeinsam schaffen wir Zukunft',
        futureText: 'Mit M&F Talent Connect gewinnen Unternehmen nicht nur neue Mitarbeiter – sie gewinnen Menschen, die Chancen nutzen, Verantwortung übernehmen und langfristig bleiben wollen.',
      },
      en: {
        heroTitle: 'About M&F Talent Connect',
        heroSubtitle: 'We believe in a world where talent knows no borders.',
        missionTitle: 'Our Mission',
        missionText1: 'At M&F Talent Connect, we believe that success begins with people. Our passion is building bridges — between dedicated professionals and companies that offer real opportunities.',
        missionText2: "We understand that behind every application is a dream, and behind every open position is a chance. That's why we accompany our candidates with empathy, experience and genuine enthusiasm — from first contact through to successful integration.",
        missionText3: 'Our goal is more than placement: we create connections that shape the future — for people, for companies, for lasting success.',
        missionBtn: 'Get in touch',
        challengeTitle: 'Skills shortage in Germany – a challenge companies feel every day',
        challengeText1: "The German labour market faces one of the greatest challenges of our time: well-trained skilled workers are missing — in almost every sector. Companies struggle to fill open positions, move projects forward and secure their competitiveness. The shortage of qualified apprentices and skilled workers, who form the foundation of every company's future, weighs especially heavily.",
        challengeText2: 'Many companies already invest enormous resources in recruiting, yet the reality stays the same: finding the right talent keeps getting harder. Demographic change, rising requirements and intense competition for the best people make the situation even more difficult.',
        responseTitle: 'Our answer to this development',
        responseText1: 'At M&F Talent Connect, we specialise in supporting companies exactly where the need is greatest. We open doors to a talent pool that is often overlooked in Germany — yet holds enormous potential: apprentices and skilled workers from abroad, namely Cameroon and Senegal.',
        responseText2: 'Both countries see high demand for career opportunities in Germany, combined with an impressive number of motivated, well-trained young people. They bring not only professional skills, but also passion, eagerness to learn and a genuine wish to build a long-term future.',
        bridgeTitle: 'We connect companies with talent that truly wants to be there',
        bridgeText1: 'Our goal is to build bridges — between German companies urgently needing support and dedicated skilled workers and apprentices ready to actively shape their future.',
        bridgeText2: 'We guide both sides professionally, transparently and reliably: from selecting suitable candidates, through preparing them for the German labour market, to their successful integration within the company.',
        futureTitle: 'Together, we build the future',
        futureText: "With M&F Talent Connect, companies don't just gain new employees — they gain people who seize opportunities, take on responsibility and want to stay for the long run.",
      },
    },
  },
  home: {
    slug: 'home',
    label: 'Startseite',
    description: 'Leistungen, Ablauf und Abschluss-CTA der Startseite (Hero wird unter „Hero & Banner" verwaltet)',
    locales: ['de', 'en'] as const,
    fields: homeFields,
    defaults: {
      de: {
        servicesTitle: 'Unsere Leistungen',
        servicesSubtitle: 'M&F Talent Connect — Ihre verlässliche Brücke zum deutschen Arbeitsmarkt.',
        services: [
          { title: 'Vermittlung', description: 'Wir vermitteln qualifizierte Fachkräfte und Ausbildungssuchende an deutsche Unternehmen — schnell, zuverlässig und auf Augenhöhe.' },
          { title: 'Ausbildung', description: 'Wir begleiten Ausbildungssuchende auf ihrem Weg ins deutsche Berufsausbildungssystem und unterstützen bei allen bürokratischen Schritten.' },
          { title: 'Für Unternehmen', description: 'Finden Sie motivierte Mitarbeiter und Auszubildende — mit vollständiger Vorauswahl, Sprachüberprüfung und Integrationssupport.' },
          { title: 'Für Bewerber', description: 'Ob Berufserfahrene oder Ausbildungssuchende — wir öffnen Ihnen die Türen zum deutschen Arbeitsmarkt und stehen Ihnen Seite an Seite.' },
        ],
        processTitle: "So funktioniert's",
        processSubtitle: 'In drei Schritten zur passenden Stelle — oder zur passenden Fachkraft.',
        processSteps: [
          { title: 'Kontakt aufnehmen', description: 'Senden Sie uns Ihre Bewerbung oder Ihre Anfrage — unverbindlich und kostenlos.' },
          { title: 'Passgenaues Matching', description: 'Wir prüfen Qualifikationen und Anforderungen und bringen die richtigen Menschen und Unternehmen zusammen.' },
          { title: 'Vermittlung und Begleitung', description: 'Wir begleiten beide Seiten durch den gesamten Prozess — von den Formalitäten bis zum erfolgreichen Start.' },
        ],
        ctaTitle: 'Bereit für den nächsten Schritt?',
        ctaSubtitle: 'Ob Unternehmen oder Bewerber — wir begleiten Sie auf Ihrem Weg.',
        ctaContact: 'Jetzt Kontakt aufnehmen',
        ctaLearnMore: 'Mehr erfahren',
      },
      en: {
        servicesTitle: 'Our Services',
        servicesSubtitle: 'M&F Talent Connect — your reliable bridge to the German job market.',
        services: [
          { title: 'Recruitment', description: 'We place qualified professionals and apprenticeship seekers with German companies — fast, reliable, and at eye level.' },
          { title: 'Apprenticeships', description: 'We guide apprenticeship seekers through the German vocational training system and support them with all bureaucratic steps.' },
          { title: 'For Companies', description: 'Find motivated employees and apprentices — with full pre-selection, language verification, and integration support.' },
          { title: 'For Applicants', description: 'Whether experienced professionals or apprenticeship seekers — we open the doors to the German job market and stand by your side.' },
        ],
        processTitle: 'How it works',
        processSubtitle: 'Three steps to the right position — or the right talent.',
        processSteps: [
          { title: 'Get in touch', description: 'Send us your application or your request — free of charge and without obligation.' },
          { title: 'Precise matching', description: 'We review qualifications and requirements and bring the right people and companies together.' },
          { title: 'Placement and support', description: 'We guide both sides through the entire process — from paperwork to a successful start.' },
        ],
        ctaTitle: 'Ready for the next step?',
        ctaSubtitle: 'Whether a company or an applicant — we guide you on your journey.',
        ctaContact: 'Get in touch',
        ctaLearnMore: 'Learn more',
      },
    },
  },
}

export function getPageList() {
  return Object.values(pageSchemas).map((p) => ({ slug: p.slug, label: p.label, description: p.description }))
}

export async function getPageContent<T = Record<string, unknown>>(
  slug: string,
  locale: string,
): Promise<T> {
  const schema = pageSchemas[slug]
  const defaults = (schema?.defaults?.[locale] ?? schema?.defaults?.de ?? {}) as Record<string, unknown>
  try {
    const row = await prisma.pageContent.findUnique({
      where: { slug_locale: { slug, locale } },
    })
    if (row?.content) {
      const override = row.content as Record<string, unknown>
      return { ...defaults, ...override } as T
    }
  } catch (err) {
    console.error('getPageContent error:', err)
  }
  return defaults as T
}

export async function setPageContent(slug: string, locale: string, value: Record<string, unknown>) {
  const content = value as Prisma.InputJsonValue
  await prisma.pageContent.upsert({
    where: { slug_locale: { slug, locale } },
    update: { content },
    create: { slug, locale, content },
  })
}
