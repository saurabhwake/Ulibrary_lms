// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import BookList from './pages/BookList';
import Profile from './pages/Profile';
import Header from './components/Header';
import Categories from './pages/Categories';
import Authors from './pages/Authors';
import Settings from './pages/Settings';
import Help from './pages/Help';

const App = () => {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        <Route path="/books" element={<BookList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/categories" element={<Categories/>} />
        <Route path="/authors" element={<Authors/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/help" element={<Help/>} />
      </Routes>
    </div>
  );
};

export default App;