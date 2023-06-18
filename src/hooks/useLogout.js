import { useNavigate} from "react-router-dom";
import { auth } from "../firebase/firebaseConfig"; 
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";
import { signOut } from "firebase/auth";
 export  const useLogout =() => {
const navigate = useNavigate();
 const { dispatch,user  } = useAuthContext();
 const { updateOnlineOff } = useFirestore('users')
const logout = async()=>{
await signOut(auth)
await updateOnlineOff(user.uid)
 dispatch({type:"LOGOUT"})
  navigate('/')
}
    return { logout } 
     

};

