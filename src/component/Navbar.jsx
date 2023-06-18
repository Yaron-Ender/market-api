import { useEffect,useState } from 'react';
import homeIcon from '../assets/homeIcon.svg'
import { NavLink} from 'react-router-dom';
import { UserIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
import { usefirebaseAuth } from '../hooks/useFireAuth';
import { useFirestore } from '../hooks/useFirestore';
import { usefirebaseStorage } from '../hooks/useFirebaseStorage';
const Navbar = () => {
const {user,dispatch,authIsReady}=useAuthContext();
const {logout}=useLogout();
const {deleteFromAuth}=usefirebaseAuth();
const {deleteFewDocs}=useFirestore('users');
const { deleteFromStorage }=usefirebaseStorage()
const [rotateIcon,setRotateIcon]=useState(false)
const [rotateFirst,setRotateFirst]=useState(false)
const handleMobileNav = ()=>{
setRotateFirst((prev) => !prev);  
}
useEffect(()=>{
if(rotateFirst){
   setTimeout(()=>{setRotateIcon(true)},200)
}else{
  setTimeout(()=>{setRotateIcon(false)},700) 
}
},[rotateFirst])
//Delete user&docs from firestore & storage
const deleteUser =async()=>{
  if (window.confirm("Delete user and all data?")){
if(user.photoURL){
await deleteFromStorage(user.photoURL)
}
await deleteFewDocs(user.uid)
await deleteFromAuth();
dispatch({ type: "LOGOUT" });
}  
}
return (
<div className='navbar'>
<div className={`bars-icon-container ${(rotateFirst)?'rotateFirst':''} ${(rotateIcon)?'rotate':''}`} onClick={handleMobileNav} >
<div className="line-bar"></div>
<div className="line-bar"></div>
<div className="line-bar"></div>
  </div>
{authIsReady&&
<ul className='menu-container'>
{!user&&
<NavLink to='/' title='home'>
<img src={homeIcon} alt="home-icon" height={30} />
<span> Market-API</span>
</NavLink> 
}
{(!user)?
<NavLink to='login' title='login'>
<span>Login</span>
<UserIcon width={20}/>
</NavLink>
:
<>
<NavLink to='/' title='logout' onClick={logout}>
<span>Logout</span>
  <ArrowRightOnRectangleIcon width={20} />
</NavLink>

{user&&
<h3>welcome back, <span className='accent'>{user.displayName}</span></h3>
}

<NavLink type='button'
title='delete user'
className='btn btn-warning'
onClick={deleteUser}
  >
<span>Delete User</span>
  <TrashIcon width={20} />
</NavLink>
</>
} 
</ul>
  }

</div>
    );
};

export default Navbar;