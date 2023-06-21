
import { db } from "../firebase/firebaseConfig" 
import { addDoc, collection, deleteDoc, doc,getDoc,setDoc,updateDoc } from "firebase/firestore"
 export const useFirestore = (_collection)=>{
const refCol = collection(db,_collection);
//Delete Document 
const deleteDocument =async(id)=>{
try{
await deleteDoc(doc(refCol,id))
}catch(err){
console.log(err)
}
}
//delete few documents
const deleteFewDocs =async(id)=>{
  try {
    await deleteDoc(doc(db,'products',id)) 
    await deleteDoc(doc(db,'users',id)) 
  } catch (err) {
    console.log(err);
  }
}
// get document
const getDocument =async(docID)=>{
const docRef = doc(refCol, docID);
const document =await getDoc(docRef);
if (document.exists()) {
 return document.data()
} else {
  console.log("document doesnt exixst");
}
}
//update document
const updateDocuemt =async(id,value)=>{
 const docRef = doc(refCol,id);
 try {
   await updateDoc(docRef,value);
 } catch (err) {
   console.log(err.message);
 }   
}
//update with set methode
const setDocument =async(id,value)=>{
 const docRef = doc(refCol, id);
 try {
   await setDoc(docRef, value,{merge:true});
 } catch (err) {
   console.log(err.message);
 }  
}
//add document with add method
const addDocument =async(value)=>{
console.log(value)
try{
await addDoc(refCol,value)
}catch(err){
console.log(err.message);
}  
}
const updateOnlineOn =async (docID)=>{
const docRef = doc(refCol, docID);
try{
await updateDoc(docRef,{online:true})
}catch(err){
console.log(err.message)
}
}
const updateOnlineOff =async (docID)=>{
const docRef = doc(refCol, docID);
try{
await updateDoc(docRef,{online:false})
}catch(err){
console.log(err.message)
}
}
return {deleteDocument,deleteFewDocs,updateDocuemt,setDocument,addDocument,getDocument,updateOnlineOn,updateOnlineOff}
}