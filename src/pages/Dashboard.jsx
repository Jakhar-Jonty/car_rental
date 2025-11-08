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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-md">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              activeTab === 'bookings'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
              activeTab === 'profile'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
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
          <div className="space-y-6">
            {/* Current/Upcoming Bookings */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Current & Upcoming Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentBookings.map((booking) => (
                  <div key={booking.id} className="card p-6">
                    <div className="flex space-x-4 mb-4">
                      <img
                        src={booking.image}
                        alt={booking.vehicle}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{booking.vehicle}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Pickup: {booking.pickupDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Return: {booking.returnDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-primary-600">₹{booking.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Bookings */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Past Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pastBookings.map((booking) => (
                  <div key={booking.id} className="card p-6">
                    <div className="flex space-x-4 mb-4">
                      <img
                        src={booking.image}
                        alt={booking.vehicle}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{booking.vehicle}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Pickup: {booking.pickupDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Return: {booking.returnDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-primary-600">₹{booking.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                        Completed
                      </span>
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
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
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <button className="btn-primary">Save Changes</button>
            </form>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="card p-6">
            <h2 className="text-2xl font-bold mb-6">Document Status</h2>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-primary-600" />
                    <div>
                      <h3 className="font-semibold text-lg">Driving License</h3>
                      <p className="text-sm text-gray-600">Upload your valid driving license</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {documents.drivingLicense.uploaded ? (
                      <>
                        {documents.drivingLicense.verified ? (
                          <span className="flex items-center space-x-1 text-green-600 font-semibold">
                            <CheckCircle className="w-5 h-5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-yellow-600 font-semibold">
                            <Clock className="w-5 h-5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="flex items-center space-x-1 text-gray-600 font-semibold">
                        <XCircle className="w-5 h-5" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>
                </div>
                <button className="btn-primary text-sm py-2 px-4">
                  {documents.drivingLicense.uploaded ? 'Update Document' : 'Upload Document'}
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-primary-600" />
                    <div>
                      <h3 className="font-semibold text-lg">ID Proof (Aadhar/PAN)</h3>
                      <p className="text-sm text-gray-600">Upload your Aadhar card or PAN card</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {documents.idProof.uploaded ? (
                      <>
                        {documents.idProof.verified ? (
                          <span className="flex items-center space-x-1 text-green-600 font-semibold">
                            <CheckCircle className="w-5 h-5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-yellow-600 font-semibold">
                            <Clock className="w-5 h-5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="flex items-center space-x-1 text-gray-600 font-semibold">
                        <XCircle className="w-5 h-5" />
                        <span>Not Uploaded</span>
                      </span>
                    )}
                  </div>
                </div>
                <button className="btn-primary text-sm py-2 px-4">
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

