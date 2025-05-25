import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { FaEdit } from 'react-icons/fa'; // Import icons

const UserDashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    name: '',
    email: '',
    profilePhoto: 'https://randomuser.me/api/portraits/men/75.jpg',
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [borrowRequest, setBorrowRequest] = useState({
    bookTitle: '',
    author: '',
    borrowDate: '',
    returnDate: '',
    period: '',
  });
  const [borrowingRequests, setBorrowingRequests] = useState([]); // State for storing borrowing requests

  // Fetch logged-in user data from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedInUser({
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePicture || 'https://randomuser.me/api/portraits/men/75.jpg',
      });
    } else {
      alert('You are not logged in. Redirecting to login page...');
      window.location.href = '/login';
    }
  }, []);

  // Mock data for books
  useEffect(() => {
    const mockBooks = [
      { id: 1, title: 'Introduction to React', author: 'John Doe', available: true },
      { id: 2, title: 'Advanced JavaScript', author: 'Jane Smith', available: false },
      { id: 3, title: 'Python Programming', author: 'Alice Johnson', available: true },
    ];
    setBooks(mockBooks);
    setLoading(false);
  }, []);

  // Fetch borrowing requests from localStorage
  useEffect(() => {
    const requests = JSON.parse(localStorage.getItem('borrowingRequests')) || [];
    setBorrowingRequests(requests);
  }, []);

  // Handle profile photo upload
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLoggedInUser({ ...loggedInUser, profilePhoto: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle updating user profile
  const handleUpdateProfile = async () => {
    try {
      const updatedUser = { ...loggedInUser, ...editedUser };
      setLoggedInUser(updatedUser);
      setShowEditProfileModal(false);
      setProfilePhoto(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle borrowing request form submission
  const handleBorrowRequestSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: Date.now(), // Unique ID for the request
      userName: loggedInUser.name, // Logged-in user's name
      bookTitle: borrowRequest.bookTitle, // Book title from the form
      status: 'Pending', // Default status
      borrowDate: borrowRequest.borrowDate,
      returnDate: borrowRequest.returnDate,
      period: borrowRequest.period,
    };

    // Save the request to localStorage (or send it to the backend)
    const requests = JSON.parse(localStorage.getItem('borrowingRequests')) || [];
    requests.push(newRequest);
    localStorage.setItem('borrowingRequests', JSON.stringify(requests));

    // Update the state to reflect the new request
    setBorrowingRequests(requests);

    // Reset the form and close the modal
    setShowBorrowForm(false);
    setBorrowRequest({
      bookTitle: '',
      author: '',
      borrowDate: '',
      returnDate: '',
      period: '',
    });

    alert('Borrowing request submitted successfully!');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
        <Header />
        <h1 className="text-3xl font-bold mb-8 text-gray-900 drop-shadow">User Dashboard</h1>

        {/* User Profile Section */}
        <div className="mb-10 bg-white/90 p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-indigo-700">My Profile</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={loggedInUser.profilePhoto}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg object-cover"
            />
            <div className="flex-1 space-y-2">
              <p><span className="font-semibold text-gray-700">Name:</span> {loggedInUser.name}</p>
              <p><span className="font-semibold text-gray-700">Email:</span> {loggedInUser.email}</p>
            </div>
            <button
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition mt-4 md:mt-0"
              onClick={() => setShowEditProfileModal(true)}
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>

        {/* Borrowing Requests Section */}
        <div className="mb-10 bg-white/90 p-8 rounded-2xl shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
            <h2 className="text-2xl font-bold text-green-700">Borrowing Requests</h2>
            <button
              className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
              onClick={() => setShowBorrowForm(true)}
            >
              Make Request
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl shadow bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 to-indigo-100">
                  <th className="p-4 font-semibold">Book Title</th>
                  <th className="p-4 font-semibold">Borrow Date</th>
                  <th className="p-4 font-semibold">Return Date</th>
                  <th className="p-4 font-semibold">Period</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {borrowingRequests.map((request) => (
                  <tr key={request.id} className="border-b last:border-b-0 hover:bg-indigo-50/40 transition">
                    <td className="p-4">{request.bookTitle}</td>
                    <td className="p-4">{request.borrowDate}</td>
                    <td className="p-4">{request.returnDate}</td>
                    <td className="p-4">{request.period}</td>
                    <td className={`p-4 font-semibold ${request.status === 'Approved' ? 'text-green-600' : request.status === 'Rejected' ? 'text-red-500' : 'text-orange-500'}`}>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Borrow Request Form Modal */}
        {showBorrowForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
              <h2 className="text-xl font-bold mb-4 text-green-700">Make Borrowing Request</h2>
              <form onSubmit={handleBorrowRequestSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Book Title"
                  value={borrowRequest.bookTitle}
                  onChange={(e) => setBorrowRequest({ ...borrowRequest, bookTitle: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={borrowRequest.author}
                  onChange={(e) => setBorrowRequest({ ...borrowRequest, author: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="date"
                  placeholder="Borrow Date"
                  value={borrowRequest.borrowDate}
                  onChange={(e) => setBorrowRequest({ ...borrowRequest, borrowDate: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="date"
                  placeholder="Return Date"
                  value={borrowRequest.returnDate}
                  onChange={(e) => setBorrowRequest({ ...borrowRequest, returnDate: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Period (e.g., 2 weeks)"
                  value={borrowRequest.period}
                  onChange={(e) => setBorrowRequest({ ...borrowRequest, period: e.target.value })}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:scale-105 shadow transition"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:scale-105 shadow transition"
                    onClick={() => setShowBorrowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Profile Modal */}
        {showEditProfileModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Profile</h2>
              <input
                type="text"
                placeholder="Name"
                value={editedUser.name || loggedInUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={editedUser.email || loggedInUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="file"
                onChange={handleProfilePhotoUpload}
                className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:scale-105 shadow transition"
                  onClick={handleUpdateProfile}
                >
                  Save
                </button>
                <button
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg hover:scale-105 shadow transition"
                  onClick={() => setShowEditProfileModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;