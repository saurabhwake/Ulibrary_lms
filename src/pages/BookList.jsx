import Header from '../components/Header';
import BookCard from '../components/BookCard';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const BookList = () => {
  const books = [
    {
      id: 1,
      title: 'Introduction to React',
      author: 'John Doe',
      description: 'Learn the basics of React and build modern web applications.',
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', // React/JS code on screen
    },
    {
      id: 2,
      title: 'Advanced JavaScript',
      author: 'Jane Smith',
      description: 'Master advanced JavaScript concepts and techniques.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80', // JavaScript code
    },
    {
      id: 3,
      title: 'Python Programming',
      author: 'Alice Johnson',
      description: 'A comprehensive guide to Python programming for beginners.',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80', // Python code
    },
    {
      id: 4,
      title: 'Data Structures and Algorithms',
      author: 'Bob Brown',
      description: 'Understand the fundamentals of data structures and algorithms.',
      image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80', // Abstract/algorithm
    },
  ];

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
          <h1 className="text-4xl font-bold text-gray-900 mb-8 drop-shadow">Book List</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map(book => (
              <div key={book.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
                <img src={book.image} alt={book.title} className="w-full h-48 object-cover rounded-t-2xl" />
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-indigo-700 mb-2">{book.title}</h2>
                  <p className="text-gray-600 mb-2">by {book.author}</p>
                  <p className="text-gray-500 flex-1 mb-4">{book.description}</p>
                  <button className="mt-auto px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:scale-105 transition">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default BookList;