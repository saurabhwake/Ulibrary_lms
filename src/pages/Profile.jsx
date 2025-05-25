import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { UserOutlined } from '@ant-design/icons';

const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  role: 'Reader',
  language: 'English',
  gender: 'Male',
};

const Profile = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto pt-20">
        <Header />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 drop-shadow flex items-center gap-3">
            <UserOutlined className="text-indigo-600 text-3xl" />
            Profile
          </h1>
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <img src={user.avatar} alt={user.name} className="w-28 h-28 rounded-full mb-4 border-4 border-indigo-100 shadow" />
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-500 mb-2">{user.email}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Role</label>
                <input type="text" value={user.role} readOnly className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Language</label>
                <input type="text" value={user.language} readOnly className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50" />
              </div>
              <div>
                <label className="block text-gray-600 font-semibold mb-1">Gender</label>
                <input type="text" value={user.gender} readOnly className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50" />
              </div>
            </div>
            <button className="mt-8 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition">Edit Profile</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;