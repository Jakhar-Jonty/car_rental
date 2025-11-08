import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Circle, CreditCard, Smartphone, Wallet, FileText, Upload, X } from 'lucide-react';
import { offers } from '../data/offers';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle, bookingData, rentalDuration, totalPrice } = location.state || {};

  const [currentStep, setCurrentStep] = useState(1);
  const [appliedOffer, setAppliedOffer] = useState(null);
  const [offerCode, setOfferCode] = useState('');
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });
  const [documents, setDocuments] = useState({
    drivingLicense: null,
    idProof: null,
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (!vehicle || !bookingData) {
      navigate('/vehicles');
    }
  }, [vehicle, bookingData, navigate]);

  if (!vehicle || !bookingData) return null;

  const steps = [
    { number: 1, title: 'Personal Details', icon: CheckCircle },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Confirmation', icon: CheckCircle },
  ];

  const handleApplyOffer = () => {
    const offer = offers.find(o => o.code.toUpperCase() === offerCode.toUpperCase());
    if (offer) {
      setAppliedOffer(offer);
    } else {
      alert('Invalid offer code');
    }
  };

  const calculateFinalPrice = () => {
    let finalPrice = totalPrice + Math.round(totalPrice * 0.18); // Including taxes
    if (appliedOffer) {
      if (appliedOffer.discount <= 100) {
        // Percentage discount
        finalPrice = finalPrice * (1 - appliedOffer.discount / 100);
      } else {
        // Fixed amount discount
        finalPrice = finalPrice - appliedOffer.discount;
      }
    }
    return Math.max(0, finalPrice);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!personalDetails.name || !personalDetails.phone || !personalDetails.email) {
        alert('Please fill all required fields');
        return;
      }
    }
    if (currentStep === 2) {
      if (!paymentMethod) {
        alert('Please select a payment method');
        return;
      }
      if (!termsAccepted) {
        alert('Please accept the terms and conditions');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleConfirmBooking = () => {
    // In a real app, this would send data to backend
    alert('Booking confirmed! Redirecting to dashboard...');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-sm font-medium ${
                        isActive ? 'text-primary-600' : 'text-gray-600'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="card p-6 space-y-6">
                <h2 className="text-2xl font-bold mb-6">Personal Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={personalDetails.name}
                      onChange={(e) =>
                        setPersonalDetails({ ...personalDetails, name: e.target.value })
                      }
                      className="input-field"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={personalDetails.phone}
                      onChange={(e) =>
                        setPersonalDetails({ ...personalDetails, phone: e.target.value })
                      }
                      className="input-field"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={personalDetails.email}
                      onChange={(e) =>
                        setPersonalDetails({ ...personalDetails, email: e.target.value })
                      }
                      className="input-field"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={personalDetails.address}
                      onChange={(e) =>
                        setPersonalDetails({ ...personalDetails, address: e.target.value })
                      }
                      className="input-field"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold">Document Upload</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        Driving License
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          id="drivingLicense"
                          onChange={(e) =>
                            setDocuments({ ...documents, drivingLicense: e.target.files[0] })
                          }
                        />
                        <label
                          htmlFor="drivingLicense"
                          className="btn-primary text-sm py-2 px-4 mt-2 inline-block cursor-pointer"
                        >
                          Upload File
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText className="w-4 h-4 inline mr-1" />
                        ID Proof (Aadhar/PAN)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          id="idProof"
                          onChange={(e) =>
                            setDocuments({ ...documents, idProof: e.target.files[0] })
                          }
                        />
                        <label
                          htmlFor="idProof"
                          className="btn-primary text-sm py-2 px-4 mt-2 inline-block cursor-pointer"
                        >
                          Upload File
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={handleNext} className="btn-primary w-full">
                  Continue to Payment
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="card p-6 space-y-6">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`w-full p-4 border-2 rounded-lg flex items-center space-x-4 transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Smartphone className="w-6 h-6 text-primary-600" />
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">UPI</h3>
                      <p className="text-sm text-gray-600">Pay via UPI (PhonePe, Google Pay, etc.)</p>
                    </div>
                    {paymentMethod === 'upi' && (
                      <CheckCircle className="w-6 h-6 text-primary-600" />
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-4 border-2 rounded-lg flex items-center space-x-4 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-primary-600" />
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">Credit/Debit Card</h3>
                      <p className="text-sm text-gray-600">Pay using your card</p>
                    </div>
                    {paymentMethod === 'card' && (
                      <CheckCircle className="w-6 h-6 text-primary-600" />
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full p-4 border-2 rounded-lg flex items-center space-x-4 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Wallet className="w-6 h-6 text-primary-600" />
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold">Cash on Delivery</h3>
                      <p className="text-sm text-gray-600">Pay when you receive the vehicle</p>
                    </div>
                    {paymentMethod === 'cod' && (
                      <CheckCircle className="w-6 h-6 text-primary-600" />
                    )}
                  </button>
                </div>

                {/* Terms & Conditions */}
                <div className="pt-6 border-t border-gray-200">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-primary-600 hover:underline">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary-600 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn-secondary w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Back
                  </button>
                  <button onClick={handleNext} className="btn-primary w-full">
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="card p-6 text-center space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600">
                    Your booking has been confirmed. We'll send you a confirmation email shortly.
                  </p>
                </div>
                <div className="space-y-4">
                  <button onClick={handleConfirmBooking} className="btn-primary w-full">
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/vehicles')}
                    className="btn-secondary w-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Browse More Vehicles
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Booking Summary</h3>

              {/* Vehicle Info */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                <h4 className="font-semibold text-lg mb-2">{vehicle.name}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{vehicle.fuelType} • {vehicle.seating} Seater • {vehicle.transmission}</p>
                  <p>Pickup: {bookingData.pickupDate} at {bookingData.pickupTime}</p>
                  <p>Return: {bookingData.returnDate} at {bookingData.returnTime}</p>
                  <p>Location: {bookingData.location}</p>
                </div>
              </div>

              {/* Offer Code */}
              {!appliedOffer && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have a coupon code?
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={offerCode}
                      onChange={(e) => setOfferCode(e.target.value)}
                      className="input-field flex-1"
                      placeholder="Enter code"
                    />
                    <button onClick={handleApplyOffer} className="btn-primary text-sm py-2 px-4">
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {appliedOffer && (
                <div className="mb-6 pb-6 border-b border-gray-200 bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-green-800">{appliedOffer.title}</p>
                      <p className="text-xs text-green-600">{appliedOffer.code}</p>
                    </div>
                    <button
                      onClick={() => {
                        setAppliedOffer(null);
                        setOfferCode('');
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-semibold">₹{Math.round(totalPrice * 0.18)}</span>
                </div>
                {appliedOffer && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedOffer.code})</span>
                    <span className="font-semibold">
                      -₹
                      {appliedOffer.discount <= 100
                        ? Math.round((totalPrice + Math.round(totalPrice * 0.18)) * (appliedOffer.discount / 100))
                        : appliedOffer.discount}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-300 pt-3 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-2xl font-bold text-primary-600">₹{calculateFinalPrice()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

