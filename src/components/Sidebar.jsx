import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Home, BookOpen, PlusSquare, Bookmark, LogOut, BookMarked, Settings, X, BookText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SidebarItem = ({ icon: Icon, label, to, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 mt-2 ${
          isActive
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-medium'
            : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'
        }`
      }
    >
      <Icon size={20} className="shrink-0" />
      <span className="text-sm">{label}</span>
    </NavLink>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-50 border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3 text-blue-600">
            <BookText size={28} strokeWidth={2.5} />
            <span className="text-xl font-bold tracking-tight text-slate-900">KnowledgeBase</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-slate-500 hover:text-slate-700 bg-white p-1 rounded-lg shadow-sm border border-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 ml-4">
            Overview
          </div>
          <SidebarItem icon={Home} label="Dashboard" to="/" end />
          <SidebarItem icon={Search} label="Browse Articles" to="/articles" />
          
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-2 ml-4">
            Workspace
          </div>
          <SidebarItem icon={PlusSquare} label="Create Article" to="/create" />
          <SidebarItem icon={BookOpen} label="My Articles" to="/my-articles" />
          <SidebarItem icon={Bookmark} label="Saved Items" to="#" />
        </div>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-3 text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} className="shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
