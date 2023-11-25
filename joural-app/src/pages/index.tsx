import React from 'react';

const HomePage = () => {
  return (
    <div className="bg-primary-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 max-w-md mx-auto">
        <h1 className="text-primary-500 text-3xl font-serif mb-4">My Journal</h1>
        <p className="text-primary-300 mb-6">Your personal space to capture thoughts, ideas, and memories.</p>
        
        <div className="flex flex-col items-center">
          <div className="w-full mb-4">
            <label htmlFor="email" className="text-primary-300 block mb-2">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-primary-300 rounded-lg" />
          </div>
          <div className="w-full mb-6">
            <label htmlFor="password" className="text-primary-300 block mb-2">Password</label>
            <input type="password" id="password" className="w-full px-3 py-2 border border-primary-300 rounded-lg" />
          </div>
          <button className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
