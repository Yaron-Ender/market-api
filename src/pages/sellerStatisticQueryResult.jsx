import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import { useHelper } from "../hooks/useHelper";
import { set } from "date-fns";
const SellerStatisticQueryResult = ({ arrayOfDocQuery,product,userId,district}) => {
//REBUILD COMPONENT
// //format currency
 const {formatCurrency}=useHelper();
const [userPrice,setUserPrice]=useState('');
const [userRegion,setUserRegion]=useState('');
const [arrOfpricesState,setArrOfPricesState]=useState([]);
const [avg,setAvg]=useState('');
const [msg,setMsg]=useState('');
const [solo,setSolo]=useState(false);
//in order to get user price
const { document } = useDocument("products",userId);
const arrPrices=[]
//handle with spacial cases that there is only one result
const findSellerUniqueness = ()=>{
//if[price]is the same price of the user and district is the same region of the user so it must be the user price
if(userPrice&&userPrice===arrayOfDocQuery[0].productObject.amount&&
  district===document.region.map(obj=>obj.label).find(label=>label===district)
  ){
setMsg(`🏆You are the only seller of ${product} in your district🏆`);
setSolo(true)
}
//if after search in all the districts we get [price] that is the same price of the user it means that it's comes from the user
if(district==="All Districts"&&userPrice&&userPrice===arrayOfDocQuery[0].productObject.amount){
 setSolo(true);
 setMsg(`🏆You are the only seller of ${product} in all districts🏆`); 
}
}
//handle case of singel seller-empty array
const handleSingelSeller =()=>{
 setMsg(`Nobody sells ${product} in ${district} district`);
 setSolo(true)
}
//USEEFFECT FOR EXTRACT USER PRICE AND REGION
useEffect(()=>{
if(document){
let productObj= document.products.find(obj =>obj.product === product);
setUserPrice(productObj.amount)
setUserRegion(document.region)
}
},[document,arrayOfDocQuery])
//HANDLE WITH ARRAY OF DOC
useEffect(()=>{
if(arrayOfDocQuery&&arrayOfDocQuery.length>0){
setMsg('');
setSolo(false)
arrayOfDocQuery.forEach((obj)=>{
arrPrices.push(+obj.productObject.amount)
})
if(arrPrices.length===1){
findSellerUniqueness()
console.log('hai')
}
}else{
handleSingelSeller()
setAvg('')
}
if(arrayOfDocQuery.length>0){
setAvg((prev)=>{
prev = arrPrices.reduce((acc,curr)=>{
acc += curr;
return acc
},0)
return prev / arrPrices.length
})
}
console.log(avg)
},[arrayOfDocQuery])


return(
<div className="result-statistic-container">
 {/* price is less than AVG */}
{!solo&&Number(avg).toFixed(2) - Number(userPrice).toFixed(2) > 0 && (
<div className="message">
<span>
Your price <span className="accent">{formatCurrency(userPrice)} </span> for product - <span className="accent">{product}</span> is less
than the avarage price by {formatCurrency((avg - userPrice).toFixed(2) )}
 <span> in <span className="accent">{(district==='All Districts')?' All Districts':district+' district'}</span></span>
</span>
</div>
)}
{/* price is above AVG */}
{!solo&&Number(avg).toFixed(2) - Number(userPrice).toFixed(2) < 0 &&(
<div className="message">
<span>
Your price <span className="accent">{formatCurrency(userPrice)} </span> for product - <span className="accent">{product}</span> is above
than the avarage price by {formatCurrency((userPrice - avg).toFixed(2) )}
 <span> in <span className="accent">{(district==='All Districts')?' All Districts':district+' district'}</span>  </span>
</span>
</div>
)}
{/* price is AVG */}
{!solo&&Number(avg).toFixed(2) - Number(userPrice).toFixed(2) === 0 &&(
<div className="message">
<span>
Your price <span className="accent">{formatCurrency(userPrice)} </span> for product - <span className="accent">{product}</span> is the Avarage price 
 <span> in <span className="accent">{(district==='All Districts')?' All Districts':district+' district'}</span>  </span>
</span>
</div>
)}
{/* nobody selles this product in this region */}
{msg&&
<div className="message">
<span className="accent">{msg}</span>
</div>
}
{avg&&
<div className="avg">
<p>the AVG price is <span>{formatCurrency(avg)}</span></p>
</div>
}
 </div>
)

};

export default SellerStatisticQueryResult;