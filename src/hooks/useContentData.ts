
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BlogPost, Project, Publication } from '@/components/admin/adminTypes';
import { blogService } from '@/services/blogService';
import { projectService } from '@/services/projectService';
import { publicationService } from '@/services/publicationService';

export const useContentData = () => {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [blogData, projectData, publicationData] = await Promise.all([
        blogService.fetchAll(),
        projectService.fetchAll(),
        publicationService.fetchAll(),
      ]);
      
      setBlogPosts(blogData);
      setProjects(projectData);
      setPublications(publicationData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: "Error fetching data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Blog post operations
  const createBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
    setLoading(true);
    const { error } = await blogService.create(postData);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Blog post created successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error creating blog post", variant: "destructive" });
      return false;
    }
  };

  const updateBlogPost = async (postData: BlogPost) => {
    setLoading(true);
    const { error } = await blogService.update(postData);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Blog post updated successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error updating blog post", variant: "destructive" });
      return false;
    }
  };

  const deleteBlogPost = async (id: string) => {
    setLoading(true);
    const { error } = await blogService.delete(id);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Blog post deleted successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error deleting blog post", variant: "destructive" });
      return false;
    }
  };

  // Project operations
  const createProject = async (projectData: Omit<Project, 'id'>) => {
    setLoading(true);
    const { error } = await projectService.create(projectData);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Project created successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error creating project", variant: "destructive" });
      return false;
    }
  };

  const updateProject = async (projectData: Project) => {
    setLoading(true);
    const { error } = await projectService.update(projectData);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Project updated successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error updating project", variant: "destructive" });
      return false;
    }
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    const { error } = await projectService.delete(id);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Project deleted successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error deleting project", variant: "destructive" });
      return false;
    }
  };

  // Publication operations
  const createPublication = async (publicationData: Omit<Publication, 'id'>) => {
    setLoading(true);
    const { error } = await publicationService.create(publicationData);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Publication created successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error creating publication", variant: "destructive" });
      return false;
    }
  };

  const updatePublication = async (publicationData: Publication) => {
    setLoading(true);
    const { error } = await publicationService.update(publicationData);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Publication updated successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error updating publication", variant: "destructive" });
      return false;
    }
  };

  const deletePublication = async (id: string) => {
    setLoading(true);
    const { error } = await publicationService.delete(id);
    setLoading(false);
    
    if (!error) {
      toast({ title: "Publication deleted successfully" });
      fetchAll();
      return true;
    } else {
      toast({ title: "Error deleting publication", variant: "destructive" });
      return false;
    }
  };

  return {
    // Data
    blogPosts,
    projects,
    publications,
    loading,
    // Actions
    fetchAll,
    // Blog posts
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    // Projects
    createProject,
    updateProject,
    deleteProject,
    // Publications
    createPublication,
    updatePublication,
    deletePublication,
  };
};
