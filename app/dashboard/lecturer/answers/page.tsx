"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import axios from 'axios';

export default function Page() {
  const { user } = useUser();
  const lecturerID = user?.details.lecturerID;
  const [students, setStudents] = useState([]);
  const [downloaded, setDownloaded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (lecturerID) {
      axios
        .get(
          `http://localhost:3000/api/answers/getStudentAnswers?lecturerID=${lecturerID}`
        )
        .then((response) => {
          setStudents(response.data);
          // Load downloaded status from localStorage
          const storedDownloadedStatus = localStorage.getItem('downloadedStatus');
          if (storedDownloadedStatus) {
            setDownloaded(JSON.parse(storedDownloadedStatus));
          }
        })
        .catch((error) => {
          console.error('Error fetching student answers:', error);
        });
    }
  }, [lecturerID]);

  const handleDownload = (matricNo: string) => {
    window.open(
      `http://localhost:3000/api/answers/downloadStudentAnswers?matricNo=${matricNo}`,
      '_blank'
    );

    // Update downloaded status in state and localStorage
    setDownloaded((prevState) => {
      const updatedState = { ...prevState, [matricNo]: true };
      localStorage.setItem('downloadedStatus', JSON.stringify(updatedState));
      return updatedState;
    });
  };
  useEffect(()=> {
    const data = localStorage.getItem('data');
    if(data?.valueOf()){
      
    }
  })

  return (
    <div>
      <h1>Student Answers</h1>
      {students.length > 0 ? (
        <ul>
          {students.map((student: any) => (
            <li key={student.matricNo} className="flex items-center p-3 mb-2">
              <span className="mr-5">{student.matricNo}</span>
              <button
                className="bg-black text-white py-1 px-3 rounded"
                onClick={() => handleDownload(student.matricNo)}
                disabled={downloaded[student.matricNo]}
              >
                {downloaded[student.matricNo] ? 'Downloaded' : 'Download PDF'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}
