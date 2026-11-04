// Everything about you lives here. The pages read from this file.
// Replace the placeholder name, links, numbers, bio and projects with your own.

export const site = {
  name: 'Your Name',
  role: 'Full Stack MERN Developer',
  email: 'hello@yourname.dev',
  available: true,
  availability: 'Available for freelance and full-time work',
  intro:
    'I build fast, accessible web applications end to end — React on the front, Node, Express and MongoDB on the back — with clean APIs, sensible schemas and interfaces that feel good to use.',
  typingRoles: ['Full Stack Developer', 'MERN Stack Developer', 'React.js Developer', 'Backend Developer'],
  resume: '/resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],
  marquee: [
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Mongoose',
    'Tailwind CSS',
    'JavaScript',
    'REST API',
    'JWT Authentication',
    'React Hook Form',
    'Git & GitHub',
    'Cloudinary',
  ],
}

export const about = {
  lead: 'I build the interface and the engine behind it — and I like work where both have to be good.',
  paragraphs: [
    'I started in frontend, drawing interfaces in React and wondering why the data was always the hard part. So I moved to the back end: Express, MongoDB, authentication, file uploads, the unglamorous machinery that makes an application real. Five years later I am most useful on projects where one person can hold the whole stack in their head.',
    'I care about scalable applications: schemas that survive the second year, APIs that are predictable, components that are reused instead of copied, and pages that load quickly on a mid-range phone over a bad connection.',
    'I am a problem solver before I am a framework person. When something breaks I read the error, form a hypothesis and test it, rather than rewriting. Most bugs are a misunderstanding wearing a disguise.',
  ],
  goal: 'My goal is to keep working on products with real users and real constraints — ideally as a senior full stack engineer on a small team that ships often.',
}

export const stats = [
  { value: 5, suffix: '+', label: 'Years of experience' },
  { value: 40, suffix: '+', label: 'Projects completed' },
  { value: 25, suffix: '+', label: 'Technologies used' },
  { value: 30, suffix: '+', label: 'Happy clients' },
]

export interface Skill {
  name: string
  level: number
}

export const skillGroups: { title: string; note: string; skills: Skill[] }[] = [
  {
    title: 'Frontend',
    note: 'Interfaces, state and motion',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 92 },
      { name: 'JavaScript', level: 90 },
      { name: 'React.js', level: 92 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Backend',
    note: 'Servers, auth and APIs',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 90 },
      { name: 'REST API', level: 92 },
      { name: 'JWT Authentication', level: 85 },
    ],
  },
  {
    title: 'Database',
    note: 'Models, queries and indexes',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'Mongoose', level: 86 },
      { name: 'Data modelling', level: 82 },
    ],
  },
  {
    title: 'Tools',
    note: 'Daily workflow',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Vite', level: 85 },
      { name: 'Cloudinary', level: 80 },
      { name: 'Postman', level: 88 },
      { name: 'React Hook Form', level: 85 },
    ],
  },
]

export const services = [
  {
    title: 'Web application development',
    body: 'Full products in the MERN stack: React front ends, Express APIs and MongoDB schemas, wired together and deployed. From a landing page to a dashboard with auth, roles and file uploads.',
  },
  {
    title: 'REST API & backend',
    body: 'Express services with JWT authentication, protected routes, pagination, validation and clear error handling — documented well enough that the next developer is not lost.',
  },
  {
    title: 'Database design',
    body: 'MongoDB collections modelled for the way your application actually reads and writes, with Mongoose schemas, indexing and migrations that do not surprise you later.',
  },
  {
    title: 'Performance, SEO & handover',
    body: 'Core Web Vitals, image and bundle budgets, accessible markup and semantic SEO — plus documentation and a clean repository so the work is easy to maintain after launch.',
  },
]

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  cover: string
  tint: string
  summary: string
  role: string[]
  stack: string[]
  link?: string
  body: string[]
  size: 'large' | 'small'
}

