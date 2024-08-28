"use client"

import { useRouter } from 'next/navigation';
import ExamChoiceModal from '@/components/dashboard/lecturer/ExamChoiceModal';
import React, { useState, useEffect } from 'react';
import { updateExam, deleteExam, checkExam } from '@/api/exam';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CourseCard from '@/components/dashboard/lecturer/CourseCard';

interface Course {
    code: string;
    title: string;
    unit: number;
    examType?: 'theory' | 'multichoice';
}

export default function ManageCourses() {

    const { user } = useUser();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    
    const toggleDropdown = (courseCode: string)=> {
        setDropdownOpen(prevState => ({ ...prevState, [courseCode]: !prevState[courseCode] }));
    };
    
    const handleCreateExam = async (course: Course) => {
        try {
            const response = await checkExam(course.code);
            const responseMessage = response.message || 'Unexpected error';
            if (response.status === 200) {
                toast.error('Exam already exists for this course.');
                // alert('Exam already exists for this course.');
                return;
            } else {
                // alert('exam created!');                
                toast.success('Exam created sucessfully');
                toast.info(responseMessage);
            }
    
            console.log(responseMessage);
        } catch (error: any) {
            const errorMessage = error.message || 'Unexpected error';
    
            // toast.error(errorMessage);
            console.log(errorMessage);
            setSelectedCourse(course);
            setIsModalOpen(true);
        }
    };
    

  
    const handleDeleteExam = async (course: Course)=> {
        try {
            await deleteExam(course.code);
            toast.success(`Exam for ${course.code} deleted successfully`);
        } catch (error:any) {
            if(error.response){
                toast.error(error.response.data.message)
                console.error(error);
            }
        }
    };

    const handleSelectExamType = (type: 'theory' | 'multichoice')=> {
        if (selectedCourse) {
            router.push(`/dashboard/lecturer/exam-form/${type}?code=${selectedCourse.code}&action=create`);
        }
        setIsModalOpen(false);
    };

    const handleEditExam = async (course: Course)=> {
        try {
            const response = await checkExam(course.code);
            toast.success(response);
            console.log(response)
            if (response.status === 200) {
                if (course.examType) {
                router.push(`/dashboard/lecturer/exam-form/${course.examType}?code=${course.code}&action=edit`);
            } else {
                alert('Exam type is not specified for this course.');
            }
          }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    }

  return (
    <div className='w-full h-full bg-white rounded-xl p-4'>
        <ToastContainer/>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="uppercase text-left text-xs text-gray-500 tracking-wider">
              <th className="px-6 py-3 font-medium">Course Code</th>
              <th className="px-6 py-3 font-medium">Course Title</th>
              <th className="px-6 py-3 font-medium">Unit</th>
              <th className="px-6 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {user?.details.courses.length === 0 && <p className='m-auto'>No registered courses here. Contact your admin!</p>}
            {user?.details.courses.map((course:any) => (
              <CourseCard course={course} key={course.code} handleCreateExam={handleCreateExam} handleEditExam={handleEditExam} handleDeleteExam={handleDeleteExam} toggleDropdown={toggleDropdown} dropdownOpen={dropdownOpen}/>
            ))}
          </tbody>
        </table>
        <ExamChoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelectExamType={handleSelectExamType}/>
      </div>
  )
}
