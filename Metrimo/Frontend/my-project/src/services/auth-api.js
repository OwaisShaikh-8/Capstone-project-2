// redux/api/authApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axios-base-query";
import { setCredentials, logout } from "../redux/slice/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "/auth",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.error("Register failed:", error);
        }
      },
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {
          console.error("Logout API failed:", error);
          // Still logout on client side even if API fails
          dispatch(logout());
        }
      },
      invalidatesTags: ["User"],
    }),

    // Keep updateProfile as a regular mutation without state handling
    // updateProfile: builder.mutation({
    //   query: (data) => ({
    //     url: "/profile",
    //     method: "PUT",
    //     data,
    //   }),
    // }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  // useUpdateProfileMutation,
} = authApi;