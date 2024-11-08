import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        loadpeople: (state,action) =>{
            state.info = action.payload;
        },
        removepeople: (state,action) =>{
            state.info = null;
        }
    }
}) 

export const { loadpeople, removepeople} = personSlice.actions

export default personSlice.reducer