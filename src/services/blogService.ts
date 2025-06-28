
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/components/admin/adminTypes";

export const blogService = {
  async fetchAll(): Promise<BlogPost[]> {
    const { data: blogData } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
      
    return (blogData || []).map((post) => ({
      id: String(post.id),
      title: post.title,
      category: post.category || "",
      status: (post.status === "published" || post.status === "draft" ? post.status : "draft") as 'published' | 'draft',
      readTime: post.read_time || 0,
      excerpt: post.excerpt || "",
      content: post.content || "",
      tags: post.tags || [],
      date: post.date ? post.date : undefined,
    }));
  },

  async create(postData: Omit<BlogPost, 'id'>): Promise<{ error?: string }> {
    const { error } = await supabase.from("blog_posts").insert([
      {
        title: postData.title,
        category: postData.category,
        status: postData.status,
        read_time: postData.readTime,
        excerpt: postData.excerpt,
        content: postData.content,
        tags: postData.tags,
        date: postData.date,
      },
    ]);
    
    return { error: error?.message };
  },

  async update(postData: BlogPost): Promise<{ error?: string }> {
    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: postData.title,
        category: postData.category,
        status: postData.status,
        read_time: postData.readTime,
        excerpt: postData.excerpt,
        content: postData.content,
        tags: postData.tags,
        date: postData.date,
      })
      .eq("id", postData.id);
      
    return { error: error?.message };
  },

  async delete(id: string): Promise<{ error?: string }> {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    return { error: error?.message };
  },
};
