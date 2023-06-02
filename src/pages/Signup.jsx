import { useState,useEffect} from "react";
import { useSignup } from "../hooks/useSignup";
import { useLocation } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid"; 
import Select from "react-select";
import { useData } from '../hooks/useData'
const Signup = () => {
//from react router
const { state} =useLocation();
//regions data array
const { sellersRegion,regionSelect }=useData()
const { signupSeller,signupBuyer,isPending,errorMsg:errFromAuth } =useSignup();
const [mobile,setMobile]=useState(false);
const [seller,setSeller]=useState(false);
const [username,setUsername]=useState('');
const [email,setEmail]=useState('');
const [emailMsg,setEmailMsg]=useState('');
const [ps,setPS]=useState('');
const [conformPS,setConformPS]=useState('');
const [passwordMsg,setPasswordMsg]=useState('');
const [dis,setDis]=useState(true);
const [phone,setPhone]=useState('');
const [region,setRegion]=useState('');
const [regionMsg,setRegionMsg]=useState('')
const [thumbnail,setThambnail]=useState(null);
const [thumbnailMsg,setThumbnailMsg]=useState('');

//state.seller comes from signup Link
useEffect(()=>{
if(state.seller){
setSeller(true)
}else{
setSeller(false)
}
if(errFromAuth){
setEmailMsg(errFromAuth)
}
},[seller,state,errFromAuth])
//focus on the first input at the begining
//check if to apply mobile layout
useEffect(()=>{
document.forms.signup.elements[0].focus()
if (window.innerWidth < 520) {
  setMobile(true);
}
},[])
//submit form function
const handleFormSubmit =async(e)=>{
e.preventDefault();
//region comes from the Select
if(!region){
setRegionMsg('must choose a region')
}
if(ps!==conformPS){
setPasswordMsg('password does not conformed')
}
if(ps===conformPS&&region&&state.seller){
await signupSeller(email,ps,username,phone,region,thumbnail);
setPhone('')
setPS('');
setUsername('');
setEmail('');
setConformPS('')
}
if(!state.seller){
await signupBuyer(email, ps, username);
setPS("");
setUsername("");
setEmail("");
setConformPS("");
}
}
//handle with email
const handleEmail =(e)=>{
setEmailMsg('')
setEmail(e.target.value);
}
//handle with confirm PS
const handleConfirmPS = (e)=>{
setConformPS(e.target.value)
setPasswordMsg('')
//if password === confirm password, turn the disable to false
if(e.target.value===ps){
setDis(false)
}
}
//handle with region
const handleRegion = (option)=>{
  setRegionMsg('')
  setRegion(option);
}
//handle with thumbnail
const handleFileChange = (e)=>{
setThumbnailMsg('')
let selected = e.target.files[0];
if(selected){
if(!selected.type.includes('image')){
setThumbnailMsg('Selected file must be image')
return
}
if (selected.size > 10000000) {
setThumbnailMsg("Image file size must be less than 100kb");
return
}
setThambnail(selected)
}
}
return (
<div className="form-container">
<h2>{seller ? "Seller" : "Buyer"} Signup</h2>
<form
name="signup"
className={`form ${seller ? "seller-form-container" : ""} ${mobile ?'mobile':''}`}
onSubmit={handleFormSubmit}
>
<div className="input-wrapper">
<input
type="text"
id="displayName"
name="displayName"
placeholder="user name"
autoComplete="given-name"
onChange={(e) => {
setUsername(e.target.value);
}}
value={username}
/>
<label htmlFor="displayName" className="form-label">
User Name
</label>
</div>
<div className="input-wrapper">
<input
type="email"
id="email"
name="email"
placeholder="email"
autoComplete="email"
onChange={handleEmail}
value={email}
required
/>
<label htmlFor="email" className="form-label">
Email
</label>
{emailMsg&&
<small className="err-msg">{emailMsg}</small>
}
</div>
{seller && (
<>
<div className="input-wrapper">
<input
type="number"
id="tel"
name="phone"
placeholder="phone"
onChange={(e) => {
setPhone(e.target.value);
}}
value={phone}
required
/>
<label htmlFor="phone" className="form-label">
Phone
</label>
</div>
<div className="input-wrapper">
<Select
options={sellersRegion}
styles={regionSelect}
placeholder="Select Region"
onChange={(option)=>{handleRegion(option)}}
isClearable={true}
isMulti
/>
{regionMsg&&<span className="err-msg">{regionMsg}</span>}
</div>
</>
)}
<div className="input-wrapper">
<input
type="password"
id="password"
name="password"
placeholder="password"
pattern="[a-zA-Z0-9]{6,}"
required
onChange={(e) => {
setPS(e.target.value);
}}
value={ps}
/>
<label htmlFor="password" className="form-label">
Password
</label>
<small className="password">password must be at least 6 char. long.</small>
</div>
<div className="input-wrapper">
<input
type="password"
id="confirmPS"
name="confirmPS"
placeholder="confirm password"
required
onChange={handleConfirmPS}
value={conformPS}
/>
<label htmlFor="confirmPS" className="form-label">
Confirm Password
</label>
{passwordMsg&&<span className="err-msg">{passwordMsg}</span>}
</div>
{seller&&
<div className="input-wrapper profile-avatar">
<input type="file" id="profile-avater" name="avatar-file"
accept=".jpg, .jpeg, .png"
onChange={handleFileChange}
/>
{thumbnailMsg&&
  <label htmlFor="profile-avater" className="error-text">
{thumbnailMsg}
</label>
}
{!thumbnailMsg&&
  <label htmlFor="profile-avater">
add profile avatar (optinal)
</label>
}
</div>
}
<button className="btn" disabled={dis}>
{isPending ? (
"Loading..."
) : (
<>
<span>Creat Acount</span> <UserPlusIcon width={20} />
</>
)}
</button>
</form>
</div>
);
};

export default Signup;