import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(currState = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...currState, balance: currState.balance + action.payload };
    case "account/withdraw":
      return { ...currState, balance: currState.balance - action.payload };
    case "account/requestLoan":
      if (currState.loan > 0) return;
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

    default:
      return currState;
  }
}

function customerReducer(currState = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...currState,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...currState, fullName: action.payload };

    default:
      return initialStateCustomer;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
function payLoan() {
  return { type: "account/payLoan" };
}
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState().account);


function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}


store.dispatch(createCustomer("simo", "20196045"));
console.log(store.getState().customer);

store.dispatch(updateName("simomanga"));
console.log(store.getState().customer);
