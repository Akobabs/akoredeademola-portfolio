
-- 1. Update the default admin user email
UPDATE admin_users
SET email = 'akorede.ademola@yahoo.com'
WHERE email = 'admin@portfolio.com';

-- 2. Create a table for blog posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  status TEXT CHECK (status IN ('published', 'draft')) NOT NULL DEFAULT 'draft',
  read_time INTEGER,
  excerpt TEXT,
  content TEXT,
  tags TEXT[],
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. Create a table for projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  status TEXT CHECK (status IN ('published', 'draft')) NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  description TEXT,
  technologies TEXT[],
  github_url TEXT,
  live_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 4. Create a table for publications
CREATE TABLE IF NOT EXISTS public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  journal TEXT,
  authors TEXT,
  pub_date DATE,
  abstract TEXT,
  doi TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 5. RLS: Allow only admin users to manage content (read/update/insert/delete)
-- (You can further secure this by only enabling for a specific admin user id.)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage blog posts"
  ON public.blog_posts
  FOR ALL
  USING (auth.role() = 'admin');

CREATE POLICY "Admin can manage projects"
  ON public.projects
  FOR ALL
  USING (auth.role() = 'admin');

CREATE POLICY "Admin can manage publications"
  ON public.publications
  FOR ALL
  USING (auth.role() = 'admin');
