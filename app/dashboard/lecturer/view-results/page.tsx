"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

export default function StudentResults() {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const lecturerID = user?.details.lecturerID;
        if (lecturerID) {
          const response = await axios.get(`http://localhost:3000/api/submit/${lecturerID}`);
          setCourses(response.data);
        }
      } catch (err: any) {
        setError('err ethcing data');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const handleButtonClick = (courseCode: any) => {
    router.push(`/dashboard/lecturer/view-results/${courseCode}`);
    console.log(`Course code clicked: ${courseCode}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='w-full h-full bg-white rounded-xl p-4'>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="uppercase text-left text-xs text-gray-500 tracking-wider">
            <th className="px-6 py-3 font-medium">Course Code</th>
            <th className="px-6 py-3 font-medium">Number of Students</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course: any) => (
            <tr key={course.courseCode}>
              <td className="px-6 py-4">{course.courseCode}</td>
              <td className="px-6 py-4">{course.students}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleButtonClick(course.courseCode)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Results
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
