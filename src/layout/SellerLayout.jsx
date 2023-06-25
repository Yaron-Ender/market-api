import { useState } from "react";
import AddproductForm from "../pages/AddproductForm";
import wave from '../assets/wave.svg'
import ProductSeller from "../pages/ProductSeller";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import SellerStatistic from "../pages/SellerStatistic";
import AddSellerSpeach from "../pages/AddSellerSpeach";
import SellerSidebar from "../pages/SellerSidebar";
import SellerRank from "../component/SellerRank";
import { useQueryRanks } from "../hooks/useQueryRanks";
const SellerLayout = () => {
const {user}=useAuthContext();
const { arrayOfRanks, error } = useQueryRanks("users");
const [openstatistic, setOpenStatistic] = useState(false);
const [openSpeach, setOpenSpeach] = useState(false);
const sidebarActions =(action)=>{
switch(action){
case 'statistic':
setOpenStatistic((prev)=>(!prev))
break;
case 'speach':
setOpenSpeach((prev)=>(!prev))
break;
default:
break;
}
}
return (
<div className="seller-layout">
<h3>Let's build the ultimate basket product</h3>
{user&&arrayOfRanks&&
<SellerRank sellerID={user.uid} arrayOfRanks={arrayOfRanks} />
}
<div className="product-container">
{user&&openSpeach&&
<AddSellerSpeach id={user.uid} />
}
{user&&
<SellerSidebar sidebarActions={sidebarActions} userID={user.uid} />
}
<AddproductForm />
{user&&
<ProductSeller id={user.uid} />
}
{user&&openstatistic&&
<SellerStatistic id={user.uid} />
}

</div>
<img src={wave}/>
</div>
    );
  };
  
  export default SellerLayout;
//ACTION
export const sellerAction = async ({request})=>{
const { updateDocuemt } = useFirestore("products");
const { getDocument } = useFirestore('products')
const data = await request.formData();
const { _action,userID, ...val } = Object.fromEntries(data);
let msg = null
//get old product
const orgDocument = await getDocument(userID)
const {products} = orgDocument
//Form with products and amount
if(_action === "seller-product"){
const newItem = {
  product:val.product,
  amount: val["product-price"]
};
if(products.find((obj)=>{
 return obj.product === newItem.product;
})){
 msg = `you've already chosen ${val.product}`
return msg
}else{
  products.push(newItem);
 await updateDocuemt(userID, { products: products });
 return msg
}
  }
//Form of deleting items
if(_action === "deleteProduct"){
const newProductsArray = products.filter(objProduct=>objProduct.product!==val.product)
 updateDocuemt(userID, { products: newProductsArray });
 msg=null;
 return msg;
}
return msg
}

