import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownViewer = ({ content }) => {
  return (
    <div className="prose prose-blue max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownViewer;
