import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom"; 
import { useDocument } from "../hooks/useDocument";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHelper } from "../hooks/useHelper";
import { useFirestore } from "../hooks/useFirestore";
import { timestamp } from "../firebase/firebaseConfig";
import Avatar from "../component/Avatar";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
const TransactionLayout = () => {
 const {id}=useParams();
 const navigate = useNavigate()
const {document,error} = useDocument('products',id)
const { document: docSeller, error: errorUser } = useDocument("users",id);
const { user }=useAuthContext();
const {document:docBuyer,error:errorDOcBuyer}=useDocument('users',user.uid)
const { addDocument } =useFirestore('orders');
const { formatCurrency }=useHelper();
const [basketArr,setBasketArr]=useState([]);
const [msg,setMsg]=useState('');
const [totalPrice,setTotalPrice] = useState(0);
const [prodChosen,setProductChosen]=useState(false);

const fillBasket = (e)=>{
if(e.target.nodeName!=='svg'&&e.target.nodeName!=='path'){
const val  = e.target.value
const obj = document.products.find(ob=>ob.product===val)
setBasketArr((prev)=>{
if(!prev.find(prevObj=>prevObj.product===obj.product)){
prev = [...prev,{...obj,coast:0}]
setMsg('');
// setProductChosen(false)
}else{
// setProductChosen(true)
}
return prev
})
}
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
//DELETE ITEM FROM BASKET
const deleteItem = (e)=>{
let x = '';
const product = e.target.id
setBasketArr((prev)=>{
prev = prev.filter(ob=>ob.product!==product)
x= prev
return prev
})
setTotalPrice((prev)=>(
x.reduce((acc,curr)=>{
acc += parseInt(curr.coast,10) 
prev = acc
return prev
},0)
))
}
// CALCULATE THE PRICE OF INVIDUAL PRODUCT
const calcPrice = (e)=>{
setMsg('')
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
//SUBMIT BASKET TO FIRESTORE
const handleSubmit =async(e)=>{
e.preventDefault();
if(!totalPrice){
  setMsg('Your product\'s basket is empty')
  return
}
if(basketArr.find(obj=>obj.coast===0)){
    setMsg("Please inset amount in all the products");
    return;
}
if(confirm('Send Order?')){
  await addDocument({ order: basketArr, sellerID: id, buyerID:user.uid,buyerName:user.displayName,buyerEmail:user.email,supplied:false,confirmOrder:false,createdAt:timestamp,orderRanked:0,address:docBuyer.address });
  navigate('/buyer/orders')
     return toast.success("you've sent your order successfully");
}
}
return (
<div className="transaction">
<h3>Assemble your product's basket</h3>
<div className="transaction-seller-products">
<header>
{docSeller&&
<div className="avatar">
<Avatar photo={docSeller.photoURL} width={'3em'} />
</div>
}
{document&&<h3>{document.displayName}</h3>}
{document&&docSeller&&
<div className="details">
<span>Phone number - {docSeller.phoneNumber}</span>
{user&&<span>Email: {docSeller.email}</span>}
</div>
}
{document&&document.text&&
<div className="speach">
<p>{document.text}</p>
</div>
}
</header>
<div className="transaction-container">
<div className="transaction-products-box">
{document&&document.products.length>0&&
<>
<h3>Product List :</h3>
<ul>
{document.products.map((p)=>(
<li key={p.product}
>
<div className="upper-box">
<span>{p.product} - </span> <span>{formatCurrency(p.amount)} / Kg</span>
</div>
<div className="lower-box">
<button onClick={fillBasket}
value={p.product}
data-product={[Object.entries(p)]}
>Add to Basket 
<PlusIcon width={25} />
</button>
</div>
</li>  
))
}
</ul>
</>
}
</div>
<div className="transaction-buyer-basket">
 {basketArr&&basketArr.length>0&&
 <>
 <h3>Your product basket :</h3>
 <ul>
 {basketArr.map((p)=>(
 <li key={p.product} className={`${(prodChosen)?'prodChosen':''}`} >
<div className="upper-box">
<span>{p.product} - </span>
<input 
type="number"
name="weight"
id={p.product}
min={0}
step={1.0}
onChange={calcPrice}
/>
<label htmlFor={p.product}>(Kg)</label>
</div>
<div className="lower-box">
<span>price = {formatCurrency(p.coast)}</span>
<button id={p.product}  onClick={deleteItem} >
<TrashIcon className="trash-icon" width={25}/>
</button>
</div>
</li> 
 ))}
 <div className="buyer-total-price">
 <span>Total Amount  = {formatCurrency(totalPrice)}</span>
{msg&&<span className="msg">{msg}</span>}
<form onSubmit={handleSubmit}>
  <button className="btn btn-black">send order</button>
</form>
 </div>
 </ul>
 </>
 }
</div>
</div>
</div>
</div>
);
};

export default TransactionLayout;