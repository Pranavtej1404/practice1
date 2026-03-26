import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownViewer from '../components/MarkdownViewer';
import TagChip from '../components/TagChip';
import { mockTags, mockArticles } from '../mock/data';
import { useAuth } from '../context/AuthContext';
import { FileEdit, Eye, Save, X, Info } from 'lucide-react';

const CreateArticle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('# My New Article\\n\\nStart writing your amazing content here...');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content || selectedTags.length === 0) return;
    
    setIsPublishing(true);
    // Fake publishing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newArticle = {
      id: Date.now().toString(),
      title,
      excerpt: excerpt || content.substring(0, 100) + '...',
      content,
      author: user || {
        id: 'user1',
        name: 'Demo User',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff'
      },
      date: new Date().toISOString(),
      tags: selectedTags,
      readTime: Math.max(1, Math.ceil(content.split(/\\s+/).length / 200))
    };

    mockArticles.unshift(newArticle);

    navigate('/my-articles');
  };

  return (
    <div className="max-w-6xl mx-auto pb-24 animate-in fade-in duration-500">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Article</h1>
          <p className="text-slate-600 mt-2 text-lg">Share your knowledge with the team.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate('/articles')}
            className="px-4 py-2 border border-slate-300 text-slate-700 bg-white rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing || !title || !content || selectedTags.length === 0}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={18} />
            {isPublishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Article Title *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., How to implement WebSockets in Node.js"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none font-medium text-lg placeholder:font-normal placeholder:text-slate-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Short Excerpt (Optional)</label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="A brief summary of what this article is about..."
                rows={2}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none resize-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-900">Content (Markdown) *</label>
                <div className="flex items-center bg-slate-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setIsPreviewMode(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      !isPreviewMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <FileEdit size={14} /> Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPreviewMode(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      isPreviewMode ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Eye size={14} /> Preview
                  </button>
                </div>
              </div>

              {!isPreviewMode ? (
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Supports full Markdown syntax..."
                  className="w-full h-[500px] px-4 py-4 bg-slate-50 flex-1 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all outline-none font-mono text-sm leading-relaxed block"
                />
              ) : (
                <div className="w-full h-[500px] overflow-y-auto px-6 py-4 bg-white border border-slate-200 rounded-xl">
                  {content ? (
                    <MarkdownViewer content={content} />
                  ) : (
                    <p className="text-slate-400 italic">Preview will appear here...</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              Tags *
              <span className="text-xs font-normal text-slate-500">
                ({selectedTags.length}/5)
              </span>
            </h3>

            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                {selectedTags.map(tag => (
                  <div key={tag} className="flex items-center gap-1 bg-white border border-slate-200 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                    {tag}
                    <button 
                      onClick={() => toggleTag(tag)}
                      className="ml-1 text-slate-400 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {mockTags.filter(t => !selectedTags.includes(t)).map(tag => (
                <TagChip 
                  key={tag} 
                  tag={tag} 
                  selectable 
                  selected={false} 
                  onClick={toggleTag} 
                />
              ))}
            </div>

            {selectedTags.length === 5 && (
              <p className="text-xs text-amber-600 mt-3 flex items-start gap-1">
                <Info size={14} className="shrink-0 mt-0.5" />
                You've reached the maximum number of tags.
              </p>
            )}
          </div>
          
          <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">Publishing Tips</h3>
            <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
              <li>Use a clear, descriptive title.</li>
              <li>Break content into headings.</li>
              <li>Include code snippets when relevant.</li>
              <li>Add appropriate tags for discoverability.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
