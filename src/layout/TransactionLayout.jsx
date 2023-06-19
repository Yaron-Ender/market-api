import { useState } from "react";
import { useParams } from "react-router-dom"; 
import { useDocument } from "../hooks/useDocument";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHelper } from "../hooks/useHelper";
import { useFirestore } from "../hooks/useFirestore";
import Avatar from "../component/Avatar";
const TransactionLayout = () => {
    const {id}=useParams();
const {document,error} = useDocument('products',id)
const { document: docSeller, error: errorUser } = useDocument("users",id);
const { user }=useAuthContext();
const { addDocument } =useFirestore('orders');
const { formatCurrency }=useHelper();
const [basketArr,setBasketArr]=useState([]);
const [totalPrice,setTotalPrice] = useState(0);

const fillBasket = (e)=>{
const val  = e.target.value
const obj = document.products.find(ob=>ob.product===val)

setBasketArr((prev)=>{
if(!prev.find(prevObj=>prevObj.product===obj.product)){
prev = [...prev,{...obj,coast:0}]
 }
 return prev
})
}
//CALCULATE TOTAL PRICE
const calcTotalPrice = ()=>{
  setTotalPrice((prev)=>(
    basketArr.reduce((acc,curr)=>{
      acc += parseInt(curr.coast,10) 
      prev = acc
      return prev
    },0)
    ))
  }
  // CALCULATE THE PRICE OF INVIDUAL PRODUCT
const calcPrice = (e)=>{
const weight = e.target.valueAsNumber; 
const productName = e.target.id;
setBasketArr((prev)=>{
 return prev.map((o)=>{
if(o.product===productName){
if(weight){
  o.coast =parseInt(o.amount,10) * weight
}else{
  o.coast=0;
}
}
calcTotalPrice()
return o
 }) 
})
}
const handleSubmit =async(e)=>{
e.preventDefault();
if(confirm('Send Order?')){
  await addDocument({ order: basketArr, sellerID: id, buyerID:user.uid,buyerName:user.displayName,buyerEmail:user.email });
}
}
    return (
  <div className="transaction">
   <h1>welcome to transaction lay out</h1>
   <div className="transaction-seller-products">
  <header>
    {document&&<h3>{document.displayName}</h3>}
{docSeller&&
<div className="avatar">
<Avatar photo={docSeller.photoURL} />
</div>
}
{document&&docSeller&&
<div className="details">
<span>Phone number - {docSeller.phoneNumber}</span>
{user&&<span>Email {docSeller.email}</span>}
</div>
}
  </header>
<div className="transaction-products-box">
{document&&document.products.length>0&&
<ul>
{document.products.map((p)=>(
<li key={p.product}
>
<span>{p.product}</span> <span>{formatCurrency(p.amount)} / Kg</span>
<button onClick={fillBasket}
value={p.product}
data-product={[Object.entries(p)]}
>add to cart</button>
</li>  
))
}
</ul>
}
</div>
    </div>
    <div className="transaction-buyer-basket">
 {basketArr&&basketArr.length>0&&
 <ul>
 {basketArr.map((p)=>(
 <li key={p.product}>
<span>{p.product} </span>
<label htmlFor={p.product}>weight(Kg)</label>
<input 
type="number"
name="weight"
id={p.product}
min={0}
step={1.0}
onChange={calcPrice}
/>
<span>{formatCurrency(p.coast)}</span>
</li> 
 ))}
 </ul>
 }
 <div className="buyer-total-price">
 <span>Total Amount  - {formatCurrency(totalPrice)}</span>
 </div>
</div>
<form onSubmit={handleSubmit}>
  <button>send order</button>
</form>
</div>
);
};

export default TransactionLayout;