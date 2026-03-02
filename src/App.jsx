import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target, Cpu, MessageSquare, Search,
  ChevronDown, ChevronRight, TrendingUp, TrendingDown,
  Layers, Zap, Users, Award, BarChart2,
  BookOpen, Settings, Rocket, Brain, CheckCircle2
} from 'lucide-react'

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 'A',
    icon: Target,
    title: 'Strategic Architecture',
    tagline: 'Precision Pipeline Engineering',
    summary: 'List building, precision targeting, and seamless Marketing-to-Sales flow integration.',
    dot: 'bg-blue-600',
    badge: 'bg-blue-50 text-blue-700 ring-blue-100',
    iconWrap: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100',
    check: 'text-blue-500',
    toggle: 'text-blue-600 hover:text-blue-800',
    divider: 'border-blue-100',
    bullets: [
      'List building and precision targeting based on SEO/Keyword analysis',
      'Defining Ideal Customer Profile (ICP) parameters and updating them quarterly as market signals shift',
      'Seamless process flow integration between Marketing and Sales to ensure no lead leakage',
      'Collaborating with RevOps (Marketing, CRM, Sales Team, and everyone else) to maintain data hygiene standards across CRM entries',
      'Building the outreach framework: optimizing how many times we contact a lead and coordinating the flow between LinkedIn, email, and calls to ensure a seamless experience.',
    ],
  },
  {
    id: 'B',
    icon: Cpu,
    title: 'AI & Automation Engineering',
    tagline: 'Agentic Workflow Development',
    summary: 'Experimenting with Clay/Lemlist, developing our Cold Call AI Agent, and building the Agentic AI roadmap.',
    dot: 'bg-violet-600',
    badge: 'bg-violet-50 text-violet-700 ring-violet-100',
    iconWrap: 'bg-violet-50 text-violet-600',
    border: 'border-violet-100',
    check: 'text-violet-500',
    toggle: 'text-violet-600 hover:text-violet-800',
    divider: 'border-violet-100',
    bullets: [
      'Experimenting with the tool stack (Clay, Lemlist) to identify workflow optimisation opportunities',
      'Developing and optimising our proprietary Cold Call AI Agent; prompt engineering, logic trees, and objection handling',
      'Building the roadmap for Agentic AI workflows that reduce manual outreach labour by ≥60%',
      'Creating feedback loops from call recordings into the AI Agent to continuously improve its accuracy and conversion rates',
      'Tracking tool performance: documenting why we tried a new tool, how we tested it, and the final results to ensure we only pay for what works.',
    ],
  },
  {
    id: 'C',
    icon: MessageSquare,
    title: 'Strategic Messaging & Content',
    tagline: 'Narrative & Trend Alignment',
    summary: "Defining the 'Hook,' planning trend-aligned content, and recognizing USPs/Value Propositions.",
    dot: 'bg-emerald-600',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    iconWrap: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-100',
    check: 'text-emerald-500',
    toggle: 'text-emerald-600 hover:text-emerald-800',
    divider: 'border-emerald-100',
    bullets: [
      "Defining the 'Hook' for LinkedIn and Email outreach; leading with insight, not feature",
      'Planning content calendars that align with dynamic market trends (e.g., pivoting between Trend X and Trend Y monthly based on search volume data)',
      'Recognising and articulating Unique Selling Propositions and Value Propositions for each ICP segment',
      'A/B testing subject lines, CTAs, and message formats to maintain a minimum 30% open rate and 8% reply rate',
      'Converting rival market data into high-impact messaging that clearly distinguishes our unique value from both direct competitors and alternative industry solutions.',
    ],
  },
  {
    id: 'D',
    icon: Search,
    title: 'Technical Discovery & Qualification',
    tagline: 'Pre-Sales Technical Consultation',
    summary: 'Acting as the first human touchpoint for inbound calls, gathering high-level technical requirements, and ensuring prospect alignment before Sales handover.',
    dot: 'bg-amber-500',
    badge: 'bg-amber-50 text-amber-700 ring-amber-100',
    iconWrap: 'bg-amber-50 text-amber-600',
    border: 'border-amber-100',
    check: 'text-amber-500',
    toggle: 'text-amber-600 hover:text-amber-800',
    divider: 'border-amber-100',
    bullets: [
      'Acting as the first human touchpoint for inbound calls; setting the tone for a consultative, high-trust engagement',
      'Gathering high-level technical requirements: stack, integrations, scale, compliance constraints, and decision timeline',
      'Scoring prospect fit against technical qualification criteria before the Sales handover occurs',
      'Completing a structured Discovery Brief for each qualified inbound that arms the BDM with context',
      'Validating project requirements against our capabilities to filter out mismatches and prioritize qualified, high-value software engagements.',
    ],
  },
]

