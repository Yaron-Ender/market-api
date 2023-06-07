import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { Form } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
const ProductSeller = ({id}) => {
const { document,error } = useDocument('products',id);
const [products,setProducts]=useState('');
const formatCurrency = (amn)=>{
 return new Intl.NumberFormat(undefined, { style: "currency", currency: "ILS" }).format(amn);
}
useEffect(()=>{
 if(document){
setProducts(document.products)
 } 
},[document,products])
return (    
<div className="product-seller-container">
  <div className="products">
    {products&&products.length<1&&<h3>your product list is empty</h3>}
    <ul>
  {products&&products.length>0&&products.map((obj,index)=>(
 <li key={index}>
  <span>{obj.product}</span> <span> {formatCurrency(obj.amount)}</span>
 <Form method="POST">
  <input type="hidden" name='_action' value='deleteProduct' />
  <input type='hidden' name='userID' value={id}/> 
  <input type="hidden" name="product" value={obj.product}/>
  <button type="submit" className="btn btn-delete-product "><TrashIcon width={20} /></button>
 </Form>
 </li>
  ))
}
</ul>
    </div> 
    {error&&<h3>sorry,could'nt fetch your products</h3>} 
</div>
);
};

export default ProductSeller;