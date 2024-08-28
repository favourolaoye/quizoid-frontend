import React from 'react'
export default function CourseCard(props:any) {

  return (
    <tr key={props.course.code}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.course.code}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.course.title}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{props.course.unit}</td>
        <td className="relative px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button className='text-white p-2 rounded-xl bg-green-500' onClick={() => props.toggleDropdown(props.course.code)}>Manage course</button>
        
            {props.dropdownOpen[props.course.code] && (
              <div className="absolute z-10 bg-white shadow-md rounded-lg mt-2 w-48 text-sm text-gray-700">
                <button className='block text-left w-full px-4 py-2 hover:bg-gray-100 text-sm' onClick={() => props.handleCreateExam(props.course)}>Create Exam</button>
                <button className='block text-left w-full px-4 py-2 hover:bg-gray-100' onClick={() => props.handleEditExam(props.course)}>Edit Exam</button>
                <button className='block text-left w-full px-4 py-2 hover:bg-gray-100' onClick={() => props.handleDeleteExam(props.course)}>Delete Exam</button>
              </div>
            )}
        </td>
    </tr>
  )
}
