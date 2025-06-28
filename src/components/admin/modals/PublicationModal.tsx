import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { publicationService } from "@/services/publicationService";
import { Publication } from "../adminTypes";

interface PublicationModalProps {
  open: boolean;
  publication?: Publication;
  onClose: () => void;
  onSave: () => void;
}

const PublicationModal = ({ open, publication, onClose, onSave }: PublicationModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    journal: "",
    authors: "",
    date: new Date().getFullYear().toString(),
    abstract: "",
    doi: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (publication) {
      setFormData({
        title: publication.title,
        journal: publication.journal || "",
        authors: publication.authors,
        date: publication.date,
        abstract: publication.abstract || "",
        doi: publication.doi || "",
        url: publication.url || "",
      });
    } else {
      setFormData({
        title: "",
        journal: "",
        authors: "",
        date: new Date().getFullYear().toString(),
        abstract: "",
        doi: "",
        url: "",
      });
    }
  }, [publication, open]);

  const validateForm = () => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.authors.trim()) return "Authors are required";
    if (!formData.date.trim()) return "Year is required";
    if (formData.url && !isValidUrl(formData.url)) return "Invalid URL";
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
      const publicationData = { ...formData };

      if (publication) {
        // For updates, include id and cast to Publication
        const updateData: Publication = {
          ...publicationData,
          id: publication.id,
        };
        const { error } = await publicationService.update(updateData);
        if (error) throw new Error(error);
      } else {
        // For creates, cast to Omit<Publication, 'id'>
        const createData = publicationData as Omit<Publication, "id">;
        const { error } = await publicationService.create(createData);
        if (error) throw new Error(error);
      }

      toast({
        title: "Success",
        description: `Publication ${publication ? "updated" : "created"} successfully`,
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {publication ? "Edit Publication" : "Create New Publication"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="journal">Journal</Label>
              <Input
                id="journal"
                value={formData.journal}
                onChange={(e) => handleChange("journal", e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Year</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="authors">Authors</Label>
            <Input
              id="authors"
              value={formData.authors}
              onChange={(e) => handleChange("authors", e.target.value)}
              placeholder="A. Ademola, J. Smith, et al."
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              value={formData.abstract}
              onChange={(e) => handleChange("abstract", e.target.value)}
              rows={4}
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="doi">DOI</Label>
              <Input
                id="doi"
                value={formData.doi}
                onChange={(e) => handleChange("doi", e.target.value)}
                placeholder="10.1000/182"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://journal.com/article"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : publication ? "Update" : "Create"} Publication
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PublicationModal;