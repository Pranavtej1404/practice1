import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockArticles } from '../mock/data';
import MarkdownViewer from '../components/MarkdownViewer';
import TagChip from '../components/TagChip';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Edit, Clock, Calendar, Share2, BookmarkPlus } from 'lucide-react';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const article = mockArticles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
        <h2 className="text-2xl font-bold text-slate-900">Article not found</h2>
        <p className="text-slate-500 mt-2">The article you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/articles')}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </button>
      </div>
    );
  }

  const isAuthor = user?.id === article.author.id;
  
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.date));

  return (
    <article className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link 
        to="/articles" 
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to articles
      </Link>

      <header className="mb-10 lg:w-4/5">
        <div className="flex flex-wrap gap-2 mb-6">
          {article.tags.map(tag => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          {article.title}
        </h1>
        
        <p className="text-xl text-slate-600 leading-relaxed mb-8">
          {article.excerpt}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-slate-200">
          <div className="flex items-center gap-4">
            <img 
              src={article.author.avatar} 
              alt={article.author.name} 
              className="w-12 h-12 rounded-full ring-2 ring-slate-100 object-cover"
            />
            <div>
              <p className="font-semibold text-slate-900">{article.author.name}</p>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1.5 min-w-0">
                  <Calendar size={14} className="shrink-0" />
                  <span className="truncate">{formattedDate}</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <Clock size={14} />
                  {article.readTime} min read
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center w-10 h-10 rounded-full text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors">
              <Share2 size={18} />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-full text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 transition-colors">
              <BookmarkPlus size={18} />
            </button>
            {isAuthor && (
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm">
                <Edit size={16} />
                Edit
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-200">
        {/* We use MarkdownViewer which handles the prose styles */}
        <MarkdownViewer content={article.content} />
      </div>
    </article>
  );
};

export default ArticleDetail;
