import { useFirestore } from "../hooks/useFirestore";
const AddSellerSpeach = ({id}) => {
const {updateDocuemt}=useFirestore('products');
 const handelSubmit =async(e)=>{
e.preventDefault()
const text ={text:e.target.speach.value};
await updateDocuemt(id,text)
 }
    return (
      <div className="seller-speach">
    <form onSubmit={handelSubmit}>
    <label htmlFor="speach">add your best description :</label>
    <textarea id="speach" name="speach" rows={1} cols={50} placeholder="e.g. Hai, i sell only organic products"></textarea>
    <input type="hidden" mane='_action' value='textarea'></input>
    <button className="btn btn-action ">save</button>
    </form>
      </div>
    );
};

export default AddSellerSpeach;