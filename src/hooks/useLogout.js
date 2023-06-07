import { auth } from "../firebase/firebaseConfig"; 
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";
import { signOut } from "firebase/auth";
 export  const useLogout =() => {
 const { dispatch,user  } = useAuthContext();
 const { updateOnlineOff } = useFirestore('users')
const logout = async()=>{
await signOut(auth)
await updateOnlineOff(user.uid)
 dispatch({type:"LOGOUT"})
}
    return { logout } 
     

};

