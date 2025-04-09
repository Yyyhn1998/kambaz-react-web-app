import axios from "axios";
import {QuizType} from "./types.ts";
const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchQuizzesForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return data;
};

export const fetchQuizById = async (quizId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return data;
};


export const createQuiz = async (courseId: string, quiz: QuizType) => {
    try {
        delete quiz._id;

        const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
        console.log('Created Quiz in frontend:', data);
        return data;
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw error;
    }
};



// eslint-disable-next-line
export const updateQuiz = async (quizId: string, quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}`, quiz);
    return data;
};

export const deleteQuiz = async (quizId: string) => {
    const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return data;
};




export const fetchQuizSubmission = async (quizId: string, studentId: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/submissions/${studentId}`);
    return data;
};

export const fetchPreviewAttempt = async (quizId: string, userId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(
            `${QUIZZES_API}/${quizId}/preview/${userId}`
        );
        return data;
    } catch (error) {
        // eslint-disable-next-line
        const err = error as { response?: { data: any }, message?: string };
        console.error("Error fetching preview attempt:", err.response ? err.response.data : err.message);
        throw error;
    }
};

// eslint-disable-next-line
export const savePreviewAttempt = async (quizId: string, attempt: any) => {
    const { data } = await axiosWithCredentials.post(
        `${QUIZZES_API}/${quizId}/preview`,
        attempt
    );
    return data;
};

export const fetchStudentQuizAttempts = async (quizId: string, studentId: string) => {
    const { data } = await axiosWithCredentials.get(
        `${QUIZZES_API}/${quizId}/attempts/${studentId}`
    );
    return data;
};

// eslint-disable-next-line
export const submitQuizAttempt = async (quizId: string, submission: any) => {
    const { data } = await axiosWithCredentials.post(
        `${QUIZZES_API}/${quizId}/attempts`,
        submission
    );
    return data;
};


export const fetchLatestQuizAttempt = async (quizId: string, studentId: string) => {
    try {
        const { data } = await axiosWithCredentials.get(
            `${QUIZZES_API}/${quizId}/attempts/${studentId}/latest`
        );
        return data;
    } catch (error) {
        // eslint-disable-next-line
        const err = error as { response?: { data: any }, message?: string };
        console.error("Error fetching latest attempt:", err.response ? err.response.data : err.message);
        throw error;
    }
};

