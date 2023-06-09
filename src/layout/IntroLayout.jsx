import { useEffect, useState } from "react";
import {Outlet,Link,useLocation} from 
"react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
const IntroLayout = () => {
const {user}=useAuthContext();
const location = useLocation();
const [mobile,setMobile]=useState(false);
useEffect(()=>{
if(window.innerWidth<520){
  setMobile(true)
}
},[user])

  return (
<div className="intro"> 
<div className="intro-text">
<h2>The place where seller meet buyers <span className="accent">directly</span> </h2>
<h3>SIGN UP either as seller or buyer
{!mobile&&<span>, or login with the button at the up right corner</span>}</h3>

</div>
<main className={`${mobile?'mobile':''}`}>
{location.pathname!=='/login'&&
<div className="registration-pannel">
<div className="seller">
<Link to='signup' state={{seller:true}} className="btn btn-regestration">Seller</Link>
</div>
<div className="buyer">
<Link to='signup' state={{seller:false}}   className="btn btn-regestration">Buyer</Link>
</div>
</div>
}
<Outlet />    
</main>
</div>

  );
};
export default IntroLayout;
