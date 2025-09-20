import React from 'react';
import { FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';

export function TermsConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex flex-col">
      <div className="container mx-auto px-4 py-12 max-w-4xl flex-1">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: December 2024
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                By accessing and using Kata Sweet Shop's services, you accept and agree to be bound 
                by the terms and provision of this agreement. If you do not agree to abide by the 
                above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Orders and Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>All orders are subject to availability and confirmation</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment must be made at the time of order</li>
                <li>We accept cash on delivery and online payments</li>
                <li>Delivery charges may apply based on location</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Delivery Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Delivery time is estimated and may vary</li>
                <li>Someone must be available to receive the order</li>
                <li>We will attempt delivery up to 3 times</li>
                <li>Additional charges may apply for re-delivery</li>
                <li>Orders are delivered in our standard packaging</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Kata Sweet Shop shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from your use of the service.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For any questions regarding these Terms & Conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@katasweetshop.com</p>
                <p><strong>Phone:</strong> +91 9067722873</p>
                <p><strong>Address:</strong> Pune Hadapsar, 411028</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