const LEVELS = [
  {
    id: 1,
    code: 'Junior SDR',
    label: 'Execution',
    icon: Zap,
    activeBg: 'bg-blue-600',
    activeText: 'text-blue-600',
    activeLightBg: 'bg-blue-50',
    activeBorder: 'border-blue-600',
    activeRing: 'ring-blue-200',
    pillBg: 'bg-blue-50 text-blue-700',
    dot: 'bg-blue-600',
    headerBg: 'bg-blue-50',
    headerBorder: 'border-blue-100',
    focus: 'Muscle Memory',
    focusDesc: 'Building the foundational reflexes of high-volume outreach through disciplined, daily execution.',
    tools: ['Lemlist', 'LinkedIn Sales Navigator', 'CRM (HubSpot/Salesforce)', 'Microsoft Calendar', 'Loom'],
    kpis: [
      'Calls made per day (target: 10)',
      'LinkedIn connections sent per week (target: 75-100)',
      'Initial meeting volume per month (target: 2 qualified meetings)',
      'Acceptance or sequence open rate (target: 20%)',
    ],
    responsibilities: [
      'Executing pre-built outreach sequences with precision and consistency',
      'Mastering Lemlist campaign setup: variables, liquid syntax, and deliverability best practices',
      'Operating LinkedIn Sales Navigator for boolean search and lead list creation',
      'Logging all activity accurately in CRM with zero data hygiene exceptions',
      'Attending routined discussion sessions with BDM',
      'Doing inbound discovery calls',
    ],
    competencies: [
      'Attention to detail and process adherence',
      'Resilience and consistency under high-volume pressure',
      'Basic understanding of our ICP and value proposition',
      'Effective time-blocking and prioritisation habits',
    ],
    promotionCriteria: 'Yang penting jadi orang baik deh',
  },
  {
    id: 2,
    code: 'SDR',
    label: 'Optimization',
    icon: Settings,
    activeBg: 'bg-violet-600',
    activeText: 'text-violet-600',
    activeLightBg: 'bg-violet-50',
    activeBorder: 'border-violet-600',
    activeRing: 'ring-violet-200',
    pillBg: 'bg-violet-50 text-violet-700',
    dot: 'bg-violet-600',
    headerBg: 'bg-violet-50',
    headerBorder: 'border-violet-100',
    focus: 'Value Prop Mastery',
    focusDesc: 'Moving beyond template execution to original, insight-driven copy and first-touch technical discovery.',
    tools: ['Clay (data enrichment)', 'Lemlist (advanced branching)', 'ChatGPT/Claude (copy assist)', 'Excel Hub or self dashboard (knowledge base)', 'RingCentral (call recording)'],
    kpis: [
      'Reply rate on self-authored sequences (target: ≥8%)',
      'Clay enrichment accuracy rate (target: ≥90%)',
      'First-touch inbound discovery meetings completed per month [Call agent and outreach] (target: 3-4)',
      'Outbound pipeline contribution; Actively finding leads through various channels',
    ],
    responsibilities: [
      'Developing original outreach copy: subject lines, openers, and CTAs without using templates',
      'Managing Clay data enrichment logic: waterfall enrichment, conditional fields, and API integrations',
      'Conducting first-touch inbound discovery meetings using the structured Discovery Brief framework',
      'Analysing campaign performance data and independently proposing optimisation hypotheses',
      'Beginning to document personal playbooks for ICP segments that consistently convert',
      'Contributing to the team SDR Hub knowledge base with learnings from A/B tests',
    ],
    competencies: [
      'Copywriting and message architecture skills',
      'Data literacy: reading campaign analytics and drawing actionable conclusions',
      "Basic understanding of Clay's enrichment waterfall logic",
      'Consultative questioning techniques for discovery meetings',
    ],
    promotionCriteria: 'Yang penting kerja keras',
  },
  {
    id: 3,
    code: 'Senior SDR',
    label: 'Innovation',
    icon: Rocket,
    activeBg: 'bg-emerald-600',
    activeText: 'text-emerald-600',
    activeLightBg: 'bg-emerald-50',
    activeBorder: 'border-emerald-600',
    activeRing: 'ring-emerald-200',
    pillBg: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-600',
    headerBg: 'bg-emerald-50',
    headerBorder: 'border-emerald-100',
    focus: 'Process Engineering',
    focusDesc: "Designing and leading experiments that shift the team's operating model toward higher-leverage, AI-augmented workflows.",
    tools: ['Clay (API-level integrations)', 'Lemlist (webhook automation)', 'OpenAI API', 'Make/Zapier (workflow orchestration)', 'Ring Central and AI Call Agent (conversation intelligence)'],
    kpis: [
      'SEO/trend alignment score on outreach messaging (internal rubric)',
      'Weekly output efficiency: x% ratio of connections sent to meetings booked',
      'Quarterly pipeline value generated through independent, self-sourced outreach',
    ],
    responsibilities: [
      'Leading tool experiments end-to-end: hypothesis → test design → execution → result documentation',
      'Aligning outreach messaging with SEO and Market Research trends to surface high-intent keywords',
      'Optimising the AI Call Agent logic: refining objection-handling scripts, improving escalation paths, and tuning tone parameters',
      'Building and maintaining outreach playbooks for each ICP segment repository',
      'Running weekly campaign performance reviews and presenting findings and recommendations to the SDR team, BDM, and marketing team',
    ],
    competencies: [
      'Systems thinking: ability to see the full outreach funnel and identify highest-leverage intervention points',
      'AI prompt engineering and basic API interaction',
      'SEO and keyword research interpretation for messaging alignment',
      'Coaching and feedback delivery skills',
    ],
    promotionCriteria: 'Asal doa banyak',
  },
  {
    id: 4,
    code: 'Principal SDR',
    label: 'Architecture',
    icon: Brain,
    activeBg: 'bg-amber-500',
    activeText: 'text-amber-600',
    activeLightBg: 'bg-amber-50',
    activeBorder: 'border-amber-500',
    activeRing: 'ring-amber-200',
    pillBg: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-500',
    headerBg: 'bg-amber-50',
    headerBorder: 'border-amber-100',
    focus: 'Agentic AI & Systems',
    focusDesc: 'Owning the long-term architecture of our AI-augmented outbound engine and the SDR function itself.',
    tools: ['Full AI Agent Stack (Custom)', 'Clay (enterprise tier)', 'Lemlist (agency-tier automation)', 'CRM Admin', 'SDR Hub (system documentation)', 'BI tooling'],
    kpis: [
      'Qualified pipeline generated by Agentic AI workflows (revenue attribution)',
      'Reduction in manual SDR effort hours per qualified meeting (target: ≥60% vs. baseline)',
      'SDR Hub automation flows live and operational (target: ≥5 active flows)',
      'Team NPS and coaching effectiveness score (quarterly 360° feedback)',
    ],
    responsibilities: [
      'Designing the "SDR Hub" automation global flow: the interconnected system of AI agents, enrichment pipelines, outreach automations, and CRM sync rules that govern the entire outbound engine',
      'Architecting the long-term AI outreach strategy: defining which tasks are delegated to AI agents vs. reserved for human judgment',
      'Evaluating and selecting new AI tooling and platforms for the team stack on a yearly basis to augment SDR processes',
      'Mentoring the entire SDR team on technical discovery frameworks, AI tooling, and consultative selling technique',
      "Presenting the SDR function's performance, architecture, and roadmap to executive stakeholders on a monthly cadence",
      'Owning the job family documentation, competency framework, and promotion criteria to keep the stream aligned with business evolution',
    ],
    competencies: [
      'Agentic AI architecture: designing multi-step autonomous workflows with error handling and human escalation paths',
      'Strategic thinking: ability to connect SDR function output to revenue goals and company growth strategy',
      'Executive communication and stakeholder management',
      'Full-stack sales operations: CRM admin, data governance, and BI reporting',
    ],
    promotionCriteria: 'This is the highest level of the SDR stream. Growth beyond this role leads to Head of Sales Development, RevOps Lead, or Technical Pre-Sales paths. Or is this level considered BDM?',
  },
]

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Layers size={14} className="text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">SDR Job Family Architecture</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-400">Internal HR Document</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-blue-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            Hybrid Technical Sales & Ops Stream
          </span>
          <span className="hidden sm:block text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">v2.0 — 2026</span>
        </div>
      </div>
    </header>
  )
}

