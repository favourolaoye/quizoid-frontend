import React from 'react'
import { useRouter } from 'next/navigation';

interface Course {
    courseCode: string;
    title: string;
    students: number;
}

interface ResultCardProps {
    course: Course;
}

const ResultCard: React.FC<ResultCardProps>=({ course })=> {
  const router = useRouter();

  const handleViewResults = ()=> {
    router.push(`/dashboard/lecturer/view-results/${course.courseCode}`);
  };

  return (
    <tr key={course.courseCode}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.courseCode}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.title}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.students}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button className='text-white p-2 rounded-xl bg-green-500' onClick={handleViewResults}>View Results</button>
        </td>
    </tr>
  )
}

export default ResultCard;
