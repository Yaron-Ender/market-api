import { useEffect, useState } from "react";
import {Outlet,Link} from "react-router-dom";
const IntroLayout = () => {
const [mobile,setMobile]=useState(false);
useEffect(()=>{
if(window.innerWidth<520){
  setMobile(true)
}
},[])
  return (
<div className="intro">
<div className="intro-text">
<h2>the place when seller and buyer meet <span className="accent">directly</span> </h2>
<h3>SIGN UP either as seller or buyer
{!mobile&&<span>, or login with the button at the up right corner</span>}</h3>

</div>
<main className={`${mobile?'mobile':''}`}>
<div className="registration-pannel">
<div className="seller">
<Link to='signup' state={{seller:true}} className="btn btn-regestration">Seller</Link>
</div>
<div className="buyer">
<Link to='signup' state={{seller:false}}   className="btn btn-regestration">Buyer</Link>
</div>
</div>
<Outlet />    
</main>
</div>

  );
};
export default IntroLayout;
//loader
// export function introLoader() {
// const { user,authIsReady } = useAuthContext()
// return{user,authIsReady}

// }

//action
// export async function introAction({ request }) { 
//    const { signup } = useSignup();
//   const data = await request.formData();
//   const {displayName,email,password,...values} = Object.fromEntries(data)
//   if(values._action==='signup'){
//  try{
// return redirect('/')
//  }catch(err){
//  throw new Error(err.message)
//  }
//   }
// }
