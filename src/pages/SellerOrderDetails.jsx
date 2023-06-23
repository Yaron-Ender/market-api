import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
import { QuestionMarkCircleIcon,CheckCircleIcon,MinusCircleIcon} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
const SellerOrderDetails = () => {
const {orderID} = useParams();
const {document,error}=useDocument('orders',orderID)
const { updateDocuemt } = useFirestore("orders");
const [openHelp,setOpenHelp] = useState(false);

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
<span className={`${(openHelp)?'open-help':''}`}>push this button after you supplied the order, after the order will be confirmed by the buyer you will get indecation in the status box. </span>
</div>
</div>
<div className="order-status">
<h3>Order's Status</h3>
<p>Order's Status - <span>{(document.supplied)?<CheckCircleIcon width={30} style={{color:'green'}} />:<MinusCircleIcon width={30} style={{color:'red'}} />}</span></p>
<p>Confirmation's Status - <span>{(document.confirmOrder)?<CheckCircleIcon width={30} style={{color:'green'}} />:<MinusCircleIcon width={30} style={{color:'red'}} />}</span></p>
</div>
</>
}
    </div>
    );
};

export default SellerOrderDetails;