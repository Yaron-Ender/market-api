import AddproductForm from "../pages/AddproductForm";
import wave from '../assets/wave.svg'
import ProductSeller from "../pages/ProductSeller";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import SellerStatistic from "../pages/SellerStatistic";
import AddSellerSpeach from "../pages/AddSellerSpeach";
const SellerLayout = () => {
 const {user}=useAuthContext();
return (
<div className="seller-layout">
<h2>Let's build the ultimate basket product</h2>
<div className="product-container">
{user&&
<AddSellerSpeach id={user.uid} />
}
<AddproductForm />
{user&&
<ProductSeller id={user.uid} />
}
<>
{user&&
<SellerStatistic id={user.uid} />
}
</>
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

