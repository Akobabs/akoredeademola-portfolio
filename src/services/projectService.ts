
import { supabase } from "@/integrations/supabase/client";
import { Project } from "@/components/admin/adminTypes";

export const projectService = {
  async fetchAll(): Promise<Project[]> {
    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
      
    return (projectsData || []).map((p) => ({
      id: String(p.id),
      title: p.title,
      category: p.category || "",
      status: (p.status === "published" || p.status === "draft" ? p.status : "draft") as 'published' | 'draft',
      featured: !!p.featured,
      description: p.description || "",
      technologies: p.technologies || [],
      githubUrl: p.github_url || "",
      liveUrl: p.live_url || "",
    }));
  },

  async create(projectData: Omit<Project, 'id'>): Promise<{ error?: string }> {
    const { error } = await supabase.from("projects").insert([
      {
        title: projectData.title,
        category: projectData.category,
        status: projectData.status,
        featured: projectData.featured,
        description: projectData.description,
        technologies: projectData.technologies,
        github_url: projectData.githubUrl,
        live_url: projectData.liveUrl,
      },
    ]);
    
    return { error: error?.message };
  },

  async update(projectData: Project): Promise<{ error?: string }> {
    const { error } = await supabase
      .from("projects")
      .update({
        title: projectData.title,
        category: projectData.category,
        status: projectData.status,
        featured: projectData.featured,
        description: projectData.description,
        technologies: projectData.technologies,
        github_url: projectData.githubUrl,
        live_url: projectData.liveUrl,
      })
      .eq("id", projectData.id);
      
    return { error: error?.message };
  },

  async delete(id: string): Promise<{ error?: string }> {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    return { error: error?.message };
  },
};
