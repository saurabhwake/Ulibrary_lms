import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { AppstoreOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const fallbackCategories = [
  { name: 'Fiction', icon: '📚', count: '1,250+ books', color: 'from-purple-500 to-pink-500' },
  { name: 'Science', icon: '🔬', count: '890+ books', color: 'from-blue-500 to-cyan-500' },
  { name: 'History', icon: '🏛️', count: '670+ books', color: 'from-amber-500 to-orange-500' },
  { name: 'Technology', icon: '💻', count: '920+ books', color: 'from-green-500 to-teal-500' },
  { name: 'Biography', icon: '👤', count: '540+ books', color: 'from-red-500 to-pink-500' },
  { name: 'Education', icon: '🎓', count: '1,100+ books', color: 'from-indigo-500 to-purple-500' },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend not available, so use fallback categories directly
    setTimeout(() => {
      setCategories(fallbackCategories);
      setLoading(false);
    }, 1000); // simulate loading delay
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto pt-20">
        <Header />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 drop-shadow flex items-center gap-3">
            <AppstoreOutlined className="text-indigo-600 text-3xl" />
            Categories
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl">
            Browse through our extensive collection of book categories. Find your favorite genres and discover new topics to explore!
          </p>

          {loading ? (
            <div className="text-center py-12 text-lg text-indigo-600 font-semibold">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {categories.map((category, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="p-8 relative">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{category.count}</p>
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                      Browse Collection
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Categories;
