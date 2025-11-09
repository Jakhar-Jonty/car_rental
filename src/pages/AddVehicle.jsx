import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';

const AddVehicle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    type: 'Bike',
    pricePerDay: '',
    pricePerHour: '',
    pricePerWeek: '',
    pricePerMonth: '',
    fuelType: 'Petrol',
    transmission: 'Manual',
    seating: '2',
    mileage: '',
    year: new Date().getFullYear(),
    features: [],
    description: '',
    available: true,
    featured: false,
    popular: false,
    studentSpecial: false,
  });
  const [images, setImages] = useState([]);
  const [newFeature, setNewFeature] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    alert('Vehicle added successfully!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="mb-4 sm:mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="card p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Add New Vehicle</h1>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Royal Enfield Classic 350"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., Classic 350"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Car">Car</option>
                    <option value="SUV">SUV</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="input-field"
                    min="2010"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Hour (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="pricePerHour"
                    value={formData.pricePerHour}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="150"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Day (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={formData.pricePerDay}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Week (₹)
                  </label>
                  <input
                    type="number"
                    name="pricePerWeek"
                    value={formData.pricePerWeek}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Month (₹)
                  </label>
                  <input
                    type="number"
                    name="pricePerMonth"
                    value={formData.pricePerMonth}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="18000"
                  />
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmission <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="seating"
                    value={formData.seating}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  >
                    <option value="2">2 Seater</option>
                    <option value="5">5 Seater</option>
                    <option value="7">7 Seater</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="e.g., 35 kmpl or 312 km range"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Features</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-3 sm:mb-4">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="input-field flex-1 text-sm sm:text-base"
                  placeholder="Add a feature (e.g., AC, GPS, Music System)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="btn-primary text-sm sm:text-base w-full sm:w-auto"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-2"
                  >
                    <span>{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Vehicle Images</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Vehicle ${index + 1}`}
                      className="w-full h-24 sm:h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                ))}
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 lg:p-8 text-center cursor-pointer hover:border-primary-500 transition-colors flex items-center justify-center">
                  <div>
                    <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-gray-600">Add Image</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Description</h2>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="input-field text-sm sm:text-base"
                placeholder="Enter vehicle description..."
              />
            </div>

            {/* Options */}
            <div className="border-b border-gray-200 pb-4 sm:pb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Options</h2>
              <div className="space-y-2 sm:space-y-3">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Available for booking</span>
                </label>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Featured vehicle</span>
                </label>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="popular"
                    checked={formData.popular}
                    onChange={handleInputChange}
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Popular vehicle</span>
                </label>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="studentSpecial"
                    checked={formData.studentSpecial}
                    onChange={handleInputChange}
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Student Special</span>
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="btn-secondary w-full bg-gray-200 text-gray-700 hover:bg-gray-300 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary w-full text-sm sm:text-base"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;

