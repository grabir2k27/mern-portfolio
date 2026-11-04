import { AnimatePresence, motion } from 'motion/react'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'

import { site } from '../../data/site'
import { cx } from '../lib/cx'
import { Socials } from './Socials'

const sections = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const ease = [0.22, 1, 0.36, 1] as const

type Theme = 'dark' | 'light'

export function Nav() {
  const location = useLocation()
  const [active, setActive] = useState('top')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('light') ? 'light' : 'dark',
  )

  // Theme: flip the tokens on <html>, remember the choice, keep the
  // browser chrome colour in step.
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f4f4f8' : '#06070d')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // storage blocked: the toggle still works for this session
    }
  }, [theme])

  // Which section sits under the navbar.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      let current = 'top'
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 140) current = id
      }
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 8) current = 'contact'
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  // Lock the page behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => setOpen(false), [location.pathname, location.hash])

  const initials = site.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const resume = (
    <a
      href={site.resume}
      download
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line-strong px-4 text-[13.5px] font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
    >
      <Download className="size-3.5" />
      Resume
    </a>
  )

  return (
    <>
      <header className={cx('fixed inset-x-0 top-0 z-40 transition-all duration-500', scrolled ? 'glass border-b border-line' : 'border-b border-transparent')}>
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link to="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
            <span className="grid size-8 place-items-center rounded-[10px] bg-fg text-[12px] font-semibold tracking-tight text-bg transition-transform duration-300 group-hover:rotate-6">
              {initials}
            </span>
            <span className="text-[15px] font-medium tracking-tight">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Sections">
            {sections.map(({ id, label }) => (
              <Link
                key={id}
                to={id === 'top' ? '/' : `/#${id}`}
                className={cx(
                  'link-draw relative text-[14px] transition-colors duration-300',
                  active === id ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                    transition={{ duration: 0.4, ease }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="grid size-9 place-items-center rounded-full border border-line-strong text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-fg"
            >
              {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <span className="hidden sm:inline-flex">{resume}</span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-9 place-items-center rounded-full border border-line-strong text-fg transition-colors hover:border-accent lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease }}
            className="fixed inset-0 z-50 flex flex-col bg-bg lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-5 sm:px-8">
              <span className="text-[15px] font-medium">{site.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-full border border-line-strong text-fg"
              >
                <X className="size-4" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8" aria-label="Sections">
              {sections.map(({ id, label }, i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease }}
                >
                  <Link
                    to={id === 'top' ? '/' : `/#${id}`}
                    onClick={() => setOpen(false)}
                    className={cx('font-display block py-1.5 text-[clamp(34px,10vw,52px)] transition-colors', active === id ? 'text-fg' : 'text-fg/45')}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-5 border-t border-line px-5 py-7 sm:px-8">
              <div className="flex items-center justify-between gap-4">
                {resume}
                <Socials size="sm" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
