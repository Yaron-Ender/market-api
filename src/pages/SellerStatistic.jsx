import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import Select from "react-select";
import { useData } from '../hooks/useData';
import SellerStatisticResult from "./SellerStatisticResult";

const SellerStatistic = ({id}) => {
const {document,error}=useDocument('products',id);
const { sellersRegion } = useData();
const [options,setOptions]=useState([]);
const [product,setProduct]=useState();
const [districtState,setDistrictState]=useState('');

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
},[document,setOptions])
 return (
<div>
<h3>statistic</h3>
{error&&<h3>could not show data</h3>}
<div className="select-box">
<div className="choose-product-box">
{options&& 
<Select
options={options}
placeholder='Select Product'
onChange={(option)=>setProduct(option.value)}
/>
}
</div>
<div className="choose-district-box">
<Select
options={sellersRegion.concat({value:'',label:'All Districts'})}
placeholder='Select District'
// onBlur={}
onChange={(option)=>{setDistrictState(Object.entries(option))}}
/>
{product&&<h3>{product}</h3>}
</div>
<div className="result-container">
{districtState&&product&&
<SellerStatisticResult district={districtState} product={product} />
}

</div>
</div>

</div>
    );
};
export default SellerStatistic;
