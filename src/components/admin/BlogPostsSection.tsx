
import { useState } from 'react';
import { FileText, Edit, Trash2, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from './adminTypes';

interface BlogPostsSectionProps {
  blogPosts: BlogPost[];
  onCreatePost: () => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (id: string, title: string) => void;
}

const BlogPostsSection = ({ blogPosts, onCreatePost, onEditPost, onDeletePost }: BlogPostsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Blog Posts
            </CardTitle>
            <CardDescription className="text-muted-foreground">Manage your blog content</CardDescription>
          </div>
          <Button onClick={onCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <div className="font-medium text-foreground">{post.title}</div>
                <div className="text-sm text-muted-foreground">{post.category} • {post.readTime} min read</div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                  {post.status}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onEditPost(post)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onDeletePost(post.id, post.title)}
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

export default BlogPostsSection;
