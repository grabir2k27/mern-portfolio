import { animate, motion, useInView } from 'motion/react'
import { ArrowDownRight, Download, Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { about, experience, projects, services, site, skillGroups, stats } from '../../data/site'
import { Lines, Magnetic, Parallax, Reveal } from '../components/motion'
import { Socials } from '../components/Socials'
import { WorkCard } from '../components/WorkCard'
import { cx } from '../lib/cx'

const ease = [0.22, 1, 0.36, 1] as const

export function Home() {
  return (
    <>
      <Hero />

      {/* Tech marquee */}
      <div className="overflow-hidden border-y border-line py-5" aria-hidden>
        <ul className="font-display flex w-max animate-marquee items-center gap-10 whitespace-nowrap text-[26px] text-fg/60 sm:text-[34px]">
          {[...site.marquee, ...site.marquee].map((item, i) => (
            <li key={i} className="flex items-center gap-10">
              {item}
              <span className="round size-2 rounded-full bg-accent" />
            </li>
          ))}
        </ul>
      </div>

      <About />

      <Skills />

      <Services />

      <Projects />

      <Experience />
    </>
  )
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32">
      <HeroField />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="glass-card inline-flex items-center gap-2.5 rounded-full py-2 pl-3.5 pr-4 text-[13px] text-muted"
            >
              <span className="round size-2 animate-pulse-soft rounded-full bg-accent" />
              {site.availability}
            </motion.span>

            <h1 className="font-display mt-7 text-[clamp(56px,11.5vw,148px)]">
              {site.name.split(' ').map((word, i) => (
                <span key={word} className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
                  <motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1.05, delay: 0.25 + i * 0.1, ease }}>
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="mt-6 flex items-center gap-3 text-[13px] uppercase tracking-[0.2em] text-muted"
            >
              <span className="h-px w-9 shrink-0 bg-accent" />
              {site.role}
            </motion.p>

            <Typed roles={site.typingRoles} />

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
              className="mt-6 max-w-xl text-pretty text-[16.5px] leading-relaxed text-muted sm:text-[18px]"
            >
              {site.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a
                  href="#projects"
                  className="group inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 text-[15px] font-medium text-white shadow-[0_16px_44px_-18px_rgb(91_108_255/0.9)] transition-colors duration-300 hover:bg-accent-2"
                >
                  View My Projects
                  <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <a
                href="#contact"
                className="inline-flex h-12 items-center rounded-control border border-line-strong px-6 text-[15px] font-medium text-fg transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
              >
                Contact Me
              </a>
              <a
                href={site.resume}
                download
                className="group inline-flex h-12 items-center gap-2 px-3 text-[15px] text-muted transition-colors duration-300 hover:text-fg"
              >
                <Download className="size-4" />
                Download Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease }}
              className="mt-9 flex items-center gap-5"
            >
              <Socials />
            </motion.div>
          </div>

          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="relative mx-auto w-full max-w-[420px] lg:max-w-[480px]"
          >
            <div aria-hidden className="absolute -inset-5 rounded-[48px] bg-[radial-gradient(closest-side,rgb(91_108_255/0.38),transparent)] blur-2xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-line">
              <Parallax src="/images/portrait.jpg" alt={site.name} className="aspect-[4/5]" strength={5} />
              <div className="glass-card absolute bottom-4 left-4 rounded-2xl px-4 py-3">
                <p className="text-[12.5px] text-faint">Daily stack</p>
                <p className="mt-0.5 text-[14.5px] font-medium">React · Node · MongoDB</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Cycles through the role titles one character at a time. */
function Typed({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(roles[0])
      return
    }
    const word = roles[index]
    if (!deleting && text === word) {
      const hold = window.setTimeout(() => setDeleting(true), 1700)
      return () => window.clearTimeout(hold)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % roles.length)
      return
    }
    const step = window.setTimeout(() => {
      setText((current) => (deleting ? current.slice(0, -1) : word.slice(0, current.length + 1)))
    }, deleting ? 34 : 68)
    return () => window.clearTimeout(step)
  }, [text, deleting, index, roles])

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.6, ease }}
      className="font-display mt-3 whitespace-nowrap text-[clamp(24px,4.4vw,40px)] leading-tight"
    >
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden className="text-gradient">
        {text}
      </span>
      <span aria-hidden className="ml-0.5 inline-block w-[2px] animate-caret bg-accent align-[-0.1em] text-[0.9em]">
        &nbsp;
      </span>
    </motion.p>
  )
}

// Colour field, engineering grid and grain behind the hero.
function HeroField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_58%,transparent_96%)]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, ease }} className="absolute inset-0">
        <div className="round absolute -top-[25%] right-[-12%] h-[95%] w-[70%] animate-drift-a rounded-full bg-[radial-gradient(closest-side,rgb(91_108_255/0.42),transparent)] blur-3xl" />
        <div className="round absolute -top-[10%] left-[-14%] h-[80%] w-[62%] animate-drift-b rounded-full bg-[radial-gradient(closest-side,rgb(168_85_247/0.32),transparent)] blur-3xl" />
        <div className="round absolute top-[24%] left-[34%] h-[66%] w-[56%] animate-drift-c rounded-full bg-[radial-gradient(closest-side,rgb(56_189_248/0.24),transparent)] blur-3xl" />
      </motion.div>
      <div className="grid-lines absolute inset-0" />
      <div className="grain absolute inset-0" />
    </div>
  )
}

