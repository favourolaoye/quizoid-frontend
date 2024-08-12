"use client";

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
const studentsData = [
  { name: 'Favour Olaoye', matricNumber: '20205714', email: 'olaoyesf.20@funaab.edu.ng', level: '100', department: 'Computer Science' },
  { name: 'Olayemi Moses', matricNumber: '20203161', email: 'jane@example.com', level: '200', department: 'Mathematics' },
  { name: 'Obadimu Ismail', matricNumber: '20203161', email: 'alice@example.com', level: '300', department: 'Computer Science' }
];

export default function StudentsPage() {
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState(studentsData);

  const filteredStudents = students.filter((student: any) => {
    return (
      (department ? student.department === department : true) &&
      (level ? student.level === level : true) 
    );
  });

  
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = async (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  
      const newStudents = sheetData.slice(1).map((row: any) => ({
        name: `${row[0]} ${row[1]}`,  // Adjust if necessary
        matricNo: row[2],
        email: row[3],
        level: row[4],
        department: row[5],
        password: row[1],  // Assuming surname is in row[1], which will be hashed on the backend
      })).filter(student => student.name && student.matricNo && student.email && student.level && student.department && student.password);
  
      try {
        const response = await fetch('http://localhost:3000/api/students/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newStudents),
        });
  
        if (response.ok) {
          setStudents((prevStudents: any) => [...prevStudents, ...newStudents]);
          setShowModal(false);
          toast.success("Students uploaded successfully");
        } else {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.message || 'Failed to upload students'}`);
        }
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
      }
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-green-500">All Students</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Student
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-green-500 mb-2">Department:</label>
        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="p-3 border border-gray-300 rounded"
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Statistics">Statistics</option>
          {/* Add more departments as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-green-500 mb-2">Level:</label>
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="p-3 border border-gray-300 rounded"
        >
          <option value="">All Levels</option>
          <option value="100">100</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
          {/* Add more levels as needed */}
        </select>
      </div>

      <table className="min-w-full bg-white m-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Matric Number</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Level</th>
            <th className="py-2 px-4 border-b text-left">Department</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student: any, index: any) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-left">{student.name}</td>
              <td className="py-2 px-4 border-b text-left">{student.matricNumber}</td>
              <td className="py-2 px-4 border-b text-left">{student.email}</td>
              <td className="py-2 px-4 border-b text-left">{student.level}</td>
              <td className="py-2 px-4 border-b text-left">{student.department}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-md font-bold mb-5">Upload Students Data</h2>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="mb-4 border bg-white text-black p-3 mr-3"
            />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
