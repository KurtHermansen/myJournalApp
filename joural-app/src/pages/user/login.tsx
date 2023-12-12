import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    if (response.ok) {
        sessionStorage.setItem('userId', data.userId);
        sessionStorage.setItem('username', data.username);
      router.push('/dashboard');
    } else {
      console.error('Login failed');
    }
  };
  

  return (
    <div className="bg-primary-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 lg:p-8 max-w-md mx-auto">
        <h1 className="text-primary-500 text-3xl font-serif mb-4">Login to My Journal</h1>
        
        <div className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-primary-300 rounded-lg mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-primary-300 rounded-lg mb-4"
          />
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

export default LoginPage;
