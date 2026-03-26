import React, { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { mockArticles, mockTags } from '../mock/data';
import ArticleCard from '../components/ArticleCard';
import TagChip from '../components/TagChip';

const ArticleList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  const filteredArticles = useMemo(() => {
    return mockArticles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
                          selectedTags.every(tag => article.tags.includes(tag));
                          
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  const hasFilters = searchQuery.length > 0 || selectedTags.length > 0;

  return (
    <div className="pb-12 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Browse Articles</h1>
          <p className="text-slate-600 mt-2 text-lg">
            Discover internal knowledge, guides, and documentation.
          </p>
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Showing {filteredArticles.length} result{filteredArticles.length !== 1 ? 's' : ''}
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search by title, keywords, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none text-slate-900"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full p-1"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-slate-700">
            <Filter size={16} />
            <span>Filter by Tags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockTags.map(tag => (
              <TagChip
                key={tag}
                tag={tag}
                selectable
                selected={selectedTags.includes(tag)}
                onClick={toggleTag}
              />
            ))}
          </div>
        </div>

        {hasFilters && (
          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-sm text-slate-500">Filters applied</span>
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Results Grid */}
      {filteredArticles.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </section>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
          <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No articles found</h3>
          <p className="text-slate-500 mt-1 max-w-sm mx-auto">
            We couldn't find any articles matching your search and filter criteria. 
            Try adjusting them or create a new article.
          </p>
          <button 
            onClick={clearFilters}
            className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-medium transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
