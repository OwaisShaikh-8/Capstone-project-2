import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axios-base-query.js";
import {
  setVenues,
  setActiveVenue,
  resetVenues,
  removeVenue,
} from "../redux/slice/venueSlice.js";

export const venueApi = createApi({
  reducerPath: "venueApi",
  baseQuery: axiosBaseQuery({
    baseUrl:"/venue"
  }),
  tagTypes: ["Venue"],
  endpoints: (builder) => ({
    /* ---------- Create Venue ---------- */
    createVenue: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Venue"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Adjust based on your backend response shape
          // dispatch(setActiveVenue(data?.data || data));
        } catch (error) {
          console.error("Create venue failed:", error);
        }
      },
    }),

    /* ---------- Get Owner's Venues ---------- */
    getOwnerVenues: builder.query({
      query: () => ({
        url: `/getowner`,
        method: "GET",
      }),
      providesTags: ["Venue"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setVenues(data.venues));
        } catch (error) {
          dispatch(resetVenues());
          console.error("Get owner venues failed:", error);
        }
      },
    }),



     deleteVenue: builder.mutation({
      query: (venueId) => ({
        url: `/delete/${venueId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Venue"],
      async onQueryStarted(venueId, { dispatch, queryFulfilled }) {
        // Optimistic update
        dispatch(removeVenue(venueId));
        
        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Delete venue failed:", error);
          // You might want to refetch or rollback here
        }
      },
    }),





    /* ---------- Get Venues By City ---------- */
    getVenuesByCity: builder.query({
      query: (city) => ({
        url: `/city/${city}`,
        method: "GET",
      }),
      providesTags: ["Venue"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Adjust based on your backend response shape
          dispatch(setVenues(data?.venues || data));
        } catch (error) {
          dispatch(resetVenues());
          console.error("Get venues by city failed:", error);
        }
      },
    }),

    /* ---------- Get Active/Single Venue ---------- */
    getActiveVenue: builder.query({
      query: (venueId) => ({
        url: `/${venueId}`,
        method: "GET",
      }),
      providesTags: ["Venue"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setActiveVenue(data.venue));
        } catch (error) {
          console.error("Get active venue failed:", error);
        }
      },
    }),

    /* ---------- Delete Venue ---------- */
   
  }),
});

export const {
  useCreateVenueMutation,
  useGetOwnerVenuesQuery,
  useGetVenuesByCityQuery,
  useGetActiveVenueQuery,
  useDeleteVenueMutation,
} = venueApi;