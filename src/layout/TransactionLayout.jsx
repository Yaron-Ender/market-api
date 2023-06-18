import { useParams } from "react-router-dom"; 
import { useDocument } from "../hooks/useDocument";
import Avatar from "../component/Avatar";
const TransactionLayout = () => {
    const {id}=useParams();
const {document,error} = useDocument('products',id)
const { document: docUser, error: errorUser } = useDocument("users",id);
    return (
    <div className="transaction">
        <h1>welcome to transaction lay out</h1>
    {document&&<h3>{document.displayName}</h3>}
    <div className="transaction-seller-products">
  <header>
{docUser&&
<div className="avatar">
<Avatar photo={docUser.photoURL} />
</div>
}
  </header>
    </div>
    <div className="transaction-buyer-basket">

    </div>
    </div>
);
};

export default TransactionLayout;