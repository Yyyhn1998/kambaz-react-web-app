import { createSlice } from "@reduxjs/toolkit";
import { EnrollmentType } from "./types";

const initialState: { enrollments: EnrollmentType[] } = {
    enrollments: []
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrollments: (state, action) => {
            state.enrollments = action.payload;
        },
        enrollCourse: (state, action) => {
            const { courseId, userId } = action.payload;
            if (!state.enrollments.some(e => e.course === courseId && e.user === userId)) {
                state.enrollments.push({
                    _id: new Date().getTime().toString(),
                    user: userId,
                    course: courseId
                });
                console.log("Redux: Enrolled user in course:", courseId);
            }
        },
        unenrollCourse: (state, action) => {
            const { courseId, userId } = action.payload;
            console.log("Redux: Unenrolling user", userId, "from course", courseId);

            state.enrollments = state.enrollments.filter(
                (e) => !(e.course === courseId && e.user === userId)
            );

            console.log("Redux: Updated enrollments", state.enrollments);
        },
    },
});

export const { setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;