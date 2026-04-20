import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // ── Hero content ────────────────────────────────────────────────────────────
  await prisma.heroContent.upsert({
    where: { key: 'home_hero' },
    update: {},
    create: {
      key: 'home_hero',
      title: 'Ihre Brücke zwischen Afrika und Deutschland',
      subtitle:
        'M&F Talent Connect verbindet qualifizierte Fachkräfte und Ausbildungssuchende mit deutschen Unternehmen — für eine gemeinsame Zukunft.',
      ctaText: 'Jetzt bewerben',
      ctaLink: '/kontakt',
    },
  })

  await prisma.heroContent.upsert({
    where: { key: 'bewerber_hero' },
    update: {},
    create: {
      key: 'bewerber_hero',
      title: 'Ihr Weg nach Deutschland beginnt hier',
      subtitle:
        'Egal ob Fachkraft oder Ausbildungssuchender — wir begleiten Sie Schritt für Schritt bis zur erfolgreichen Integration.',
      ctaText: 'Bewerbung starten',
      ctaLink: '/kontakt',
    },
  })

  // ── Job Offers ──────────────────────────────────────────────────────────────
  await prisma.jobOffer.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Pflegefachkraft (m/w/d)',
        company: 'Seniorenzentrum Sonnengarten',
        location: 'Berlin',
        contractType: 'Vollzeit',
        description:
          'Für unser modernes Seniorenzentrum in Berlin-Mitte suchen wir eine einfühlsame und engagierte Pflegefachkraft.\n\nSie arbeiten in einem motivierten Team aus 40 Kollegen und betreuen unsere Bewohner mit Herz und Kompetenz. Wir bieten flexible Schichtmodelle, eine übertarifliche Vergütung und aktive Unterstützung bei der Wohnungssuche.',
        requirements:
          '• Abgeschlossene Ausbildung als Pflegefachkraft (3-jährig)\n• Mindestens B2-Deutschkenntnisse\n• Teamfähigkeit und Einfühlungsvermögen\n• Bereitschaft zur Schichtarbeit',
        isActive: true,
      },
      {
        title: 'Elektriker / Elektroinstallateur (m/w/d)',
        company: 'ElektroTech GmbH',
        location: 'München',
        contractType: 'Vollzeit',
        description:
          'Die ElektroTech GmbH ist ein mittelständisches Unternehmen mit 20 Jahren Erfahrung im Bereich Elektroinstallation und Gebäudetechnik.\n\nSie führen selbstständig Elektroinstallationen in Neubauten und Bestandsgebäuden durch, lesen Schaltpläne und arbeiten eng mit dem Bauleiter zusammen.',
        requirements:
          '• Abgeschlossene Ausbildung als Elektriker oder vergleichbar\n• Mindestens B1-Deutschkenntnisse\n• Führerschein Klasse B von Vorteil\n• Selbstständige Arbeitsweise',
        isActive: true,
      },
      {
        title: 'Koch / Köchin (m/w/d)',
        company: 'Restaurant Zur Goldenen Gans',
        location: 'Hamburg',
        contractType: 'Vollzeit',
        description:
          'Unser traditionelles Restaurant in der Hamburger Altstadt sucht einen leidenschaftlichen Koch für die Mittagsküche.\n\nSie sind verantwortlich für die Zubereitung von Speisen nach unseren Rezepten, die Qualitätskontrolle und die Einhaltung der Hygienevorschriften (HACCP).',
        requirements:
          '• Abgeschlossene Kochausbildung oder gleichwertige Erfahrung\n• B1-Deutschkenntnisse\n• Belastbarkeit und Teamgeist\n• Flexibilität für Abend- und Wochenenddienste',
        isActive: true,
      },
      {
        title: 'Lagerlogistiker / Lagermitarbeiter (m/w/d)',
        company: 'LogiSpeed AG',
        location: 'Frankfurt am Main',
        contractType: 'Vollzeit',
        description:
          'LogiSpeed AG betreibt eines der modernsten Logistikzentren in Hessen. Für unsere Nachtschicht suchen wir zuverlässige Lagermitarbeiter.\n\nIhre Aufgaben: Wareneingang, Kommissionierung, Qualitätskontrolle und Inventur.',
        requirements:
          '• Erfahrung im Lagerbereich oder Bereitschaft zur Einarbeitung\n• A2-Deutschkenntnisse ausreichend\n• Körperliche Belastbarkeit\n• Bereitschaft zur Schicht- und Nachtarbeit',
        isActive: true,
      },
      {
        title: 'Altenpflegehelfer (m/w/d)',
        company: 'AWO Pflegedienst Köln',
        location: 'Köln',
        contractType: 'Teilzeit',
        description:
          'Der AWO Pflegedienst Köln sucht für seinen ambulanten Dienst einen Pflegehelfer (m/w/d) in Teilzeit.\n\nSie unterstützen unsere examinierten Pflegefachkräfte bei der Grundpflege, begleiten Bewohner zu Arztbesuchen und sorgen für ihr Wohlbefinden im Alltag.',
        requirements:
          '• Abgeschlossene 1-jährige Pflegehilfe-Ausbildung oder Bereitschaft zur Nachqualifizierung\n• B1-Deutschkenntnisse\n• Führerschein Klasse B zwingend erforderlich\n• Empathie und Verantwortungsbewusstsein',
        isActive: true,
      },
      {
        title: 'Reinigungskraft (m/w/d)',
        company: 'CleanPro Services',
        location: 'Stuttgart',
        contractType: 'Minijob',
        description:
          'CleanPro Services ist ein führendes Gebäudereinigungsunternehmen in Baden-Württemberg. Wir suchen zuverlässige Reinigungskräfte für Bürogebäude in Stuttgart-Mitte.\n\nEinsatzzeiten: Montag bis Freitag, 06:00 – 08:00 Uhr.',
        requirements:
          '• Keine Ausbildung erforderlich\n• Grundkenntnisse Deutsch (A2)\n• Pünktlichkeit und Zuverlässigkeit\n• Erfahrung in der Reinigung von Vorteil',
        isActive: true,
      },
      {
        title: 'Erzieher / Erzieherin (m/w/d)',
        company: 'Kindertagesstätte Regenbogen',
        location: 'Düsseldorf',
        contractType: 'Vollzeit',
        description:
          'Die Kita Regenbogen in Düsseldorf-Bilk sucht eine engagierte Erzieherin / einen engagierten Erzieher für unsere Krippen- und Kindergartengruppe.\n\nSie gestalten den pädagogischen Alltag, begleiten Kinder in ihrer Entwicklung und arbeiten eng mit den Eltern zusammen.',
        requirements:
          '• Staatlich anerkannte Ausbildung als Erzieher/in oder gleichwertiger Abschluss\n• Sehr gute Deutschkenntnisse (C1)\n• Kreativität und Geduld\n• Interesse an interkultureller Pädagogik',
        isActive: true,
      },
      {
        title: 'Maurer / Maurerin (m/w/d)',
        company: 'Bau & Mehr GmbH',
        location: 'Leipzig',
        contractType: 'Vollzeit',
        description:
          'Die Bau & Mehr GmbH realisiert Wohn- und Gewerbeprojekte in Sachsen und sucht erfahrene Maurer für ihr Stammteam.\n\nSie führen Maurerarbeiten nach Plan aus, beteiligen sich an Rohbauarbeiten und koordinieren sich täglich mit dem Polier.',
        requirements:
          '• Abgeschlossene Ausbildung als Maurer oder mehrjährige Erfahrung\n• B1-Deutschkenntnisse\n• Körperliche Fitness\n• Teamorientierung',
        isActive: true,
      },
      {
        title: 'Fahrer (m/w/d) — Personenbeförderung',
        company: 'TransferExpress GmbH',
        location: 'Berlin',
        contractType: 'Teilzeit',
        description:
          'TransferExpress befördert täglich Passagiere zwischen dem BER Flughafen und den Hotels Berlins. Für unser Wochenendteam suchen wir Fahrer (m/w/d).\n\nSie transportieren Gäste sicher und pünktlich, pflegen das Fahrzeug und sorgen für einen angenehmen Aufenthalt im Wagen.',
        requirements:
          '• Führerschein Klasse B (mind. 2 Jahre)\n• B2-Deutschkenntnisse\n• Freundliches Auftreten\n• Ortskenntnisse Berlin von Vorteil',
        isActive: true,
      },
      {
        title: 'IT-Support Techniker (m/w/d)',
        company: 'Digitalis GmbH',
        location: 'München',
        contractType: 'Vollzeit',
        description:
          'Digitalis GmbH ist ein IT-Dienstleister mit 80 Mitarbeitern, der KMUs in Bayern betreut. Wir suchen einen IT-Support-Techniker für unseren Helpdesk (1st & 2nd Level).\n\nSie beheben Störungen per Telefon und Remote-Zugriff, installieren Software und begleiten Kunden vor Ort.',
        requirements:
          '• Abgeschlossene IT-Ausbildung oder gleichwertige Erfahrung\n• B2-Deutschkenntnisse\n• Kenntnisse Windows, Office 365\n• Kundenorientierung',
        isActive: false, // archivé — exemple
      },
    ],
  })

  // ── Training Offers ─────────────────────────────────────────────────────────
  await prisma.trainingOffer.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Ausbildung zur Pflegefachkraft',
        sector: 'Gesundheit & Pflege',
        duration: '3 Jahre',
        location: 'München',
        description:
          'Die generalistische Pflegefachkraft-Ausbildung kombiniert Alten-, Kranken- und Kinderkrankenpflege in einem modernen Ausbildungsformat.\n\nSie wechseln zwischen verschiedenen Pflegeeinrichtungen (Krankenhaus, Altenheim, ambulante Pflege) und schließen mit dem staatlichen Examen ab.',
        conditions:
          '• Mittlere Reife oder Hauptschulabschluss mit zweijähriger Berufsausbildung\n• B2-Deutschkenntnisse (Zertifikat erforderlich)\n• Gesundheitliche Eignung (ärztliches Attest)\n• Führungszeugnis ohne Eintragungen',
        startDate: 'September 2025',
        isActive: true,
      },
      {
        title: 'Ausbildung zum Elektroniker für Energie- und Gebäudetechnik',
        sector: 'Handwerk & Technik',
        duration: '3,5 Jahre',
        location: 'Frankfurt am Main',
        description:
          'Der Elektroniker für Energie- und Gebäudetechnik ist einer der gefragtesten Berufe Deutschlands. Die Ausbildung findet dual statt: 3 Tage Betrieb, 2 Tage Berufsschule.\n\nSie lernen Elektroinstallation, Netzwerktechnik, Gebäudeautomation und Photovoltaik.',
        conditions:
          '• Hauptschulabschluss (Mittlere Reife bevorzugt)\n• B1-Deutschkenntnisse\n• Technisches Interesse und handwerkliches Geschick\n• Keine Höhenangst (Arbeit auf Leitern und Gerüsten)',
        startDate: 'August 2025',
        isActive: true,
      },
      {
        title: 'Ausbildung zum Koch / zur Köchin',
        sector: 'Gastronomie & Hotellerie',
        duration: '3 Jahre',
        location: 'Hamburg',
        description:
          'Die Kochausbildung öffnet Türen in die Spitzen- und Systemgastronomie. Unser Partnerbetrieb in Hamburg-Altona bietet eine abwechslungsreiche Ausbildung in der klassischen deutschen und internationalen Küche.\n\nEin Teil der Ausbildung kann im Ausland absolviert werden.',
        conditions:
          '• Hauptschulabschluss\n• B1-Deutschkenntnisse\n• Leidenschaft für Lebensmittel und Kochen\n• Bereitschaft zu Wochenend- und Abenddiensten',
        startDate: 'August 2025',
        isActive: true,
      },
      {
        title: 'Ausbildung zum Erzieher / zur Erzieherin',
        sector: 'Soziales & Pädagogik',
        duration: '3 Jahre (+ 1 Jahr Anerkennungsjahr)',
        location: 'Berlin',
        description:
          'Die Erzieherausbildung in Berlin ist schulisch mit integrierten Praktika organisiert. Nach dem Abschluss folgt ein Anerkennungsjahr in einer Kita oder Schule.\n\nSie erwerben Kompetenzen in Entwicklungspsychologie, Pädagogik, Musik, Sport und interkultureller Bildung.',
        conditions:
          '• Mittlere Reife oder Hauptschulabschluss mit Berufsausbildung\n• C1-Deutschkenntnisse (schriftlich und mündlich)\n• Erfahrung mit Kindern (Praktikum oder ehrenamtlich)\n• Erweiteres Führungszeugnis',
        startDate: 'September 2025',
        isActive: true,
      },
      {
        title: 'Ausbildung zum Fachinformatiker — Systemintegration',
        sector: 'Informatik & IT',
        duration: '3 Jahre',
        location: 'München',
        description:
          'Der Fachinformatiker für Systemintegration plant, installiert und wartet IT-Infrastrukturen. Die Ausbildung bei unserem Münchner Partnerunternehmen ist praxisnah und zukunftssicher.\n\nThemen: Netzwerke, Server, Cloud, Virtualisierung, IT-Security.',
        conditions:
          '• Mittlere Reife oder Abitur\n• B2-Deutschkenntnisse\n• Grundkenntnisse in Informatik\n• Analytisches Denken',
        startDate: 'September 2025',
        isActive: true,
      },
      {
        title: 'Ausbildung zum Kfz-Mechatroniker',
        sector: 'Automobil & Technik',
        duration: '3,5 Jahre',
        location: 'Stuttgart',
        description:
          'Der Kfz-Mechatroniker ist der Spezialist für moderne Fahrzeuge. Unser Partnerbetrieb in Stuttgart ist ein Mercedes-Benz Vertragshändler mit moderner Werkstattausstattung.\n\nSie lernen Diagnose, Reparatur, Wartung und Elektrik von PKW und Nutzfahrzeugen.',
        conditions:
          '• Hauptschulabschluss (Mittlere Reife bevorzugt)\n• B1-Deutschkenntnisse\n• Technisches Verständnis\n• Körperliche Belastbarkeit',
        startDate: 'August 2025',
        isActive: true,
      },
      {
        title: 'Ausbildung zum Kaufmann / zur Kauffrau im Einzelhandel',
        sector: 'Handel & Verkauf',
        duration: '3 Jahre',
        location: 'Köln',
        description:
          'Die Ausbildung zum Einzelhandelskaufmann bietet einen soliden Einstieg in die Handelswelt. Unser Partner betreibt 12 Filialen in NRW und bietet nach der Ausbildung sehr gute Übernahmechancen.\n\nSie lernen Warenwirtschaft, Kundenberatung, Kassenführung und Bestellwesen.',
        conditions:
          '• Hauptschulabschluss\n• B2-Deutschkenntnisse (täglicher Kundenkontakt)\n• Kommunikationsstärke und Freundlichkeit\n• Bereitschaft zu Samstagsdiensten',
        startDate: 'August 2025',
        isActive: false, // archivée — exemple
      },
    ],
  })

  console.log('✅ Seed terminé :')
  console.log(`   • ${await prisma.heroContent.count()} hero contents`)
  console.log(`   • ${await prisma.jobOffer.count()} job offers`)
  console.log(`   • ${await prisma.trainingOffer.count()} training offers`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
