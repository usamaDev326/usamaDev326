// Everything written on the profile lives here. Edit this file, then run
// `node scripts/build-assets.mjs` (the workflow also runs it on every push).

export const profile = {
  name: 'Mohammad Usama',
  login: 'usamaDev326',
  role: 'Frontend & Web App Developer',
  pitch: ['I turn complex business requirements into clean,', 'fast and scalable web & mobile apps.'],
  location: 'Karachi, Pakistan',
  company: 'Dynamics Technology System',
  experience: '3+ years',
  status: 'Available for freelance & collaboration',
  heroStack: ['React', 'Next.js', 'React Native', 'TypeScript'],
};

export const highlights = [
  { value: '3+', label: 'Years of experience', note: 'shipping since Nov 2022', icon: 'calendar' },
  { value: '8+', label: 'Featured projects', note: 'web · mobile · dashboards', icon: 'rocket' },
  { value: '10', label: 'DMS modules built', note: 'sales → warranty → reports', icon: 'layers' },
  { value: '2', label: 'Companies', note: 'DTS · Technoties Solutions', icon: 'building' },
];

export const stackRings = [
  { name: 'frameworks', color: '#22D3EE', dur: 30, items: ['Next.js', 'React Native', 'Vue.js', 'TypeScript', 'JavaScript', 'Python'] },
  { name: 'state & data', color: '#A78BFA', dur: 46, items: ['Redux', 'Context API', 'React Hooks', 'REST APIs', 'Authentication', 'Postman'] },
  { name: 'ui, cloud & tooling', color: '#60A5FA', dur: 70, items: ['Tailwind CSS', 'Sass', 'Material UI', 'Ant Design', 'PrimeReact', 'Bootstrap', 'jQuery', 'Git', 'GitHub', 'AWS', 'HTML5 · CSS3'] },
];

