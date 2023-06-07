import { storage } from "../firebase/firebaseConfig";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
export const usefirebaseStorage = ()=>{

 const deleteFromStorage = async(photoURL)=>{
 const imageRef = ref(storage,`${photoURL}`)
 try{
const photoURL=await getDownloadURL(imageRef);  
if(!photoURL){
}
if(photoURL.includes('default-avatar')){
return
}
deleteObject(imageRef)

}catch(err){
console.log(err.message)
}
 }
 return { deleteFromStorage }   
}
