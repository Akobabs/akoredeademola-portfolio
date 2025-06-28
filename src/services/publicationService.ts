
import { supabase } from "@/integrations/supabase/client";
import { Publication } from "@/components/admin/adminTypes";

export const publicationService = {
  async fetchAll(): Promise<Publication[]> {
    const { data: pubData } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });
      
    return (pubData || []).map((p) => ({
      id: String(p.id),
      title: p.title,
      journal: p.journal || "",
      authors: p.authors || "",
      date: p.pub_date || "",
      abstract: p.abstract || "",
      doi: p.doi || "",
      url: p.url || "",
      status: p.status || "", 
    }));
  },

  async create(publicationData: Omit<Publication, 'id'>): Promise<{ error?: string }> {
    const { error } = await supabase.from("publications").insert([
      {
        title: publicationData.title,
        journal: publicationData.journal,
        authors: publicationData.authors,
        pub_date: publicationData.date,
        abstract: publicationData.abstract,
        doi: publicationData.doi,
        url: publicationData.url,
      },
    ]);
    
    return { error: error?.message };
  },

  async update(publicationData: Publication): Promise<{ error?: string }> {
    const { error } = await supabase
      .from("publications")
      .update({
        title: publicationData.title,
        journal: publicationData.journal,
        authors: publicationData.authors,
        pub_date: publicationData.date,
        abstract: publicationData.abstract,
        doi: publicationData.doi,
        url: publicationData.url,
      })
      .eq("id", publicationData.id);
      
    return { error: error?.message };
  },

  async delete(id: string): Promise<{ error?: string }> {
    const { error } = await supabase.from("publications").delete().eq("id", id);
    return { error: error?.message };
  },
};
