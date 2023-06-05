import { useState,useEffect} from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
const {login,isPending,error}= useLogin()
const [ps, setPS] = useState("");
const [email, setEmail] = useState("");
const handleLoginForm=async(e)=>{
 e.preventDefault();
 await login(email,ps);
setPS('');
setEmail('');

}
useEffect(() => {
  document.forms.login.elements[0].focus();
}, []);
    return (
   <div className="form-container" id="login">
<h2>login</h2> 
<form  name='login' className="form" onSubmit={handleLoginForm}>
<div className="input-wrapper">
<input type="email" id='email' name="email" placeholder="email" autoComplete="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
<label htmlFor="email" className="form-label">Email</label> 
</div>
<div className="input-wrapper">
<input type="password" id='password' name="password" placeholder="password" pattern="[a-zA-Z0-9]{6,}" required
onChange={(e)=>{setPS(e.target.value)}}
value={ps}
/>
<label htmlFor="password" className="form-label">Password</label> 
</div>
<button className="btn">
{(isPending)?'Loading...':'Login'}
  </button>
{error&&<div  className="err-msg">
<h3>{error}</h3>
  </div>}
</form>  
</div>
    );
};

export default Login;