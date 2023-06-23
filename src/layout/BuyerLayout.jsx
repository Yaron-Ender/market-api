import { Outlet,useNavigate } from 'react-router-dom';
import BuyerSidebar from '../pages/BuyerSidebar';
import { useAuthContext } from '../hooks/useAuthContext';

const BuyerLayout = () => {
const { user } = useAuthContext();
const navigate =useNavigate();
return (
<div className='buyer-container'>
<header>
   <h2>Let's find the best seller</h2> 
</header>
{user&&
<div className='buyer-pannel'>
<button className='btn btn-action btn-my-order' onClick={()=>{navigate('/buyer/orders')}}>My Orders</button>
<BuyerSidebar />
<Outlet />
</div>
}

</div>
);
};

export default BuyerLayout;
