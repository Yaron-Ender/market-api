//sellers's region 
export const useData =()=>{
    const sellersRegion = [
   {value:'north',label:'north'},
   {value:'center',label:'center'},
   {value:'south',label:'south'},
   ] 
//styl forSelect
const regionSelect ={
control:(styles)=>({
...styles,
color:'green',
 backgroundColor:'hsl(275 90% 93%)',
 borderRadius:'0.2em',
 boxShadow:'0 0 0 -0.2em hsl(275 55% 50%), 0 0 0 -0.2em hsl(275 55% 50%)'
}),
option:(styles,{isFocused})=>({
...styles,
 backgroundColor:isFocused?'hsl(275 90% 93%)':''
})
}
return { sellersRegion, regionSelect };
} 
