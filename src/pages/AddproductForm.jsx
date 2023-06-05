import { useState } from "react";
import { Form } from "react-router-dom";
import { useData } from "../hooks/useData";
import Select from "react-select";
const AddproductForm = () => {
const { sellerProducts } = useData();
const [productManually,setProductManually]=useState('');
const [optionFromSelect,setOptionFromSelect]=useState('');

return (
<div className="add-product-container">
<Form>
 <h3>select product from the list or add manually</h3>
 {/*upper container  */}
 <div className="input-container">
{/* Select */}
 <div className="input-wrapper">
 <Select
 options={sellerProducts}

 onChange={(option)=>{setOptionFromSelect((prev)=>(prev=option.value))}}
  />
</div>  
{/*input-text */}
 <div className="input-wrapper">
<label htmlFor="product">
product:
<input
type="text"
name="product"
id="product"
onChange={(e)=>{setProductManually(e.target.value)}}
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
{/* input number */}
 <div className="input-wrapper">
<label htmlFor="product-price">
price:
<input
type="number"
name="product-price"
id="product-price"
/>
</label>
</div>  
 </div>
<input type="hidden" name="_action" value='seller-product'/>
<button type="submit">
  save product  
</button>
</Form> 
    </div>
);
};

export default AddproductForm;