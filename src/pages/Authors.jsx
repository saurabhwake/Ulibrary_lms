import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { TeamOutlined } from '@ant-design/icons';

const authors = [
  { name: 'Jane Austen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', books: 6, bio: 'Renowned for her novels on British landed gentry.' },
  { name: 'Mark Twain', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', books: 12, bio: 'Famous for his wit and classic American literature.' },
  { name: 'J.K. Rowling', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', books: 7, bio: 'Author of the Harry Potter series.' },
  { name: 'George Orwell', avatar: 'https://randomuser.me/api/portraits/men/41.jpg', books: 9, bio: 'Known for dystopian novels and social commentary.' },
  { name: 'Agatha Christie', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', books: 66, bio: 'The Queen of Mystery and detective fiction.' },
  { name: 'Stephen King', avatar: 'https://randomuser.me/api/portraits/men/55.jpg', books: 63, bio: 'Master of horror, supernatural fiction, and suspense.' },
];

const Authors = () => {
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
            <TeamOutlined className="text-indigo-600 text-3xl" />
            Authors
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl">Meet some of the most influential authors in our library. Explore their works and discover new favorites!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {authors.map((author, idx) => (
              <div key={idx} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col items-center p-8">
                <img src={author.avatar} alt={author.name} className="w-24 h-24 rounded-full mb-4 border-4 border-indigo-100 shadow" />
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{author.name}</h3>
                <p className="text-gray-500 mb-2">{author.bio}</p>
                <div className="text-indigo-600 font-semibold">{author.books} books</div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Authors; 