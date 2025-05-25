import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('user'));

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('user');
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Library LMS
        </h1>
        <nav className="flex gap-4">
          <a href="/" className="text-white hover:text-orange-400 font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10">Home</a>
          {!isLoggedIn ? (
            <>
              <a href="/login" className="text-white hover:text-orange-400 font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10">Login</a>
              <a href="/register" className="text-white hover:text-orange-400 font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10">Register</a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:text-orange-400 font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10 focus:outline-none"
            >
              Logout
            </button>
          )}
          <a href="/profile" className="text-white hover:text-orange-400 font-medium transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10">Profile</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;