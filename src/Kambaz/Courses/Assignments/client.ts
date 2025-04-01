import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const fetchAllAssignments = async () => {
    const { data } = await axiosWithCredentials.get(ASSIGNMENTS_API);
    return data;
};

export const fetchAssignmentsForCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`);
    return data;
};
// eslint-disable-next-line
export const createAssignment = async (assignment: any) => {
    const { data } = await axiosWithCredentials.post(ASSIGNMENTS_API, assignment);
    return data;
};

// eslint-disable-next-line
export const updateAssignment = async (assignmentId: string, updates: any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignmentId}`, updates);
    return data;
};

export const deleteAssignment = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
    return data;
};
