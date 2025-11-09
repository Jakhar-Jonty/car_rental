import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CR</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">CarRental</h3>
                <p className="text-xs">Hisar, Haryana</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              Your trusted partner for car and bike rentals in Hisar. Quality vehicles, affordable prices, and excellent service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-primary-400 transition-colors text-sm">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary-400 transition-colors text-sm">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/vehicles?type=Bike" className="hover:text-primary-400 transition-colors text-sm">
                  Bike Rental
                </Link>
              </li>
              <li>
                <Link to="/vehicles?type=Scooter" className="hover:text-primary-400 transition-colors text-sm">
                  Scooter Rental
                </Link>
              </li>
              <li>
                <Link to="/vehicles?type=Car" className="hover:text-primary-400 transition-colors text-sm">
                  Car Rental
                </Link>
              </li>
              <li>
                <Link to="/vehicles?type=SUV" className="hover:text-primary-400 transition-colors text-sm">
                  SUV Rental
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition-colors text-sm">
                  Wedding Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+91 9050676836</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">jontysingh055@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Sector 15, Hisar<br />
                  Haryana - 125001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 CarRental Hisar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

