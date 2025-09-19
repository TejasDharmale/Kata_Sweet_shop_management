import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, MessageCircle, Heart, Share2, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface FeedbackPost {
  id: number;
  user: string;
  rating: number;
  comment: string;
  likes: number;
  replies: number;
  timestamp: string;
  isVerified: boolean;
}

const sampleFeedback: FeedbackPost[] = [
  {
    id: 1,
    user: "Priya M.",
    rating: 5,
    comment: "Just received my order of Kaju Katli and it's absolutely divine! The quality is top-notch and the packaging was beautiful. Highly recommend Kata Sweet Shop!",
    likes: 24,
    replies: 3,
    timestamp: "2 hours ago",
    isVerified: true
  },
  {
    id: 2,
    user: "Rajesh K.",
    rating: 5,
    comment: "The Gulab Jamun was so soft and sweet, exactly like my grandmother used to make. The home delivery was super fast too!",
    likes: 18,
    replies: 1,
    timestamp: "4 hours ago",
    isVerified: true
  },
  {
    id: 3,
    user: "Anita P.",
    rating: 5,
    comment: "Ordered for our Diwali celebration and everyone loved the Bengali sweets collection. The Rasgulla was perfect!",
    likes: 31,
    replies: 5,
    timestamp: "6 hours ago",
    isVerified: true
  },
  {
    id: 4,
    user: "Suresh R.",
    rating: 5,
    comment: "Best Mysore Pak I've ever tasted! The traditional taste is preserved perfectly. Will definitely order again.",
    likes: 15,
    replies: 2,
    timestamp: "1 day ago",
    isVerified: true
  }
];

export function FeedbackCommunity() {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState(sampleFeedback);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleLike = (id: number) => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to like posts.",
        variant: "destructive",
      });
      return;
    }

    setFeedback(prev => 
      prev.map(post => 
        post.id === id 
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleSubmitFeedback = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to post feedback.",
        variant: "destructive",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please write a comment before posting.",
        variant: "destructive",
      });
      return;
    }

    const newPost: FeedbackPost = {
      id: Date.now(),
      user: "You",
      rating: newRating,
      comment: newComment,
      likes: 0,
      replies: 0,
      timestamp: "Just now",
      isVerified: false
    };

    setFeedback(prev => [newPost, ...prev]);
    setNewComment('');
    setNewRating(5);

    toast({
      title: "Feedback posted!",
      description: "Thank you for your feedback. It helps us improve our service.",
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Feedback</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community and share your sweet experiences with other customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Post New Feedback */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Share Your Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Rating:</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= newRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <Textarea
                placeholder="Share your experience with our sweets..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />
              
              <div className="flex justify-end">
                <Button onClick={handleSubmitFeedback} disabled={!isAuthenticated}>
                  Post Feedback
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Posts */}
          <div className="space-y-6">
            {feedback.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-candy rounded-full flex items-center justify-center text-white font-bold">
                        {post.user.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{post.user}</span>
                          {post.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              ✓ Verified
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(post.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      
                      <p className="text-gray-700 mb-4">{post.comment}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center space-x-1 hover:text-primary transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </button>
                        
                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
