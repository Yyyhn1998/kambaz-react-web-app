import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HelloState {
    message: string;
}

const initialState: HelloState = {
    message: "Hello World",
};

const helloSlice = createSlice({
    name: "hello",
    initialState,
    reducers: {
        updateMessage(state, action: PayloadAction<string>) {
            state.message = action.payload;
        },
    },
});

export default helloSlice.reducer;

export const { updateMessage } = helloSlice.actions;
