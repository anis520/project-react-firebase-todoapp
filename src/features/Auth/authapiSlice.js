import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "auth/createRegister",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/api/v1/register/`,
        data
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const userLogin = createAsyncThunk("auth/createLogin", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:9000/api/v1/login/`,
      data,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userLogout = createAsyncThunk(
  "auth/createLogout",
  async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/logout/`,

        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const userMe = createAsyncThunk("auth/userMe", async (data) => {
  try {
    const response = await axios.get("http://localhost:9000/api/v1/me", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
export const userPasRest = createAsyncThunk(
  "auth/userPasRest",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/resetpassword",
        data,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const userPasRestVerify = createAsyncThunk(
  "auth/userPasRestVerify",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/resetpasswordverify",
        data,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
