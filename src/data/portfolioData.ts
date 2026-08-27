import { WorkExperience, Achievement, Education, TechItem } from '../types';

export const personalInfo = {
  name: 'Mahendra Arya',
  brandName: 'KARYASITE',
  badge: 'Mahendra Arya | Available For Freelance',
  role: 'Professional Website Developer & Creative Agency Founder',
  heroTitle: 'Professional Website Developer & Creative Agency Founder',
  heroSubtitle:
    "I'm a freelance web developer building digital solutions that scale with your ideas.",
  bio: "I'm a software engineering student with over 3 years of experience as a web developer. I enjoy collaborating with teams and working closely with clients to build scalable digital solutions that help empower and grow their businesses.\n\nI love every part of the journey, learning new things and gaining experiences that continuously shape me into a better developer.",
  shortBio:
    "I'm Mahendra Arya, a web developer with over 3 years of experience building websites and digital solutions. I didn't just learn from theory—I've been actively working on real projects, handling different clients, and turning ideas into impactful digital products.",
  avatar: '/avatar/BebArya.webp',
  email: 'aryacoder1102@gmail.com',
  whatsapp: '+6281234567890',
  instagram: 'https://instagram.com/aryndraa',
  github: 'https://github.com/aryndraa',
  tiktok: 'https://tiktok.com/@karyasite',
  location: 'Bali, Indonesia',
  stats: [
    { value: '3+', label: 'Years As IT Student', accent: 'primary' },
    { value: '32+', label: 'Web & System projects complete', accent: 'secondary' },
    { value: '12+', label: 'Collaborate Projects', accent: 'primary' },
  ],
  roles: [
    'Solopreneur',
    'Freelance Web Developer',
    'Software engineer student',
    'Robotic Enthusiast',
  ],
  badges: [
    'Full-Stack Web Developer',
    'System Builder',
    'Content Creator',
    'Bussines Growth',
    'Digital Marketer',
  ],
};

export const workExperiences: WorkExperience[] = [
  {
    id: 'exp-1',
    period: '2025 - Present',
    role: 'Freelance Web Developer',
    company: 'Cupsite Project',
    description:
      'Developing and managing my own freelance agency, handling end-to-end website projects using WordPress and Laravel. I work closely with clients to build landing pages, company profiles, travel platforms, and e-commerce solutions that deliver real results.',
    skills: ['WordPress', 'Laravel', 'Tailwind CSS', 'Client Management', 'E-Commerce'],
  },
  {
    id: 'exp-2',
    period: '2024 - 2025',
    role: 'Co-Founder & Lead Developer',
    company: 'SBX One Studio',
    description:
      'Co-founding and growing a studio that started from competition projects into a collaborative team of skilled creators. As a Lead Developer, I guide the development process, manage technical decisions, and ensure the team delivers robust, scalable digital solutions.',
    skills: ['Team Leadership', 'Next.js', 'System Architecture', 'UI/UX Design', 'Full-Stack'],
  },
  {
    id: 'exp-3',
    period: '2023 - 2024',
    role: 'Internship Back-end Developer',
    company: 'PT Timedoor Indonesia',
    description:
      'Completed a back-end development internship focused on strengthening core programming skills using PHP and Laravel. Gained hands-on experience in building APIs, managing databases, and understanding how scalable systems are built in a professional workflow.',
    skills: ['PHP', 'Laravel', 'RESTful API', 'MySQL Database', 'Agile Workflow'],
  },
];

export const achievementsData: Achievement[] = [
  {
    id: 'ach-1',
    year: '2026',
    title: 'Junior Coder Certificate',
    issuer: 'LSP TIK Triatma Kompetensi',
    category: 'Certification',
  },
  {
    id: 'ach-2',
    year: '2025',
    title: '1st Web Development Competition',
    issuer: 'Konkiti Competition Vol. II',
    category: '1st Winner',
  },
  {
    id: 'ach-3',
    year: '2024',
    title: '1st Web Development Competition',
    issuer: 'Tech Festival | Timedoor Indonesia',
    category: '1st Winner',
  },
];

export const educationData: Education[] = [
  {
    id: 'edu-1',
    period: '2026 - Now',
    institution: 'Primakara University',
    degree: 'Bachelor Degree (S1)',
    major: 'Informatika (Computer Science)',
  },
  {
    id: 'edu-2',
    period: '2023 - 2026',
    institution: 'SMK TI Bali Global Denpasar',
    degree: 'Vocational High School',
    major: 'Rekayasa Perangkat Lunak (Software Engineering)',
  },
];

export const techStackData: TechItem[] = [
  { name: 'Next.js', category: 'Frontend', level: 'Advanced' },
  { name: 'React', category: 'Frontend', level: 'Advanced' },
  { name: 'TypeScript', category: 'Frontend', level: 'Advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert' },
  { name: 'Vite', category: 'Frontend', level: 'Advanced' },
  { name: 'Motion / Framer', category: 'Frontend', level: 'Intermediate' },
  { name: 'Laravel 11/12', category: 'Backend', level: 'Expert' },
  { name: 'Filament PHP v3', category: 'Backend', level: 'Advanced' },
  { name: 'PHP', category: 'Backend', level: 'Advanced' },
  { name: 'REST APIs', category: 'Backend', level: 'Advanced' },
  { name: 'MySQL', category: 'Database & CMS', level: 'Advanced' },
  { name: 'PostgreSQL', category: 'Database & CMS', level: 'Intermediate' },
  { name: 'WordPress', category: 'Database & CMS', level: 'Expert' },
  { name: 'Postman', category: 'Tools & Marketing', level: 'Advanced' },
  { name: 'Notion', category: 'Tools & Marketing', level: 'Advanced' },
  { name: 'Figma', category: 'Tools & Marketing', level: 'Intermediate' },
  { name: 'Meta Ads', category: 'Tools & Marketing', level: 'Advanced' },
  { name: 'GitHub & Git', category: 'Tools & Marketing', level: 'Advanced' },
];

export const servicesData = [
  {
    id: 'srv-1',
    title: 'Custom Website Development',
    description:
      'High-converting landing pages, interactive company profiles, and bespoke digital platforms crafted with modern frameworks like Next.js, React, and Tailwind CSS.',
    badge: 'Frontend & UI',
  },
  {
    id: 'srv-2',
    title: 'System & ERP Solutions',
    description:
      'Robust internal business management, ticketing booking engines, point-of-sale (POS), and smart database applications built on Laravel and Filament.',
    badge: 'Backend & Systems',
  },
  {
    id: 'srv-3',
    title: 'WordPress & CMS Mastery',
    description:
      'Tailor-made WordPress themes, custom WooCommerce stores, and headless architectures with seamless content management for business owners.',
    badge: 'CMS & E-Commerce',
  },
  {
    id: 'srv-4',
    title: 'Farming Leads & Meta Ads Strategy',
    description:
      'Targeted digital marketing funnels and Meta advertising setups specifically structured for solopreneurs and freelancers to generate steady client inquiries.',
    badge: 'Growth & Marketing',
  },
];
