import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: ()=> void;
    onSelectExamType: (type: 'theory' | 'multichoice')=> void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSelectExamType }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
            <div className="bg-white flex flex-col gap-4 p-6 rounded-lg shadow-lg w-full max-w-[450px]">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Select Exam Type</h2>
                    <button onClick={onClose} className="text-red-500">
                        Close
                    </button>
                </div>
                <div className="flex justify-between w-full p-3">
                    <button onClick={() => onSelectExamType('theory')}
                        className="bg-blue-500 w-1/2 text-white p-2 mr-5 rounded hover:bg-blue-700">
                        Theory
                    </button>
                    <button onClick={() => onSelectExamType('multichoice')}
                        className="bg-green-500 w-1/2 text-white py-2 px-4 rounded hover:bg-green-700">
                        Multiple Choice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
