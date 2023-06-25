import { useEffect, useRef, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import Select from "react-select";
import { useData } from '../hooks/useData';
import SellerStatisticQuery from "./SellerStatisticQuery";
const SellerStatistic = ({id}) => {
const {document,error}=useDocument('products',id);
const { sellersRegion } = useData();
const [options,setOptions]=useState([]);
const [product,setProduct]=useState();
const [districtState,setDistrictState]=useState('');
const [productSelect,setProductSelect]=useState('');
const [distSelect,setDistSelect]=useState('')
// const [disabel,setDisabel]=useState(true);
const [showProd,setShowProd]=useState('');
const [showDist,setShowDist] = useState('');
const refProduct = useRef()
const refDist = useRef()
 const handleSubmit = (e)=>{
e.preventDefault();
if(productSelect&&distSelect){
// setDisabel(false);
setProduct(productSelect);
setDistrictState(distSelect)
refProduct.current.selectOption('');
refDist.current.selectOption('');
setShowProd(productSelect);
setShowDist(Object.fromEntries(distSelect).label);
}
}

useEffect(()=>{
if(document){
 let optionsArr=[];
 //Create Array of options from Procuts collection
setOptions((prev)=>{
optionsArr=[];
document.products.map((item) => optionsArr.push({value:item.product,label:item.product}));
return prev = optionsArr
})
}
},[document])
 return (
<div className="statistic-container">
<h3>compare your prices with other sellers</h3>
{error&&<h3>could not show data</h3>}
<div className="select-box">
<form onSubmit={(e)=>{handleSubmit(e)}}>
<div className="choose-product-box">
<span>Select Product</span>
{options&& 
<Select
options={options}
placeholder='Select Product'
onChange={(option)=>{setProductSelect(option.value)
setShowProd('');
setShowDist("");
}}
ref={refProduct}
/>
}
</div>
<div className="choose-district-box">
<span>Select District</span>
<Select
options={sellersRegion.concat({value:'',label:'All Districts'})}
placeholder='Select District'
// onBlur={}
onChange={(option)=>{
setDistSelect(Object.entries(option))
setShowDist('');
setShowProd("");
}}
ref={refDist}
/>
</div>
<button className="btn btn-action" >compare</button>
</form>
<div className="show-choise-box">
 {showProd&&<span>{showProd}</span>}
 {showDist&&<span>{showDist}</span>}
</div>
</div>
<div>
{districtState&&product&&
<SellerStatisticQuery district={districtState}
 product={product}
 userId={id}
 />
}
</div>
</div>
    );
};
export default SellerStatistic;
