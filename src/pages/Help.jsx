import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { QuestionCircleOutlined } from '@ant-design/icons';

const faqs = [
  { q: 'How do I borrow a book?', a: 'Navigate to the Books section, select a book, and click on "Borrow".' },
  { q: 'How do I return a book?', a: 'Go to your Profile, find the borrowed book, and click on "Return".' },
  { q: 'How can I contact support?', a: 'Use the contact form below or email us at support@lms.com.' },
  { q: 'How do I change my password?', a: 'Go to Settings and select "Change Password".' },
];

const Help = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="w-64">
        <Sidebar />
      </div>
      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-8 py-8 overflow-y-auto pt-20">
        <Header />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 drop-shadow flex items-center gap-3">
            <QuestionCircleOutlined className="text-indigo-600 text-3xl" />
            Help & Support
          </h1>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx}>
                  <div className="font-semibold text-gray-800 mb-1">Q: {faq.q}</div>
                  <div className="text-gray-600 ml-4">A: {faq.a}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-2xl font-semibold mb-2">Contact Support</h2>
            <p className="mb-4">If you need further assistance, please fill out the form below or email us at <a href="mailto:support@lms.com" className="underline font-semibold">support@lms.com</a>.</p>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70" />
              <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70" />
              <textarea placeholder="How can we help you?" className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70" rows={4}></textarea>
              <button type="submit" className="px-6 py-2 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 transition">Send Message</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Help; 