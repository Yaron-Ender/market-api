import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export const useQueryRanks=(_collection)=>{
 const [arrayOfRanks, setArrayOfRanks] = useState([]);
  const [error, setError] = useState(null); 
useEffect(()=>{
setArrayOfRanks((prev)=>(prev=[]))
 let refCol= collection(db,_collection)
const arr = []
const unsub = onSnapshot(refCol,(snapshot)=>{
snapshot.docs.forEach((sub)=>{
 if(!arr.includes(sub.id)){
//BECAUSE SOME OF THE DOCUMENT WE LOOPING THROUGHT ARE BELONG TO BUYERS, WE GET undefined ON THIS ITERAION
if(sub.data().rank !== undefined){
arr.push(sub.data().rank)
setArrayOfRanks((prev)=>(arr))
}
}
}
)
if (snapshot.empty){
  setError('the collection is empty')
}
},(err)=>{
  setError(err.message);
  console.log(err.message);
})
return ()=>{unsub()}
},[_collection])
return { arrayOfRanks, error };
}
