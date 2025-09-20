import React from 'react';
import { Heart, Users, Award, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GoogleMap } from '@/components/GoogleMap';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';
import { useNavigate } from 'react-router-dom';

export function AboutUs() {
  const navigate = useNavigate();

  const handleOrderOnline = () => {
    navigate('/#sweets-section');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            About Kata Sweet Shop
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            For over 1 years, we've been crafting the finest traditional Indian sweets 
            with love, passion, and time-honored recipes passed down through generations.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Kata Sweet Shop was born from a deep-rooted passion for preserving and sharing 
                the authentic flavors of Indian sweets. Founded in 2025 by a family with over 
                30 years of experience in traditional sweet making, we have been serving the 
                Pune community with the finest quality mithai.
              </p>
              <p>
                Our journey began in a small kitchen in Pune Hadapsar, where we started with 
                just a handful of traditional recipes. Today, we've grown into a beloved 
                sweet shop that continues to maintain the same commitment to quality and 
                authenticity that marked our humble beginnings.
              </p>
              <p>
                Every sweet we create is made with premium ingredients, traditional methods, 
                and most importantly, with love. We believe that sweets are not just food—they're 
                memories, celebrations, and expressions of joy that bring people together.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg leading-relaxed mb-6">
              To preserve and promote traditional Indian sweet-making techniques while 
              bringing joy to every celebration through our authentic, high-quality mithai.
            </p>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg leading-relaxed">
              To become the most trusted and beloved sweet shop in Pune, known for 
              our commitment to tradition, quality, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Passion</h3>
                <p className="text-gray-600">
                  Every sweet is crafted with genuine passion and love for traditional recipes 
                  and techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Quality</h3>
                <p className="text-gray-600">
                  We use only the finest ingredients and maintain the highest standards 
                  in every product we create.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
                <p className="text-gray-600">
                We're proud to be part of the Pune community and celebrate 
                every occasion with our customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5+</div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">50+</div>
              <p className="text-gray-600">Sweet Varieties</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">SK</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Tejas Dharmale</h3>
                <p className="text-orange-600 font-semibold mb-3">Founder & Master Chef</p>
                <p className="text-gray-600">
                  With 30+ years of experience in traditional sweet making, Tejas brings 
                  authentic recipes and techniques to every creation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">PK</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Priya Kumar</h3>
                <p className="text-orange-600 font-semibold mb-3">Operations Manager</p>
                <p className="text-gray-600">
                  Priya ensures every order is perfect and every customer experience is 
                  memorable through her attention to detail and customer service.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-orange-600">AK</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Arjun Kumar</h3>
                <p className="text-orange-600 font-semibold mb-3">Head Chef</p>
                <p className="text-gray-600">
                  Arjun leads our kitchen team with passion and expertise, ensuring 
                  consistent quality in every batch of sweets we produce.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Visit Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Store Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">
                      Pune Hadapsar<br />
                      411028
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Saturday: 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">+91 9067722873</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">tejasdharmale6@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-600">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  We'd love to hear from you! Whether you have questions about our products, 
                  need help with an order, or want to discuss custom sweet arrangements, 
                  we're here to help.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={() => window.location.href = 'tel:+919067722873'}
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us Now
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact-us')}
                    variant="outline" 
                    className="w-full"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 text-center">
                Visit Our Store
              </CardTitle>
              <p className="text-gray-600 text-center">
                Find us at our location in Pune Hadapsar, 411028
              </p>
            </CardHeader>
            <CardContent>
              <GoogleMap 
                center={{ lat: 18.5204, lng: 73.8567 }} 
                zoom={16}
                className="shadow-lg"
              />
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-12 text-white mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Sweet Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Visit our store or place an order online to taste the authentic flavors 
            that have made us a beloved part of Pune's sweet tradition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={handleOrderOnline}
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold border-2 border-white"
            >
              Order Online
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100 font-semibold border-2 border-white"
            >
              Visit Our Store
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
