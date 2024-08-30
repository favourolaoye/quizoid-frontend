"use client";

import { ContentProvider } from "@/components/dashboard/lecturer/ContentContext";
import Sidebar from "@/components/dashboard/lecturer/Sidebar";
import { useUser } from "@/contexts/UserContext";
import { ReactNode } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    const { user } = useUser();

    return (
        <html lang="en">
            <body className='w-full h-full'>
                <ContentProvider>
                    <div className='w-full h-full flex bg-[#f8faf9]'>
                        <div className="flex w-full gap-2">
                            <Sidebar />
                            <div className='w-9/12 flex flex-col'>
                                <div className="flex flex-col bg-white rounded-xl w-full p-4 sticky top-0">
                                    <div className="flex flex-col w-fit self-end bg-white text-gray-500">
                                        <h2 className='font-semibold'>Welcome back,<span>{user?.name}</span></h2>
                                        <span className='text-sm'>{user?.details.lecturerID}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col p-8">
                                    {children}
                                </div>
                            </div>
                        </div>            
                    </div>
                </ContentProvider>
            </body>
        </html>
    );
}
