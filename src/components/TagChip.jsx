import React from 'react';

const TagChip = ({ tag, onClick, selectable = false, selected = false }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  
  if (selectable) {
    return (
      <button
        onClick={() => onClick && onClick(tag)}
        className={`${baseClasses} ${
          selected 
            ? 'bg-blue-600 text-white shadow-sm' 
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
        }`}
      >
        {tag}
      </button>
    );
  }
  
  return (
    <span className={`${baseClasses} bg-blue-50 text-blue-700 border border-blue-100/50`}>
      {tag}
    </span>
  );
};

export default TagChip;
