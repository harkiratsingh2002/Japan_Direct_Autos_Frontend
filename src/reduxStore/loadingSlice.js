import { createSlice } from '@reduxjs/toolkit'


const loadingSlice = createSlice({
    name: 'userData',
    initialState: {
        showLoader: false,
        isLoading: false,

    },
    reducers: {
        startLoader: (state) => {
            state.showLoader = true;
            state.isLoading = true;

            return state;
        },
        endLoader: (state) => {
            state.showLoader = false;
            state.isLoading = false;

            return state;
        }
    }
})

export const { startLoader, endLoader } = loadingSlice.actions
export default loadingSlice.reducer


