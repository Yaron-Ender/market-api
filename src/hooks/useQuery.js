import { useState,useEffect} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection,query,where,onSnapshot,getDocs } from "firebase/firestore";

export const useQuery = (_collection,field,value,dis)=>{
 const colRef = collection(db,_collection);
 const q= query(colRef,where(field,'array-contains',value))
 const [arrayOfDocQuery,setArrayOfDocQuery] = useState([]);
const [error, setError] = useState(null); 
const [rerender,setRerender]=useState(false);

  useEffect(()=>{
  setRerender(dis)
  const x = async () => {
  const queryDocs = await getDocs(q);
  const arr = [];
   queryDocs.forEach((_doc) => {
  if (!arr.includes(_doc.id)) {
    arr.push(_doc.id);
   }
  });
   setArrayOfDocQuery(arr);
  };
x()
  },[_collection,dis])
 return {error,arrayOfDocQuery};
}