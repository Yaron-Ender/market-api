import { useState,useEffect } from "react";
import { Form,useActionData } from "react-router-dom";
import { useData } from "../hooks/useData";
import { useAuthContext } from "../hooks/useAuthContext";
import Select from "react-select";
const AddproductForm = () => {
//FORM ACTION
const msg=useActionData()
const { sellerProducts } = useData();
const { user }=useAuthContext();
const [productManually,setProductManually]=useState('');
const [optionFromSelect,setOptionFromSelect]=useState('');
const [message, setMessage] = useState();
useEffect(()=>{
if(msg){
setMessage(msg)
}
},[msg])
return (
<div className="add-product-container">
<Form method="post" className="form">

 {/*upper container  */}
 <div className="upper-container">
{/* Select */}
 <div className="input-wrapper select">
<label>Select Product</label>
 <Select
 name="product-from-options"
 options={sellerProducts}
 onChange={(option)=>{setOptionFromSelect((prev)=>(prev=option.value))
setMessage('')
}}
  />
</div>  
{/*input-text */}
 <div className="input-wrapper">
<label htmlFor="product-manually">
or add manually:
<input
type="text"
name="product-manually"
id="product-manually"
onChange={(e)=>{setProductManually(e.target.value)
setMessage('')
}}
/>
</label>
</div>  
 </div>
{/* down-container */}
 <div className="output-container">
{/* result */}
{optionFromSelect&&!productManually&&
<h3>{optionFromSelect}</h3>
}
{productManually&&
<h3>{productManually}</h3>
}
 <div className="input-wrapper">
<input
type="number"
inputMode="decimal"
 step="0.1"
 min={0}
name="product-price"
id="product-price"
required
/>
<label htmlFor="product-price">
price (per Kg) 
</label>
</div>  
 </div>
 {/* hidden inputs */}
 {user&&
<input type='hidden' name='userID' value={user.uid}/> 
 }
<input type="hidden" name="_action" value='seller-product'/>
<input type="hidden" name="product" value={(productManually)? productManually:optionFromSelect} />
<div className="msg-box">
{message&&<p>{message}</p>}
<button type="submit" className="btn btn-action" >
  Add Product  
</button>
</div>
</Form> 
    </div>
);
};

export default AddproductForm;