export type CategoryType = 'All' | 'Website' | 'System & ERP' | 'Mobile' | 'UI/UX';

export interface Collaborator {
  _key?: string;
  name: string;
  role: string;
  instagram?: string;
}

export interface TechStackItem {
  name: string;
  url?: string;
  icon?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  overview: string;
  category: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  sourceCodeUrl?: string;
  images: string[];
  uploadedDate: string;
  collaborators?: string;
  authors?: Collaborator[];
  techStack: (TechStackItem | string)[];
  highlights?: string[];
  featured?: boolean;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  content: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string[];
  keyTakeaways?: string[];
}

export interface WorkExperience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  issuer: string;
  category: string;
}

export interface Education {
  id: string;
  period: string;
  institution: string;
  degree: string;
  major: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database & CMS' | 'Tools & Marketing';
  icon?: string;
  level: string;
}

export type ActivePage = 'home' | 'about' | 'projects' | 'blogs' | 'project-detail' | 'blog-detail';
