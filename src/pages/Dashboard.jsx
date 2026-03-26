import React from 'react';
import { useAuth } from '../context/AuthContext';
import { mockArticles } from '../mock/data';
import ArticleCard from '../components/ArticleCard';
import { FileText, Users, Eye, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
          <TrendingUp size={16} className="mr-1" />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const recentArticles = [...mockArticles]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="pb-12 space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Here's what's happening in your workspace today.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard title="Total Articles" value="124" icon={FileText} trend="+12%" />
        <StatCard title="Active Authors" value="32" icon={Users} trend="+4%" />
        <StatCard title="Total Views" value="45.2k" icon={Eye} trend="+18%" />
        <StatCard title="Your Articles" value="8" icon={FileText} trend="+2%" />
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recent Knowledge</h2>
          <a href="/articles" className="text-blue-600 font-medium hover:text-blue-700 hover:underline underline-offset-4">
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
