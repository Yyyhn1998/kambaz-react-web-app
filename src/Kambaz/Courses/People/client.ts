import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchPeopleInCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses/${courseId}/people`);
    return data;
};
