import { useSelector } from "react-redux";

function Customer() {

 const name=useSelector((state)=>state.customer.fullName)
  return <h2>👋 Welcome, {name}</h2>;
}

export default Customer;
