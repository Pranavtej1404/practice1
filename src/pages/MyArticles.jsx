import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockArticles } from '../mock/data';
import ArticleCard from '../components/ArticleCard';
import { PlusSquare, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyArticles = () => {
  const { user } = useAuth();
  
  // Actually we fake my articles with checking if author id is user.id
  // Because our mock data user has id 'user1' (set up in AuthContext)
  // Let's filter where author.id === user?.id
  const myArticles = mockArticles.filter(article => article.author.id === user?.id)
                                 .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="pb-12 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <BookOpen className="text-blue-600" size={32} />
            My Articles
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Manage the knowledge you've contributed to the team.
          </p>
        </div>
        
        <Link 
          to="/create"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 transition-colors shrink-0"
        >
          <PlusSquare size={18} />
          Write Article
        </Link>
      </header>

      {myArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myArticles.map(article => (
            <div key={article.id} className="relative group">
              <ArticleCard article={article} />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="flex items-center gap-1 text-xs font-semibold bg-white border border-slate-200 shadow-sm px-2 py-1 rounded-lg text-slate-600">
                  Published
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
            <PlusSquare size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">You haven't published anything yet</h3>
          <p className="text-slate-500 mt-2 max-w-md mx-auto">
            Share your expertise, document a process, or write a tutorial to help your team members.
          </p>
          <Link 
            to="/create"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-medium transition-colors"
          >
            Create Your First Article
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
