import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { SettingOutlined } from '@ant-design/icons';

const Settings = () => {
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
            <SettingOutlined className="text-indigo-600 text-3xl" />
            Settings
          </h1>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">Theme</label>
              <select className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-gray-600 font-semibold">Enable Notifications</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-500 transition-all"></div>
                <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">Language</label>
              <select className="w-full p-2 rounded-lg border border-gray-200 bg-gray-50">
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
            <button className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition">Save Settings</button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Settings; 