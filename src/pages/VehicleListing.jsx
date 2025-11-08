import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Star, SlidersHorizontal, X } from 'lucide-react';
import { vehicles } from '../data/vehicles';

const VehicleListing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [sortBy, setSortBy] = useState('popular');

  // Filters
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || 'All',
    fuelType: 'All',
    transmission: 'All',
    seating: 'All',
    minPrice: 0,
    maxPrice: 10000,
    search: '',
  });

  useEffect(() => {
    let filtered = [...vehicles];

    // Apply filters
    if (filters.type !== 'All') {
      filtered = filtered.filter(v => v.type === filters.type);
    }
    if (filters.fuelType !== 'All') {
      filtered = filtered.filter(v => v.fuelType === filters.fuelType);
    }
    if (filters.transmission !== 'All') {
      filtered = filtered.filter(v => v.transmission === filters.transmission);
    }
    if (filters.seating !== 'All') {
      filtered = filtered.filter(v => v.seating === parseInt(filters.seating));
    }
    if (filters.search) {
      filtered = filtered.filter(v =>
        v.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        v.model.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    filtered = filtered.filter(v => v.pricePerDay >= filters.minPrice && v.pricePerDay <= filters.maxPrice);

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredVehicles(filtered);
  }, [filters, sortBy]);

  const clearFilters = () => {
    setFilters({
      type: 'All',
      fuelType: 'All',
      transmission: 'All',
      seating: 'All',
      minPrice: 0,
      maxPrice: 10000,
      search: '',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(
    (v, i) => i !== 5 && i !== 6 && v !== 'All' && v !== 0 && v !== 10000
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Available Vehicles</h1>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search vehicles..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input-field max-w-xs"
            />
            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn-primary flex items-center space-x-2 relative"
            >
              <Filter className="w-5 h-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block w-full md:w-64 bg-white rounded-xl shadow-md p-6 h-fit sticky top-24`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </h2>
              <button
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Vehicle Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="input-field"
              >
                <option value="All">All Types</option>
                <option value="Bike">Bike</option>
                <option value="Scooter">Scooter</option>
                <option value="Car">Car</option>
                <option value="SUV">SUV</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{filters.minPrice} - ₹{filters.maxPrice}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: parseInt(e.target.value) })}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Fuel Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select
                value={filters.fuelType}
                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                className="input-field"
              >
                <option value="All">All</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                value={filters.transmission}
                onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                className="input-field"
              >
                <option value="All">All</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            {/* Seating Capacity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Seating Capacity</label>
              <select
                value={filters.seating}
                onChange={(e) => setFilters({ ...filters, seating: e.target.value })}
                className="input-field"
              >
                <option value="All">All</option>
                <option value="2">2 Seater</option>
                <option value="5">5 Seater</option>
                <option value="7">7 Seater</option>
              </select>
            </div>
          </aside>

          {/* Vehicle Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredVehicles.length}</span> vehicles
              </p>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field w-auto"
                >
                  <option value="popular">Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Vehicle Cards */}
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-xl text-gray-600">No vehicles found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.map((vehicle) => (
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
                      <p className="text-sm text-gray-600 mb-2">{vehicle.model}</p>
                      <div className="flex items-center space-x-1 mb-3">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">{vehicle.rating} ({vehicle.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                        <span>{vehicle.fuelType}</span>
                        <span>•</span>
                        <span>{vehicle.seating} Seater</span>
                        <span>•</span>
                        <span>{vehicle.transmission}</span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;

