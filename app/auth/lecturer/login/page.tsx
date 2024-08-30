"use client";

import Cookies from 'js-cookie';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
const url = process.env.NEXT_PUBLIC_BASE_API_URL;

export default function LecturerLogin() {
  const router = useRouter(); 
  const { setUser } = useUser();

  const [lecturerId, setlecturerId] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${url}/lecturer/login`, { lecturerID: lecturerId, password });
      const { token, user } = response.data;

      Cookies.set('token', token, { expires: 1, path: '/', sameSite: 'Strict' });
      Cookies.set('user', JSON.stringify(user), { expires: 1, path: '/', sameSite: 'Strict' });
      setUser(user); 
      toast.success("Login successful");
      router.push('/dashboard/lecturer', { scroll: false });
    } catch (error: any) {
      if (error.response) {
        toast.error(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error('Login failed: No response from server');
      } else {
        toast.error(`Login failed: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Lecturer Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="lecturerId" className="block text-sm font-medium text-gray-700">
              Lecturer ID or Email
            </label>
            <input
              type="text"
              id="lecturerId"
              value={lecturerId}
              onChange={(e) => setlecturerId(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-green-400 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
