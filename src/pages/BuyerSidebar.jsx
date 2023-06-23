import { NavLink } from "react-router-dom"; 
const BuyerSidebar = () => {

return (
<div className="buyer-sidebar">

<div className="shadow"></div>
<ul>
<NavLink to="North">North</NavLink>
<NavLink to="South">South</NavLink>
<NavLink to="Center">Center</NavLink>
<NavLink to="all">All Districts</NavLink>
</ul>
</div>
);
};

export default BuyerSidebar;