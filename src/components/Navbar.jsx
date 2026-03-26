import React from 'react';
import { Menu, Bell, Search as SearchIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 bg-white border-b border-slate-200 sm:px-6 md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-slate-500 hover:text-slate-700 bg-slate-100 p-2 rounded-lg"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center relative group">
          <SearchIcon className="absolute left-3 text-slate-400 group-focus-within:text-blue-500" size={18} />
          <input
            type="text"
            placeholder="Search articles... (Press /)"
            onClick={() => navigate('/articles')}
            className="w-64 lg:w-96 pl-10 pr-4 py-2 text-sm bg-slate-100 border-none rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 xl:gap-6">
        <button className="relative text-slate-500 hover:text-slate-700 transition-colors p-2 bg-slate-50 hover:bg-slate-100 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="hidden md:block text-right">
            <p className="text-sm font-semibold text-slate-900 leading-none">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 mt-1">{user?.email || 'user@example.com'}</p>
          </div>
          <img
            src={user?.avatar || `https://ui-avatars.com/api/?name=User&background=6366f1&color=fff`}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-slate-200 object-cover shadow-sm bg-slate-100"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
