"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const GenerateLink = () => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch the students when the component mounts
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/students/limited');
        setStudents(response.data);
      } catch (error: any) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleSendToAll = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/students/generate-link-all');
      setMessage(response.data.message);
      toast.success("sent sucessfully");
    } catch (error: any) {
      setMessage('Error sending links to all students');
      toast.error("error: " + error.response.message)
    }
  };

  return (
    <div className="flex bg-gray-100">
  {/* Main Content Area */}
  <div className="p-8 w-full">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Generate One-Time Link</h1>

    <button
      onClick={handleSendToAll}
      className="bg-green-400 text-white p-3 rounded-xs hover:bg-green-700 transition duration-200 mb-4"
    >
      Send Links to All Students
    </button>

    <h2 className="text-xl font-semibold mb-4 text-gray-700">Students</h2>

    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Name</th>
            <th className="px-4 py-2 border-b text-left">Matric No</th>
            <th className="px-4 py-2 border-b text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: any) => (
            <tr key={student._id}>
              <td className="px-4 py-2 border-b">{student.name}</td>
              <td className="px-4 py-2 border-b">{student.matricNo}</td>
              <td className="px-4 py-2 border-b">{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
};

export default GenerateLink;
