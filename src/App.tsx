import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  FileSpreadsheet,
  IndianRupee,
  Landmark,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ReceiptIndianRupee,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';

const CONTACT_PHONE = '+91 76763 82420';
const CONTACT_EMAIL = 'faauditsco@gmail.com';
const WHATSAPP_URL = 'https://wa.me/917676382420?text=Hello%20FA%20Audits%20%26%20Co.%2C%20I%20would%20like%20to%20discuss%20a%20requirement.';

type IconType = typeof ShieldCheck;
type ServiceKey = 'taxAudit' | 'gst' | 'incomeTax' | 'accounting' | 'compliance';

const serviceItems: Array<{ title: string; description: string; href: string; icon: IconType; number: string }> = [
  { title: 'Tax Audit', description: 'A methodical review that keeps records, disclosures, and deadlines in step.', href: '/services/tax-audit', icon: FileCheck2, number: '01' },
  { title: 'GST Services', description: 'Registration, return filing, reconciliations, and clear support when notices arrive.', href: '/services/gst-services', icon: ReceiptIndianRupee, number: '02' },
  { title: 'Income Tax Services', description: 'Accurate returns and practical tax planning for individuals and growing businesses.', href: '/services/income-tax', icon: Landmark, number: '03' },
  { title: 'Accounting & Bookkeeping', description: 'Books you can rely on for decisions, reporting, and the next conversation with your banker.', href: '/services/accounting-bookkeeping', icon: FileSpreadsheet, number: '04' },
  { title: 'Business Compliance', description: 'A steady compliance rhythm across registrations, filings, TDS, and company obligations.', href: '/services/business-compliance', icon: Building2, number: '05' },
];

const serviceCatalog = [
  'Tax Audit',
  'GST Registration & Compliance',
  'GST Return Filing',
  'Income Tax Return Filing',
  'Tax Planning & Advisory',
  'Accounting & Bookkeeping',
  'TDS Compliance',
  'Business Registration',
  'Financial Statements',
  'Business Compliance',
  'Notices & Tax Representation',
  'Startup Compliance',
];

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'FA Audits & Co. | Tax Audit & Compliance Partner', description: 'Clear, dependable tax audit, GST, income tax, accounting, and business compliance support for individuals and growing businesses in India.' },
  '/about': { title: 'About FA Audits & Co. | Professional Tax Guidance', description: 'Meet FA Audits & Co., a professional Indian tax audit and compliance partner built around clarity, confidentiality, and dependable deadlines.' },
  '/services': { title: 'Services | FA Audits & Co.', description: 'Explore tax audit, GST, income tax, accounting, bookkeeping, and business compliance services from FA Audits & Co.' },
  '/contact': { title: 'Contact FA Audits & Co. | Start a Conversation', description: 'Request dependable tax and compliance guidance from FA Audits & Co. Share your requirement and the team will help you find the right next step.' },
  '/services/tax-audit': { title: 'Tax Audit Services | FA Audits & Co.', description: 'A structured tax audit process with careful documentation, review, reporting, and practical guidance.' },
  '/services/gst-services': { title: 'GST Services | FA Audits & Co.', description: 'GST registration, return filing, reconciliations, and notice support for businesses across India.' },
  '/services/income-tax': { title: 'Income Tax Services | FA Audits & Co.', description: 'Income tax return filing, tax planning, and advisory for individuals, professionals, and businesses.' },
  '/services/accounting-bookkeeping': { title: 'Accounting & Bookkeeping | FA Audits & Co.', description: 'Organised books, reconciliations, financial statements, and reporting that help your business move with confidence.' },
  '/services/business-compliance': { title: 'Business Compliance | FA Audits & Co.', description: 'Business registration, TDS, startup compliance, financial statements, and a reliable filing rhythm.' },
};

function PageMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = pageMeta[location] ?? pageMeta['/'];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', meta.description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);
    if (ogDescription) ogDescription.setAttribute('content', meta.description);
  }, [location]);
  return null;
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="FA Audits & Co. home" className="flex items-center gap-3" data-testid="link-brand-home">
      <span className={`relative grid h-10 w-10 place-items-center rounded-xl ${light ? 'bg-[#e8c88b] text-[#163c3b]' : 'bg-[#175d58] text-[#f7f1e4]'}`}>
        <BarChart3 size={19} strokeWidth={1.8} />
        <span className="absolute bottom-[7px] right-[7px] h-2.5 w-2.5 rounded-full bg-[#e57c5d]" />
      </span>
      <span className={`leading-none ${light ? 'text-[#f7f1e4]' : 'text-[#163c3b]'}`}>
        <span className="block font-display text-[1.12rem] font-semibold tracking-[-.03em]">Audits</span>
        <span className={`mt-1 block font-mono-ui text-[.52rem] uppercase tracking-[.24em] ${light ? 'text-[#e8c88b]' : 'text-[#e57c5d]'}`}>&amp; Co.</span>
      </span>
    </Link>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];
  return (
    <header className="absolute left-0 right-0 top-0 z-40">
      <div className="container-wide flex h-[84px] items-center justify-between">
        <BrandMark />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link text-[.78rem] font-semibold tracking-[.01em] text-[#53615f]" data-active={location === link.href} data-testid={`link-nav-${link.label.toLowerCase()}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-5 md:flex">
          <a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[.76rem] font-semibold text-[#53615f]" data-testid="link-call-header">
            <Phone size={14} strokeWidth={1.8} /> {CONTACT_PHONE}
          </a>
          <Link href="/contact" className="button-lift rounded-full bg-[#175d58] px-5 py-3 text-[.72rem] font-bold tracking-[.04em] text-[#f7f1e4]" data-testid="link-header-start">
            Start a conversation
          </Link>
        </div>
        <button type="button" onClick={() => setOpen((current) => !current)} className="grid h-11 w-11 place-items-center rounded-full border border-[#d8d0c1] text-[#175d58] md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} data-testid="button-mobile-menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="border-y border-[#d8d0c1] bg-[#f7f1e4] px-5 py-5 shadow-lg md:hidden">
          <nav className="container-wide flex flex-col gap-1" aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#314745] hover:bg-[#ece2d0]" data-testid={`link-mobile-${link.label.toLowerCase()}`}>
                {link.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="mt-3 rounded-xl bg-[#175d58] px-4 py-3 text-center text-sm font-bold text-[#f7f1e4]" data-testid="link-mobile-start">Start a conversation</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function AuditVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]" aria-label="Abstract financial audit visual" data-testid="visual-audit-system">
      <div className="absolute inset-[8%] rounded-[42%_58%_55%_45%] bg-[#e8c88b]/70 blur-[1px]" />
      <div className="absolute inset-[15%] rounded-full border border-[#175d58]/20" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-[#175d58]/30" />
      <svg viewBox="0 0 480 480" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <path d="M88 310C133 242 160 250 196 276C235 304 250 363 316 323C354 300 368 235 401 203" stroke="#175d58" strokeWidth="2" strokeDasharray="5 8" />
        <path d="M85 358C153 336 179 376 230 352C281 328 309 255 398 268" stroke="#e57c5d" strokeWidth="2" strokeDasharray="2 9" />
        <path d="M115 142L165 91L213 139L264 77L316 127L365 94" stroke="#175d58" strokeWidth="1.5" />
        <circle cx="88" cy="310" r="6" fill="#e57c5d" />
        <circle cx="196" cy="276" r="6" fill="#175d58" />
        <circle cx="316" cy="323" r="6" fill="#e8c88b" stroke="#175d58" strokeWidth="2" />
        <circle cx="401" cy="203" r="6" fill="#175d58" />
        <circle cx="115" cy="142" r="5" fill="#e57c5d" />
        <circle cx="213" cy="139" r="5" fill="#175d58" />
        <circle cx="316" cy="127" r="5" fill="#e57c5d" />
      </svg>
      <div className="float-slow absolute left-[13%] top-[29%] rounded-2xl border border-[#175d58]/15 bg-[#f7f1e4]/90 p-4 shadow-[0_18px_50px_-25px_#175d58] backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-[#175d58] text-[#f7f1e4]"><BarChart3 size={14} /></span><span className="font-mono-ui text-[.58rem] uppercase tracking-[.15em] text-[#60706d]">Review log</span></div>
        <div className="font-display text-2xl text-[#163c3b]">FY 24–25</div>
        <div className="mt-1 flex items-center gap-1 text-[.65rem] font-semibold text-[#175d58]"><Check size={13} /> Ready for review</div>
      </div>
      <div className="absolute bottom-[16%] right-[9%] rounded-2xl bg-[#175d58] p-4 text-[#f7f1e4] shadow-[0_20px_45px_-20px_#163c3b]">
        <div className="font-mono-ui text-[.57rem] uppercase tracking-[.14em] text-[#b6d4c9]">Clarity index</div>
        <div className="mt-2 flex items-end gap-2"><span className="font-display text-3xl">04</span><span className="mb-1 text-[.65rem] text-[#b6d4c9]">steps ahead</span></div>
      </div>
      <div className="absolute right-[20%] top-[10%] grid h-12 w-12 place-items-center rounded-full bg-[#e57c5d] text-[#f7f1e4] shadow-lg"><ShieldCheck size={21} /></div>
    </div>
  );
}

function SectionIntro({ eyebrow, title, copy, dark = false }: { eyebrow: string; title: string; copy?: string; dark?: boolean }) {
  return (
    <div className={`max-w-2xl ${dark ? 'text-[#f7f1e4]' : ''}`}>
      <div className={`eyebrow ${dark ? 'text-[#e8c88b]' : ''}`}>{eyebrow}</div>
      <h2 className="mt-5 font-display text-4xl leading-[1.03] tracking-[-.045em] sm:text-5xl">{title}</h2>
      {copy && <p className={`mt-6 max-w-xl text-[.98rem] leading-7 ${dark ? 'text-[#b6d4c9]' : 'text-[#62716e]'}`}>{copy}</p>}
    </div>
  );
}

function ServiceCard({ service, featured = false }: { service: typeof serviceItems[number]; featured?: boolean }) {
  const Icon = service.icon;
  return (
    <Link href={service.href} className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.35rem] border p-6 transition duration-300 hover:-translate-y-1 ${featured ? 'min-h-[300px] border-[#175d58] bg-[#175d58] text-[#f7f1e4] md:p-8' : 'min-h-[220px] border-[#d8d0c1] bg-[#fbf8f0] text-[#163c3b] hover:border-[#e57c5d]'}`} data-testid={`link-service-${service.number}`}>
      <div className="flex items-start justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${featured ? 'bg-[#e8c88b] text-[#175d58]' : 'bg-[#e9dfce] text-[#175d58]'}`}><Icon size={19} strokeWidth={1.7} /></span>
        <span className={`font-mono-ui text-[.65rem] ${featured ? 'text-[#b6d4c9]' : 'text-[#9aa6a0]'}`}>{service.number}</span>
      </div>
      <div>
        <h3 className="font-display text-2xl tracking-[-.025em]">{service.title}</h3>
        <p className={`mt-3 text-[.78rem] leading-6 ${featured ? 'text-[#b6d4c9]' : 'text-[#6c7874]'}`}>{service.description}</p>
        <span className={`mt-5 inline-flex items-center gap-2 text-[.7rem] font-bold ${featured ? 'text-[#e8c88b]' : 'text-[#e57c5d]'}`}>Explore service <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  );
}

