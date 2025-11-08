import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, ChevronRight, Calendar, MapPin, Check, Users, Fuel, Settings, Clock } from 'lucide-react';
import { vehicles } from '../data/vehicles';

const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find(v => v.id === parseInt(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rentalDuration, setRentalDuration] = useState('daily');
  const [bookingData, setBookingData] = useState({
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    location: 'Hisar, Haryana',
  });

  const similarVehicles = vehicles
    .filter(v => v.type === vehicle?.type && v.id !== vehicle?.id)
    .slice(0, 4);

  useEffect(() => {
    if (!vehicle) {
      navigate('/vehicles');
    }
  }, [vehicle, navigate]);

  if (!vehicle) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };

  const calculateTotalPrice = () => {
    if (!bookingData.pickupDate || !bookingData.returnDate) return 0;
    
    const pickup = new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`);
    const returnDate = new Date(`${bookingData.returnDate}T${bookingData.returnTime}`);
    const diffTime = Math.abs(returnDate - pickup);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    switch (rentalDuration) {
      case 'hourly':
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60)) || 1;
        return vehicle.pricePerHour * diffHours;
      case 'daily':
        return vehicle.pricePerDay * diffDays;
      case 'weekly':
        const weeks = Math.ceil(diffDays / 7);
        return vehicle.pricePerWeek * weeks;
      case 'monthly':
        const months = Math.ceil(diffDays / 30);
        return vehicle.pricePerMonth * months;
      default:
        return vehicle.pricePerDay * diffDays;
    }
  };

  const handleProceedToBook = () => {
    navigate('/booking', {
      state: {
        vehicle,
        bookingData,
        rentalDuration,
        totalPrice: calculateTotalPrice(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/vehicles')}
          className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Vehicles</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="card overflow-hidden">
              <div className="relative">
                <img
                  src={vehicle.images[currentImageIndex]}
                  alt={vehicle.name}
                  className="w-full h-96 object-cover"
                />
                {vehicle.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {vehicle.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              {vehicle.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {vehicle.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`overflow-hidden rounded-lg border-2 transition-all ${
                        index === currentImageIndex ? 'border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt={`${vehicle.name} ${index + 1}`} className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vehicle Info */}
            <div className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.name}</h1>
                  <p className="text-lg text-gray-600">{vehicle.model}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{vehicle.rating}</span>
                    <span className="text-gray-600">({vehicle.reviews} reviews)</span>
                  </div>
                  {vehicle.available ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Available Now
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Booked
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 mb-6">{vehicle.description}</p>

              {/* Key Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Fuel className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Mileage</p>
                  <p className="font-semibold">{vehicle.mileage}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Fuel className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Fuel Type</p>
                  <p className="font-semibold">{vehicle.fuelType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Seating</p>
                  <p className="font-semibold">{vehicle.seating} Seater</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Settings className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Transmission</p>
                  <p className="font-semibold">{vehicle.transmission}</p>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Similar Vehicles */}
            {similarVehicles.length > 0 && (
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {similarVehicles.map((v) => (
                    <div
                      key={v.id}
                      onClick={() => navigate(`/vehicles/${v.id}`)}
                      className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-primary-600 transition-colors"
                    >
                      <img src={v.image} alt={v.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                      <h3 className="font-semibold text-lg mb-1">{v.name}</h3>
                      <p className="text-primary-600 font-bold">₹{v.pricePerDay}/day</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="mb-6">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  ₹{vehicle.pricePerDay}
                  <span className="text-lg text-gray-600 font-normal">/day</span>
                </div>
                <div className="text-sm text-gray-600">
                  Hourly: ₹{vehicle.pricePerHour} | Weekly: ₹{vehicle.pricePerWeek} | Monthly: ₹{vehicle.pricePerMonth}
                </div>
              </div>

              {/* Rental Duration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rental Duration</label>
                <div className="grid grid-cols-2 gap-2">
                  {['hourly', 'daily', 'weekly', 'monthly'].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setRentalDuration(duration)}
                      className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                        rentalDuration === duration
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duration.charAt(0).toUpperCase() + duration.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Booking Form */}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={bookingData.location}
                    onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
                    className="input-field"
                    placeholder="Hisar, Haryana"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Pickup Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={bookingData.pickupDate}
                      onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                      className="input-field"
                    />
                    <input
                      type="time"
                      value={bookingData.pickupTime}
                      onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Return Date & Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={bookingData.returnDate}
                      onChange={(e) => setBookingData({ ...bookingData, returnDate: e.target.value })}
                      className="input-field"
                    />
                    <input
                      type="time"
                      value={bookingData.returnTime}
                      onChange={(e) => setBookingData({ ...bookingData, returnTime: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Price Calculation */}
                {calculateTotalPrice() > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{calculateTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-semibold">₹{Math.round(calculateTotalPrice() * 0.18)}</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{calculateTotalPrice() + Math.round(calculateTotalPrice() * 0.18)}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleProceedToBook}
                  disabled={!vehicle.available || !bookingData.pickupDate || !bookingData.returnDate}
                  className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Book
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;

