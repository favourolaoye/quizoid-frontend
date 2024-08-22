"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LecturerForm() {
  const [formData, setFormData] = useState({
    name: '',
    lecturerID: '',
    password: '',
    department: '',
    courses: [{ title: '', code: '', unit: '' }]
  });

  const url = process.env.NEXT_PUBLIC_BASE_API_URL;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCourseChange = (index: Number, e: any) => {
    const { name, value } = e.target;
    const newCourses = formData.courses.map((course, i) => 
      i === index ? { ...course, [name]: value } : course
    );
    setFormData({ ...formData, courses: newCourses });
  };

  const handleAddCourse = () => {
    setFormData({
      ...formData,
      courses: [...formData.courses, { title: '', code: '', unit: '' }]
    });
  };

  const handleRemoveCourse = (index: Number) => {
    const newCourses = formData.courses.filter((_, i) => i !== index);
    setFormData({ ...formData, courses: newCourses });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/api/lecturer/add`, formData);
      console.log(response);
      console.log('Response:', response.data);
      toast.success('Lecturer added successfully!');
      setFormData({
        name: '',
        lecturerID: '',
        password: '',
        department: '',
        courses: [{ title: '', code: '', unit: '' }]
      });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error.response && error.response.data) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error('Error submitting form');
      }
    }
  };

  return (
  <>
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded shadow-sm bg-white w-auto">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Lecturer ID</label>
        <input 
          type="text" 
          name="lecturerID" 
          value={formData.lecturerID} 
          onChange={handleChange} 
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Department</label>
        <input 
          type="text" 
          name="department" 
          value={formData.department} 
          onChange={handleChange} 
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Courses Taken</label>
        {formData.courses.map((course, index) => (
          <div key={index} className="mt-2">
            <input
              type="text" name="title" value={course.title}
              placeholder="Course Title"
              onChange={(e) => handleCourseChange(index, e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            <input type="text" name="code" value={course.code}
              placeholder="Course Code" onChange={(e) => handleCourseChange(index, e)} className="mt-1 block w-full p-2 border border-gray-300 rounded" />
            <input
              type="text" name="unit"
              value={course.unit} placeholder="Course Unit"
              onChange={(e) => handleCourseChange(index, e)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"/>
            <button
              type="button"
              onClick={() => handleRemoveCourse(index)}
              className="mt-1 text-red-500 hover:text-red-700"
            >
              Remove Course
            </button>
          </div>
        ))}
        <button 
          type="button"
          onClick={handleAddCourse}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          Add Course
        </button>
      </div>
      <button 
        type="submit" 
        className="text-white bg-green-500 hover:bg-green-700 p-2 rounded"
      >
        Submit
      </button>
    </form>
     <ToastContainer />
  </>
  );
}
