'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const data = e.target?.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const courses = worksheet.map((row: any) => ({
        title: row.title,
        department: row.department,
        level: row.level,
        units: row.units,
      }));

      try {
        await axios.post('http://localhost:3000/api/courses/upload', { courses });
        toast.success('Courses uploaded successfully!');
      } catch (error: any) {
        toast.error('Failed to upload courses.');
        console.error('Upload error:', error.response?.data || error.message);
      }
    };

    reader.onerror = (error: any) => {
      toast.error('Error reading file.');
      console.error('File read error:', error.message);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Upload Courses (xlsx/csv)
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          accept=".xlsx,.csv"
          className="mb-4 w-full p-3 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
