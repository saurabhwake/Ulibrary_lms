import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { BookOpen, Users, Star, Award, PlusCircle, Search, User as UserIcon, Book, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [borrowingRequests, setBorrowingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', available: true });
  const [editedUser, setEditedUser] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://library-lms.onrender.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch books and borrowing requests
  useEffect(() => {
    const mockBooks = [
      { id: 1, title: 'Introduction to React', author: 'John Doe', available: true },
      { id: 2, title: 'Advanced JavaScript', author: 'Jane Smith', available: false },
      { id: 3, title: 'Python Programming', author: 'Alice Johnson', available: true },
    ];
    setBooks(mockBooks);

    // Fetch borrowing requests from localStorage
    const requests = JSON.parse(localStorage.getItem('borrowingRequests')) || [];
    setBorrowingRequests(requests);
  }, []);

  // Filter books based on search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle user deletion (block)
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`https://library-lms.onrender.com/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Open view modal
  const openViewModal = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  // Open edit profile modal
  const openEditProfileModal = (user) => {
    setEditedUser(user);
    setShowEditProfileModal(true);
  };

  // Handle profile photo upload
  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  // Handle updating user profile
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editedUser.name);
      formData.append('email', editedUser.email);
      formData.append('age', editedUser.age);
      formData.append('language', editedUser.language);
      formData.append('gender', editedUser.gender);
      if (profilePhoto) {
        formData.append('profilePhoto', profilePhoto);
      }

      const response = await fetch(`https://library-lms.onrender.com/users/${editedUser._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
      setShowEditProfileModal(false);
      setProfilePhoto(null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle adding a new book
  const handleAddBook = async () => {
    try {
      const response = await fetch('https://library-lms.onrender.com/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      const data = await response.json();
      setBooks([...books, data]);
      setShowAddBookModal(false);
      setNewBook({ title: '', author: '', available: true });
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Handle approving a borrowing request
  const handleApproveRequest = (requestId) => {
    const updatedRequests = borrowingRequests.map((request) =>
      request.id === requestId ? { ...request, status: 'Approved' } : request
    );
    setBorrowingRequests(updatedRequests);
    localStorage.setItem('borrowingRequests', JSON.stringify(updatedRequests));

    // Update book availability
    const request = borrowingRequests.find((req) => req.id === requestId);
    const updatedBooks = books.map((book) =>
      book.id === request.bookId ? { ...book, available: false } : book
    );
    setBooks(updatedBooks);
  };

  // Handle rejecting a borrowing request
  const handleRejectRequest = (requestId) => {
    const updatedRequests = borrowingRequests.filter((request) => request.id !== requestId);
    setBorrowingRequests(updatedRequests);
    localStorage.setItem('borrowingRequests', JSON.stringify(updatedRequests));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      <div className="relative flex min-h-screen z-10">
        {/* Sidebar */}
        <div className="w-64 bg-white/90 border-r border-gray-200 min-h-screen shadow-xl">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto">
          <Header />
          {/* Hero Section */}
          <section className="relative mb-12 mt-8">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 bg-clip-text text-transparent drop-shadow-lg">Admin Dashboard</h1>
              <p className="text-lg md:text-xl text-blue-900/80 max-w-2xl mx-auto mb-6">Manage users, books, and requests with a beautiful, modern interface.</p>
            </div>
          </section>

          {/* Statistics Overview */}
          <section className="max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl shadow-xl p-8 flex flex-col items-center group hover:scale-105 transition-transform duration-300">
                <BookOpen className="w-10 h-10 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Books</h3>
                <p className="text-4xl font-extrabold text-indigo-700">{books.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-xl p-8 flex flex-col items-center group hover:scale-105 transition-transform duration-300">
                <Users className="w-10 h-10 text-pink-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Total Users</h3>
                <p className="text-4xl font-extrabold text-pink-700">{users.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl shadow-xl p-8 flex flex-col items-center group hover:scale-105 transition-transform duration-300">
                <Book className="w-10 h-10 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Borrowed Books</h3>
                <p className="text-4xl font-extrabold text-green-700">{books.filter((book) => !book.available).length}</p>
              </div>
            </div>
          </section>

          {/* Book Management */}
          <section className="max-w-7xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Book Management</h2>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors shadow-sm"
                  />
                </div>
                <button
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition"
                  onClick={() => setShowAddBookModal(true)}
                >
                  <PlusCircle className="w-5 h-5" /> Add Book
                </button>
              </div>
            </div>
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-100 to-blue-100">
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold">Author</th>
                    <th className="p-4 font-semibold">Availability</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.id} className="border-b last:border-b-0 hover:bg-indigo-50/40 transition">
                      <td className="p-4">{book.title}</td>
                      <td className="p-4">{book.author}</td>
                      <td className="p-4">
                        <span className={book.available ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                          {book.available ? "Available" : "Borrowed"}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Edit</button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* User Management */}
          <section className="max-w-7xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-100 to-blue-100">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Borrowed Books</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b last:border-b-0 hover:bg-pink-50/40 transition">
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.borrowedBooks || 0}</td>
                      <td className="p-4 flex gap-2">
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          onClick={() => openViewModal(user)}
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          onClick={() => openEditProfileModal(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Borrowing Requests */}
          <section className="max-w-7xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Borrowing Requests</h2>
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-100 to-blue-100">
                    <th className="p-4 font-semibold">User</th>
                    <th className="p-4 font-semibold">Book</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowingRequests.map((request) => (
                    <tr key={request.id} className="border-b last:border-b-0 hover:bg-green-50/40 transition">
                      <td className="p-4">{request.userName}</td>
                      <td className="p-4">{request.bookTitle}</td>
                      <td className="p-4">{request.status}</td>
                      <td className="p-4 flex gap-2">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          <CheckCircle className="inline w-4 h-4 mr-1" /> Approve
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <XCircle className="inline w-4 h-4 mr-1" /> Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* View User Modal */}
          {showViewModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
                <h2 className="text-xl font-bold mb-4 text-indigo-700 flex items-center gap-2"><UserIcon className="w-6 h-6" /> User Details</h2>
                <p className="mb-2"><strong>Name:</strong> {selectedUser.name}</p>
                <p className="mb-2"><strong>Email:</strong> {selectedUser.email}</p>
                <p className="mb-2"><strong>Role:</strong> {selectedUser.role}</p>
                <p className="mb-4"><strong>Borrowed Books:</strong> {selectedUser.borrowedBooks || 0}</p>
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Add New Book Modal */}
          {showAddBookModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
                <h2 className="text-xl font-bold mb-4 text-orange-700 flex items-center gap-2"><PlusCircle className="w-6 h-6" /> Add New Book</h2>
                <input
                  type="text"
                  placeholder="Title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
                />
                <label className="block mb-3">
                  <input
                    type="checkbox"
                    checked={newBook.available}
                    onChange={(e) => setNewBook({ ...newBook, available: e.target.checked })}
                    className="mr-2"
                  />
                  Available
                </label>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={handleAddBook}
                  >
                    Add Book
                  </button>
                  <button
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    onClick={() => setShowAddBookModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Profile Modal */}
          {showEditProfileModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
                <h2 className="text-xl font-bold mb-4 text-green-700 flex items-center gap-2"><UserIcon className="w-6 h-6" /> Edit Profile</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={editedUser.name || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editedUser.email || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={editedUser.age || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, age: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Language"
                  value={editedUser.language || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, language: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={editedUser.gender || ''}
                  onChange={(e) => setEditedUser({ ...editedUser, gender: e.target.value })}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="file"
                  onChange={handleProfilePhotoUpload}
                  className="w-full p-3 mb-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
                <div className="flex justify-end gap-2">
                  <button
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={handleUpdateProfile}
                  >
                    Save
                  </button>
                  <button
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
    </div>
  );
};

export default AdminDashboard;