import Link from 'next/link'
import React from 'react'
import { useContent } from './ContentContext';


export default function Widjets() {

    const { setContent } = useContent();

    const Widjets = [
        {label:'Manage Courses', desc:'Create, edit and delete exams questions and answers for the courses you take.', ref:'/dashboard/lecturer/manage-courses',set:'Courses Taken'},
        {label:'View Answers', desc:'View answers for the courses you take.', ref:'/dashboard/lecturer/answers', set:'Theory Answers'},
        {label:'View Results', desc:'View results and answers for the courses you take.', ref:'/dashboard/lecturer/view-results', set:'View Results'},
        {label:'Manage Accounts', desc:'Manage your account details such as username and passwords.', ref:'/dashboard/lecturer/settings', set:'Settings'},
    ]

  return (
    <div className=''>
        <ul className="grid grid-cols-1 gap-8 text-gray-600 sm:md:grid-cols-2 md:grid-cols-3">
            {Widjets.map((wid,id)=>(
                <Link href={wid.ref} key={id}>
                    <li onClick={()=>setContent(wid.set)} className="flex flex-col gap-4 bg-white rounded-xl w-full p-8 hover:scale-95 hover:border-t-4 hover:border-green-600">
                        <h2 className='font-medium text-xl'>{wid.label}</h2>
                        <p>{wid.desc}</p>
                    </li>
                </Link>
            ))}
        </ul>
    </div>
  )
}