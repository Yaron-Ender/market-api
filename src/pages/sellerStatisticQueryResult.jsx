import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import { useHelper } from "../hooks/useHelper";
const SellerStatisticQueryResult = ({ arrayOfDocQuery,product,userId,district}) => {
//in order to get products doc of every user
 const { getDocument } = useFirestore("products");
 //in order to get user price
 const { document } = useDocument("products",userId)
//in case of ALL DISTRICTS - doc of products
const {arrayOfDocID}=useCollection('products')
//format currency
const {formatCurrency}=useHelper();
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    const [avg, setAvg] = useState("");
    const [userPrice,setUserPrice]=useState("");
    const [solo,setSolo]=useState(false)
useEffect(()=>{
  if(document){
    const price = document.products.filter(item=>item.product===product)
    .map(obj=>+obj.amount)
    setUserPrice(price)
  }   
},[document,product]) 

useEffect(()=>{
if(arrayOfDocQuery){
  const x =async ()=>{
    const pricesArr2 = [];
//if one of district has been chosen
if(arrayOfDocQuery.length>0){
//if we chose region that is not the seller region we have know it in order to add it to the avg calculation
if(arrayOfDocQuery.find(id=>id!==document.id)){
console.log('not the same region')
pricesArr2.push(userPrice[0]);
}
arrayOfDocQuery.forEach(async(id)=>{
const document = await getDocument(id);
const extractPrice = document.products
.filter((obj) => obj.product === product)
.map((obj) => +obj.amount);
console.log(extractPrice)
pricesArr2.push(...extractPrice);
setMin(Math.min(...pricesArr2))
setMax(Math.max(...pricesArr2))
  setAvg((prev)=>{
  prev = pricesArr2.reduce((acc, curr) => {
    acc += curr;
    return acc
  }, 0);
  return (prev / pricesArr2.length).toFixed(2)
})
if (pricesArr2.length === 1&&min===max&&min===Number(userPrice[0])) {
  setSolo(true);
} else {
  setSolo(false);
}
})
}
//if all districts have been chosen
if(arrayOfDocQuery.length<1&&!district){
arrayOfDocID.forEach(async (id) => {
const document = await getDocument(id);
const extractPrice = document.products
.filter((obj) => obj.product === product)
.map((obj) => +obj.amount);
pricesArr2.push(...extractPrice);
setMin(Math.min(...pricesArr2));
setMax(Math.max(...pricesArr2));
setAvg((prev) => {
prev = pricesArr2.reduce((acc, curr) => {
  acc += curr;
  return acc;
}, 0);
return (prev / pricesArr2.length).toFixed(2);
});
if (pricesArr2.length === 1 ) {
setSolo(true)
}else{
setSolo(false)
}

});
}
}
x()
}
},[arrayOfDocQuery,product])

  return (
    <div className="result-statistic-container">
{/* price is less than AVG */}
{avg - Number(userPrice[0]).toFixed(2) > 0 && !solo && (
<div className="message">
<span>
  Your price <span className="accent">{formatCurrency(userPrice)} </span> for product - <span className="accent">{product}</span> is less
  than the avarage price at {formatCurrency((avg - userPrice).toFixed(2))}
</span>
</div>
)}
{/* price is above AVG */}
  {avg - Number(userPrice[0]).toFixed(2) < 0 && !solo && (
  <div className="message">
<span>
  Your price  <span className="accent">{formatCurrency(userPrice)} </span> for product - <span className="accent">{product}</span> is more
  than the avarage price at {(userPrice - avg).toFixed(2)}
</span>
</div>
      )}
 {avg - Number(userPrice[0]).toFixed(2) === 0 && !solo && (
  <div className="message">
<span>
Your price<span className="accent">{formatCurrency(userPrice)} </span> for product- <span className="accent">{product}</span> is the
avarage price
</span>
</div>
  )}
  {/* solo Seller in spesific region*/}
<div className="message">
  {solo && <span>🏆 You are the only seller of <span className="accent">{product}</span> in this district 🏆 </span>}
</div>
{/* no seller in this district */}
{min == "Infinity" && (
<div className="message">
<span>No seller sells this product in this district</span>
</div>
)}
{/* one Seller that is not the user */}
  {min===max&&avg!==Number(userPrice[0]).toFixed(2)&&
  <div className="">
    <small>There is only one seller of this product in this district</small>
  </div>
  }

<div className="avg">
  {avg && avg !== "NaN" && !solo && <span>The AVG price is {formatCurrency(avg)}</span>}
</div>
{/* PROGRESS BAR */}
{!solo && min != "Infinity" && max != "Infinity" && (
  <div className="progress-container">
    {min !== max &&
    <>
    <progress max={max}  value={Number(userPrice[0]).toFixed(2)}></progress>
   <div className="text-box">
      <span> {formatCurrency(0)} </span>
      <span>highest price  {formatCurrency(max)} </span>
    </div>
  </>
    }
{/*case that one product but not belong the user */}
    {min === max&&avg!==Number(userPrice[0]).toFixed(2) && 
    <>
    <progress max={max} value={Number(userPrice[0]).toFixed(2)}></progress>
    <div className="text-box">
      <span> {min} </span>
      <span>{avg}</span>
      <span> {max} </span>
    </div>
    </>
    }
  </div>
)}
</div>
  );

};

export default SellerStatisticQueryResult;