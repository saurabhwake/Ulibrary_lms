import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  TeamOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const navigate = useNavigate();

  // Sidebar menu items (except Dashboard)
  const menuItems = [
    // Dashboard handled separately
    { path: '/books', icon: <BookOutlined />, label: 'Books' },
    { path: '/categories', icon: <AppstoreOutlined />, label: 'Categories' },
    { path: '/authors', icon: <TeamOutlined />, label: 'Authors' },
    { path: '/profile', icon: <UserOutlined />, label: 'Profile' },
    { path: '/settings', icon: <SettingOutlined />, label: 'Settings' },
    { path: '/help', icon: <QuestionCircleOutlined />, label: 'Help' },
  ];

  // Smart Dashboard navigation
  const handleDashboardClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      navigate('/admin-dashboard');
      setActiveItem('/admin-dashboard');
    } else if (user && user.role === 'user') {
      navigate('/user-dashboard');
      setActiveItem('/user-dashboard');
    }
    // else do nothing (or navigate('/login') if you want)
  };

  // Logout handler with confirmation
  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('user');
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col bg-gradient-to-b from-indigo-900/80 via-purple-900/80 to-pink-900/80 text-white shadow-2xl rounded-r-3xl py-8 px-4 backdrop-blur-xl z-40 border-r border-white/10 pt-20">
      {/* Logo/Avatar */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 flex items-center justify-center shadow-lg mb-2 border-4 border-white/20">
          <span className="text-3xl font-bold text-white select-none">A</span>
        </div>
        <h3 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">Admin Panel</h3>
      </div>

      <hr className="border-white/10 mb-6" />

      {/* Sidebar Menu */}
      <ul className="flex-1 space-y-2">
        {/* Dashboard Button */}
        <li>
          <button
            className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-200 group w-full text-left
              ${['/admin-dashboard','/user-dashboard','/dashboard'].includes(activeItem)
                ? 'bg-white/20 border-l-4 border-blue-400 text-blue-100 shadow-xl scale-[1.03]'
                : 'hover:bg-white/10 hover:text-blue-100 hover:scale-[1.02] hover:shadow-lg'}
            `}
            onClick={handleDashboardClick}
          >
            <span className={`text-xl ${['/admin-dashboard','/user-dashboard','/dashboard'].includes(activeItem) ? 'text-blue-400' : 'text-blue-200'} group-hover:scale-110 transition-transform`}><DashboardOutlined /></span>
            <span className="text-base tracking-wide">Dashboard</span>
          </button>
        </li>
        {/* Other Menu Items */}
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl font-medium transition-all duration-200 group
                ${activeItem === item.path
                  ? 'bg-white/20 border-l-4 border-blue-400 text-blue-100 shadow-xl scale-[1.03]'
                  : 'hover:bg-white/10 hover:text-blue-100 hover:scale-[1.02] hover:shadow-lg'}
              `}
              onClick={() => setActiveItem(item.path)}
            >
              <span className={`text-xl ${activeItem === item.path ? 'text-blue-400' : 'text-blue-200'} group-hover:scale-110 transition-transform`}>{item.icon}</span>
              <span className="text-base tracking-wide">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <hr className="border-white/10 my-6" />

      {/* Sidebar Footer */}
      <div className="mb-2">
        <button
          className="flex items-center w-full gap-3 px-5 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-lg hover:from-red-600 hover:to-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400/50"
          onClick={handleLogout}
        >
          <LogoutOutlined className="text-xl" />
          <span className="text-base tracking-wide">Logout</span>
        </button>
      </div>
      <div className="text-xs text-white/40 text-center mt-auto pb-2 select-none">© 2025 LMS Admin</div>
    </aside>
  );
};

export default Sidebar; 