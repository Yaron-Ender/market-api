import { toast } from "react-toastify";
import { db } from "../firebase/firebaseConfig" 
import { collection, deleteDoc, doc } from "firebase/firestore"
 export const useFirestore = (_collection)=>{
const refCol = collection(db,_collection);
const deleteDocument =async(id)=>{
try{
await deleteDoc(doc(refCol,id))
}catch(err){
console.log(err)
}
}
return {deleteDocument}
}