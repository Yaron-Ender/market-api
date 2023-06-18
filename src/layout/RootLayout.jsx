import { useEffect } from "react";
import { Outlet,useNavigate} from "react-router-dom";
import Navbar from "../component/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
const RootLayout = () => {
  const {user}=useAuthContext();
   const navigate = useNavigate();
useEffect(()=>{
if(user){
if(user.photoURL){
  navigate("/seller");
}else{
  navigate("/buyer");
}
}
},[user])
return (
<div className="rootLayout">
  <Navbar  />
  <main>
  <Outlet />
  </main>
</div>
    );
};

export default RootLayout;
