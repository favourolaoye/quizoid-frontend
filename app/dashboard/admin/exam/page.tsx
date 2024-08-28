"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [startedExams, setStartedExams] = useState(new Set());

  useEffect(() => {
    // Fetch courses with exams on component mount
    const fetchCoursesWithExams = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/mcq/courses-with-exams');
        setCourses(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching courses');
        setLoading(false);
      }
    };

    fetchCoursesWithExams();
  }, []);

  const handleUpdateStatus = async (courseCode: any) => {
    try {
      await axios.patch(`http://localhost:3000/api/mcq/update-exam-status/${courseCode}`);
      alert('Exam status updated successfully');
      // Update the button text to "Started" after successful status update
      setStartedExams((prevStartedExams) => new Set(prevStartedExams).add(courseCode));
    } catch (error) {
      alert('Error updating exam status');
    }
  };

  // const handleDeleteExam = async (courseCode: any) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/api/mcq/delete-exam/${courseCode}`);
  //     alert('Exam deleted successfully');
  //     // Remove the deleted course from the courses list
  //     setCourses((prevCourses) => prevCourses.filter((course) => course !== courseCode));
  //   } catch (error) {
  //     alert('Error deleting exam');
  //   }
  // };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Courses with Existing Exams</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3  border-b text-left">Course Code</th>
            <th className="p-3  border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            courses.map((courseCode) => (
              <tr key={courseCode}>
                <td className="p-3  border-b text-left">{courseCode}</td>
                <td className="p-3  border-b text-left">
                  <button
                    onClick={() => handleUpdateStatus(courseCode)}
                    className={`py-1 px-4 rounded ${
                      startedExams.has(courseCode)
                        ? 'bg-gray-200 text-gray-500 text-bold cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    disabled={startedExams.has(courseCode)}
                  >
                    {startedExams.has(courseCode) ? 'Started' : 'Activate Exam'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td  className="py-4 text-center text-black">
                No exam yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
