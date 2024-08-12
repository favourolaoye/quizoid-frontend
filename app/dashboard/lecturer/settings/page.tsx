import React from 'react'

export default function Settings() {
    return (
        <div className="w-full h-full bg-white rounded-xl p-4">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="flex flex-col gap-4">
                <section className='flex flex-col'>
                    <h3 className="text-xl font-200">Account Settings</h3>
                    <div className="flex gap-4 items-center">
                        <button className="bg-green-500 text-white p-2 rounded mt-2">Edit Profile</button>
                        <button className="bg-green-500 text-white p-2 rounded mt-2">Change Password</button>
                        <button className="bg-green-500 text-white p-2 rounded mt-2">Notification Preferences</button>
                    </div>
                </section>
                <section className='flex flex-col'>
                    <h3 className="text-xl font-200">Course Management</h3>
                    <div className="flex gap-4 items-center">
                        <button className="bg-green-500 text-white p-2 rounded mt-2">Edit Course Details</button>
                        <button className="bg-green-500 text-white p-2 rounded mt-2">Exam Settings</button>
                    </div>
                </section>
            </div>
        </div>
    );
};