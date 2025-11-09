import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, Car, Calendar, DollarSign, TrendingUp, 
  TrendingDown, CheckCircle, XCircle, Clock, Plus, Edit, Trash2,
  Search, Filter, Download
} from 'lucide-react';
import { vehicles } from '../data/vehicles';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalBookings: 156,
    activeBookings: 23,
    totalRevenue: 245000,
    revenueChange: 12.5,
    totalVehicles: vehicles.length,
    availableVehicles: vehicles.filter(v => v.available).length,
  };

  const recentBookings = [
    {
      id: 1,
      customer: 'Rahul Sharma',
      vehicle: 'Honda City',
      pickupDate: '2024-12-15',
      returnDate: '2024-12-20',
      amount: 15000,
      status: 'confirmed',
      phone: '+91 98765 43210',
    },
    {
      id: 2,
      customer: 'Priya Verma',
      vehicle: 'Royal Enfield Classic 350',
      pickupDate: '2024-12-18',
      returnDate: '2024-12-22',
      amount: 3200,
      status: 'pending',
      phone: '+91 98765 43211',
    },
    {
      id: 3,
      customer: 'Amit Kumar',
      vehicle: 'Maruti Swift',
      pickupDate: '2024-12-10',
      returnDate: '2024-12-15',
      amount: 7500,
      status: 'completed',
      phone: '+91 98765 43212',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your rental business</p>
          </div>
          <button
            onClick={() => navigate('/admin/add-vehicle')}
            className="btn-primary flex items-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Vehicle</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-8">
          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">Total Bookings</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.totalBookings}</h3>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">+12% from last month</span>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">Active Bookings</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{stats.activeBookings}</h3>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">Currently active</span>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">Total Revenue</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">₹{stats.totalRevenue.toLocaleString()}</h3>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="truncate">+{stats.revenueChange}% from last month</span>
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <span className="text-xs sm:text-sm text-gray-600">Fleet Status</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              {stats.availableVehicles}/{stats.totalVehicles}
            </h3>
            <div className="flex items-center space-x-1 text-xs sm:text-sm text-gray-600">
              <span className="truncate">Available vehicles</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-4 sm:mb-6 shadow-md overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-base ${
              activeTab === 'overview'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-base ${
              activeTab === 'bookings'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-base ${
              activeTab === 'vehicles'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vehicles
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-base ${
              activeTab === 'customers'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-base ${
              activeTab === 'analytics'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all whitespace-nowrap text-xs sm:text-base ${
              activeTab === 'settings'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Recent Bookings */}
            <div className="card p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
                <h2 className="text-xl sm:text-2xl font-bold">Recent Bookings</h2>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-xs sm:text-sm flex items-center space-x-1">
                  <span>View All</span>
                </button>
              </div>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Vehicle</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Dates</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">#{booking.id}</td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{booking.customer}</td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{booking.vehicle}</td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 hidden md:table-cell">
                              {booking.pickupDate} - {booking.returnDate}
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <span
                                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                                  booking.status === 'confirmed'
                                    ? 'bg-green-100 text-green-800'
                                    : booking.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-3 sm:px-4 py-3 sm:py-4">
                              <div className="flex items-center space-x-2">
                                <button className="text-primary-600 hover:text-primary-700" title="Edit">
                                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <button className="text-gray-600 hover:text-gray-700" title="Download">
                                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl font-bold">All Bookings</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="input-field pl-9 sm:pl-10 pr-4 text-sm sm:text-base w-full sm:w-auto"
                  />
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <button className="btn-primary flex items-center justify-center space-x-2 text-sm sm:text-base flex-1 sm:flex-none">
                    <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Filter</span>
                  </button>
                  <button className="btn-secondary flex items-center justify-center space-x-2 text-sm sm:text-base flex-1 sm:flex-none">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Vehicle</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Pickup</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Return</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">#{booking.id}</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{booking.customer}</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">{booking.vehicle}</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 hidden md:table-cell">{booking.pickupDate}</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 hidden lg:table-cell">{booking.returnDate}</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <span
                              className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4">
                            <div className="flex items-center space-x-2">
                              <button className="text-primary-600 hover:text-primary-700" title="Edit">
                                <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-700" title="Delete">
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl font-bold">Vehicle Management</h2>
              <button
                onClick={() => navigate('/admin/add-vehicle')}
                className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add New Vehicle</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4"
                  />
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{vehicle.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs sm:text-sm text-gray-600">{vehicle.type}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        vehicle.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {vehicle.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-bold text-primary-600">₹{vehicle.pricePerDay}/day</span>
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-700" title="Edit">
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700" title="Delete">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === 'customers' && (
          <div className="card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
              <h2 className="text-xl sm:text-2xl font-bold">Customers</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="input-field pl-9 sm:pl-10 pr-4 text-sm sm:text-base w-full sm:w-auto"
                />
              </div>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Phone</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Email</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Spent</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr className="hover:bg-gray-50">
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Rahul Sharma</td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 hidden sm:table-cell">+91 98765 43210</td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 hidden md:table-cell">rahul@example.com</td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">5</td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900 hidden lg:table-cell">₹45,000</td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4">
                          <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 py-3 sm:py-4">
                          <button className="text-primary-600 hover:text-primary-700 font-medium text-xs sm:text-sm">
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Revenue Chart Placeholder */}
            <div className="card p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Revenue Analytics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Today's Revenue</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">₹12,500</p>
                  <p className="text-xs sm:text-sm text-green-600 mt-1">+8.5% from yesterday</p>
                </div>
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">This Week</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">₹87,500</p>
                  <p className="text-xs sm:text-sm text-green-600 mt-1">+15.2% from last week</p>
                </div>
                <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">₹2,45,000</p>
                  <p className="text-xs sm:text-sm text-green-600 mt-1">+12.5% from last month</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 sm:p-12 text-center">
                <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-gray-600">Revenue Chart Visualization</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">Chart would show daily/weekly/monthly revenue trends</p>
              </div>
            </div>

            {/* Booking Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="card p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Booking Statistics</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Confirmed</span>
                    <span className="font-semibold text-xs sm:text-sm text-green-600">120 (77%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '77%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Pending</span>
                    <span className="font-semibold text-xs sm:text-sm text-yellow-600">23 (15%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Completed</span>
                    <span className="font-semibold text-xs sm:text-sm text-gray-600">13 (8%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                </div>
              </div>

              <div className="card p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Vehicle Utilization</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Bikes</span>
                    <span className="font-semibold text-xs sm:text-sm">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Scooters</span>
                    <span className="font-semibold text-xs sm:text-sm">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Cars</span>
                    <span className="font-semibold text-xs sm:text-sm">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">SUVs</span>
                    <span className="font-semibold text-xs sm:text-sm">65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Vehicles */}
            <div className="card p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-4">Top Performing Vehicles</h3>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Bookings</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Revenue</th>
                          <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Honda City</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">45</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">₹6,75,000</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">4.9 ⭐</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Royal Enfield Classic 350</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">38</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">₹3,04,000</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">4.8 ⭐</td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">Hyundai Creta</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">32</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-900 hidden sm:table-cell">₹8,96,000</td>
                          <td className="px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">4.8 ⭐</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="card p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">General Settings</h2>
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue="CarRental Hisar"
                    className="input-field text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="info@carrentalhisar.com"
                    className="input-field text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="input-field text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Address
                  </label>
                  <textarea
                    rows="3"
                    defaultValue="Sector 15, Hisar, Haryana - 125001"
                    className="input-field text-sm sm:text-base"
                  />
                </div>
                <button className="btn-primary w-full sm:w-auto text-sm sm:text-base">Save Settings</button>
              </div>
            </div>

            <div className="card p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Booking Settings</h2>
              <div className="space-y-3 sm:space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Require document verification before booking</span>
                </label>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Allow advance booking (30 days)</span>
                </label>
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 sm:w-5 sm:h-5 mt-1 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Enable automatic booking confirmation</span>
                </label>
                <div className="pt-3 sm:pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Booking Duration (hours)
                  </label>
                  <input
                    type="number"
                    defaultValue="4"
                    min="1"
                    className="input-field max-w-full sm:max-w-xs text-sm sm:text-base"
                  />
                </div>
                <button className="btn-primary w-full sm:w-auto text-sm sm:text-base">Save Booking Settings</button>
              </div>
            </div>

            <div className="card p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Pricing Settings</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="18"
                    min="0"
                    max="100"
                    className="input-field max-w-full sm:max-w-xs text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    defaultValue="5000"
                    min="0"
                    className="input-field max-w-full sm:max-w-xs text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Late Return Fee per Hour (₹)
                  </label>
                  <input
                    type="number"
                    defaultValue="200"
                    min="0"
                    className="input-field max-w-full sm:max-w-xs text-sm sm:text-base"
                  />
                </div>
                <button className="btn-primary w-full sm:w-auto text-sm sm:text-base">Save Pricing Settings</button>
              </div>
            </div>

            <div className="card p-4 sm:p-6 border-red-200 bg-red-50">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-red-900">Danger Zone</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-red-900 mb-2">Delete All Data</h3>
                  <p className="text-xs sm:text-sm text-red-700 mb-3">
                    This will permanently delete all bookings, vehicles, and customer data. This action cannot be undone.
                  </p>
                  <button className="btn-secondary bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto text-sm sm:text-base">
                    Delete All Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

