"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import autoTable from 'jspdf-autotable';

const CourseResults: React.FC = () => {
    const params = useParams();
    const router = useRouter();
    const { code } = params as { code: string }; // Explicitly type params
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (code) {
           const  modifiedCode = code?.replace("%20"," ")
            
            const encodedCode = encodeURIComponent(code);
            console.log("code",encodedCode);
            axios.get(`http://localhost:3000/api/submit/result/${modifiedCode}`)
                .then((response) => {
                    console.log('Fetched Results:', response);
                    setResults(response.data); // Ensure data is in the correct format
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Failed to load results');
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [code]);

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Student Results', 14, 20);
        autoTable(doc, {
            startY: 30,
            head: [['Matric No.', 'Score']],
            body: results.map((result) => [result.matricNo, result.totalMark]),
        });
        doc.save(`${code}_results.pdf`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="relative w-full h-full bg-white rounded-xl p-4">
            <span className='text-red-500 hover:border-b border-gray-800 hover:text-gray-300 cursor-pointer' onClick={() => router.push('/dashboard/lecturer/view-results')}>Back</span>
            <div className="flex items-center justify-between gap-4 mb-2">
                <h2 className="text-2xl font-bold mb-4">Results for {code?.replace('%20', " ")}</h2>
                <button onClick={downloadPDF} className="bg-green-500 text-white py-2 px-4 rounded">Download PDF</button>
            </div>
            <table className="min-w-full divide-y divide-gray-200 mb-4">
                <thead className="bg-gray-50">
                    <tr className="uppercase text-left text-xs text-gray-500 tracking-wider">
                        <th className="px-6 py-3 font-medium">Matric No.</th>
                        <th className="px-6 py-3 font-medium">Score</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {results.map((result, index) => (
                        <tr key={index}>
                            <td className="px-6 py-3">{result.matricNo}</td>
                            <td className="px-6 py-3">{result.totalMark}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseResults;
