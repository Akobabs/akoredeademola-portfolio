
import { Edit3, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Publication } from './adminTypes';

interface PublicationsSectionProps {
  publications: Publication[];
  onCreatePublication: () => void;
  onEditPublication: (publication: Publication) => void;
  onDeletePublication: (id: string, title: string) => void;
}

const PublicationsSection = ({ publications, onCreatePublication, onEditPublication, onDeletePublication }: PublicationsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center">
              <Edit3 className="h-5 w-5 mr-2" />
              Publications
            </CardTitle>
            <CardDescription className="text-muted-foreground">Manage your research publications</CardDescription>
          </div>
          <Button onClick={onCreatePublication}>
            <Plus className="h-4 w-4 mr-2" />
            New Publication
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {publications.map((publication) => (
            <div key={publication.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="font-medium text-foreground">{publication.title}</div>
                <div className="text-sm text-muted-foreground">{publication.journal} • {publication.authors} • {publication.date}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditPublication(publication)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDeletePublication(publication.id, publication.title)}
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

export default PublicationsSection;
