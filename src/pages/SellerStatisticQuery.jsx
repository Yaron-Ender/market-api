
import { useQuery } from '../hooks/useQuery'
import SellerStatisticQueryResult from './sellerStatisticQueryResult';
const SellerStatisticQuery = ({district,product,userId}) => {
const obj = Object.fromEntries(district); 
const { arrayOfDocQuery,error } = useQuery("products",'region',obj,obj.label,product);
return (
<div>
{error&&<h3>{error}</h3>}
{arrayOfDocQuery&&product&&
<SellerStatisticQueryResult product={product}
arrayOfDocQuery={arrayOfDocQuery}
userId={userId}
district={obj.label}
/>
} 
</div>
);
};
export default SellerStatisticQuery;