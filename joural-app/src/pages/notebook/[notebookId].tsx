import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Entry {
  id: number;
  title: string;
  content: string;
  // Additional entry properties
}

const NotebookPage = () => {
  const router = useRouter();
  const { notebookId } = router.query;
  const [userName, setUserName] = useState('');
  const [entryTitle, setEntryTitle] = useState('');
  const [entryContent, setEntryContent] = useState('');
  const [notebookTitle, setNotebookTitle] = useState('');
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  useEffect(() => {
    // Fetch notebook details and entries
    console.log(notebookId);
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUserName(storedUsername);
    }
    const fetchNotebookDetails = async () => {
    const response = await fetch(`/api/getEntries?notebookId=${notebookId}`);
    if (response.ok) {
      const data = await response.json();
      setNotebookTitle(data.notebookTitle);
      setEntries(data.entries);
    } else {
      console.error('Failed to fetch notebook details');
    }
  };

  if (notebookId) {
    fetchNotebookDetails();
  }
  }, [notebookId]);

  const handleAddEntry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    try {
      const response = await fetch('/api/addEntry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, notebookId, title: entryTitle, content: entryContent }),
      });

      if (response.ok) {
        console.log('Entry added successfully');
        setEntryTitle('');
        setEntryContent('');
        router.reload();
      } else {
        console.error('Failed to add entry');
      }
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const handleSelectEntry = (entry: Entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true); // Open the modal
  };
  

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };
  const handledashboard = () => {
    router.push('/dashboard');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  

  interface EntryModalProps {
    entry: Entry | null;
    onClose: () => void;
  }
  
  const EntryModal: React.FC<EntryModalProps> = ({ entry, onClose }) => {
    if (!entry) return null;
  
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 border border-primary-300lg:p-8 max-w-md mx-auto">
          <h2 className="text-primary-500 text-3xl font-serif mb-4">{entry.title}</h2>
          <div className="text-primary-300 mb-6">
            <p>{entry.content}</p>
          </div>
          <div className="flex justify-center mt-4">
            <button onClick={onClose} className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  

  return (
    <div className="bg-primary-200 min-h-screen flex">
      <div className="w-60 bg-primary-300 p-4">
      <button onClick={handledashboard} className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
            Dashboard
          </button>
        <div className="text-white font-serif text-xl mb-6">
          {notebookTitle || 'Loading...'}
        </div>
        <ul className="text-white">
          {entries.map((entry) => (
            <li key={entry.id} className="mb-4">
              <button
                onClick={() => handleSelectEntry(entry)}
                className="w-full text-left"
              >
                {entry.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex-1 bg-primary-100">
      <header className="bg-primary-400 text-white p-4 font-serif text-3xl">
          My Journal - Welcome, {userName}
          <button onClick={handleLogout} className="ml-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
            Logout
          </button>
        </header>
        <div className="p-6">
          <h1 className="text-primary-500 text-3xl font-serif mb-4">
            Notebook: {notebookTitle}
          </h1>
          <form onSubmit={handleAddEntry} className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Entry Title"
              className="w-full px-3 py-2 border border-primary-300 rounded-lg mb-4"
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
            />
            <textarea
              placeholder="Entry Content"
              className="w-full px-3 py-2 border border-primary-300 rounded-lg mb-4"
              rows={6}
              value={entryContent}
              onChange={(e) => setEntryContent(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors"
            >
              Add Entry
            </button>
          </form>
          {/* Additional content for displaying selected entry details */}
          {/* ... existing code for displaying selected entry */}
        </div>
        {isModalOpen && (
  <EntryModal entry={selectedEntry} onClose={() => setIsModalOpen(false)} />
)}

      </div>
    </div>
  );
};

export default NotebookPage;


