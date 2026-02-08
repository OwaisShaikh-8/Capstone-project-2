// services/bookingApi.js
import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axios-base-query";
import { setBookings, setActiveBooking } from "../redux/slice/bookingSlice";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: axiosBaseQuery({ baseUrl: "/booking" }),
  tagTypes: ["Booking"],
  endpoints: (builder) => ({

    // ========================
    // GET BOOKINGS BY OWNER
    // ========================
    getBookingsByOwner: builder.query({
      query: () => ({
        url: "/getbyowner",
        method: "GET",
      }),
      transformResponse: (response) => response.bookings,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBookings(data));
        } catch (err) {
          console.error("Fetch owner bookings failed:", err);
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((b) => ({
                type: "Booking",
                id: b._id,
              })),
              { type: "Booking", id: "LIST" },
            ]
          : [{ type: "Booking", id: "LIST" }],
    }),

    // ========================
    // GET BOOKINGS BY CUSTOMER
    // ========================
    getBookingsByCustomer: builder.query({
      query: () => ({
        url: `/getbycustomer`,
        method: "GET",
      }),
      transformResponse: (response) => response.bookings,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBookings(data));
        } catch (err) {
          console.error("Fetch customer bookings failed:", err);
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((b) => ({
                type: "Booking",
                id: b._id,
              })),
              { type: "Booking", id: "LIST" },
            ]
          : [{ type: "Booking", id: "LIST" }],
    }),

    // ========================
    // ADD BOOKING (WITH FILE UPLOAD)
    // ========================
    addBooking: builder.mutation({
      query: (formData) => ({
        url: `/create`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
      transformResponse: (response) => response.booking,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setActiveBooking(data));
        } catch (err) {
          console.error("Add booking failed:", err);
        }
      },
      invalidatesTags: [{ type: "Booking", id: "LIST" }],
    }),

    // ========================
    // ACCEPT BOOKING (OWNER)
    // ========================
    updateBookingByOwner: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `/owner/${bookingId}`,
        method: "PUT",
        data: { status },
      }),
      transformResponse: (response) => response.booking,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setActiveBooking(data));
        } catch (err) {
          console.error("Update booking failed:", err);
        }
      },
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        { type: "Booking", id: "LIST" },
      ],
    }),

    // ========================
    // CANCEL BOOKING (OWNER)
    // ========================
    cancelBookingByOwner: builder.mutation({
      query: ({ bookingId, reason }) => ({
        url: `/owner/cancel/${bookingId}`,
        method: "PUT",
        data: { reason },
      }),
      transformResponse: (response) => response.booking,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setActiveBooking(data));
        } catch (err) {
          console.error("Cancel by owner failed:", err);
        }
      },
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        { type: "Booking", id: "LIST" },
      ],
    }),

    // ========================
    // CANCEL BOOKING (CUSTOMER)
    // ========================
    cancelBookingByCustomer: builder.mutation({
      query: ({ bookingId, reason }) => ({
        url: `/customer/cancel/${bookingId}`,
        method: "PUT",
        data: { reason },
      }),
      transformResponse: (response) => response.booking,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setActiveBooking(data));
        } catch (err) {
          console.error("Cancel by customer failed:", err);
        }
      },
      invalidatesTags: (result, error, { bookingId }) => [
        { type: "Booking", id: bookingId },
        { type: "Booking", id: "LIST" },
      ],
    }),

    // ========================
    // DELETE BOOKING
    // ========================
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/${bookingId}`,
        method: "DELETE",
      }),
      transformResponse: (response) => response.message,
      invalidatesTags: (result, error, bookingId) => [
        { type: "Booking", id: bookingId },
        { type: "Booking", id: "LIST" },
      ],
    }),



checkAvailability: builder.query({
  query: ({ venueId, date, timeSlot }) => ({
    url: `/check-availability/${venueId}?date=${date}&timeSlot=${timeSlot}`,
    method: "GET",
  }),
  transformResponse: (response) => response.available,
}),




  }),
});




export const {
  useGetBookingsByOwnerQuery,
  useGetBookingsByCustomerQuery,
  useAddBookingMutation,
  useUpdateBookingByOwnerMutation,
  useCancelBookingByOwnerMutation,
  useCancelBookingByCustomerMutation,
  useDeleteBookingMutation,
   useLazyCheckAvailabilityQuery, // 👈 added
} = bookingApi;