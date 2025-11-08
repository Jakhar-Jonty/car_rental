import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Globe, User, LogIn } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLogin = () => setIsLoginOpen(!isLoginOpen);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">CR</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CarRental</h1>
                <p className="text-xs text-gray-600">Hisar, Haryana</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/vehicles" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Vehicles
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Location Badge */}
              <div className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span>Hisar, Haryana</span>
              </div>

              {/* Language Toggle */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">{language}</span>
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <button
                      onClick={() => {
                        setLanguage('English');
                        setIsLanguageOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('Hindi');
                        setIsLanguageOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      Hindi
                    </button>
                  </div>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={toggleLogin}
                className="flex items-center space-x-2 btn-primary"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/vehicles"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Vehicles
                </Link>
                <Link
                  to="/about"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Contact
                </Link>
                <button
                  onClick={() => {
                    toggleLogin();
                    toggleMenu();
                  }}
                  className="flex items-center space-x-2 btn-primary w-full justify-center"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Login Modal */}
      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Login / Sign Up</h2>
              <button
                onClick={toggleLogin}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex border-b border-gray-200 mb-6">
              <button className="flex-1 py-2 text-center font-semibold text-primary-600 border-b-2 border-primary-600">
                Login
              </button>
              <button className="flex-1 py-2 text-center font-semibold text-gray-500 hover:text-gray-700">
                Sign Up
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleLogin();
                  navigate('/dashboard');
                }}
                className="btn-primary w-full"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <button className="text-primary-600 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

