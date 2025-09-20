import React from 'react';
import { RefreshCw, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';

export function ReturnRefund() {
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
            Return & Refund Policy
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
                <RefreshCw className="h-6 w-6" />
                Return Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We want you to be completely satisfied with your purchase. Due to the perishable 
                nature of our products, we have specific return policies:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Returns must be initiated within 2 hours of delivery</li>
                <li>Products must be in original packaging and unopened</li>
                <li>We do not accept returns for custom orders or special occasion items</li>
                <li>Returns are subject to inspection and approval</li>
                <li>Return shipping costs are the responsibility of the customer</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Refund Process
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <span className="text-orange-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Contact Us</h4>
                    <p className="text-gray-600 text-sm">Call or email us within 2 hours of delivery</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <span className="text-orange-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Return Authorization</h4>
                    <p className="text-gray-600 text-sm">We'll provide a return authorization number</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <span className="text-orange-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Return Package</h4>
                    <p className="text-gray-600 text-sm">Package the items securely and return them</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <span className="text-orange-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Refund Processing</h4>
                    <p className="text-gray-600 text-sm">Refund will be processed within 5-7 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Refund Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Credit Card Refunds: 5-7 business days</li>
                <li>Bank Transfer Refunds: 7-10 business days</li>
                <li>Cash on Delivery: Refund to bank account within 10-15 business days</li>
                <li>Store Credit: Immediate upon approval</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <XCircle className="h-6 w-6" />
                Non-Refundable Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                The following items are not eligible for return or refund:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Custom orders and personalized items</li>
                <li>Items consumed or partially consumed</li>
                <li>Products damaged by customer mishandling</li>
                <li>Items returned after 2 hours of delivery</li>
                <li>Special occasion orders (weddings, festivals)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                For returns, refunds, or any questions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> returns@katasweetshop.com</p>
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
