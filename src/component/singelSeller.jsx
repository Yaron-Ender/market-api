import { useEffect, useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
const SingelSeller = ({sellerID,dist}) => {
const { document, error } = useDocument("products", sellerID);
const { document:docUser, error:errorUser } = useDocument("users", sellerID);
const [sellerName,setSellerName]=useState('');
const [text,setText]=useState('');
const [sellerProducts,setSellerProducts]=useState('');
const [rank,setRank]=useState('');
const [date,setDate]=useState('');
const [sellerDist,setSellerDist]=useState('');

useEffect(()=>{
if(document){
setSellerName(document.displayName);
if(document.text){
setText(document.text);
}
if(document.products){
setSellerProducts(document.products);
}

setRank(document.rank);
setDate(format(new Date(document.rgistraionDate), "dd-MM-yyyy"));
setSellerDist(document.region);
}
},[document])
    return (
<div className='singel-seller-card'>
<header>
  <div className="region"><h3>{sellerName}</h3>{
  (dist==='all')?
  sellerDist&&sellerDist.length>0&&
  <p >
  (
    { sellerDist.map((d)=>(
      d.label
    )).toString()}
)
  </p>
  :''}</div>  

 {text&&<p className="text">{text}</p>}
</header> 
<div className="seller-products-box">
{sellerProducts.length>0?
<p>products:</p>:
<p>this seller does not have products yet</p>
}
{sellerProducts.length>0&&
<div className="product-box">
{
  sellerProducts.filter((p)=>(
  p.product
  )).map((p)=>p.product).toString()
}
</div>
}
{sellerProducts.length>0&&
<Link to={document.id}>go to seller page</Link>
}
  </div>   
<div className="card-footer">
<div className="rank">
<>
<p>rank</p>
{(rank===0)?
<span>0</span>:
<span>{rank}</span>
}
</>
</div>
{docUser&&
<div className="avatar">
<Avatar photo={docUser.photoURL} width={'4em'}  />
</div>
}
{date&&
<div className="registrate">
<p>member since :</p>
<span>{date}</span>
</div>
}
</div>
</div>
);
};

export default SingelSeller;