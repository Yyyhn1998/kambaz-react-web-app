import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllEnrollments = async () => {
    const { data } = await axios.get(ENROLLMENTS_API);
    return data;
};

export const fetchUserEnrollments = async (userId: string) => {
    const { data } = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/enrollments`);
    return data;
};

export const fetchAllCourses = async () => {
    const { data } = await axios.get(`${REMOTE_SERVER}/api/courses`);
    return data;
};

export const enrollUser = async (userId: string, courseId: string) => {
    console.log("Sending enroll request:", userId, courseId);
    try {
        const { data } = await axios.post(ENROLLMENTS_API, {
            userId,
            courseId
        });
        console.log("Enroll response:", data);
        return data;
    } catch (error) {
        console.error("Enroll request failed:", error);
        throw error;
    }
};

export const unenrollUser = async (userId: string, courseId: string) => {
    console.log("Sending unenroll request:", userId, courseId);
    try {
        const { data } = await axios.delete(`${REMOTE_SERVER}/api/enrollments/user/${userId}/course/${courseId}`);
        console.log("Unenroll response:", data);
        return data;
    } catch (error) {
        console.error("Unenroll request failed:", error);
        throw error;
    }
};