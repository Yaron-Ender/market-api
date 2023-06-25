
import { useQuery } from '../hooks/useQuery'
import SellerStatisticQueryResult from './sellerStatisticQueryResult';
const SellerStatisticQuery = ({district,product,userId}) => {
const obj = Object.fromEntries(district); 
const { arrayOfDocQuery,error } = useQuery("products",'region',obj,obj.value);
return (
<div>
{arrayOfDocQuery&&product&&
<SellerStatisticQueryResult product={product}
arrayOfDocQuery={arrayOfDocQuery}
userId={userId}
district={obj.value}
/>
}

</div>
    );
};

export default SellerStatisticQuery;