export const experience = [
  {
    role: 'Web App Developer',
    company: 'Dynamics Technology System',
    start: '2023-10', end: null, location: 'Karachi, Pakistan',
    highlights: [
      'Production-grade apps with React.js & React Native',
      'Reusable UI for complex business applications',
      'REST APIs wired into complete business workflows',
      'Performance, usability & maintainability',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Technoties Solutions',
    start: '2022-11', end: '2023-09', location: 'Karachi, Pakistan',
    highlights: [
      'Web applications for multiple client projects',
      'Responsive, reusable frontend components',
      'Backend API integration & business requirements',
      'Clean code, responsive layouts & performance',
    ],
  },
];

export const projects = [
  {
    slug: 'dms', title: 'Dealer Management System', kind: 'ENTERPRISE', icon: 'car', hue: '#FBBF24', repo: null,
    desc: 'A comprehensive automotive dealer management platform covering the whole dealership workflow.',
    stack: ['React.js', 'React Native', 'REST APIs'],
    modules: ['Sales', 'Purchase', 'Parts', 'Inventory', 'Workshop', 'Job Cards', 'Warranty', 'Customers', 'Reports', 'Dashboards'],
  },
  {
    slug: 'pos', title: 'Point of Sale System', kind: 'WEB APP', icon: 'receipt', hue: '#34D399', repo: 'dtsPOS',
    desc: 'A business-focused POS solution, end to end.',
    stack: ['React.js', 'REST APIs'],
    modules: ['Sales', 'Products', 'Inventory', 'Customers', 'Payments', 'Invoices', 'Taxes', 'Reports'],
  },
  {
    slug: 'aquapure', title: 'Aqua Pure', kind: 'BUSINESS SUITE', icon: 'droplet', hue: '#38BDF8', repo: 'aquaPure',
    desc: 'Web-based business management system for a small bottled water manufacturing and distribution company.',
    stack: ['TypeScript', 'React.js'],
    modules: ['Manufacturing', 'Distribution', 'Business management'],
  },
  {
    slug: 'dashboard', title: 'Admin Dashboard', kind: 'UI SHELL', icon: 'layout', hue: '#A78BFA', repo: 'U-Dev-Dashboard-React',
    desc: 'A reusable admin dashboard shell with layout, navigation and widget patterns reused across several client projects.',
    stack: ['React.js'],
    modules: ['Layout', 'Navigation', 'Widgets', 'Reusable patterns'],
  },
  {
    slug: 'ecommerce', title: 'E-Commerce Platform', kind: 'STOREFRONT', icon: 'cart', hue: '#F472B6', repo: 'KWTRO_Dts',
    desc: 'E-commerce website with product management, shopping workflows and customer-facing interfaces.',
    stack: ['React.js'],
    modules: ['Product management', 'Shopping workflows', 'Customer UI'],
  },
  {
    slug: 'website', title: 'Company Website', kind: 'WEBSITE', icon: 'globe', hue: '#818CF8', repo: 'DTS-Website',
    desc: 'Public website for Dynamics Technology System.',
    stack: ['HTML', 'CSS'],
    modules: ['Responsive layout', 'Company profile'],
  },
  {
    slug: 'attendance', title: 'Attendance App', kind: 'MOBILE', icon: 'phone', hue: '#2DD4BF', repo: null,
    desc: 'Cross-platform mobile app focused on attendance management and simple, responsive mobile workflows.',
    stack: ['React Native'],
    modules: ['Attendance', 'iOS', 'Android'],
  },
  {
    slug: 'students', title: 'Student Management System', kind: 'PLATFORM', icon: 'cap', hue: '#FB7185', repo: null,
    desc: 'Platform for handling student information and administrative workflows.',
    stack: ['React.js', '.NET'],
    modules: ['Student records', 'Administration'],
  },
];

export const artifacts = {
  repo: 'artifacts',
  title: 'Daily Artifacts',
  desc: 'A new self-contained browser game or interactive page, shipped every day. Canvas physics, Web Audio and a desi touch.',
  games: ['Bo Kata', 'Load Shedding', 'Lantern Drift', 'Maze Quest', 'Moonlight Moth', 'Paper Skies'],
};

export const pipeline = [
  { icon: 'layers', title: ['Complex', 'requirements'] },
  { icon: 'layout', title: ['Clean', 'UI / UX'] },
  { icon: 'grid', title: ['Reusable', 'components'] },
  { icon: 'link', title: ['API', 'integration'] },
  { icon: 'building', title: ['Scalable', 'architecture'] },
  { icon: 'zap', title: ['Performance', 'optimization'] },
  { icon: 'rocket', title: ['Production', 'ready apps'] },
];

export const education = {
  degree: 'BS Computer Science',
  school: 'Federal Urdu University',
  city: 'Karachi',
  years: '2018 — 2022',
  certs: ['HTML, CSS & JavaScript', 'Bootstrap Responsive Web Design', 'Web Development with React, Redux & Hooks'],
};

export const sections = [
  { id: 'about', kicker: 'about', title: 'About Me', note: 'who I am & how I work' },
  { id: 'stack', kicker: 'stack', title: 'Tech Stack', note: 'the tools in orbit' },
  { id: 'experience', kicker: 'career', title: 'Experience', note: 'where I have shipped' },
  { id: 'projects', kicker: 'work', title: 'Featured Projects', note: 'things I have built' },
  { id: 'approach', kicker: 'approach', title: 'What I Like Building', note: 'from requirement to production' },
  { id: 'analytics', kicker: 'activity', title: 'GitHub Analytics', note: 'refreshed daily by a workflow' },
  { id: 'education', kicker: 'learning', title: 'Education & Certifications', note: 'the foundation' },
  { id: 'focus', kicker: 'now', title: 'Current Focus', note: 'what I am sharpening' },
  { id: 'connect', kicker: 'contact', title: "Let's Connect", note: 'say hello' },
];
