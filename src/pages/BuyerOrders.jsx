import { useAuthContext } from "../hooks/useAuthContext";
import { useQueryOrders } from "../hooks/useQueryOrders";
import BuyerSingelOrder from "./BuyerSingelOrder";
const BuyerOrders = () => {
const { user } = useAuthContext();
const {arrayOfOrders,error}=useQueryOrders('orders',['buyerID','==',(user)?user.uid:''])

return (
    <div className="buyer-orders">
{error&&<h3>sorry, we couldn't fetch your orders</h3>}
{arrayOfOrders&&arrayOfOrders.length<1&&<h3>you don't have any orders yet</h3>}
{arrayOfOrders&&arrayOfOrders.length>0&&
<div className="buyer-orders-container">
{arrayOfOrders.length===1&&<h3>you have 1 order</h3>}
{arrayOfOrders.length>1&&
<h3>you have {arrayOfOrders.length} orders</h3>
}
<ul>
{
arrayOfOrders.map((order)=>(
<BuyerSingelOrder key={order.docID} order={order} />
))
}
</ul>
</div>
}
</div>
 );
};

export default BuyerOrders;