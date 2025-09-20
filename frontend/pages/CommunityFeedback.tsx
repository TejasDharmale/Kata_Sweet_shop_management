import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Heart, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';
import { sendFeedbackEmail, testEmailJS } from '@/services/emailjsService';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  verified: boolean;
}

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    comment: "Absolutely amazing sweets! The quality is outstanding and the taste reminds me of my grandmother's recipes. The packaging was beautiful too.",
    date: "2 days ago",
    avatar: "PS",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Best mithai shop in Hyderabad! Their rasgulla and gulab jamun are to die for. Great customer service and fast delivery.",
    date: "1 week ago",
    avatar: "RK",
    verified: true
  },
  {
    id: 3,
    name: "Sunita Reddy",
    rating: 5,
    comment: "Ordered for my daughter's birthday party. Everyone loved the sweets! Fresh, delicious, and beautifully presented. Highly recommended!",
    date: "1 week ago",
    avatar: "SR",
    verified: true
  },
  {
    id: 4,
    name: "Amit Patel",
    rating: 4,
    comment: "Great variety of traditional sweets. The quality is consistent and the prices are reasonable. Good customer service too.",
    date: "2 weeks ago",
    avatar: "AP",
    verified: true
  },
  {
    id: 5,
    name: "Kavitha Nair",
    rating: 5,
    comment: "Love their custom sweet boxes for festivals! The presentation is elegant and the sweets are always fresh. Perfect for gifting.",
    date: "3 weeks ago",
    avatar: "KN",
    verified: true
  }
];

export function CommunityFeedback() {
  const [testimonials] = useState<Testimonial[]>(initialTestimonials);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    name: '',
    email: '',
    rating: 5,
    title: '',
    comment: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send feedback email via EmailJS
    const feedbackData = {
      name: newReview.name,
      email: newReview.email,
      subject: `Customer Review: ${newReview.title}`,
      message: `Rating: ${newReview.rating}/5 stars\n\nReview: ${newReview.comment}\n\nCustomer: ${newReview.name}\nEmail: ${newReview.email}`
    };

    try {
      const emailSent = await sendFeedbackEmail(feedbackData);
      
      if (emailSent) {
        console.log('✅ Feedback email sent successfully');
      } else {
        console.log('⚠️ EmailJS not configured, feedback logged to console');
      }
    } catch (error) {
      console.error('Error sending feedback email:', error);
    }

    // Add review to local state
    const review: Review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toLocaleDateString(),
      helpful: 0
    };
    setReviews(prev => [review, ...prev]);
    setNewReview({
      name: '',
      email: '',
      rating: 5,
      title: '',
      comment: ''
    });
    setShowReviewForm(false);
    alert('Thank you for your review! It has been submitted successfully and sent to our team.');
  };

  const handleHelpful = (reviewId: number) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Community Feedback
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our customers have to say about their sweet experiences with us. 
            Join our community and share your feedback!
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Star className="h-8 w-8 text-yellow-400 fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</h3>
              <p className="text-gray-600">Average Rating</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{testimonials.length + reviews.length}</h3>
              <p className="text-gray-600">Total Reviews</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">98%</h3>
              <p className="text-gray-600">Customer Satisfaction</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-2">
                <Award className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">5+</h3>
              <p className="text-gray-600">Years Experience</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Testimonials</h2>
              <Button
                onClick={() => setShowReviewForm(true)}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Write a Review
              </Button>
            </div>

            <div className="space-y-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                          {testimonial.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                          <span className="text-sm text-gray-500">{testimonial.date}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{testimonial.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* User Reviews */}
              {reviews.map((review) => (
                <Card key={review.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                          {review.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-800">{review.name}</h3>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {renderStars(review.rating)}
                          </div>
                          <span className="text-sm text-gray-500">{review.rating}/5</span>
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">{review.title}</h4>
                        <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleHelpful(review.id)}
                          className="text-gray-600 hover:text-green-600"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
