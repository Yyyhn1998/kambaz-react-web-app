import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    modules: [],
};
const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        setModule: (state, action) => {
            state.modules = action.payload;
        },
        setModules: (state, { payload: modules }) => {
            state.modules = modules;
        },
        addModule: (state, { payload: module }) => {
            // eslint-disable-next-line
            const newModule: any = {
                _id: uuidv4(),
                lessons: [],
                name: module.name,
                course: module.course,
            };
            // eslint-disable-next-line
            state.modules = [...state.modules, newModule] as any;
        },
        deleteModule: (state, { payload: moduleId }) => {
            state.modules = state.modules.filter(
                // eslint-disable-next-line
                (m: any) => m._id !== moduleId);
        },
        updateModule: (state, { payload: module }) => {
            // eslint-disable-next-line
            state.modules = state.modules.map((m: any) =>
                m._id === module._id ? module : m
                // eslint-disable-next-line
            ) as any;
        },
        editModule: (state, { payload: moduleId }) => {
            // eslint-disable-next-line
            state.modules = state.modules.map((m: any) =>
                m._id === moduleId ? { ...m, editing: true } : m
                // eslint-disable-next-line
            ) as any;
        },
    },
});
export const { addModule, deleteModule, updateModule, editModule , setModule, setModules } =
    modulesSlice.actions;
export default modulesSlice.reducer;