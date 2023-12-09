import React from 'react';

interface NotebookCardProps {
  title: string;
  description: string;
  onNewEntry: () => void;
}

const NotebookCard: React.FC<NotebookCardProps> = ({ title, description, onNewEntry }) => {
  return (
    <div className="p-4 cursor-pointer transform transition duration-300 hover:scale-105">
      <div className="relative w-48 h-64">
        {/* Book Spine */}
        <div className="absolute left-0 top-0 w-3 h-full bg-primary-500"></div>

        {/* Book Cover */}
        <div className="absolute left-3 top-0 w-full h-full bg-white shadow-lg overflow-hidden">
          <div className="h-1/5 bg-primary-300 flex items-center justify-center">
            <p className="text-white text-lg font-bold">
              {title}
            </p>
          </div>
          <div className="h-4/5 p-4 bg-primary-200 flex flex-col justify-between">
            <div className="bg-white border border-black rounded-lg text-center h-1/3">
              <p className="text-black text-sm">
                {description}
              </p>
            </div>
            <button 
              onClick={onNewEntry}
              className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors">
              + New Entry
            </button>
          </div>
        </div>

        {/* Additional Styling for Realism */}
        <div className="absolute left-3 top-0 w-full h-full">
          <div className="h-1/5"></div>
          <div className="h-4/5 border-t border-b border-primary-200"></div>
        </div>
      </div>
    </div>
  );
};

export default NotebookCard;
