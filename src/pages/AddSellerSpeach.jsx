import { useState,useEffect } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useDocument } from "../hooks/useDocument";
const AddSellerSpeach = ({id}) => {
const {updateDocuemt}=useFirestore('products');
const {document,error}=useDocument('products',id);
const [sentence,setSentence]=useState('');
useEffect(()=>{
 if(document){
 setSentence(document.text)
 } 
},[document])
 const handelSubmit =async(e)=>{
e.preventDefault()
const text ={text:e.target.speach.value};
await updateDocuemt(id,text)
 }
    return (
      <div className="seller-speach">
    <form onSubmit={handelSubmit}>
    <label htmlFor="speach">make a descriptive sentence of your business</label>
    <textarea id="speach" name="speach" rows={3} cols={50} placeholder="e.g. Hai, i sell only organic products"></textarea>
    <input type="hidden" mane='_action' value='textarea'></input>
    <button className="btn btn-action ">save</button>
    </form>
    <div className="seller-speach-result">
      <h4>Your Sentence :</h4>
      <p>{sentence}</p>
    </div>
      </div>
    );
};

export default AddSellerSpeach;