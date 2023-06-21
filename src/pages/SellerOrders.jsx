import { useNavigate,Outlet, NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useQueryOrders } from '../hooks/useQueryOrders';
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
const SellerOrders = () => {
const {user}=useAuthContext();
const {arrayOfOrders,error}=useQueryOrders('orders',['sellerID','==',(user)?user.uid:''])
const navigate = useNavigate();
    return (
<div className='seller-orders'>
<header>
<button className='btn btn-black' onClick={()=>{navigate('/seller')}}>Go back to the dashboard <ArrowUturnLeftIcon width={20} /></button>
</header>
<div className="orders-layout">
<div className="orders-list">
{arrayOfOrders&&arrayOfOrders.length>0&&
<>
<h3>Order List</h3>
<ul>
{arrayOfOrders.map((order)=>(

<NavLink key={order.docID } to={order.docID}>
<h4>order Num. <span> {order.docID }</span> </h4>
<p>Created At: <span>{order.createdAt.toDate().toDateString()}</span></p>
</NavLink>

))}
</ul>
</>

}
{arrayOfOrders&&arrayOfOrders.length<1&&
<h2>You don't have orders yet</h2>
}
</div>       
<Outlet />       
</div>
</div>
    );
};

export default SellerOrders;