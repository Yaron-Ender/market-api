import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"
import { useFirestore } from "./useFirestore"
// import { db } from "../firebase/firebaseConfig"
export const useLogin = ()=>{
const navigate = useNavigate();
const [isPending,setIsPending]=useState(false)
const [error,setError] = useState(null)
const {dispatch,user} = useAuthContext()
const { getDocument,updateOnlineOn } = useFirestore("users");
const login =async(email,password)=>{
try{
setIsPending(true)
const {user} =  await signInWithEmailAndPassword(auth,email,password)
if(!user){
setError("could not login");
throw new Error('could not login')
}
dispatch({type:"LOGIN",payload:user})
const document = await getDocument(user.uid);
if(document['seller']){
 await updateOnlineOn(user.uid)
 dispatch({ type: "LOGIN", payload: { ...user,seller: true } });
 navigate("/seller");
}else{
dispatch({ type: "LOGIN", payload: { ...user, seller: false } });
navigate("/buyer");
}
setError(null)
}catch(err){
setIsPending(false)
console.log(err.message)
switch(err.message){
case'Firebase: Error (auth/wrong-password).':
setError('worg password :(')
break;
case'Firebase: Error (auth/user-not-found).':
setError("User not found :(");
break;
default:
setError(err.message)

}
}
}
return {login,isPending,error}
}