/* ---------------------------------------------------------------- shared */

function SectionHead({ eyebrow, title, note }: { eyebrow: string; title: string; note?: string }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="flex items-center gap-3 text-[12.5px] uppercase tracking-[0.22em] text-faint">
          <span className="h-px w-8 bg-accent" />
          {eyebrow}
        </p>
        <Lines as="h2" className="font-display mt-4 text-[clamp(34px,5vw,58px)]" lines={[title]} />
      </div>
      {note && <Reveal className="max-w-sm text-[15px] leading-relaxed text-muted sm:text-right">{note}</Reveal>}
    </div>
  )
}

/* ----------------------------------------------------------------- about */

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pt-28 sm:px-8 sm:pt-36">
      <SectionHead eyebrow="About me" title="Developer, not just coder" note="Everything below is editable data in src/data/site.ts." />

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <Parallax src="/images/portrait.jpg" alt={site.name} className="aspect-[4/5] rounded-image" strength={5} />
        </Reveal>

        <div>
          <Reveal className="text-pretty text-[20px] leading-snug sm:text-[26px]">
            <p className="font-display">{about.lead}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-7 flex flex-col gap-5 text-pretty text-[16.5px] leading-relaxed text-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-7 border-l-2 border-accent pl-5 text-[16.5px] leading-relaxed text-fg">
            {about.goal}
          </Reveal>

          <Reveal delay={0.2} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-line pt-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-[clamp(38px,5vw,56px)] leading-none">
                  <CountUp value={stat.value} />
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="mt-2 text-[14px] text-muted">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, { duration: 1.5, ease, onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{display}</span>
}

/* ---------------------------------------------------------------- skills */

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pt-28 sm:px-8 sm:pt-36">
      <SectionHead eyebrow="Technical skills" title="What I work with" note="Grouped the way I actually use them, with a rough level for each." />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group, groupIndex) => (
          <Reveal key={group.title} delay={groupIndex * 0.07}>
            <div className="glass-card h-full rounded-card p-6 transition-colors duration-500 hover:border-accent/60">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[26px]">{group.title}</h3>
                <span className="text-[13px] tabular-nums text-faint">{group.skills.length}</span>
              </div>
              <p className="mt-1 text-[13.5px] text-faint">{group.note}</p>

              <ul className="mt-6 flex flex-col gap-4">
                {group.skills.map((skill, i) => (
                  <li key={skill.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-[14.5px] text-fg">{skill.name}</span>
                      <span className="text-[12.5px] tabular-nums text-faint">{skill.level}%</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-2">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                        transition={{ duration: 1.1, delay: 0.1 + i * 0.07, ease }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- services */

function Services() {
  const [open, setOpen] = useState(0)
  return (
    <section id="services" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div>
          <SectionHead eyebrow="Services" title="How I can help" />
          <Reveal delay={0.15} className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted">
            Four ways projects usually start. Most engagements end up being two of them.
          </Reveal>
        </div>

        <ul className="border-t border-line">
          {services.map((service, i) => {
            const isOpen = open === i
            return (
              <li key={service.title} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center gap-5 py-6 text-left"
                >
                  <span className="w-8 shrink-0 text-[13.5px] tabular-nums text-faint">0{i + 1}</span>
                  <span className={cx('font-display flex-1 text-[26px] transition-colors sm:text-[38px]', isOpen ? 'text-fg' : 'text-fg/55 group-hover:text-fg')}>
                    {service.title}
                  </span>
                  <span className={cx('grid size-10 shrink-0 place-items-center rounded-[12px] border border-line-strong transition-colors duration-300', isOpen && 'border-accent bg-accent text-white')}>
                    <Plus className={cx('size-4 transition-transform duration-500', isOpen && 'rotate-45')} />
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-xl pb-7 pl-13 text-pretty text-[15.5px] leading-relaxed text-muted">{service.body}</p>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- projects */

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pt-28 sm:px-8 sm:pt-36">
      <SectionHead eyebrow="Projects" title="Selected work" note="Each project opens a case study with the stack, the role and what it taught me." />

      <div className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:gap-x-8 lg:gap-y-20">
        {projects.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ experience */

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pt-28 sm:px-8 sm:pt-36">
      <SectionHead eyebrow="Experience" title="The road so far" note="Edit these entries in src/data/site.ts to match your own history." />

      <ol className="mt-12 border-t border-line">
        {experience.map((entry, i) => (
          <Reveal key={entry.title} delay={i * 0.06}>
            <li className="group grid gap-2 border-b border-line py-7 transition-colors duration-500 hover:bg-surface/60 sm:grid-cols-[190px_1fr] sm:gap-6 sm:px-2">
              <span className="text-[14px] tabular-nums text-faint">{entry.period}</span>
              <div>
                <p className="text-[18px] font-medium tracking-tight">{entry.title}</p>
                <p className="mt-1 text-[15.5px] text-muted">{entry.detail}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