// ─── MISSION STATEMENT ────────────────────────────────────────────────────────

function MissionStatement() {
  return (
    <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-3">Core Philosophy</p>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
          Mission Statement.{' '}
          <span className="text-blue-600">Every level.</span>
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
          To transition from manual prospecting to a{' '}
          <span className="text-gray-900 font-medium">High-Adaptability Technical Stream</span>{' '}
          where AI handles the noise, and SDRs handle the{' '}
          <span className="text-gray-900 font-medium">Strategy, Technical Discovery, and System Architecture.</span>
        </p>

        {/* Progression strip */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">The Evolution Path</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-200 flex items-center justify-center">
                <Zap size={16} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Tactical Executor</p>
                <p className="text-xs text-gray-400">Entry point</p>
              </div>
            </div>
            <div className="flex sm:flex-1 items-center gap-1 pl-4 sm:pl-0">
              {['Execution', 'Optimization', 'Innovation', 'Architecture'].map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  {i > 0 && <div className="hidden sm:block h-px w-6 bg-gray-300" />}
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{s}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Systems Architect</p>
                <p className="text-xs text-gray-400">Apex level</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── FOUR PILLARS (BENTO GRID) ────────────────────────────────────────────────

function PillarCard({ pillar, index }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = pillar.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden"
    >
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${pillar.iconWrap}`}>
            <Icon size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded ring-1 mb-1.5 ${pillar.badge}`}>
              Pillar {pillar.id}
            </span>
            <h3 className="text-sm font-bold text-gray-900 leading-snug">{pillar.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{pillar.tagline}</p>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5">{pillar.summary}</p>

        {/* Expanded */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="exp"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`border-t ${pillar.divider} pt-4 mb-4`}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Full Responsibility Breakdown</p>
                <ul className="space-y-3">
                  {pillar.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={13} className={`${pillar.check} flex-shrink-0 mt-0.5`} />
                      <span className="text-sm text-gray-700 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          className={`mt-auto flex items-center gap-1.5 text-xs font-semibold transition-colors ${pillar.toggle}`}
        >
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Collapse Detail' : 'Expand for Full Detail'}
        </button>
      </div>
    </motion.div>
  )
}

function PillarsSection() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-2">Responsibilities</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">The Four Pillars of Responsibility</h2>
          <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
            Every SDR, at every level, operates across these four domains. The depth of ownership and autonomy within each pillar scales with seniority.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {PILLARS.map((p, i) => <PillarCard key={p.id} pillar={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── CAREER ROADMAP (STEPPER + DEEP DIVE) ─────────────────────────────────────

function LevelDeepDive({ level }) {
  const Icon = level.icon
  return (
    <motion.div
      key={level.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Level header card */}
      <div className={`flex items-center gap-4 p-5 rounded-2xl border mb-5 ${level.headerBg} ${level.headerBorder}`}>
        <div className={`w-12 h-12 rounded-xl ${level.activeLightBg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={22} className={level.activeText} />
        </div>
        <div>
          <p className={`text-xs font-bold tracking-widest uppercase mb-0.5 ${level.activeText}`}>
            {level.code} · Level {level.id}
          </p>
          <h3 className="text-xl font-bold text-gray-900">{level.focus}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{level.focusDesc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Responsibilities */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={14} className="text-gray-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Core Responsibilities</p>
          </div>
          <ul className="space-y-3">
            {level.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <ChevronRight size={13} className={`${level.activeText} flex-shrink-0 mt-0.5`} />
                <span className="text-sm text-gray-700 leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* KPIs */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 size={14} className="text-gray-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">KPIs & Success Metrics</p>
            </div>
            <ul className="space-y-2.5">
              {level.kpis.map((k, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${level.dot} flex-shrink-0 mt-1.5`} />
                  <span className="text-sm text-gray-700 leading-relaxed">{k}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Settings size={14} className="text-gray-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Primary Tool Stack</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {level.tools.map((t, i) => (
                <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-lg ${level.pillBg}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* Competencies */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award size={14} className="text-gray-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Required Competencies</p>
            </div>
            <ul className="space-y-2.5">
              {level.competencies.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={13} className={`${level.activeText} flex-shrink-0 mt-0.5`} />
                  <span className="text-sm text-gray-700 leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Promotion criteria */}
      <div className={`mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200`}>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
          Promotion / Advancement Criteria
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">{level.promotionCriteria}</p>
      </div>
    </motion.div>
  )
}

function CareerRoadmap() {
  const [activeLevel, setActiveLevel] = useState(1)
  const selected = LEVELS.find(l => l.id === activeLevel)

  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-2">Career Progression</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">The Career Matrix</h2>
        <p className="text-gray-500 mt-2 max-w-2xl text-sm leading-relaxed">
          A Long-Term Mastery model. Select a level to view the complete competency deep-dive, KPIs, and tool stack for that tier.
        </p>
      </div>

      {/* Stepper */}
      <div className="relative mb-8">
        <div className="absolute top-5 left-0 right-0 h-px bg-gray-200 hidden sm:block" style={{ marginLeft: '12.5%', marginRight: '12.5%' }} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {LEVELS.map((level) => {
            const Icon = level.icon
            const isActive = activeLevel === level.id
            const isPast = level.id < activeLevel
            return (
              <button
                key={level.id}
                onClick={() => setActiveLevel(level.id)}
                className="relative flex flex-col items-center gap-2 group"
              >
                <motion.div
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                    ${isActive
                      ? `${level.activeBg} border-transparent`
                      : isPast
                        ? 'bg-gray-100 border-gray-200'
                        : 'bg-white border-gray-200 group-hover:border-gray-400'
                    }`}
                >
                  <Icon
                    size={16}
                    className={isActive ? 'text-white' : isPast ? 'text-gray-400' : 'text-gray-400 group-hover:text-gray-600'}
                  />
                </motion.div>
                <div className="text-center">
                  <p className={`text-xs font-bold transition-colors ${isActive ? level.activeText : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {level.code}
                  </p>
                  <p className={`text-[10px] uppercase tracking-wider font-semibold transition-colors ${isActive ? 'text-gray-500' : 'text-gray-300 group-hover:text-gray-400'}`}>
                    {level.label}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected && <LevelDeepDive key={selected.id} level={selected} />}
      </AnimatePresence>
    </section>
  )
}

// ─── LEARNING CURVE ────────────────────────────────────────────────────────────

function LearningCurveChart() {
  const [hovered, setHovered] = useState(null)

  const dataPoints = [
    { level: 'Junior SDR', manualEffort: 90, strategicComplexity: 10, aiOwnership: 5 },
    { level: 'SDR', manualEffort: 65, strategicComplexity: 35, aiOwnership: 20 },
    { level: 'Senior SDR', manualEffort: 35, strategicComplexity: 65, aiOwnership: 50 },
    { level: 'Principal SDR', manualEffort: 10, strategicComplexity: 95, aiOwnership: 85 },
  ]

  const W = 100, H = 100
  const toP = (i, val, n) => ({ x: (i / (n - 1)) * W, y: H - (val / 100) * H })
  const buildPath = (vals) => vals.map((v, i) => toP(i, v, vals.length)).map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  const lines = [
    { key: 'manualEffort', label: 'Manual Effort', color: '#f43f5e', values: dataPoints.map(d => d.manualEffort) },
    { key: 'strategicComplexity', label: 'Strategic/Technical Complexity', color: '#2563eb', values: dataPoints.map(d => d.strategicComplexity) },
    { key: 'aiOwnership', label: 'AI & Automation Ownership', color: '#059669', values: dataPoints.map(d => d.aiOwnership) },
  ].map(l => ({ ...l, path: buildPath(l.values) }))

  return (
    <section className="bg-gray-50 border-y border-gray-100 py-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-600 uppercase mb-2">HR Critical Question Response</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">The Bimodal Learning Curve</h2>
          <p className="text-gray-500 mt-2 max-w-3xl text-sm leading-relaxed">
            The SDR job family has a well-defined bimodal learning structure. There is a short ramp period (≈3 months) for tool
            familiarity and high-volume execution, followed by a 2–5 year mastery arc covering technical sales engineering,
            AI orchestration, and consultative requirement gathering. This is intentional: the role is designed as a long-term
            mastery stream, not a 12-month revolving door.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex flex-wrap gap-5 mb-5">
              {lines.map(l => (
                <div key={l.key} className="flex items-center gap-2">
                  <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: l.color }} />
                  <span className="text-xs text-gray-500">{l.label}</span>
                </div>
              ))}
            </div>

            <div className="relative">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-52 sm:h-64">
                {[0, 25, 50, 75, 100].map(v => (
                  <line key={v} x1="0" y1={100 - v} x2="100" y2={100 - v} stroke="#f3f4f6" strokeWidth="0.8" />
                ))}
                {lines.map(l => (
                  <motion.path
                    key={l.key}
                    d={l.path}
                    fill="none"
                    stroke={l.color}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
                  />
                ))}
                {lines.map(l =>
                  l.values.map((v, i) => {
                    const pt = toP(i, v, l.values.length)
                    return (
                      <circle
                        key={`${l.key}-${i}`}
                        cx={pt.x} cy={pt.y} r="1.8"
                        fill="white"
                        stroke={l.color}
                        strokeWidth="1"
                        className="cursor-pointer"
                        onMouseEnter={() => setHovered({ key: l.key, index: i, value: v, level: dataPoints[i].level, color: l.color, label: l.label })}
                        onMouseLeave={() => setHovered(null)}
                      />
                    )
                  })
                )}
              </svg>
              <div className="flex justify-between mt-2 px-1">
                {dataPoints.map(d => (
                  <span key={d.level} className="text-[10px] text-gray-400 font-medium">{d.level}</span>
                ))}
              </div>
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 -translate-x-6">
                <span className="text-[10px] text-gray-300" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  Intensity %
                </span>
              </div>
              <AnimatePresence>
                {hovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-2 right-2 bg-white border border-gray-200 rounded-xl shadow-sm px-3 py-2 text-xs pointer-events-none"
                  >
                    <p style={{ color: hovered.color }} className="font-semibold">{hovered.label}</p>
                    <p className="text-gray-400">at {hovered.level}</p>
                    <p className="text-gray-900 font-bold text-sm">{hovered.value}%</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Phase cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                phase: 'Phase 1',
                label: 'Tool Ramp',
                duration: '0 – 3 months',
                dotColor: 'bg-emerald-500',
                labelColor: 'text-emerald-700',
                bg: 'bg-emerald-50 border-emerald-100',
                desc: 'High learning velocity for Lemlist, LinkedIn Sales Navigator, CRM workflow, and foundational outreach mechanics. Short feedback loops accelerate habit formation.',
              },
              {
                phase: 'Phase 2',
                label: 'Mastery Arc',
                duration: '3 months – 2–5 years',
                dotColor: 'bg-blue-600',
                labelColor: 'text-blue-700',
                bg: 'bg-blue-50 border-blue-100',
                desc: 'Deep competency development in technical sales engineering, AI orchestration, Agentic workflow design, and consultative requirement gathering. This is where the exponential value compounds.',
              },
  
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.12 }}
                className={`bg-white border rounded-2xl p-5 ${item.bg}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{item.phase}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-[10px] text-gray-400">{item.duration}</span>
                </div>
                <p className={`text-sm font-bold mb-1.5 ${item.labelColor}`}>{item.label}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER SUMMARY ────────────────────────────────────────────────────────────

function FooterSummary() {
  const stats = [
    { icon: Users, label: 'Team Structure', value: '4 Levels', sub: 'Junior SDR → Principal SDR', color: 'text-blue-600', bg: 'bg-blue-50', pill: 'bg-blue-100 text-blue-700' },
    { icon: TrendingUp, label: 'Mastery Timeline', value: '2–5 Years', sub: 'Full technical stream depth', color: 'text-violet-600', bg: 'bg-violet-50', pill: 'bg-violet-100 text-violet-700' },
    { icon: TrendingDown, label: 'Manual Effort Reduction', value: '≥ 60%', sub: 'At Principal SDR via Agentic AI', color: 'text-emerald-600', bg: 'bg-emerald-50', pill: 'bg-emerald-100 text-emerald-700' },
  ]

  return (
    <footer className="border-t border-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {stats.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex flex-col gap-3 bg-white border border-gray-200 rounded-2xl p-6">
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <Icon size={17} className={item.color} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                </div>
              </div>
            )
          })}
        </div>


        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            SDR Job Family Architecture — Internal HR Documentation · Hybrid Technical Sales & Ops Stream · Long-Term Mastery Model
          </p>
          <p className="text-xs text-gray-300 mt-1">Confidential. For HR and Leadership Review Only.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <MissionStatement />
      <PillarsSection />
      <CareerRoadmap />
      <LearningCurveChart />
      <FooterSummary />
    </div>
  )
}
