import { db } from "../firebase/firebaseConfig";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
export const useQueryOrders = (_collection,_queryArr)=>{
    const [arrayOfOrders,setArrayOfOrders]=useState([]);
    const [error,setError]=useState(false);
    const _query = useRef(_queryArr).current
useEffect(()=>{
const colRef = collection(db, _collection);
const q = query(colRef,where(..._query))
const unsub = onSnapshot(q,(snapshot)=>{
let result = [];
snapshot.docs.forEach((sub)=>{
result.push({docID:sub.id,...sub.data()})
})
setArrayOfOrders(result)
setError(null);

},(err)=>{
setError(true);
console.log(err.message)
})
return ()=>unsub()
 },[_collection])

 return {arrayOfOrders,error}
}