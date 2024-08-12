import { createExam } from '@/api/exam';
import { useUser } from '@/contexts/UserContext';
import React, { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';


interface MultichoiceExamFormProps {
    courseCode: string;
    action: string;
    onSubmit: (data: any) => void;
}

interface Question {
    question: string;
    options: string[];
    correctOption: number;
}

interface ExamData {
    courseCode: string;
    instruction: string;
    type: string;
    questions: Question[];
    lecturerID: string;
}

const MultichoiceExamForm: React.FC<MultichoiceExamFormProps> = ({ courseCode, action, onSubmit }) => {
    const { user } = useUser();
    const [examData, setExamData] = useState<ExamData>({
        courseCode,
        instruction: '',
        type: 'multichoice',
        questions: [{ question: '', options: ['', '', '', ''], correctOption: 0 }],
        lecturerID: user?.details.lecturerID || '',
    });

    const handleQuestionChange = (index: number, value: string) => {
        const questions = [...examData.questions];
        questions[index].question = value;
        setExamData({ ...examData, questions });
    };

    const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
        const questions = [...examData.questions];
        questions[qIndex].options[oIndex] = value;
        setExamData({ ...examData, questions });
    };

    const handleCorrectOptionChange = (qIndex: number, value: number) => {
        const questions = [...examData.questions];
        questions[qIndex].correctOption = value;
        setExamData({ ...examData, questions });
    };

    const addQuestion = () => {
        setExamData((prevExamData) => ({
            ...prevExamData,
            questions: [...prevExamData.questions, { question: '', options: ['', '', '', ''], correctOption: 0 }],
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
                type: 'multichoice',
                questions: [{ question: '', options: ['', '', '', ''], correctOption: 0 }],
                lecturerID: user?.details.lecturerID || '',
            });
        } catch (error: any) {
            toast.error(`Error creating exam: ${error.message}`);
        }
    };

    return (
        <div className="w-full h-full bg-white rounded-xl p-4">
            <h2 className="text-2xl font-bold">Create Multiple Choice Exam for {courseCode}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                <label>
                    Instruction:
                    <textarea
                        value={examData.instruction}
                        onChange={(e) => setExamData({ ...examData, instruction: e.target.value })}
                        className="border p-2 rounded w-full"
                    />
                </label>
                <div className='flex flex-col gap-2'>
                    <h3 className='text-center text-xl'>Questions</h3>
                    {examData.questions.map((question, qIndex) => (
                        <div key={qIndex} className="mt-4 flex flex-col gap-4">
                            <label htmlFor="">Question {qIndex + 1}</label>
                            <input
                                type="text"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                            <label>
                                Options:
                                {question.options.map((option, oIndex) => (
                                    <input
                                        key={oIndex}
                                        type="text"
                                        value={option} placeholder={`option ${oIndex + 1}`}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                        className="border p-2 rounded mt-2 w-full"
                                    />
                                ))}
                            </label>
                            <label>
                                Correct Option:
                                <select
                                    value={question.correctOption}
                                    onChange={(e) => handleCorrectOptionChange(qIndex, parseInt(e.target.value))}
                                    className="border w-1/6 p-2 rounded ml-2"
                                >
                                    {question.options.map((v, index) => (
                                        <option key={index} value={index}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </label>
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
    );
};

export default MultichoiceExamForm;