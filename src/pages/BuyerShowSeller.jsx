import { useParams,useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import SingelSeller from "../component/singelSeller";
const BuyerShowSeller = () => {
const {dist} = useParams();
const navigate = useNavigate();
const {arrayOfDocQuery}=useQuery('products','region',{value:dist,label:dist},dist);
 return (
 <div className="buyer-show-sellers-container">
{arrayOfDocQuery&&arrayOfDocQuery.length < 1&&
<>
<h3>There are no sellers in {dist} district</h3>
<button className="btn btn-black" onClick={()=>{navigate('/buyer')}}>Go back</button>
</>
}
{arrayOfDocQuery&&arrayOfDocQuery.length > 0 &&
arrayOfDocQuery.map((sellerID, index) => (
<SingelSeller key={index} sellerID={sellerID} dist={dist} />
))}
</div>
    );
};

export default BuyerShowSeller;