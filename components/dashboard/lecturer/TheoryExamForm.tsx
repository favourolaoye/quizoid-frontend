import { createExam } from '@/api/Theory';
import { useUser } from '@/contexts/UserContext';
import React, { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface TheoryExamFormProps {
    courseCode: string;
    action: string;
    onSubmit: (data: any) => void;
}

interface ExamData {
    courseCode: string;
    instruction: string;
    type: string;
    questions: string[];
    lecturerID: string;
}

const TheoryExamForm: React.FC<TheoryExamFormProps> = ({ courseCode, action, onSubmit }) => {
    const { user } = useUser();
    const [examData, setExamData] = useState<ExamData>({
        courseCode,
        instruction: '',
        type: 'theory',
        questions: [''],
        lecturerID: user?.details.lecturerID || '',
    });

    const handleQuestionChange = (index: number, value: string) => {
        const questions = [...examData.questions];
        questions[index] = value;
        setExamData({ ...examData, questions });
    };

    const addQuestion = () => {
        setExamData((prevExamData) => ({
            ...prevExamData,
            questions: [...prevExamData.questions, ''],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await createExam(examData);
            onSubmit(examData);
            toast.success(response.message);
            setExamData({
                courseCode,
                instruction: '',
                type: 'theory',
                questions: [''],
                lecturerID: user?.details.lecturerID || '',
            });
        } catch (error: any) {
            toast.error(`Error creating exam: ${error.message}`);
        }
    };

    return (
    <>
        <div className="w-full h-full bg-white rounded-xl p-4">
            <h2 className="text-2xl font-bold">Create Theory Exam for {courseCode}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <label>
                    Instruction:
                    <input
                        type="text"
                        value={examData.instruction}
                        onChange={(e) => setExamData({ ...examData, instruction: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <div>
                    <h3>Questions:</h3>
                    {examData.questions.map((question, index)=> (
                        <div className='mt-3'>
                            <label>Question {index + 1}</label>
                            <input key={index} type="text" value={question} onChange={(e) => handleQuestionChange(index, e.target.value)} className="border p-2 rounded mt-2 w-full"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addQuestion} className="mt-2 text-blue-500 flex gap-4 items-center">
                        <i className='w-[18px]'><RiAddFill/></i>
                        Add Question
                    </button>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {action === 'create' ? 'Create Exam' : 'Save Changes'}
                </button>
            </form>
        </div>
        <ToastContainer/>
    </>
    );
};

export default TheoryExamForm;