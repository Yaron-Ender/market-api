import { AuthContex } from "../context/authContext";
import { useContext } from "react";

export const useAuthContext = ()=>{
 const context = useContext(AuthContex);
 if(!context){
 throw new Error('useAuthContext must be inside an AuthcontextProvider')
 }
 return context
}