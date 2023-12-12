import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface NewNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const NewNotebookModal: React.FC<NewNotebookModalProps> = ({ isOpen, onClose, onRefresh }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Retrieve the userId from session storage
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error("No user ID found");
      return;
    }

    try {
      const response = await fetch('/api/createNotebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, title, description }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Notebook created successfully', data);
        router.push(`/notebook/${data.notebookId}`);
        setTitle('');
        setDescription('');
        onClose();
        onRefresh(); // Refresh the notebooks list
      } else {
        console.error(data.message || 'Error creating notebook');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 max-w-md mx-auto">
        <h1 className="text-primary-500 text-3xl font-serif mb-4">
          Create New Notebook
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="w-full mb-4">
            <label htmlFor="title" className="text-primary-300 block mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-primary-300 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="description" className="text-primary-300 block mb-2">
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-primary-300 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-between w-full">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNotebookModal;
