
import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Comment {
  id: number;
  blogId: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  userHasLiked?: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  blogId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ blogId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [showReplies, setShowReplies] = useState<number[]>([]);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load comments from localStorage
    const storedComments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
    const filteredComments = storedComments.filter((comment: Comment) => comment.blogId === blogId);
    setComments(filteredComments);
  }, [blogId]);

  const handleSubmitComment = () => {
    if (!newComment.trim() || !name.trim()) {
      toast({
        title: "Error",
        description: "Please enter both your name and comment",
        variant: "destructive",
      });
      return;
    }

    const newCommentObj: Comment = {
      id: Date.now(),
      blogId,
      author: name,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    // Add comment to state
    setComments(prevComments => [...prevComments, newCommentObj]);
    
    // Save to localStorage
    const storedComments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
    storedComments.push(newCommentObj);
    localStorage.setItem('blog_comments', JSON.stringify(storedComments));
    
    // Reset form
    setNewComment('');
    
    toast({
      title: "Comment posted",
      description: "Your comment has been added successfully",
    });
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return { 
            ...comment, 
            likes: comment.userHasLiked ? comment.likes - 1 : comment.likes + 1,
            userHasLiked: !comment.userHasLiked 
          };
        } else if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => {
              if (reply.id === commentId) {
                return { 
                  ...reply, 
                  likes: reply.userHasLiked ? reply.likes - 1 : reply.likes + 1,
                  userHasLiked: !reply.userHasLiked 
                };
              }
              return reply;
            })
          };
        }
        return comment;
      })
    );

    // Update in localStorage
    const storedComments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
    const updatedComments = storedComments.map((comment: Comment) => {
      if (comment.id === commentId) {
        return { 
          ...comment, 
          likes: comment.userHasLiked ? comment.likes - 1 : comment.likes + 1,
          userHasLiked: !comment.userHasLiked 
        };
      } else if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map((reply: Comment) => {
            if (reply.id === commentId) {
              return { 
                ...reply, 
                likes: reply.userHasLiked ? reply.likes - 1 : reply.likes + 1,
                userHasLiked: !reply.userHasLiked 
              };
            }
            return reply;
          })
        };
      }
      return comment;
    });
    localStorage.setItem('blog_comments', JSON.stringify(updatedComments));
  };

  const toggleReplies = (commentId: number) => {
    setShowReplies(prev => 
      prev.includes(commentId)
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    setReplyContent('');
  };

  const submitReply = (commentId: number) => {
    if (!replyContent.trim() || !name.trim()) {
      toast({
        title: "Error",
        description: "Please enter both your name and reply",
        variant: "destructive",
      });
      return;
    }

    const newReply: Comment = {
      id: Date.now(),
      blogId,
      author: name,
      content: replyContent,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    // Update comments state
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      })
    );
    
    // Update in localStorage
    const storedComments = JSON.parse(localStorage.getItem('blog_comments') || '[]');
    const updatedComments = storedComments.map((comment: Comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    });
    localStorage.setItem('blog_comments', JSON.stringify(updatedComments));
    
    // Reset state
    setReplyingTo(null);
    setReplyContent('');
    
    // Show replies for this comment
    if (!showReplies.includes(commentId)) {
      setShowReplies(prev => [...prev, commentId]);
    }
    
    toast({
      title: "Reply posted",
      description: "Your reply has been added successfully",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-6">Comments ({comments.length})</h3>
      
      {/* New Comment Form */}
      <div className="mb-8">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="block w-full md:w-1/3 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Textarea 
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[100px] mb-3"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitComment}>
            Post Comment
          </Button>
        </div>
      </div>
      
      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{comment.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{comment.author}</h4>
                    <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.content}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <button 
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center gap-1 ${comment.userHasLiked ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button 
                      onClick={() => handleReply(comment.id)}
                      className="flex items-center gap-1 text-gray-500"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500">
                      <Flag className="h-4 w-4" />
                      <span>Report</span>
                    </button>
                  </div>
                  
                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <Textarea 
                        placeholder="Write a reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[80px] mb-2"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button onClick={() => submitReply(comment.id)}>
                          Post Reply
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3">
                      <button 
                        onClick={() => toggleReplies(comment.id)}
                        className="text-sm text-blue-600 flex items-center"
                      >
                        {showReplies.includes(comment.id) ? (
                          <>
                            <ChevronUp className="h-4 w-4 mr-1" />
                            Hide Replies
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 mr-1" />
                            Show {comment.replies.length} {comment.replies.length === 1 ? 'Reply' : 'Replies'}
                          </>
                        )}
                      </button>
                      
                      {showReplies.includes(comment.id) && (
                        <div className="mt-2 space-y-4 pl-6 border-l-2 border-gray-100">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="pt-2">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback>{reply.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-sm">{reply.author}</h5>
                                    <span className="text-xs text-gray-500">{formatDate(reply.createdAt)}</span>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-700">{reply.content}</p>
                                  <div className="mt-1 flex items-center gap-3 text-xs">
                                    <button 
                                      onClick={() => handleLikeComment(reply.id)}
                                      className={`flex items-center gap-1 ${reply.userHasLiked ? 'text-blue-600' : 'text-gray-500'}`}
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                      <span>{reply.likes}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
