import axios from 'axios'
import { ArrowUpRight, Check, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { site } from '../../data/site'
import { cx } from '../lib/cx'
import { Socials } from './Socials'
import { Lines, Magnetic, Reveal } from './motion'

type Fields = { name: string; email: string; message: string }

export function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({ defaultValues: { name: '', email: '', message: '' } })
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState('')

  async function submit(values: Fields) {
    setServerError('')
    try {
      await axios.post('/api/contact', values, { headers: { 'content-type': 'application/json' } })
      setDone(true)
      reset()
    } catch (error) {
      setServerError(
        axios.isAxiosError(error)
          ? ((error.response?.data as { error?: string } | undefined)?.error ?? 'Something went wrong — email me directly.')
          : 'Something went wrong — email me directly.',
      )
    }
  }

  const field = (invalid?: boolean) =>
    cx(
      'h-14 w-full rounded-control border bg-surface/50 px-5 text-[15px] text-fg transition-colors placeholder:text-faint focus:outline-none',
      invalid ? 'border-red-400/80 focus:border-red-400' : 'border-line-strong focus:border-accent',
    )

  return (
    <footer id="contact" className="mt-32 scroll-mt-24 border-t border-line sm:mt-44">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <p className="flex items-center gap-3 text-[12.5px] uppercase tracking-[0.22em] text-faint">
              <span className="h-px w-8 bg-accent" />
              Contact
            </p>
            <Lines as="h2" className="font-display mt-4 text-[clamp(40px,7vw,96px)]" lines={['Let’s build', 'something solid']} />
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Magnetic>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex h-12 items-center gap-2 rounded-control border border-line-strong px-6 text-[15px] font-medium text-fg transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {site.email}
                  <ArrowUpRight className="size-4" />
                </a>
              </Magnetic>
              <p className="text-[14px] text-muted">{site.available ? site.availability : 'Fully booked at the moment'}</p>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <Socials />
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {done ? (
              <div className="flex h-full min-h-[320px] flex-col justify-center rounded-card border border-line bg-surface/60 p-8">
                <span className="grid size-11 place-items-center rounded-full bg-accent text-white">
                  <Check className="size-5" />
                </span>
                <p className="font-display mt-5 text-[36px]">Message sent</p>
                <p className="mt-2 text-[15px] text-muted">Thanks for reaching out — I read everything myself and reply within two days.</p>
                <button type="button" onClick={() => setDone(false)} className="link-draw mt-6 self-start text-[14px] text-muted hover:text-fg">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3" noValidate>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <input
                      placeholder="Your name"
                      className={field(!!errors.name)}
                      {...register('name', { required: 'Enter your name' })}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <p className="mt-1.5 pl-1 text-[13px] text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className={field(!!errors.email)}
                      {...register('email', {
                        required: 'Enter your email',
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                      })}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="mt-1.5 pl-1 text-[13px] text-red-400">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <textarea
                    placeholder="A few words about the project"
                    className={cx(field(!!errors.message), 'h-auto min-h-[140px] resize-none py-4')}
                    {...register('message', { required: 'Write a few words about the project', minLength: { value: 10, message: 'A little more detail, please' } })}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1.5 pl-1 text-[13px] text-red-400">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-control bg-accent text-[15px] font-medium text-white transition-colors duration-300 hover:bg-accent-2 disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending…' : 'Send message'}
                  <Send className="size-4" />
                </button>
                {serverError && <p className="text-[13px] text-red-400">{serverError}</p>}
              </form>
            )}
          </Reveal>
        </div>

        <div className="mt-24 grid gap-6 border-t border-line pt-8 text-[14px] sm:grid-cols-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:col-span-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noreferrer noopener" className="link-draw text-muted transition-colors hover:text-fg">
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="link-draw text-muted transition-colors hover:text-fg">
                {site.email}
              </a>
            </li>
          </ul>
          <p className="text-faint sm:text-right">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
