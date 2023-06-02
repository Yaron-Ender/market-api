import { useEffect,useState } from 'react';
import homeIcon from '../assets/homeIcon.svg'
import { NavLink } from 'react-router-dom';
import { UserIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';
const Navbar = () => {
const {user}=useAuthContext()
const {logout}=useLogout()
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
return (
<div className='navbar'>
  <div className={`bars-icon-container ${(rotateFirst)?'rotateFirst':''} ${(rotateIcon)?'rotate':''}`} onClick={handleMobileNav} >
<div className="line-bar"></div>
<div className="line-bar"></div>
<div className="line-bar"></div>
  </div>
  <ul className='menu-container'>
<NavLink to='/' title='home'>
<img src={homeIcon} alt="home-icon" height={30} />
<span> Market-API</span>
</NavLink> 
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
<NavLink to='/' title='delete user' className='warning'>
<span>Delete User</span>
  <TrashIcon width={20} />
</NavLink>
</>
} 
</ul>
{user&&
<h3>welcome back, <span className='accent'>{user.displayName}</span></h3>
}
</div>
    );
};

export default Navbar;