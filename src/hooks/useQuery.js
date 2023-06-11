import { useState,useEffect} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection,query,where,onSnapshot } from "firebase/firestore";

export const useQuery = (_collection,field,value,dis)=>{
 const colRef = collection(db,_collection);
 const q= query(colRef,where(field,'array-contains',value))
 const [arrayOfDocQuery,setArrayOfDocQuery] = useState(null);
const [error, setError] = useState(null); 
const [rerender,setRerender]=useState(false);

useEffect(()=>{
const arr = [];
setRerender(dis)
const unsub = ()=>{
 onSnapshot(q,(snapshot)=>{
snapshot.docs.forEach((_doc)=>{
if(!arr.includes(_doc.id)) {
  console.log(_doc.id)
arr.push(_doc.id);
}
setArrayOfDocQuery((prev) =>(prev = arr));
})
},(err)=>{
    setError(err.message);
    console.log(err.message);
}) 
}  

return ()=>{unsub()}
 },[_collection,dis,rerender])
 return {arrayOfDocQuery,error};
}