function TrustStrip() {
  return (
    <div className="border-y border-[#d8d0c1] bg-[#ece2d0]">
       <div className="container-wide grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['01', 'Professional', 'Advice grounded in your actual facts, records, and context.'],
          ['02', 'Reliable', 'A considered filing rhythm that respects the deadline before it arrives.'],
          ['03', 'Confidential', 'Sensitive financial information handled with care and discretion.'],
           ['04', 'Compliance-focused', 'Practical support designed around the rules and deadlines that matter.'],
        ].map(([number, title, copy]) => (
           <div key={number} className="flex gap-4 border-b border-[#d8d0c1] py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0 lg:py-7">
            <span className="font-mono-ui text-[.65rem] text-[#e57c5d]">{number}</span>
            <div><div className="text-sm font-bold text-[#163c3b]">{title}</div><p className="mt-1 text-[.72rem] leading-5 text-[#6c7874]">{copy}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-[#f7f1e4] pt-32 sm:pt-36">
          <div className="container-wide grid items-center gap-10 pb-20 lg:grid-cols-[.92fr_1.08fr] lg:pb-28">
            <div className="relative z-10 reveal">
              <div className="eyebrow flex items-center gap-3"><span className="h-px w-8 bg-[#e57c5d]" /> Tax &amp; compliance partner / India</div>
               <h1 className="mt-7 max-w-2xl font-display text-[3.5rem] leading-[.96] tracking-[-.065em] text-[#163c3b] sm:text-[5.2rem]">Your trusted partner for <em className="font-display not-italic text-[#e57c5d]">tax, GST</em> &amp; business compliance.</h1>
               <p className="mt-7 max-w-md text-[1rem] leading-7 text-[#62716e]">FA Audits &amp; Co. provides reliable tax audit, GST, income tax filing, accounting and compliance solutions to help businesses and individuals stay compliant and financially organized.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                 <Link href="/contact" className="button-lift inline-flex items-center gap-3 rounded-full bg-[#175d58] px-6 py-4 text-[.76rem] font-bold text-[#f7f1e4]" data-testid="link-hero-request"><span>Book a Consultation</span><ArrowDownRight size={16} /></Link>
                 <Link href="/services" className="inline-flex items-center gap-2 px-2 py-3 text-[.76rem] font-bold text-[#175d58]" data-testid="link-hero-services">Explore Our Services <ArrowRight size={15} /></Link>
              </div>
              <div className="mt-11 flex items-center gap-3 text-[.67rem] font-semibold text-[#78847f]"><span className="grid h-7 w-7 place-items-center rounded-full border border-[#d8d0c1] text-[#175d58]"><LockKeyhole size={13} /></span> Your information stays private, always.</div>
            </div>
            <div className="reveal reveal-delay-2 relative"><AuditVisual /></div>
          </div>
          <div className="container-wide flex items-center justify-between pb-7 text-[.64rem] font-semibold uppercase tracking-[.14em] text-[#8a938d]"><span>For individuals · startups · growing businesses</span><span className="hidden items-center gap-2 sm:flex">Scroll to explore <ArrowDownRight size={14} /></span></div>
        </section>
        <TrustStrip />
        <section className="container-wide py-24 sm:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionIntro eyebrow="What we take care of" title="The right detail, at the right time." copy="From your first registration to a complex tax audit, we bring a steady process to work that can otherwise feel scattered." />
            <Link href="/services" className="inline-flex shrink-0 items-center gap-2 pb-1 text-[.75rem] font-bold text-[#175d58]" data-testid="link-view-all-services">View all services <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {serviceItems.map((service, index) => <ServiceCard key={service.href} service={service} featured={index === 0} />)}
          </div>
        </section>
        <section className="bg-[#175d58] py-24 sm:py-32">
          <div className="container-wide grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <SectionIntro dark eyebrow="How we work" title="A calm process for consequential work." copy="Good compliance is less about last-minute heroics and more about having someone thoughtful in the room before a deadline gets loud." />
            <div className="grid gap-0 border-t border-[#4b8279]">
              {[
                ['01', 'Listen first', 'We start with your situation—not a checklist. We understand what has happened and what needs to happen next.'],
                ['02', 'Make it legible', 'We turn rules, records, and deadlines into a simple plan with clear ownership and no unnecessary jargon.'],
                ['03', 'Stay alongside', 'Your questions do not end after filing. We stay available as facts change, notices arrive, and the business grows.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="grid gap-4 border-b border-[#4b8279] py-6 sm:grid-cols-[50px_180px_1fr] sm:items-start">
                  <span className="font-mono-ui text-[.65rem] text-[#e8c88b]">{number}</span><h3 className="font-display text-2xl text-[#f7f1e4]">{title}</h3><p className="text-[.82rem] leading-6 text-[#b6d4c9]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="container-wide grid gap-10 py-24 sm:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionIntro eyebrow="For where you are now" title="Big enough to need structure. Close enough to stay human." copy="We work with individuals, traders, professionals, startups, small businesses, companies, and growing teams across India. The context changes. Our care does not." />
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-[.76rem] font-bold text-[#175d58]" data-testid="link-learn-about">More about FA Audits <ArrowRight size={15} /></Link>
          </div>
          <div className="relative min-h-[350px] overflow-hidden rounded-[1.5rem] bg-[#e8c88b] p-8 sm:p-12">
            <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[34px] border-[#f7f1e4]/40" />
            <div className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full border-[30px] border-[#175d58]/15" />
            <div className="relative flex h-full flex-col justify-between">
              <Sparkles className="text-[#e57c5d]" size={28} strokeWidth={1.5} />
              <div><p className="max-w-sm font-display text-4xl leading-[1.05] tracking-[-.04em] text-[#163c3b]">“Clear advice is a form of respect.”</p><p className="mt-6 font-mono-ui text-[.62rem] uppercase tracking-[.16em] text-[#52706c]">The FA Audits principle</p></div>
            </div>
          </div>
        </section>
        <ContactBanner />
      </main>
    </>
  );
}

function ContactBanner() {
  return (
    <section className="container-wide mb-8 overflow-hidden rounded-[1.5rem] bg-[#e57c5d] px-7 py-12 sm:px-14 sm:py-14">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div><div className="eyebrow text-[#f7f1e4]">Have a question? Start here.</div><h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.03] tracking-[-.045em] text-[#f7f1e4] sm:text-5xl">A clearer next step is one conversation away.</h2></div>
        <Link href="/contact" className="button-lift inline-flex shrink-0 items-center gap-3 rounded-full bg-[#f7f1e4] px-6 py-4 text-[.75rem] font-bold text-[#175d58]" data-testid="link-banner-contact">Talk to FA Audits <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
}

function About() {
  const reasons = [
    ['01', 'Professional approach', 'We bring care, context, and professional judgement to every engagement.'],
    ['02', 'Reliable follow-through', 'Clear timelines and dependable communication keep work moving.'],
    ['03', 'Confidential by design', 'Your records and conversations are handled with appropriate discretion.'],
    ['04', 'Compliance-focused', 'We keep the details visible so obligations do not become surprises.'],
    ['05', 'Plain-language advice', 'You should know what a decision means before you make it.'],
    ['06', 'Built for your stage', 'The support fits your life, your business, and where you are heading.'],
  ];
  return (
    <main className="pt-32">
      <section className="container-wide grid gap-12 pb-20 lg:grid-cols-[1fr_.8fr] lg:items-end">
        <div className="reveal"><div className="eyebrow">About the firm</div><h1 className="mt-6 max-w-3xl font-display text-5xl leading-[.98] tracking-[-.06em] text-[#163c3b] sm:text-7xl">A dependable partner for the fine print.</h1></div>
        <div className="reveal reveal-delay-1 border-l-2 border-[#e57c5d] pl-6"><p className="text-lg leading-8 text-[#53615f]">FA Audits &amp; Co. is a trusted Indian tax audit and compliance partner for individuals, startups, small businesses, companies, traders, professionals, and growing businesses.</p><p className="mt-5 text-[.82rem] leading-6 text-[#78847f]">We believe good financial guidance should make things clearer, not heavier. Our work is professional, reliable, confidential, and focused on helping you meet your obligations with confidence.</p></div>
      </section>
      <div className="container-wide border-t border-[#d8d0c1] py-16"><div className="grid gap-5 md:grid-cols-3"><div className="rounded-[1.25rem] bg-[#175d58] p-7 text-[#f7f1e4] md:col-span-2 md:min-h-[250px]"><div className="font-mono-ui text-[.62rem] uppercase tracking-[.16em] text-[#e8c88b]">Our point of view</div><p className="mt-8 max-w-2xl font-display text-4xl leading-[1.05] tracking-[-.04em]">Your numbers deserve attention before they become a problem.</p></div><div className="flex min-h-[250px] flex-col justify-between rounded-[1.25rem] border border-[#d8d0c1] bg-[#ece2d0] p-7"><Clock3 className="text-[#e57c5d]" size={25} strokeWidth={1.6} /><p className="font-display text-2xl leading-tight text-[#163c3b]">Thoughtful work. Clear communication. No last-minute drama.</p></div></div></div>
      <section className="container-wide py-16 sm:py-24"><SectionIntro eyebrow="Why choose us" title="The details that make a working relationship work." /><div className="mt-12 grid gap-x-8 gap-y-0 md:grid-cols-2 lg:grid-cols-3">{reasons.map(([number, title, copy]) => <div key={number} className="border-t border-[#d8d0c1] py-6"><div className="flex justify-between"><h3 className="text-sm font-bold text-[#163c3b]">{title}</h3><span className="font-mono-ui text-[.62rem] text-[#e57c5d]">{number}</span></div><p className="mt-3 max-w-xs text-[.78rem] leading-6 text-[#6c7874]">{copy}</p></div>)}</div></section>
      <ContactBanner />
    </main>
  );
}

function Services() {
  return (
    <main className="pt-32">
      <section className="container-wide pb-20"><div className="eyebrow">Services / a clear scope</div><h1 className="mt-6 max-w-4xl font-display text-5xl leading-[.96] tracking-[-.06em] text-[#163c3b] sm:text-7xl">From first registration to the next chapter.</h1><p className="mt-7 max-w-xl text-base leading-7 text-[#62716e]">Choose the area where you need support. We will bring the right level of detail, the right questions, and a practical next step.</p></section>
      <section className="container-wide grid gap-4 pb-24 md:grid-cols-2 lg:grid-cols-3">{serviceItems.map((service, index) => <ServiceCard key={service.href} service={service} featured={index === 0} />)}</section>
      <section className="bg-[#ece2d0] py-20"><div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><SectionIntro eyebrow="Complete support" title="The work around the work." copy="A healthy compliance picture often includes several connected pieces. We can help you bring them into one considered plan." /><div className="grid gap-x-10 gap-y-0 border-t border-[#d8d0c1] sm:grid-cols-2">{serviceCatalog.slice(5).map((item, i) => <Link href="/contact" key={item} className="group flex items-center justify-between border-b border-[#d8d0c1] py-4 text-sm font-semibold text-[#314745]" data-testid={`link-catalog-${i}`}><span>{item}</span><ArrowRight size={14} className="text-[#e57c5d] transition group-hover:translate-x-1" /></Link>)}</div></div></section>
      <ContactBanner />
    </main>
  );
}

const serviceDetails: Record<ServiceKey, { title: string; intro: string; icon: IconType; bullets: string[]; includes: string[] }> = {
  taxAudit: { title: 'Tax Audit', intro: 'A methodical review of your financial records and reporting, with the context and care to help you understand what is being signed off.', icon: FileCheck2, bullets: ['Review of books, records, and tax audit requirements', 'Careful attention to disclosures, reconciliations, and reporting', 'Practical support for questions and information requests', 'A clear view of open items before the deadline'], includes: ['Tax audit under applicable provisions', 'Audit-ready record review', 'Financial statement coordination', 'Notices & tax representation'] },
  gst: { title: 'GST Services', intro: 'GST support that keeps registrations, returns, reconciliations, and records moving together—not in separate silos.', icon: ReceiptIndianRupee, bullets: ['GST registration and amendment guidance', 'Periodic GST return filing and review', 'Input tax credit and ledger reconciliations', 'Support with notices and departmental correspondence'], includes: ['GST Registration & Compliance', 'GST Return Filing', 'GST reconciliations', 'Notices & Tax Representation'] },
  incomeTax: { title: 'Income Tax Services', intro: 'Accurate filing and practical tax planning for individuals, professionals, traders, companies, and businesses with more moving parts.', icon: Landmark, bullets: ['Income Tax Return Filing for relevant taxpayer categories', 'Tax planning and advisory grounded in your facts', 'TDS review and compliance coordination', 'Support when an intimation, notice, or question arrives'], includes: ['Income Tax Return Filing', 'Tax Planning & Advisory', 'TDS Compliance', 'Notice support'] },
  accounting: { title: 'Accounting & Bookkeeping', intro: 'Well-kept books are not just a compliance task. They are the clearest version of what your business is doing.', icon: FileSpreadsheet, bullets: ['Regular bookkeeping and ledger maintenance', 'Bank, receivable, payable, and balance reconciliations', 'Management-ready reporting and monthly close support', 'Financial Statements prepared with discipline'], includes: ['Accounting & Bookkeeping', 'Financial Statements', 'Monthly reporting', 'Year-end coordination'] },
  compliance: { title: 'Business Compliance', intro: 'A practical compliance rhythm for companies, startups, small businesses, and growing teams—so obligations do not compete with the business.', icon: Building2, bullets: ['Business Registration and setup guidance', 'Startup Compliance and recurring filing calendars', 'TDS Compliance and related coordination', 'Financial statements and annual compliance support'], includes: ['Business Registration', 'Startup Compliance', 'Business Compliance', 'Financial Statements'] },
};

function ServicePage({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = serviceDetails[serviceKey];
  const Icon = service.icon;
  return (
    <main className="pt-32">
      <section className="container-wide grid gap-12 pb-20 lg:grid-cols-[1fr_.8fr] lg:items-end">
        <div><Link href="/services" className="eyebrow inline-flex items-center gap-2 hover:text-[#e57c5d]" data-testid="link-services-back"><ArrowRight className="rotate-180" size={13} /> All services</Link><div className="mt-7 grid h-14 w-14 place-items-center rounded-2xl bg-[#e8c88b] text-[#175d58]"><Icon size={25} strokeWidth={1.6} /></div><h1 className="mt-6 max-w-3xl font-display text-5xl leading-[.96] tracking-[-.06em] text-[#163c3b] sm:text-7xl">{service.title}</h1></div>
        <div className="border-l-2 border-[#e57c5d] pl-6"><p className="text-lg leading-8 text-[#53615f]">{service.intro}</p><Link href="/contact" className="mt-7 inline-flex items-center gap-2 text-[.76rem] font-bold text-[#175d58]" data-testid={`link-service-consult-${serviceKey}`}>Discuss this service <ArrowRight size={15} /></Link></div>
      </section>
      <section className="bg-[#175d58] py-20 sm:py-24"><div className="container-wide grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><div className="eyebrow text-[#e8c88b]">What this can include</div><h2 className="mt-5 font-display text-4xl leading-tight tracking-[-.04em] text-[#f7f1e4]">A focused engagement, not a black box.</h2></div><div className="border-t border-[#4b8279]">{service.bullets.map((bullet, i) => <div key={bullet} className="flex gap-4 border-b border-[#4b8279] py-5 text-[#f7f1e4]"><span className="font-mono-ui text-[.63rem] text-[#e8c88b]">0{i + 1}</span><span className="text-[.88rem] leading-6 text-[#d1e0d8]">{bullet}</span></div>)}</div></div></section>
      <section className="container-wide py-20 sm:py-28"><div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]"><SectionIntro eyebrow="Related support" title="Connected work, made easier." copy="Requirements often overlap. We can help you understand which pieces belong together and sequence them sensibly." /><div className="grid gap-3 sm:grid-cols-2">{service.includes.map((item, i) => <Link href="/contact" key={item} className="flex items-center gap-3 rounded-2xl border border-[#d8d0c1] bg-[#fbf8f0] p-5 text-sm font-semibold text-[#314745] transition hover:-translate-y-1 hover:border-[#e57c5d]" data-testid={`link-related-${serviceKey}-${i}`}><CheckCircle2 size={17} className="shrink-0 text-[#175d58]" />{item}</Link>)}</div></div></section>
      <ContactBanner />
    </main>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const update = (field: keyof typeof values, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!values.name.trim()) nextErrors.name = 'Please share your name.';
    if (!values.email.trim()) nextErrors.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Please enter a valid email.';
    if (!values.phone.trim()) nextErrors.phone = 'Phone number is required.';
    if (!values.service) nextErrors.service = 'Choose a service area.';
    if (!values.message.trim()) nextErrors.message = 'Tell us a little about what you need.';
    setErrors(nextErrors);
    setSubmitError('');
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const subject = `FA Audits & Co. enquiry — ${values.service}`;
      const body = [
        `Name: ${values.name.trim()}`,
        `Email: ${values.email.trim()}`,
        `Phone: ${values.phone.trim()}`,
        `Service: ${values.service}`,
        '',
        'Message:',
        values.message.trim(),
      ].join('\n');

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const mailWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      if (!mailWindow) {
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('We could not open the email draft right now. Please email us directly or continue on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (submitted) {
    return <div className="rounded-[1.25rem] bg-[#175d58] p-8 text-[#f7f1e4] sm:p-10" data-testid="status-contact-success"><div className="grid h-12 w-12 place-items-center rounded-full bg-[#e8c88b] text-[#175d58]"><Check size={23} /></div><h2 className="mt-7 font-display text-4xl tracking-[-.04em]">Thank you, {values.name.split(' ')[0]}.</h2><p className="mt-4 max-w-md text-[.86rem] leading-6 text-[#b6d4c9]">Your email draft has been prepared for our team. Review it and press Send in Gmail. For the quickest response, you can also reach us directly on WhatsApp.</p><div className="mt-8 flex flex-wrap gap-3"><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="button-lift inline-flex items-center gap-2 rounded-full bg-[#e8c88b] px-5 py-3 text-[.72rem] font-bold text-[#175d58]" data-testid="link-success-whatsapp"><MessageCircle size={15} /> Continue on WhatsApp</a><button type="button" onClick={() => { setSubmitted(false); setValues({ name: '', email: '', phone: '', service: '', message: '' }); }} className="rounded-full border border-[#6a978e] px-5 py-3 text-[.72rem] font-bold text-[#f7f1e4]" data-testid="button-send-another">Send another message</button></div></div>;
  }
  const fields = [
    { key: 'name', label: 'Name', placeholder: 'Your full name', type: 'text' },
    { key: 'email', label: 'Email', placeholder: 'you@company.com', type: 'email' },
    { key: 'phone', label: 'Phone Number', placeholder: '+91 00000 00000', type: 'tel' },
  ] as const;
  return <form onSubmit={submit} noValidate className="space-y-5" data-testid="form-contact">
    <div className="grid gap-5 sm:grid-cols-2">{fields.map((field, index) => <label key={field.key} className={index === 0 ? 'sm:col-span-2' : ''}><span className="mb-2 block text-[.69rem] font-bold uppercase tracking-[.1em] text-[#53615f]">{field.label}</span><input value={values[field.key]} onChange={(event) => update(field.key, event.target.value)} type={field.type} placeholder={field.placeholder} className="w-full rounded-xl border border-[#d8d0c1] bg-[#fbf8f0] px-4 py-3.5 text-sm text-[#163c3b] outline-none transition placeholder:text-[#9aa6a0] focus:border-[#175d58] focus:ring-2 focus:ring-[#175d58]/10" data-testid={`input-${field.key}`} />{errors[field.key] && <span className="mt-1 block text-xs text-[#c4513a]" data-testid={`error-${field.key}`}>{errors[field.key]}</span>}</label>)}</div>
    <label><span className="mb-2 block text-[.69rem] font-bold uppercase tracking-[.1em] text-[#53615f]">Service Required</span><div className="relative"><select value={values.service} onChange={(event) => update('service', event.target.value)} className="w-full appearance-none rounded-xl border border-[#d8d0c1] bg-[#fbf8f0] px-4 py-3.5 text-sm text-[#163c3b] outline-none focus:border-[#175d58] focus:ring-2 focus:ring-[#175d58]/10" data-testid="select-service"><option value="">Choose a service area</option>{serviceCatalog.map((item) => <option key={item} value={item}>{item}</option>)}</select><ChevronDown size={16} className="pointer-events-none absolute right-4 top-4 text-[#6c7874]" /></div>{errors.service && <span className="mt-1 block text-xs text-[#c4513a]" data-testid="error-service">{errors.service}</span>}</label>
    <label><span className="mb-2 block text-[.69rem] font-bold uppercase tracking-[.1em] text-[#53615f]">Message</span><textarea value={values.message} onChange={(event) => update('message', event.target.value)} rows={5} placeholder="What would you like help with?" className="w-full resize-none rounded-xl border border-[#d8d0c1] bg-[#fbf8f0] px-4 py-3.5 text-sm text-[#163c3b] outline-none transition placeholder:text-[#9aa6a0] focus:border-[#175d58] focus:ring-2 focus:ring-[#175d58]/10" data-testid="textarea-message" />{errors.message && <span className="mt-1 block text-xs text-[#c4513a]" data-testid="error-message">{errors.message}</span>}</label>
     {submitError && <div className="rounded-xl border border-[#c4513a]/30 bg-[#c4513a]/5 px-4 py-3 text-sm leading-6 text-[#a44331]" role="alert" data-testid="error-contact-submit">{submitError}</div>}
     <div className="flex flex-col justify-between gap-5 pt-2 sm:flex-row sm:items-center"><p className="max-w-xs text-[.68rem] leading-5 text-[#78847f]">Your details stay in your browser while we prepare a Gmail draft addressed to our inbox.</p><button type="submit" disabled={isSubmitting} className="button-lift inline-flex items-center justify-center gap-3 rounded-full bg-[#175d58] px-6 py-4 text-[.75rem] font-bold text-[#f7f1e4] disabled:cursor-not-allowed disabled:opacity-60" data-testid="button-submit-contact">{isSubmitting ? 'Sending…' : 'Send my request'} {!isSubmitting && <ArrowRight size={15} />}</button></div>
  </form>;
}

function Contact() {
  return (
    <main className="pt-32">
      <section className="container-wide grid gap-14 pb-24 lg:grid-cols-[.78fr_1.22fr]">
         <div><div className="eyebrow">Let’s talk</div><h1 className="mt-6 font-display text-5xl leading-[.96] tracking-[-.06em] text-[#163c3b] sm:text-7xl">Bring us the question behind the question.</h1><p className="mt-7 max-w-md text-base leading-7 text-[#62716e]">Tell us what you are navigating. We will help you identify the right service and a sensible next step—without making assumptions.</p><div className="mt-10 space-y-4 border-t border-[#d8d0c1] pt-7"><a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-sm font-semibold text-[#314745]" data-testid="link-contact-email"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8c88b] text-[#175d58]"><Mail size={15} /></span>{CONTACT_EMAIL}</a><a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm font-semibold text-[#314745]" data-testid="link-contact-phone"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8c88b] text-[#175d58]"><Phone size={15} /></span>{CONTACT_PHONE}</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-semibold text-[#314745]" data-testid="link-contact-whatsapp"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#e8c88b] text-[#175d58]"><MessageCircle size={15} /></span>Message us on WhatsApp</a></div></div>
        <div className="rounded-[1.5rem] border border-[#d8d0c1] bg-[#ece2d0] p-5 sm:p-8"><ContactForm /></div>
      </section>
      <section className="container-wide mb-8 rounded-[1.5rem] bg-[#175d58] p-8 sm:p-12"><div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center"><div><div className="eyebrow text-[#e8c88b]">A note on outcomes</div><p className="mt-4 max-w-3xl text-[.82rem] leading-6 text-[#d1e0d8]">Taxation and compliance outcomes depend on the facts of each matter and the applicable laws, rules, and guidance at the relevant time. Any discussion is for general guidance until we have reviewed your specific situation.</p></div><Scale className="hidden text-[#e8c88b] md:block" size={42} strokeWidth={1.2} /></div></section>
    </main>
  );
}

function Footer() {
  return <footer className="mt-24 bg-[#163c3b] py-14 text-[#f7f1e4]"><div className="container-wide grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_.7fr]"><div><BrandMark light /><p className="mt-6 max-w-xs text-[.75rem] leading-6 text-[#b6d4c9]">Clear, dependable tax audit and compliance support for people and businesses in India.</p></div><div><div className="font-mono-ui text-[.62rem] uppercase tracking-[.16em] text-[#e8c88b]">Explore</div><div className="mt-5 flex flex-col gap-3 text-[.78rem] text-[#d1e0d8]"><Link href="/about" data-testid="link-footer-about">About</Link><Link href="/services" data-testid="link-footer-services">Services</Link><Link href="/contact" data-testid="link-footer-contact">Contact</Link></div></div><div><div className="font-mono-ui text-[.62rem] uppercase tracking-[.16em] text-[#e8c88b]">Reach us</div><div className="mt-5 flex flex-col gap-3 text-[.78rem] text-[#d1e0d8]"><a href={`mailto:${CONTACT_EMAIL}`} data-testid="link-footer-email">{CONTACT_EMAIL}</a><a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`} data-testid="link-footer-phone">{CONTACT_PHONE}</a></div></div></div><div className="container-wide mt-12 flex flex-col justify-between gap-3 border-t border-[#3b6863] pt-5 text-[.62rem] text-[#9cbbb1] sm:flex-row"><span>© {new Date().getFullYear()} FA Audits &amp; Co. All rights reserved.</span><span>Professional · Reliable · Confidential · Compliance-focused</span></div></footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell grain"><PageMeta /><Header />{children}<Footer /></div>;
}

function NotFoundPage() {
  return <main className="container-wide flex min-h-[70dvh] flex-col items-start justify-center pt-24"><div className="eyebrow">404 / page not found</div><h1 className="mt-6 font-display text-6xl tracking-[-.06em] text-[#163c3b]">This page took a wrong turn.</h1><p className="mt-5 max-w-md leading-7 text-[#62716e]">The page you are looking for may have moved. Let’s get you back to something useful.</p><Link href="/" className="button-lift mt-8 inline-flex items-center gap-2 rounded-full bg-[#175d58] px-6 py-4 text-sm font-bold text-[#f7f1e4]" data-testid="link-404-home">Back to home <ArrowRight size={15} /></Link></main>;
}

function Router() {
  return <Shell><Switch><Route path="/" component={Home} /><Route path="/about" component={About} /><Route path="/services" component={Services} /><Route path="/services/tax-audit"><ServicePage serviceKey="taxAudit" /></Route><Route path="/services/gst-services"><ServicePage serviceKey="gst" /></Route><Route path="/services/income-tax"><ServicePage serviceKey="incomeTax" /></Route><Route path="/services/accounting-bookkeeping"><ServicePage serviceKey="accounting" /></Route><Route path="/services/business-compliance"><ServicePage serviceKey="compliance" /></Route><Route path="/tax-audit"><ServicePage serviceKey="taxAudit" /></Route><Route path="/gst-services"><ServicePage serviceKey="gst" /></Route><Route path="/income-tax-services"><ServicePage serviceKey="incomeTax" /></Route><Route path="/accounting-bookkeeping"><ServicePage serviceKey="accounting" /></Route><Route path="/business-compliance"><ServicePage serviceKey="compliance" /></Route><Route path="/contact" component={Contact} /><Route component={NotFoundPage} /></Switch></Shell>;
}

function App() {
  return <WouterRouter><ErrorBoundary><Router /></ErrorBoundary></WouterRouter>;
}

export default App;