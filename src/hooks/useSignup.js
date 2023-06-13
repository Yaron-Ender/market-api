import { useState } from "react";
import { auth,db,storage,timestamp } from "../firebase/firebaseConfig" 
 import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
 import { doc,getDoc,setDoc } from "firebase/firestore";
 import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useAuthContext } from "./useAuthContext";
import { redirect, useNavigate } from "react-router-dom";

 export const useSignup = ()=>{
 const { dispatch } = useAuthContext();
 const [isPending,setIsPending]=useState(false);
 const[errorMsg,setErrorMsg]=useState(null);
 const navigate = useNavigate()
//************************** */
//Signup function for sellers
//************************** */
const signupSeller = async(email,password,displayName,phoneNumber,region,thumbnail)=>{
setIsPending(true)
setErrorMsg(null)
try{
const {user} =await createUserWithEmailAndPassword(auth,email,password)
if(!user){
throw new Error('there was problem to form your account')
}
let photoURL=''
if(!thumbnail){
const imageRef = ref(storage,'default-avatar/user.png');
 photoURL = await getDownloadURL(imageRef);
await updateProfile(user, { displayName,photoURL });   
}else{
const imageRef = ref(storage,`images/${user.uid}/${thumbnail.name}`)
await uploadBytes(imageRef,thumbnail);
  photoURL = await getDownloadURL(imageRef)
 await updateProfile(user, { displayName,photoURL });
}
setIsPending(false)
//create user in firestore
const docReff =doc(db,'users',user.uid)
const userDoc= await getDoc(docReff)
if(!userDoc.exists()){
setDoc(docReff, { displayName, id: user.uid, photoURL, phoneNumber, region,seller:true,online:true,dateReistration:timestamp}); 
dispatch({ type: "LOGIN", payload: {...user,phoneNumber,seller:true} });
//create products document
const docRefProduct = doc(db,'products',user.uid)
const productsDoc =await getDoc(docRefProduct)
if(!productsDoc.exists()){
 setDoc(docRefProduct,{id:user.uid,region,products:[]})
}
navigate('/seller')
}
}catch(err){
console.log(err.message)
setErrorMsg(err.message)
setIsPending(false)
}
}
//************************** */
//Signup function for buyres
//************************** */
const signupBuyer =async(email, password, displayName) => {
setIsPending(true)
setErrorMsg(null)
try{
const {user} =await createUserWithEmailAndPassword(auth,email,password)
if(!user){
throw new Error('there was problem to form your account')
}
setIsPending(false)
 await updateProfile(user, { displayName });
//create user in firestore
const docReff =doc(db,'users',user.uid)
const userDoc= await getDoc(docReff)
if(!userDoc.exists()){
setDoc(docReff, { displayName, id: user.uid,seller:false}); 
dispatch({ type: "LOGIN", payload: { ...user,seller: false } });
navigate('/buyer')
}
}catch(err){
console.log(err.message)
setErrorMsg(err.message)
setIsPending(false)
}
};
 return {signupSeller,signupBuyer,isPending,errorMsg } 
}
