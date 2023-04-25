import React from 'react'
import "./NavBtn.scss";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../Context/user.context';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
const NavBtn = () => {
  const [active,setActive]=useState('profile')
  const {userDB}=useContext(UserContext)
  const navigate=useNavigate();
  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
    }).catch((error) => {
    // An error happened.
    });
}

  return (
    <div className='navbtn-container'>
        <div className='navbtn-head'>
            <Link to={'/'}>
            <h1>EBazaar</h1>
            </Link>
            <p>developed by Team.exe</p>
        </div>
        <hr />
        <div className='navbtn-body'>
            {
              userDB?.admin && (
                <Link to={'/profile/dashboard'}>
                <div className={`profile-nav-btn ${active==='dashboard' && ('active')}`} onClick={()=>{setActive('dashboard')}}>
                 <div><DashboardCustomizeIcon className='icon'/> </div>
                 <p>Dashboard</p>
               </div>
                </Link>
              )
            }
            <Link to={'/profile'}>
            <div className={`profile-nav-btn ${active==='profile' && ('active')}`} onClick={()=>{setActive('profile')}}>
              <div><AccountCircleIcon className='icon'/> </div>
              <p>Profile Settings</p>
            </div>
            </Link>
            <Link to={'/profile/order-page'}>
            <div className={`profile-nav-btn ${active==='notification' && ('active')}`} onClick={()=>{setActive('notification')}}>
              <div><CircleNotificationsIcon className='icon'/> </div>
              <p>Your Orders</p>
            </div>
            </Link>
            <div style={{width:'100%',display:'flex',justifyContent:'center',margin:'20px 0px'}}>
            <hr style={{width:'90%'}}/>
            </div>
            <div className='profile-nav-btn logout-btn' onClick={handleLogout}>
              <div><LogoutIcon className='icon'/> </div>
              <p>Log out</p>
            </div>
        </div>
    </div>
  )
}

export default NavBtn