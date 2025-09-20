import React from 'react';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { BackButton } from '@/components/BackButton';

export function PrivacyPolicy() {
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
            Privacy Policy
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
                <Shield className="h-6 w-6" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Personal information (name, email, phone number)</li>
                <li>Delivery address and contact details</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Order history and preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <Eye className="h-6 w-6" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We use the information we collect to provide, maintain, and improve our services.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and delivery updates</li>
                <li>Provide customer support</li>
                <li>Improve our products and services</li>
                <li>Send promotional offers (with your consent)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <Lock className="h-6 w-6" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Encrypted data transmission (SSL/TLS)</li>
                <li>Secure payment processing</li>
                <li>Regular security audits</li>
                <li>Limited access to personal information</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600 flex items-center gap-2">
                <UserCheck className="h-6 w-6" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Access and update your personal information</li>
                <li>Delete your account and data</li>
                <li>Opt-out of promotional communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-orange-600">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@katasweetshop.com</p>
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
