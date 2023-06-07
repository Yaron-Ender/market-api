
import { toast } from "react-toastify";
import { auth } from "../firebase/firebaseConfig";
import { deleteUser } from "firebase/auth";
export const usefirebaseAuth = ()=>{
const deleteFromAuth = async()=>{
    const user = auth.currentUser;
    deleteUser(user).then(()=>{
 return toast.success("you've deleted your acount!")
}).catch((err)=>{
    console.log(err)
     return toast.error("sorry , your acount couldn't be deleted");
    })
}
return{deleteFromAuth}
}