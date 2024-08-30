"use client";

import MultichoiceExamForm from '@/components/dashboard/lecturer/MultichoiceExamForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const MultichoiceExamPage = () => {
    const router = useRouter();
    const params = useSearchParams();
    const code = params.get('code');
    const action = params.get('action');

    const handleSubmit = (data: any) => {
        // Handle the submit logic here
        toast.success(`Creating multi-choice exam for ${code}`);
        console.log(data);
        router.push('/dashboard/lecturer/manage-courses');
    };

    return <MultichoiceExamForm courseCode={code as string} action={action as string} onSubmit={handleSubmit} title={''} />;
};

export default MultichoiceExamPage;
