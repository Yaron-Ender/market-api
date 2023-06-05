import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase/firebaseConfig"
import { useAuthContext } from "./useAuthContext"
import { useNavigate } from "react-router-dom"
export const useLogin = ()=>{
const navigate = useNavigate();
const [isPending,setIsPending]=useState(false)
const [error,setError] = useState(null)
const {dispatch,user} = useAuthContext()
const login =async(email,password)=>{
try{
setIsPending(true)
const {user} =  await signInWithEmailAndPassword(auth,email,password)
if(!user){
setError("could not login");
throw new Error('could not login')
}
setError(null)
dispatch({type:"LOGIN",payload:user})
if(user.seller){
    navigate("/seller");
}else{
 navigate("/buyer");
}
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