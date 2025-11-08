import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, MapPin, Star, ChevronLeft, ChevronRight, Award, Shield, Clock, CheckCircle } from 'lucide-react';
import { vehicles, testimonials, popularDestinations } from '../data/vehicles';

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: 'Hisar, Haryana',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
  });
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleSearch = () => {
    navigate('/vehicles', { state: searchData });
  };

  const featuredVehicles = vehicles.filter(v => v.featured).slice(0, 8);
  const categories = [
    { name: 'Bikes', icon: '🏍️', count: vehicles.filter(v => v.type === 'Bike').length, color: 'bg-blue-100 text-blue-600' },
    { name: 'Scooters', icon: '🛵', count: vehicles.filter(v => v.type === 'Scooter').length, color: 'bg-orange-100 text-orange-600' },
    { name: 'Cars', icon: '🚗', count: vehicles.filter(v => v.type === 'Car').length, color: 'bg-green-100 text-green-600' },
    { name: 'SUVs', icon: '🚙', count: vehicles.filter(v => v.type === 'SUV').length, color: 'bg-purple-100 text-purple-600' },
  ];

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rent Your Perfect Ride in Hisar
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Quality vehicles at affordable prices. Book now and explore Hisar with ease!
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                    className="input-field text-gray-900"
                    placeholder="Hisar, Haryana"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={searchData.pickupDate}
                    onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                    className="input-field text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    value={searchData.pickupTime}
                    onChange={(e) => setSearchData({ ...searchData, pickupTime: e.target.value })}
                    className="input-field text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                    className="input-field text-gray-900"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="btn-secondary w-full md:w-auto md:px-12 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search Vehicles</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Package Banner */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-2">🎉 Wedding Package Special!</h2>
          <p className="text-lg">Get 25% off on all cars and SUVs for wedding bookings. Use code: WEDDING</p>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Vehicle Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => navigate(`/vehicles?type=${category.name}`)}
                className="card p-6 text-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className={`text-5xl mb-4 ${category.color} w-20 h-20 mx-auto rounded-full flex items-center justify-center`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} vehicles available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Vehicles</h2>
            <button
              onClick={() => navigate('/vehicles')}
              className="text-primary-600 font-semibold hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => navigate(`/vehicles/${vehicle.id}`)}
                className="card cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {!vehicle.available && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Booked
                    </div>
                  )}
                  {vehicle.available && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Available
                    </div>
                  )}
                  {vehicle.studentSpecial && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold">
                      Student Special
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">{vehicle.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{vehicle.rating} ({vehicle.reviews})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">₹{vehicle.pricePerDay}</span>
                      <span className="text-gray-600 text-sm">/day</span>
                    </div>
                    <button className="btn-primary text-sm py-2 px-4">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular in Hisar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations in Hisar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.map((destination) => (
              <div key={destination.id} className="card overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{destination.name}</h3>
                    <p className="text-sm">{destination.distance} from city center</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for all your needs</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing with no hidden charges</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Vehicles</h3>
              <p className="text-gray-600">All vehicles are thoroughly inspected and verified</p>
            </div>
            <div className="card p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and quick booking process in minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="card p-8 md:p-12">
              <div className="flex items-center mb-6">
                <img
                  src={testimonials[testimonialIndex].image}
                  alt={testimonials[testimonialIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonials[testimonialIndex].name}</h3>
                  <p className="text-gray-600">{testimonials[testimonialIndex].location}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">"{testimonials[testimonialIndex].text}"</p>
            </div>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setTestimonialIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === testimonialIndex ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

