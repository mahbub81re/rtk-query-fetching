import { createSlice } from "@reduxjs/toolkit";
import initialFormData from "../../data/initialFormData";

const postformSlice = createSlice({
    name: "post_form",
    initialState: initialFormData,
    reducers: {
        setFromData: (state, action) => {
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.body = action.payload.body;
            state.isEdit =true;
            state.isOpen =true;
        },
        handleOpen: (state)=>{
            state.isOpen = !state.isOpen;
            state.id = null;
            state.title =null;
            state.body = null;
            state.isEdit =false;
        }
    },
});

export default postformSlice.reducer;

export const { handleEdit, setFromData ,handleOpen} = postformSlice.actions;
