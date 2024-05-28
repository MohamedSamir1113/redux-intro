import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  currency: "USD",
  //isLoading: false,
};
/*
export default function accountReducer(
  currState = initialState,
  action
) {
  switch (action.type) {
    case "account/deposit":
      if (action.payload.converted && action.payload.base)
        return {
          ...currState,
          balance: currState.balance + action.payload.converted,
          currency: action.payload.base,
          isLoading: false,
        };
      return { ...currState, balance: currState.balance + action.payload };
    case "account/withdraw":
      return { ...currState, balance: currState.balance - action.payload };
    case "account/requestLoan":
      if (currState.loan > 0) return currState;
      return {
        ...currState,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: currState.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...currState,
        balance: currState.balance - currState.loan,
        loan: 0,
        loanPurpose: "",
      };
    case "account/convertingCurrency":
      return { ...currState, isLoading: action.payload };

    default:
      return currState;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency", payload: true });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    const base = data.base;

    dispatch({ type: "account/deposit", payload: { converted, base } });
  };
}
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
*/

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit: {
      prepare(converted, base) {
        return {payload:{converted,base}}
      },
      reducer(currState, action) {
        currState.balance = currState.balance + action.payload.converted;
        currState.currency = action.payload.base;
      },
    },
    withdraw(currState, action) {
      currState.balance = currState.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(currState, action) {
        if (currState.loan > 0) return;
        currState.loan = action.payload.amount;
        currState.loanPurpose = action.payload.purpose;
        currState.balance = currState.balance + action.payload.amount;
      },
    },
    payLoan(currState, action) {
      currState.balance -= currState.loan;
      currState.loan = 0;
      currState.loanPurpose = "";
    },
  },
});

export default accountSlice.reducer;

const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency", payload: true });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;
    const base = data.base;

    dispatch({ type: "account/deposit", payload: { converted, base } });
  };
}
export { withdraw, requestLoan, payLoan };
