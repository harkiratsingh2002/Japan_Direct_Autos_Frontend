import { createSlice } from '@reduxjs/toolkit'


const loadingSlice = createSlice({
    name: 'userData',
    initialState: { 
      showLoader: false
     },
    reducers: { 
        startLoader: (state)=>{
            state.showLoader = true;
            return state;
        },
        endLoader: (state)=>{
            state.showLoader = false;
            return state;
        }
     } 
})

export const {startLoader, endLoader}  = loadingSlice.actions
export default loadingSlice.reducer