"use client"
import { useState } from 'react';
import axios from 'axios';

const GenerateLink = () => {
  const [formData, setFormData] = useState({
    matricNo: '',
    email: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/students/generate-link', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error generating link');
    }
  };

  return (
    <div>
      <h1>Generate One-Time Link</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="matricNo" placeholder="Matric No" value={formData.matricNo} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <button type="submit">Generate Link</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default GenerateLink;
