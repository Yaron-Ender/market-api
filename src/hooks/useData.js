//sellers's region 
export const useData =()=>{
    const sellersRegion = [
   {value:'North',label:'North'},
   {value:'Center',label:'Center'},
   {value:'South',label:'South'},
   ] 
// sellers producrs
const sellerProducts = [
{value:'Tomato',label:'Tomato'},
{value:'Carrot',label:'Carrot'},
{value:'Apple',label:'Apple'},
{value:'Peach',label:'Peach'},
{value:'Malon',label:'Malon'},
{value:'Orange',label:'Orange'},
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
return { sellersRegion, regionSelect,sellerProducts };
} 
