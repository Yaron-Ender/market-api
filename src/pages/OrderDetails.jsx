import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { useEffect } from "react";
import { QuestionMarkCircleIcon} from "@heroicons/react/24/solid";
const OrderDetails = () => {
const {orderID} = useParams();
const {document,error}=useDocument('orders',orderID)

useEffect(()=>{
    if(document){
     console.log(document.order)
 }   
},[document])
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
<button>supply order <span><QuestionMarkCircleIcon width={22} /></span></button>
<p>Order Status - <span>{(document.order.supplied)?'ORDER SUPPLY':'ORDER DID NOT SULLY'}</span></p>
<p>Confirmation Status - <span>{(document.order.confirmOrder)?'ORDER CONFIRM BY THE CUSTOMER':'ORDER DID NOT CONFIRM BY THE CUSTOMER'}</span></p>
</div>
</>
}
    </div>
    );
};

export default OrderDetails;