import { Outlet } from 'react-router-dom';
import BuyerSidebar from '../pages/BuyerSidebar';
import { useAuthContext } from '../hooks/useAuthContext';

const BuyerLayout = () => {
const { user } = useAuthContext();
return (
<div className='buyer-container'>
<header>
   <h2>lets find the best seller</h2> 
</header>
{user&&
<div className='buyer-pannel'>
<BuyerSidebar />
<Outlet />
</div>
}

</div>
);
};

export default BuyerLayout;
