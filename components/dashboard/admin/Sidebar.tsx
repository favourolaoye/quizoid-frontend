import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { toast } from 'react-toastify'
import { useContent } from './ContentContext';
import { MdScoreboard } from 'react-icons/md'
import { FaHome } from 'react-icons/fa'
import { FaListCheck } from 'react-icons/fa6'
import { RiLogoutBoxLine, RiQuestionAnswerLine, RiSettingsLine } from 'react-icons/ri'

export default function Sidebar() {
  
  const { user, logout } = useUser();
  const router = useRouter();
  const { content, setContent } = useContent()

  const navs = [
    {id:0, label:'Students', icon:<FaHome/>, ref:'/dashboard/admin'},
    {id:1, label:'Lecturers', icon:<FaListCheck/>, ref:'/dashboard/admin/lecturer'},
    {id:2, label:'Edit Exams', icon:<RiQuestionAnswerLine/>, ref:'/dashboard/admin/exam'},
    {id:3, label:'Generate Link', icon:<FaListCheck/>, ref:'/dashboard/admin/generate-link'},
    {id:4, label:'View Results', icon:<MdScoreboard/>, ref:'/dashboard/admin/results'},
];

  const handleSignOut = () =>{
    toast.success('You have signed out sucessfully');
    router.push('/auth/admin/login');
    logout();
    console.log('You have signed out chief');
  }

  return (
    <div className="h-screen w-64 bg-white shadow-md">
      <div className="p-5">
        <h3 className="text-xl font-bold text-green-500">{user?.name}</h3>
        <p className='py-3 text-sm'>Admin ID: {user?.details.adminID}</p>
      </div>
      <nav className="p-5 flex flex-col justify-between">
        <ul className="flex flex-col text-gray-400">
          {navs.map((nav,id) => (
            <Link href={nav.ref} key={id}>
              <li onClick={()=>setContent(nav.label)} className={`${content === nav.label ? 'bg-green-50 border-l-4 border-green-600' : ''} flex items-center p-4 gap-4 hover:bg-green-50`}>
                <i className='text-[17px] text-green-600'>{nav.icon}</i>
                <h2 className={`${content === nav.label ? 'font-medium text-gray-700':'text-gray-500'}`}>{nav.label}</h2>
              </li>
            </Link>
          ))}
        </ul>
        <li className={'flex text-red-500 items-center p-4 gap-4 hover:bg-green-50'} onClick={handleSignOut}>
          <i className='text-[17px]'><RiLogoutBoxLine/></i>
          <h2 className="">Logout</h2>
        </li>
      </nav>
    </div>
  );
};


