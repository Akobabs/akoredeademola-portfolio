
import { useState } from 'react';
import { useContentData } from '@/hooks/useContentData';
import { BlogPost, Project, Publication } from './adminTypes';
import BlogPostModal from './modals/BlogPostModal';
import ProjectModal from './modals/ProjectModal';
import PublicationModal from './modals/PublicationModal';
import DeleteConfirmModal from './modals/DeleteConfirmModal';
import BlogPostsSection from './BlogPostsSection';
import ProjectsSection from './ProjectsSection';
import PublicationsSection from './PublicationsSection';

const AdminContentManagement = () => {
  const {
    blogPosts,
    projects,
    publications,
    loading,
    createBlogPost,
    updateBlogPost,
    deleteBlogPost,
    createProject,
    updateProject,
    deleteProject,
    createPublication,
    updatePublication,
    deletePublication,
  } = useContentData();

  // Modal states
  const [blogPostModal, setBlogPostModal] = useState<{ open: boolean; post?: BlogPost }>({ open: false });
  const [projectModal, setProjectModal] = useState<{ open: boolean; project?: Project }>({ open: false });
  const [publicationModal, setPublicationModal] = useState<{ open: boolean; publication?: Publication }>({ open: false });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; type?: string; id?: string; title?: string }>({ open: false });

  // Blog post handlers
  const handleCreateBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
    const success = await createBlogPost(postData);
    if (success) setBlogPostModal({ open: false });
  };

  const handleUpdateBlogPost = async (postData: BlogPost) => {
    const success = await updateBlogPost(postData);
    if (success) setBlogPostModal({ open: false });
  };

  // Project handlers
  const handleCreateProject = async (projectData: Omit<Project, 'id'>) => {
    const success = await createProject(projectData);
    if (success) setProjectModal({ open: false });
  };

  const handleUpdateProject = async (projectData: Project) => {
    const success = await updateProject(projectData);
    if (success) setProjectModal({ open: false });
  };

  // Publication handlers
  const handleCreatePublication = async (publicationData: Omit<Publication, 'id'>) => {
    const success = await createPublication(publicationData);
    if (success) setPublicationModal({ open: false });
  };

  const handleUpdatePublication = async (publicationData: Publication) => {
    const success = await updatePublication(publicationData);
    if (success) setPublicationModal({ open: false });
  };

  // Delete handler
  const handleDelete = async () => {
    const { type, id } = deleteModal;
    if (!type || !id) return;

    let success = false;
    switch (type) {
      case 'blog':
        success = await deleteBlogPost(id);
        break;
      case 'project':
        success = await deleteProject(id);
        break;
      case 'publication':
        success = await deletePublication(id);
        break;
    }

    if (success) setDeleteModal({ open: false });
  };

  return (
    <div className="grid gap-6">
      <BlogPostsSection
        blogPosts={blogPosts}
        onCreatePost={() => setBlogPostModal({ open: true })}
        onEditPost={(post) => setBlogPostModal({ open: true, post })}
        onDeletePost={(id, title) => setDeleteModal({ open: true, type: 'blog', id, title })}
      />

      <ProjectsSection
        projects={projects}
        onCreateProject={() => setProjectModal({ open: true })}
        onEditProject={(project) => setProjectModal({ open: true, project })}
        onDeleteProject={(id, title) => setDeleteModal({ open: true, type: 'project', id, title })}
      />

      <PublicationsSection
        publications={publications}
        onCreatePublication={() => setPublicationModal({ open: true })}
        onEditPublication={(publication) => setPublicationModal({ open: true, publication })}
        onDeletePublication={(id, title) => setDeleteModal({ open: true, type: 'publication', id, title })}
      />

      {/* Modals */}
      <BlogPostModal
        open={blogPostModal.open}
        post={blogPostModal.post}
        onClose={() => setBlogPostModal({ open: false })}
        onSave={blogPostModal.post ? handleUpdateBlogPost : handleCreateBlogPost}
      />

      <ProjectModal
        open={projectModal.open}
        project={projectModal.project}
        onClose={() => setProjectModal({ open: false })}
        onSave={projectModal.project ? handleUpdateProject : handleCreateProject}
      />

      <PublicationModal
        open={publicationModal.open}
        publication={publicationModal.publication}
        onClose={() => setPublicationModal({ open: false })}
        onSave={publicationModal.publication ? handleUpdatePublication : handleCreatePublication}
      />

      <DeleteConfirmModal
        open={deleteModal.open}
        title={deleteModal.title || ''}
        onClose={() => setDeleteModal({ open: false })}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminContentManagement;
