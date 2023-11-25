import React, { useState } from 'react';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="bg-primary-200 min-h-screen flex">
      {/* Navigation Sidebar */}
      <div className="w-60 bg-primary-300 p-4">
        <div className="text-white font-serif text-xl mb-6">My Journal</div>
        <ul className="text-white">
          <li className="mb-4">
            <button className="w-full text-left" onClick={() => setActiveTab('newBook')}>Create New Book</button>
          </li>
          <li className="mb-4">
            <button className="w-full text-left" onClick={() => setActiveTab('newEntry')}>Add Journal Entry</button>
          </li>
          <li>
            <button className="w-full text-left" onClick={() => setActiveTab('viewEntries')}>View Entries</button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-primary-100">
        <header className="bg-primary-400 text-white p-4 font-serif text-3xl">My Journal</header>
        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="font-serif text-2xl text-primary-500 mb-4">Welcome to Your Journal</h2>
              <p className="text-primary-300">Select an option from the menu to get started.</p>
            </div>
          )}
          {activeTab === 'newBook' && (
            <div>
              {/* Add form or component to create a new book */}
              <h2 className="font-serif text-2xl text-primary-500 mb-4">Create a New Book</h2>
            </div>
          )}
          {activeTab === 'newEntry' && (
            <div>
              {/* Add form or component to add a new journal entry */}
              <h2 className="font-serif text-2xl text-primary-500 mb-4">Add a New Journal Entry</h2>
            </div>
          )}
          {activeTab === 'viewEntries' && (
            <div>
              {/* Component to view and manage journal entries */}
              <h2 className="font-serif text-2xl text-primary-500 mb-4">Your Journal Entries</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
