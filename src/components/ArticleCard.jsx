import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import TagChip from './TagChip';

const ArticleCard = ({ article }) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(article.date));

  return (
    <Link 
      to={`/articles/${article.id}`}
      className="block group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          <ChevronRight size={18} />
        </span>
      </div>
      
      <p className="text-slate-600 mb-6 line-clamp-2 text-sm leading-relaxed">
        {article.excerpt}
      </p>
      
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {article.tags.map(tag => (
          <TagChip key={tag} tag={tag} />
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
        <div className="flex items-center gap-3">
          <img 
            src={article.author.avatar} 
            alt={article.author.name} 
            className="w-8 h-8 rounded-full bg-slate-100 ring-2 ring-white"
          />
          <div className="text-sm">
            <p className="font-medium text-slate-900 leading-none">{article.author.name}</p>
            <p className="text-slate-500 text-xs mt-1">{formattedDate}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-lg">
          <Clock size={14} />
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
