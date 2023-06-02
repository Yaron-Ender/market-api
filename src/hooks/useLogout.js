import { auth } from "../firebase/firebaseConfig"; 
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
 export  const useLogout =() => {
 const { dispatch } = useAuthContext();
const logout = async()=>{
await signOut(auth)
 dispatch({type:"LOGOUT"})
}
    return { logout } 
     

};

