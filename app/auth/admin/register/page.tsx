"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function RegisterAdmin() {
  const router = useRouter();
  const [adminID, setAdminID] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = "http://localhost:3000/api";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${url}/admin/register`, { adminID, name, password });
      toast.success('Registration successful!');
      router.push('/auth/admin/login');
    } catch (error: any) {
      if (error.response) {
        toast.error(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error('Registration failed: No response from server');
      } else {
        toast.error(`Registration failed: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center">Admin Registration</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              placeholder='Admin ID'
              type="text"
              value={adminID}
              onChange={(e) => setAdminID(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              placeholder='Full Name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              placeholder='Password'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              placeholder='Confirm Password'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md focus:ring-2 focus:bg-green-200 focus:text-white focus:ring-green-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
