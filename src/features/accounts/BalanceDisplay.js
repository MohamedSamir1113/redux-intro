import { useSelector } from "react-redux";

function formatCurrency(value,currency) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency,
  }).format(value);
}

function BalanceDisplay() {
  const curren=useSelector((store)=>store.account.currency)
  
  const balance=useSelector(store=>store.account.balance)
  return <div className="balance">{formatCurrency(balance,curren)}</div>;
}

export default BalanceDisplay;
