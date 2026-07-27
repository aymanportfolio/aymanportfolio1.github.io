export type PageRoute = 
  | 'home'
  | 'about'
  | 'projects'
  | 'project-detail'
  | 'blogs'
  | 'blog-detail'
  | 'social'
  | 'signin'
  | 'signup'
  | 'contact'
  | 'copyright'
  | '404';

export type ProjectCategory = 'All' | 'Embedded & IoT' | 'Power Electronics' | 'Robotics & AI' | 'VLSI & Microchips' | 'Power Systems' | 'Communications';

export type BlogCategory = 'All' | 'Embedded C' | 'Circuit Design' | 'Quantum Electronics' | 'Renewable Energy' | 'Power Systems' | 'Control Systems' | 'DSP & AI' | 'Telecommunications';

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  verifyUrl: string;
  skills: string[];
  coursesCount?: number;
}

export interface CommentItem {
  id: string;
  author: string;
  email?: string;
  date: string;
  content: string;
  avatar?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  shortDesc: string;
  fullDesc: string;
  image: string;
  date: string;
  tags: string[];
  specs: { label: string; value: string }[];
  schematicFile: string;
  model3DType: 'chip' | 'drone' | 'inverter' | 'grid';
  apaCitation: string;
  references: string[];
  comments: CommentItem[];
  featured?: boolean;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  category: BlogCategory;
  shortDesc: string;
  fullContent: string[];
  image: string;
  date: string;
  author: string;
  readingTime: string;
  tags: string[];
  apaCitation: string;
  references: string[];
  comments: CommentItem[];
  featured?: boolean;
}

export type ThemeMode = 'dark' | 'light';

export interface AccessibilitySettings {
  theme: ThemeMode;
  highContrast: boolean;
  dyslexicFont: boolean;
  fontScale: 'normal' | 'large' | 'xlarge';
  reducedMotion: boolean;
  screenReaderActive: boolean;
  voiceCommandsActive: boolean;
}

export interface SearchResult {
  type: 'project' | 'blog' | 'page';
  id: string;
  title: string;
  description: string;
  route: PageRoute;
  params?: { id?: string };
  category?: string;
}
