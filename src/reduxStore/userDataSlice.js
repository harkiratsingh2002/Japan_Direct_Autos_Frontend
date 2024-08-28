import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    firstName: "Guest",
    // lastName: '',
    // email: '',
    role: "customer",
    token: "",
    showWishlist: false,
    wishlist: [],
  },
  reducers: {
    // increment: (state) => { state.count += 1; },
    // decrement: (state) => { state.count -= 1; },
    loginUser: (state, action) => {
      console.log("action:- ", action);
      state.firstName = action.payload.userData.firstName;
      state.userToken = action.payload.userData.userToken;
      // state.lastName = action.payload.userData.lastName;
      // state.email = action.payload.userData.email;
      state.role = action.payload.userData.role;
      state.wishlist = action.payload.userData.wishlist;
      state.showWishlist = true;
      return state;
    },
    logoutUser: (state) => {
      state = {
        firstName: "Guest",
        // lastName: '',
        // email: '',
        role: "customer",
        token: "",
        showWishlist: false,

        wishlist: [],
      };
      return state;
    },
  },
  addToWishlist: (state, action) => {
    state.wishlist.unshift(action.payload.car);
    return state;
  },
  removeFromWishlist: (state, action) => {
    let index = state.wishlist.indexOf(action.payload.car);
    state.wishlist.splice(index, 1);
    return state;
  },
});

export const { loginUser, logoutUser, addToWishlist, removeFromWishlist } =
  userDataSlice.actions;

export default userDataSlice.reducer;
