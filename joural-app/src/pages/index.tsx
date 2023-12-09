import React from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/user/signup'); 
  };

  const handleLogin = () => {
    router.push('/user/login');
  };

  return (
    <div className="bg-primary-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 max-w-md mx-auto">
        <h1 className="text-primary-500 text-3xl font-serif mb-4">My Journal</h1>
        <p className="text-primary-300 mb-6">Your personal space to capture thoughts, ideas, and memories.</p>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={handleSignUp} 
            className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors mb-4">
            Sign Up
          </button>
          <button 
            onClick={handleLogin} 
            className="bg-primary-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-500 transition-colors">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
