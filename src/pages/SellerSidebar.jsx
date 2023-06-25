import { Link } from "react-router-dom";
const SellerSidebar = ({ sidebarActions }) => {

  return (
<div className="sellerSidebar">
<ul>
<li onClick={()=>{sidebarActions('speach')}}>
Descriptive sentence</li>
<li onClick={()=>{sidebarActions('statistic')}}>Statistic</li>
<Link to='orders'>Orders</Link>
</ul>
</div>

  );
};

export default SellerSidebar;