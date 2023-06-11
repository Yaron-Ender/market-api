
import { useState,useEffect } from 'react';
import { useQuery } from '../hooks/useQuery'
import { pricesArr } from '../hooks/useHelper';
const SellerStatisticResult = ({district,product}) => {
const obj = Object.fromEntries(district);  
  const { arrayOfDocQuery, error} = useQuery("products",'region',obj,obj.value);

  const [min,setMin]=useState(null);
  const [max,setMax]=useState(null);
  const [avg,setAvg]=useState('');
  useEffect(()=>{
if(arrayOfDocQuery){
// pricesArr(arrayOfDocQuery, product);
}
},[arrayOfDocQuery,obj])
    return (
   <div>
     <ul>
{arrayOfDocQuery&&arrayOfDocQuery.length>0&&
arrayOfDocQuery.map((id,index)=>(
   <li key={index}>{id}</li> 

   ))
}
   </ul>
{min&&<span>{min}</span>}
{max&&<span>{max}</span>}
</div>
    );
};

export default SellerStatisticResult;