export const projects: Project[] = [
  {
    slug: 'nexus-shop',
    title: 'Nexus Shop',
    category: 'MERN e-commerce',
    year: '2026',
    cover: '/images/aurora.jpg',
    tint: '#141b33',
    summary: 'A full e-commerce platform: catalogue, cart, checkout flow, order history and an admin panel, built from an empty folder.',
    role: ['Frontend', 'Backend', 'Deployment'],
    stack: ['React', 'Tailwind CSS', 'Context API', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    link: '#',
    body: [
      'Nexus Shop started as a practice brief and turned into the project I use to explain the whole stack to someone in five minutes. Product catalogue with search and filters, a persistent cart, guest and registered checkout, order history, and an admin area for stock and orders.',
      'The interesting part was the data model. Products, variants, carts and orders each had three plausible shapes, and the one I shipped is the one that made the admin panel and the storefront agree without duplication. Cart state lives on the server, so a user can start on a phone and finish on a laptop.',
      'Images are uploaded straight to Cloudinary from the admin form, JWTs are short-lived with a refresh token, and every protected route is checked once in middleware rather than repeated in every handler.',
    ],
    size: 'large',
  },
  {
    slug: 'stayeasy',
    title: 'StayEasy',
    category: 'Booking platform',
    year: '2025',
    cover: '/images/halcyon.jpg',
    tint: '#0f1d2a',
    summary: 'A hotel booking platform with availability calendars, search, reservations and a host dashboard.',
    role: ['UI design', 'Frontend', 'Backend'],
    stack: ['React', 'React Hook Form', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    link: '#',
    body: [
      'StayEasy is a booking platform for small guesthouses: search by city and date, availability checked against existing reservations, and a dashboard where a host can manage listings and confirm or decline bookings.',
      'Double-booking is the bug that keeps booking systems honest. Reservations are created inside a transaction-like check with a compound index on listing and date range, so two requests for the same night cannot both win.',
      'The interface is deliberately plain — dates, price, availability — because the people using it are making a decision, not browsing a magazine.',
    ],
    size: 'large',
  },
  {
    slug: 'taskly',
    title: 'Taskly',
    category: 'Productivity app',
    year: '2025',
    cover: '/images/nocturne.jpg',
    tint: '#1a1430',
    summary: 'A team task board with projects, assignees, due dates and keyboard-first interactions.',
    role: ['Frontend', 'Backend'],
    stack: ['React', 'React Hook Form', 'Tailwind CSS', 'Express', 'MongoDB'],
    body: [
      'Taskly is a kanban board for small teams: projects, lists, drag and drop, assignees and due dates, with optimistic updates so the board responds before the request finishes.',
      'Every mutation is scoped to the project the user belongs to, and failed optimistic updates roll back to the server state instead of leaving the board lying.',
    ],
    size: 'small',
  },
  {
    slug: 'fintrack',
    title: 'Fintrack',
    category: 'Dashboard',
    year: '2025',
    cover: '/images/meridian.jpg',
    tint: '#101826',
    summary: 'A personal finance dashboard that turns a month of transactions into categories, trends and one clear number.',
    role: ['Frontend', 'Backend'],
    stack: ['React', 'Axios', 'Node.js', 'Express', 'MongoDB'],
    body: [
      'Fintrack imports transactions, categorises them and shows a single figure first: what is safe to spend this month. Everything else sits behind it.',
      'Aggregation happens in MongoDB pipelines on the server, so the browser receives a summary rather than ten thousand rows.',
    ],
    size: 'small',
  },
  {
    slug: 'devspace',
    title: 'DevSpace',
    category: 'Content platform',
    year: '2024',
    cover: '/images/fold.jpg',
    tint: '#171426',
    summary: 'A developer blog with a markdown editor, drafts, tags and an admin-only publishing flow.',
    role: ['Frontend', 'Backend'],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Mongoose'],
    body: [
      'DevSpace is the content platform I write on: markdown drafts, tags, scheduled publishing and an admin role that gates every write route.',
      'It is also where I learned to stop over-abstracting. The post model has three fields more than it needs and nothing I regret.',
    ],
    size: 'small',
  },
  {
    slug: 'filevault',
    title: 'FileVault',
    category: 'File sharing',
    year: '2024',
    cover: '/images/kite.jpg',
    tint: '#121b1f',
    summary: 'Secure file uploads with signed URLs, expiry links and per-user storage limits.',
    role: ['Backend', 'Frontend'],
    stack: ['React', 'Cloudinary', 'Express', 'MongoDB', 'JWT'],
    body: [
      'FileVault lets a signed-in user upload files, share them with an expiry link and see exactly what is stored under their account.',
      'Uploads go directly to Cloudinary from the browser after the server signs the request, so the API never carries a file — it only records who owns what.',
    ],
    size: 'small',
  },
]

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

// Edit this to match your own history — it is data, not a template.
export const experience = [
  { period: '2023 — Now', title: 'Freelance Full Stack Developer', detail: 'MERN applications for startups, agencies and my own products' },
  { period: '2021 — 2023', title: 'Frontend Developer, Product team', detail: 'React dashboards, design systems and performance work' },
  { period: '2019 — 2021', title: 'Started with JavaScript', detail: 'Interfaces, then APIs, then the database underneath' },
]
