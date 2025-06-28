export interface BlogPost {
  id: string;
  title: string;
  category: string;
  status: "published" | "draft";
  readTime: number;
  excerpt: string | null;
  content: string | null;
  tags: string[];
  date: string;
  author?: string; // Optional, not stored in Supabase
}

export interface Project {
  id: string;
  title: string;
  category: string;
  status: "published" | "draft";
  featured: boolean;
  description: string | null;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
}

export interface Publication {
  id: string;
  title: string;
  journal: string | null;
  authors: string;
  date: string;
  abstract: string | null;
  doi: string | null;
  url: string | null;
  status?: string; // Optional, not stored in Supabase
  tags?: string[]; // Optional, not stored in Supabase
}