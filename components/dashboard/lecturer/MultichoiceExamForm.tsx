import { createExam } from '@/api/exam';
import { useUser } from '@/contexts/UserContext';
import React, { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

interface MultichoiceExamFormProps {
    courseCode: string;
    title: string;
    action: string;
    onSubmit: (data: any) => void;
}

interface Question {
    question: string;
    options: string[];
    correctOption: number;
    score: number;
}

interface ExamData {
    courseCode: string;
    instruction: string;
    type: string;
    questions: Question[];
    lecturerID: string;
    duration: number;
}


const MultichoiceExamForm: React.FC<MultichoiceExamFormProps> = ({ courseCode, action, onSubmit }) => {
    const { user } = useUser();
    const [examData, setExamData] = useState<ExamData>({
        courseCode,
        instruction: '',
        type: 'multichoice',
        questions: [{ question: '', options: ['', '', '', ''], correctOption: 0, score: 10 }],
        lecturerID: user?.details.lecturerID || '',
        duration: 60,
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

    const handleScoreChange = (qIndex: number, value: string) => {
        const questions = [...examData.questions];
    
        // Check if the value is an empty string
        if (value === '') {
            // Set the score to a temporary negative value that won't be used (e.g., null or -1) to indicate "no value"
            questions[qIndex].score = -1; 
        } else {
            const parsedValue = parseInt(value, 10);
    
            if (!isNaN(parsedValue)) {
                questions[qIndex].score = parsedValue;
            }
        }
    
        setExamData({ ...examData, questions });
    };
    
    

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExamData({ ...examData, duration: parseInt(e.target.value) });
    };

    const addQuestion = () => {
        setExamData((prevExamData) => ({
            ...prevExamData,
            questions: [...prevExamData.questions, { question: '', options: ['', '', '', ''], correctOption: 0, score: 1 }],
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
                questions: [{ question: '', options: ['', '', '', ''], correctOption: 0, score: 10 }],
                lecturerID: user?.details.lecturerID || '',
                duration: 60,
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
                <label>
                    Exam Duration (minutes):
                    <input
                        type="number"
                        value={examData.duration}
                        onChange={handleDurationChange}
                        className="border p-2 rounded w-full"
                        required
                        min="1"
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
                                required
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
                                        required
                                    />
                                ))}
                            </label>
                            <label>
                                Correct Option:
                                <select
                                    value={question.correctOption}
                                    onChange={(e) => handleCorrectOptionChange(qIndex, parseInt(e.target.value))}
                                    className="border w-1/6 p-2 rounded ml-2"
                                    required
                                >
                                    {question.options.map((v, index) => (
                                        <option key={index} value={index}>
                                            {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Score for this question:
                                <input
                                    type="number"
                                    value={question.score === -1 ? '' : question.score} // If score is -1, show an empty input field
                                    onChange={(e) => handleScoreChange(qIndex, e.target.value)}
                                    className="border p-2 rounded mt-2 w-full"
                                    
                                />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={addQuestion} className="mt-2 text-blue-500 flex gap-4 items-center">
                        <i className='w-[18px]'><RiAddFill /></i>
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
