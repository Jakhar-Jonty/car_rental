import { useState } from 'react';
import { Calendar, MapPin, Clock, FileText, User, Settings, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  // Mock booking data
  const currentBookings = [
    {
      id: 1,
      vehicle: 'Honda City',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      pickupDate: '2024-12-15',
      returnDate: '2024-12-20',
      status: 'confirmed',
      totalPrice: 15000,
    },
    {
      id: 2,
      vehicle: 'Royal Enfield Classic 350',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop',
      pickupDate: '2024-12-18',
      returnDate: '2024-12-22',
      status: 'pending',
      totalPrice: 3200,
    },
  ];

  const pastBookings = [
    {
      id: 3,
      vehicle: 'Maruti Swift',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      pickupDate: '2024-11-10',
      returnDate: '2024-11-15',
      status: 'completed',
      totalPrice: 7500,
    },
  ];

  const [profileData, setProfileData] = useState({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    email: 'rahul.sharma@example.com',
    address: 'Sector 15, Hisar, Haryana - 125001',
  });

  const [documents, setDocuments] = useState({
    drivingLicense: { uploaded: true, verified: true },
    idProof: { uploaded: true, verified: false },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">My Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-4 sm:mb-8 shadow-md overflow-x-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 min-w-[120px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 min-w-[120px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 min-w-[120px] py-2 sm:py-3 px-3 sm:px-6 rounded-lg font-medium transition-all text-sm sm:text-base whitespace-nowrap ${
              activeTab === 'documents'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Documents
          </button>
        </div>

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Current/Upcoming Bookings */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Current & Upcoming Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {currentBookings.map((booking) => (
                  <div key={booking.id} className="card p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                      <img
                        src={booking.image}
                        alt={booking.vehicle}
                        className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg mb-2">{booking.vehicle}</h3>
                        <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="break-words">Pickup: {booking.pickupDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="break-words">Return: {booking.returnDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-primary-600 text-sm sm:text-base">₹{booking.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-4 border-t border-gray-200">
                      <span
                        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-xs sm:text-sm w-full sm:w-auto text-center sm:text-left">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Bookings */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Past Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="card p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
                      <img
                        src={booking.image}
                        alt={booking.vehicle}
                        className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg mb-2">{booking.vehicle}</h3>
                        <div className="space-y-1 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="break-words">Pickup: {booking.pickupDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="break-words">Return: {booking.returnDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-primary-600 text-sm sm:text-base">₹{booking.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 pt-4 border-t border-gray-200">
                      <span className="px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-gray-100 text-gray-800">
                        Completed
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-xs sm:text-sm w-full sm:w-auto text-center sm:text-left">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Profile Information</h2>
            <form className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="input-field text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="input-field text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="input-field text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="input-field text-sm sm:text-base"
                  />
                </div>
              </div>
              <button className="btn-primary w-full sm:w-auto">Save Changes</button>
            </form>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="card p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Document Status</h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">Driving License</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Upload your valid driving license</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {documents.drivingLicense.uploaded ? (
                      <>
                        {documents.drivingLicense.verified ? (
                          <span className="flex items-center space-x-1 text-green-600 font-semibold text-xs sm:text-sm">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-yellow-600 font-semibold text-xs sm:text-sm">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="flex items-center space-x-1 text-gray-600 font-semibold text-xs sm:text-sm">
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>
                </div>
                <button className="btn-primary text-xs sm:text-sm py-2 px-4 w-full sm:w-auto">
                  {documents.drivingLicense.uploaded ? 'Update Document' : 'Upload Document'}
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg">ID Proof (Aadhar/PAN)</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Upload your Aadhar card or PAN card</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {documents.idProof.uploaded ? (
                      <>
                        {documents.idProof.verified ? (
                          <span className="flex items-center space-x-1 text-green-600 font-semibold text-xs sm:text-sm">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-yellow-600 font-semibold text-xs sm:text-sm">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="flex items-center space-x-1 text-gray-600 font-semibold text-xs sm:text-sm">
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>
                </div>
                <button className="btn-primary text-xs sm:text-sm py-2 px-4 w-full sm:w-auto">
                  {documents.idProof.uploaded ? 'Update Document' : 'Upload Document'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

