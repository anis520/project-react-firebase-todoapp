import { createSlice } from "@reduxjs/toolkit";
import {
  userLogin,
  userLogout,
  userMe,
  userPasRest,
  userPasRestVerify,
  userRegister,
} from "./authapiSlice";

//create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
    loading: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      (state.message = null), (state.error = null);
    },

    setlogout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    setlogin: (state, action) => {
      localStorage.setItem("user", JSON.stringify({ email: action.payload }));
      state.user = { email: action.payload };
    },
  },
  extraReducers: (builder) => {
    // regester
    builder.addCase(userRegister.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      // (state.user = action.payload.data.user),
      (state.loading = false), (state.message = action.payload.data.message);
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      (state.error = action.error.message), (state.loading = false);
    });

    // loging

    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(userLogin.fulfilled, (state, action) => {
      (state.loading = false),
        (state.message = action.payload.data.message),
        (state.user = action.payload.data.user);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      (state.loading = false), (state.message = action.error.message);
    });

    // logout

    builder.addCase(userLogout.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(userLogout.fulfilled, (state, action) => {
      (state.loading = false),
        (state.message = action.payload.data.message),
        (state.user = null);
      localStorage.removeItem("user");
    });

    // get me

    builder.addCase(userMe.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userMe.fulfilled, (state, action) => {
      (state.loading = false),
        (state.message = action.payload.data.message),
        (state.user = action.payload.data.me);
    });

    builder.addCase(userMe.rejected, (state, action) => {
      (state.loading = false), console.log(action.error.message);
      (state.error = action.error.message), (state.user = null);
    });

    // reset link
    builder.addCase(userPasRest.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
    });
    builder.addCase(userPasRest.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // reset pass
    builder.addCase(userPasRestVerify.fulfilled, (state, action) => {
      state.message = action.payload.data.message;
    });
    builder.addCase(userPasRestVerify.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

//export

// selectors
export const getUserData = (state) => state.auth;
// action
export const { setMessageEmpty, setlogout, setlogin } = authSlice.actions;
// slice
export default authSlice.reducer;
