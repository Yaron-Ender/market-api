import { useState,useEffect } from "react";
import { useDocument } from "../hooks/useDocument";

const SellerRank = ({ sellerID,arrayOfRanks }) => {
const { document }=useDocument('users',sellerID);
const [ranksMessage,setRankMessage]=useState('');
 useEffect(()=>{
if(document){
arrayOfRanks.sort((a,b)=>{
return b - a
})
if (arrayOfRanks.indexOf(document.rank)===0) {
setRankMessage("🏆congratulations you have the highest rank in MARKET API🏆");
}
}
 },[document,arrayOfRanks])
return (
<div className="rank-container">
{document&&document.rank===0&&
<h4>You didn't get any rank yet</h4>
}
{document&&document.rank !==0&&
<div className="rank-box">
<h4>your rank is : <span>{document.rank}</span></h4> 
<p>{ranksMessage}</p> 
</div>
}
</div>
);
};

export default SellerRank;