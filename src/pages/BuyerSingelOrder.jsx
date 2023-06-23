import { useState, useRef } from "react";
import { useDocument } from "../hooks/useDocument";
import { QuestionMarkCircleIcon} from "@heroicons/react/24/solid";
import { useFirestore } from "../hooks/useFirestore"; 
import heartLevel4 from "../assets/heartLevel4.svg";
import heartLevel3 from '../assets/heartLevel3.svg'
import heartLevel2 from '../assets/heartLevel2.svg'
import heartLevel1 from '../assets/heartLevel1.svg'
const BuyerSingelOrder = ({order}) => {
const {document,error}=useDocument('users',(order)?order.sellerID:'');
const { updateDocuemt } = useFirestore("orders");
const { updateDocuemt:updateDocumentUser } = useFirestore("users");
const [openMsg,setOpenMsg]=useState(false);
const [animateBtn,setAnimateBtn]=useState(false);
const refInput = useRef()
const heartArray = [heartLevel1,heartLevel2,heartLevel3,heartLevel4];
//UPDATE SELLER RANK
const updateRank = async()=>{
// the buyer an update every seller 3 time per order
if(order.orderRanked<3){
// heart img/btn animation
setAnimateBtn(true)
//update seller rank in users collection
await updateDocumentUser(document.id,{rank:document.rank + 1})
//update in products collection the 
await updateDocuemt(order.docID,{orderRanked:order.orderRanked + 1 });
}else{
setAnimateBtn(false)
}
}
//CONFIRM CHECKBOX
const handleCheckbox =async(e)=>{
if(window.confirm('Do you want to confirm this order?')){
await updateDocuemt(order.docID, { confirmOrder: true });
}else{
 refInput.current.checked=false
}
}
return (
<div className="singel-order-container">
{document&&
<>
<div className="order-details">
<h4>order's details</h4> 
<p>Num : {order.docID}</p>
<p>Created At :{order.createdAt.toDate().toDateString()}</p>
</div>
<div className="seller-details">
<h4>Seller's Details</h4>
<p>Name : <span>{document.displayName}</span></p> 
<p>Phone number : <span>{document.phoneNumber}</span></p> 
</div>
<div className="order-product">
<h4>Your Purchase</h4>
<ul>
{order.order.map((order)=>(
<li key={order.product}>{order.product} - {Math.round(order.coast / order.amount)} / Kg</li>  
))}
</ul>
</div>
<div className="confirm-container">
<div className="msg-box">
<span>Confirm Order</span>
<QuestionMarkCircleIcon width={20} className="question-mark" onClick={()=>{setOpenMsg(prev=>!prev)}}  />
<p className={`${openMsg?'open-msg':''}`}>After the seller will send your order, you will be able to confirm the order, after confarmation you will be able to rank the seller</p>

</div>
{order.supplied&&
<div className="checkbox-box">
<label htmlFor="confirm">
{order.confirmOrder?'Order Confirmed':'Confirm'}
</label>
<input
id="confirm"
type="checkbox"
name='confirm'
onChange={handleCheckbox}
disabled={order.confirmOrder}
ref={refInput}
/>
</div>}
{!order.supplied&&
<p className="supply-msg">the seller didn't send your products yet</p>}
</div>
{order.confirmOrder&&
<div className="rank-container">
<div className="rank-seller">
<span>rank the seller</span>
<button className={`${animateBtn?'animate':''}`}>
 <img onClick={updateRank} src={`${heartArray[`${order.orderRanked}`]}`} width={50} height={30} alt="heart" />
</button>
</div>
<p>Seller's rank: {document.rank}</p>
</div>
}
</>
}
</div>
);
};

export default BuyerSingelOrder;