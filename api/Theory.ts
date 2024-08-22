import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/api/theory';

interface ExamData {
    instruction: string;
    questions: any[];
}

export const createExam = async (examData: ExamData) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post(API_URL, examData, {
            headers: { 'x-auth-token': token as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getExams = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(API_URL, {
            headers: { 'x-auth-token': token as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getExamById = async (id: string) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${API_URL}/${id}`, {
            headers: { 'x-auth-token': token as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateExam = async (id: string, examData: ExamData) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.put(`${API_URL}/${id}`, examData, {
            headers: { 'x-auth-token': token as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const deleteExam = async (courseCode: string, type: string) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.delete(`${API_URL}/${type}/${courseCode}`, {
            headers: { 'x-auth-token': token as string },
        });
        return response.data;
    } catch (error: any) {
        throw new Error('Failed to delete exam');
    }
};

export const checkTExam = async (courseCode: string) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`${API_URL}/check/${courseCode}`, {
            headers: { 'x-auth-token': token as string },
        });
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
