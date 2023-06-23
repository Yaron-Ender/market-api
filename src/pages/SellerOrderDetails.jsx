import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
import { QuestionMarkCircleIcon,CheckCircleIcon,MinusCircleIcon} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
const SellerOrderDetails = () => {
const {orderID} = useParams();
const navigate =useNavigate()
const {document,error}=useDocument('orders',orderID)
const { updateDocuemt,deleteDocument } = useFirestore("orders");
const [openHelp,setOpenHelp] = useState(false);
//DELETE ORDER
const deleteOrder =async()=>{
if(window.confirm('Do you sure you want to delete the order?')){
  navigate('/seller')
await deleteDocument(orderID)
   return toast.success("you've delete the order successfully");
}
}
//SUPPLIED ORDER
const handleSubmit =async()=>{
if(confirm('Did you supply the order to your cusotmer ?')){
try{
await updateDocuemt(orderID, { supplied: true });
    return toast.success("you've sent your order");
}catch(err){
return toast.error("sorry , your order couldn't sent");
}
}
}
return (
 <div className="order-container">
{document&&
<>
<header>
<h3>Customer's Details :</h3>
  <h4> Name : <span>{document.buyerName}</span></h4>
  <h4>Email : <span>{document.buyerEmail}</span></h4>
  <h4>Address : <span></span></h4>
 </header>
<div className="order-products">
{document.order.length>0&&
<>
<h3>Products :</h3>
<ul>
{document.order.map((order)=>(
<li key={order.product}>{order.product} - {Math.round(order.coast / order.amount)} / Kg</li>  
))}
</ul>
</>
} 
</div>
<div className="order-supplied">
<div className="btn-box">
<button onClick={handleSubmit} className="btn btn-supply"  
disabled={document.supplied} >
{(document.supplied)?'order was supplied':' supply order'}
   </button>
 <span onClick={()=>{setOpenHelp(prev=>!prev)}}><QuestionMarkCircleIcon width={22} /></span>
<span className={`${(openHelp)?'open-help':''}`}>push this button after you supplied the order, after the order will be confirmed by the buyer you will get indecation in the status box.after the order will be confirmed you will be abel to delet the order</span>
</div>
</div>
<div className="order-status">
<h3>Order's Status</h3>
<p>supply Status - <span>{(document.supplied)?<CheckCircleIcon width={30} style={{color:'green'}} />:<MinusCircleIcon width={30} style={{color:'red'}} />}</span></p>
<p>Order confirmed by customer - <span>{(document.confirmOrder)?<CheckCircleIcon width={30} style={{color:'green'}} />:<MinusCircleIcon width={30} style={{color:'red'}} />}</span></p>
{document.supplied&&document.confirmOrder&&
<button onClick={deleteOrder} className="btn btn-warning">Delete Order</button>
}
</div>
</>
}
    </div>
    );
};

export default SellerOrderDetails;