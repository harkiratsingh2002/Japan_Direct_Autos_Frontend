import { configureStore, createSlice } from '@reduxjs/toolkit';
import userDataReducer from "./userDataSlice"
import loadingSlice from './loadingSlice';
// const userDataSlice = createSlice({
//   name: 'userData',
//   initialState: { 
//     firstName: '',
//     lastName: '',
//     email: '',
//     role: ''
//    },
//   reducers: {
//     // increment: (state) => { state.count += 1; },
//     // decrement: (state) => { state.count -= 1; },
//     loginUser: (state,action)=>{
//         state = action.userData;
//     },
//     logoutUser: (state,action)=>{
//         state = { 
//             firstName: '',
//             lastName: '',
//             email: '',
//             role: ''
//         }
//     }
//   },
// });

export const store = configureStore({
  reducer: {
    userDataSlice: userDataReducer,
    loadingSlice: loadingSlice
  },
});