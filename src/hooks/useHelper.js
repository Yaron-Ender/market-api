 export const useHelper =()=>{
   const formatCurrency = (amn) => {
     return new Intl.NumberFormat(undefined, {
       style: "currency",
       currency: "ILS",
      }).format(amn);
    };
    const currencyToNum = ()=>{
      
    }
  return{formatCurrency}
 } 

