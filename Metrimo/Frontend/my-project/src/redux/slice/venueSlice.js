import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venues: [],
  activeVenue: null,
};

const venueSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {
    setVenues: (state, action) => {
      state.venues = action.payload;
    },
    setActiveVenue: (state, action) => {
      state.activeVenue = action.payload;
    },
    resetVenues: (state) => {
      state.venues = [];
    },
    clearActiveVenue: (state) => {
      state.activeVenue = null;
    },
    removeVenue: (state, action) => {
      state.venues = state.venues.filter(
        (venue) => venue._id !== action.payload
      );
    },
  },
});

export const {
  setVenues,
  setActiveVenue,
  resetVenues,
  clearActiveVenue,
  removeVenue,
} = venueSlice.actions;

export default venueSlice.reducer;