import { useLoaderData } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const TransactionLayout = () => {
const {user}=useLoaderData()
    return (
        <div>
         <h1>welcom to transcation page</h1>   
        </div>
    );
};

export default TransactionLayout;

export const loader = ()=>{
const { user }=useAuthContext()
 return {user}
}