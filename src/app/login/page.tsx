'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api from '../api/api';
import React from 'react';

export default function LoginPage() {
  const [username, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직 (예: API 요청)
    try {
      console.log('로그인 정보', username, password);
      
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, { username, password });
      console.log('성공');
      
      //localStorage.setItem('token', response.data.access_token);
      // 토큰을 로컬 스토리지에 저장
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    setSuccess(true);
      //router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setSuccess(false);
      alert('Invalid credentials');
    }
  };

  const handleTokenRefresh = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.get('/auth/', {
        headers: {
                   Authorization: `Bearer ${refreshToken}`, // AccessToken을 헤더에 포함
               },
      });
      console.log('refresh', response.data);
      
      //ocalStorage.setItem('accessToken', response.data.accessToken);
      //alert('AccessToken이 재발급되었습니다.');
  } catch (error) {
      console.error('Token refresh failed', error);
  }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="id"
              type="text"
              value={username}
              onChange={(e) => setUserId(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-800"
          >
            Login
          </button>
        </form>
      </div>
      <div>
        {
          success === true && (
            <div>
              <p> 로그인 성공</p>
              <button onClick={handleTokenRefresh}>accessToken 재발급</button>
            </div>
          )
        }
      </div>
    </div>
  );
}