// redux/slice/bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],         // all bookings
  activeBooking: null,  // currently active booking
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    // Set all bookings
    setBookings: (state, action) => {     // use for getting all booking data on vendor side and also for on customer side  
      state.bookings = action.payload;
    },

    // Remove a booking by id
    removeBooking: (state, action) => {         // use for remove any booking by their id 
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },

    // Set the active booking
    setActiveBooking: (state, action) => {     // used for when we set specific booking data e.g click on specifi booking ang se the data so the data set in this 
      state.activeBooking = action.payload;
    },

    // Clear the active booking
    clearActiveBooking: (state) => {
      state.activeBooking = null;
    },
  },
});

export const {
  setBookings,
  removeBooking,
  setActiveBooking,
  clearActiveBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
