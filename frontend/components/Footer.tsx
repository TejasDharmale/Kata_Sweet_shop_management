import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-orange-400">Kata Sweet Shop</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Traditional Indian sweets made with love and authentic recipes. 
              Serving Pune with the finest mithai for over 5 years.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/TejasDharmale/Kata_Sweet_shop_management" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/tejas-dharmale09" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-orange-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about-us" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Our Sweet Collection
                </Link>
              </li>
              <li>
                <Link 
                  to="/community-feedback" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact-us" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/favorites" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  My Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
                  Custom Wedding Sweet Boxes
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
                  Corporate Gifting Solutions
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
                  Bulk Orders & Wholesale
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
                  Home Delivery Service
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-orange-400 transition-colors cursor-pointer">
                  Special Occasion Orders
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-0.5" />
                <div>
                   <p className="text-gray-300 text-sm leading-relaxed">
                     Pune Hadapsar<br />
                     411028
                   </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-400" />
                 <a 
                   href="tel:+919067722873" 
                   className="text-gray-300 hover:text-orange-400 transition-colors"
                 >
                   +91 9067722873
                 </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-400" />
                <a 
                  href="mailto:tejasdharmale6@gmail.com" 
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  tejasdharmale6@gmail.com
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Mon-Sat: 9:00 AM - 8:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Kata Sweet Shop. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-conditions" 
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="/return-refund" 
                className="text-gray-400 hover:text-orange-400 transition-colors"
              >
                Return & Refund
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
