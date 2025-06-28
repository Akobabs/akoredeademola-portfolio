
import { BarChart3, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Project } from './adminTypes';

interface ProjectsSectionProps {
  projects: Project[];
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (id: string, title: string) => void;
}

const ProjectsSection = ({ projects, onCreateProject, onEditProject, onDeleteProject }: ProjectsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Projects
            </CardTitle>
            <CardDescription className="text-muted-foreground">Manage your portfolio projects</CardDescription>
          </div>
          <Button onClick={onCreateProject}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="font-medium text-foreground">{project.title}</div>
                <div className="text-sm text-muted-foreground">{project.category}</div>
              </div>
              <div className="flex items-center space-x-2">
                {project.featured && <Badge>Featured</Badge>}
                <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                  {project.status}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditProject(project)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDeleteProject(project.id, project.title)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectsSection;
