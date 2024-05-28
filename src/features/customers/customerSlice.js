import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID, createdAt) {
        return { payload: { fullName, nationalID, createdAt:new Date().toISOString() } };
      },
      reducer(currState, action) {
        currState.fullName = action.payload.fullName;
        currState.nationalID = action.payload.nationalID;
        currState.createdAt = action.payload.createdAt;
      },
    },
    updateName(currState, action) {
      currState.name = action.payload;
    },
  },
});

export default customerSlice.reducer

export const {createCustomer,updateName} = customerSlice.actions
