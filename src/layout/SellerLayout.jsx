import AddproductForm from "../pages/AddproductForm";
import wave from '../assets/wave.svg'
import ProductSeller from "../pages/ProductSeller";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
const SellerLayout = () => {
 const {user}=useAuthContext();
return (
    <div className="seller-layout">
    <h2>let's build the oltimate busket product</h2>
<AddproductForm />
{user&&user.uid&&
<ProductSeller id={user.uid} />
}
<img src={wave}/>
</div>
    );
  };
  
  export default SellerLayout;
  
  export const sellerAction = async ({request})=>{
    const { updateDocuemt,setDocument } = useFirestore("products");
    const { getDocument } = useFirestore('products')
    const data = await request.formData();
    const { _action,userID, ...val } = Object.fromEntries(data);
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
const msg = `you've already chosen ${val.product}`
return msg
}else{
  products.push(newItem);
  await updateDocuemt(userID, { products: products });
}
  }
//Form of deleting items
if(_action === "deleteProduct"){
const newProductsArray = products.filter(objProduct=>objProduct.product!==val.product)
await updateDocuemt(userID, { products: newProductsArray });
}
  return data;
}

