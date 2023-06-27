import { useState,useEffect} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection,query,where,getDocs } from "firebase/firestore";

export const useQuery = (_collection,field,value,dis,product)=>{
 const colRef = collection(db,_collection);
 const q= query(colRef,where(field,'array-contains',value))
 const [arrayOfDocQuery,setArrayOfDocQuery] = useState([]);
const [error, setError] = useState(null); 
const [rerender,setRerender]=useState(false);
// console.log(dis)
  useEffect(()=>{
  setRerender(dis)
  const x = async () => {
  let queryDocs;
  if (dis === "All Districts") {
    queryDocs = await getDocs(colRef);
  } else {
    queryDocs = await getDocs(q);
  }
if(!queryDocs.empty){
  const arr = [];
   queryDocs.forEach((_doc) => {
  if (!arr.includes(_doc.id)) {
  arr.push(_doc.data());
   }
  })
// cration of array with 2 properties [region:[{},{}],produtObject:product:'carrot',amount:5]
 let ArrProductAndRegion =  arr.filter((object)=>{
   return object.products.find((productsObj)=>{
  return  productsObj.product===product
 })
}).map((object)=>{
  const {region}=object
  const productObject = object.products.find(object=>object.product===product)
 return {region,productObject}
})
   setArrayOfDocQuery(ArrProductAndRegion);
}else{
setError('sorry, No query is match')
}
  };
x()
  },[_collection,dis])
 return {error,arrayOfDocQuery};
}