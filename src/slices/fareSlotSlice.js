// slices/fareSlotSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fareSlot: {
    initialFreeKM: 5,
    initialCharge: 50,
    perKMCharge: 10,
    // Add other default values as needed
  }
};

export const fareSlotSlice = createSlice({
  name: 'fareSlot',
  initialState,
  reducers: {
    updateFareSlot: (state, action) => {
      state.fareSlot = { ...state.fareSlot, ...action.payload };
    },
  },
});

export const { updateFareSlot } = fareSlotSlice.actions;
export default fareSlotSlice.reducer;