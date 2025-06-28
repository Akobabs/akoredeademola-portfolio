import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, BookOpen, Users } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PublicAnalytics from "@/components/PublicAnalytics";
import { publicationService } from "@/services/publicationService";
import { Publication } from "@/components/admin/adminTypes";

const Publications = () => {
  const [page, setPage] = useState(0);
  const publicationsPerPage = 6;

  const { data: publications, isLoading, error } = useQuery<Publication[]>({
    queryKey: ["publications", page],
    queryFn: async () => {
      const allPublications = await publicationService.fetchAll();
      return allPublications.slice(
        page * publicationsPerPage,
        (page + 1) * publicationsPerPage
      );
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Accepted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Publications
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A collection of my research work and academic contributions in the
              fields of artificial intelligence, computer vision, and healthcare
              diagnostics.
            </p>
          </motion.div>

          {/* Publications Grid */}
          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600">
              Error loading publications: {error.message}
            </div>
          ) : !publications || publications.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No publications available
            </div>
          ) : (
            <div className="grid gap-6 mb-12">
              {publications.map((publication, index) => (
                <motion.div
                  key={publication.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300 bg-card border-border">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 text-foreground">
                            {publication.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span className="font-medium">
                                {publication.journal}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{publication.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{publication.authors}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(publication.status || "Published")}>
                          {publication.status || "Published"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4">
                        {publication.abstract}
                      </CardDescription>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(publication.tags || []).map((tag, tagIndex) => (
                          <Badge
                            key={tagIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {publication.url && publication.status === "Published" && (
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a href={publication.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Read Paper
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {publications && publications.length >= publicationsPerPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-12"
            >
              <button
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isLoading}
              >
                Load More Publications
              </button>
            </motion.div>
          )}

          {/* Public Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PublicAnalytics />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Publications;