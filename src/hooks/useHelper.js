import { useState } from "react";
import { useFirestore } from "./useFirestore"
//build prices Array from requested product
export const pricesArr =async (arrID,product)=>{
const {getDocument}=useFirestore('products');
// const [test,setTest]=useState('hai');
// const [arrayOfPrices,setArrayOfPrices]=useState('');
const pricesArr=[]
  arrID.forEach(async(id)=>{ 
  const document = await getDocument(id)
  if(document.products.length>0){
const extractPrice =  document.products.filter(obj=>obj.product===product).map(obj=>+obj.amount)
pricesArr.push(...extractPrice)
console.log(pricesArr)

//  setArrayOfPrices(pricesArr)
}
})
// return {arrayOfPrices}
}
