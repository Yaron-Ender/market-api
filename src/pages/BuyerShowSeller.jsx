import { useParams } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import SingelSeller from "../component/singelSeller";
const BuyerShowSeller = () => {
const {dist} = useParams();

const {arrayOfDocQuery}=useQuery('products','region',{value:dist,label:dist},dist);
      return (
 <div className="buyer-show-sellers-container">
{arrayOfDocQuery&&arrayOfDocQuery.length < 1&&
<h3>There are no sellers in {dist} district</h3>
}
{arrayOfDocQuery&&arrayOfDocQuery.length > 0 &&
arrayOfDocQuery.map((sellerID, index) => (
    <SingelSeller key={index} sellerID={sellerID} dist={dist} />
    ))}
</div>
    );
};

export default BuyerShowSeller;