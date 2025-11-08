import { Award, Shield, Clock, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">
            Your trusted partner for vehicle rentals in Hisar, Haryana
          </p>
        </div>

        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            CarRental Hisar was founded with a vision to provide affordable, reliable, and convenient
            vehicle rental services to the people of Hisar and surrounding areas. We understand the
            importance of mobility in today's fast-paced world, and we're committed to making vehicle
            rental accessible to everyone.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With a diverse fleet of bikes, scooters, cars, and SUVs, we cater to all your transportation
            needs. Whether you're a student looking for an affordable scooter, a family planning a weekend
            trip, or someone in need of a vehicle for a special occasion, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
            <p className="text-gray-600">
              We maintain our vehicles to the highest standards to ensure your safety and comfort.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Verified Vehicles</h3>
            <p className="text-gray-600">
              All our vehicles undergo thorough inspection and verification before being rented out.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our customer support team is available round the clock to assist you with any queries.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600">
              Your satisfaction is our priority. We go the extra mile to ensure a great experience.
            </p>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-3">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Wide range of vehicles to choose from</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Competitive pricing with no hidden charges</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Easy and quick booking process</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Flexible rental periods (hourly, daily, weekly, monthly)</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Student discounts and special offers</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Convenient pickup and drop-off locations</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Transparent pricing and terms</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

