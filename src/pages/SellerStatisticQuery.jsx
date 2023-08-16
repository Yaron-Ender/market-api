
import { useQuery } from '../hooks/useQuery'
import SellerStatisticQueryResult from './sellerStatisticQueryResult';
import { useQuerySellerStatistic } from '../hooks/useQuerySellerStatistic';
const SellerStatisticQuery = ({district,product,userId}) => {
const obj = Object.fromEntries(district); 
const { arrayOfDocQuery,error } = useQuerySellerStatistic("products",'region',obj,obj.label,product);
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