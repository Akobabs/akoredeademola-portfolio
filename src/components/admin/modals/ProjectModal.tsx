 import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { projectService } from "@/services/projectService";
import { Project } from "../adminTypes";

interface ProjectModalProps {
  open: boolean;
  project?: Project;
  onClose: () => void;
  onSave: () => void;
}

const ProjectModal = ({ open, project, onClose, onSave }: ProjectModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "draft" as "published" | "draft",
    featured: false,
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        category: project.category,
        status: project.status,
        featured: project.featured,
        description: project.description || "",
        technologies: project.technologies?.join(", ") || "",
        githubUrl: project.githubUrl || "",
        liveUrl: project.liveUrl || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        status: "draft",
        featured: false,
        description: "",
        technologies: "",
        githubUrl: "",
        liveUrl: "",
      });
    }
  }, [project, open]);

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.category.trim()) return "Category is required";
    if (formData.githubUrl && !isValidUrl(formData.githubUrl))
      return "Invalid GitHub URL";
    if (formData.liveUrl && !isValidUrl(formData.liveUrl))
      return "Invalid Live URL";
    return null;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validationError,
      });
      setIsLoading(false);
      return;
    }

    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
      };

      if (project) {
        // For updates, include id and cast to Project
        const updateData: Project = {
          ...projectData,
          id: project.id,
        };
        const { error } = await projectService.update(updateData);
        if (error) throw new Error(error);
      } else {
        // For creates, cast to Omit<Project, 'id'>
        const createData = projectData as Omit<Project, "id">;
        const { error } = await projectService.create(createData);
        if (error) throw new Error(error);
      }

      toast({
        title: "Success",
        description: `Project ${project ? "updated" : "created"} successfully`,
      });

      onSave();
      onClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Create New Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange("featured", checked)}
                disabled={isLoading}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma separated)</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) => handleChange("technologies", e.target.value)}
              placeholder="React, TypeScript, Node.js"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleChange("githubUrl", e.target.value)}
                placeholder="https://github.com/username/repo"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={(e) => handleChange("liveUrl", e.target.value)}
                placeholder="https://project-demo.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : project ? "Update" : "Create"} Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;