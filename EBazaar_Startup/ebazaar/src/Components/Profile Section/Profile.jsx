import React from 'react'
import { Outlet } from 'react-router'
import NavBtn from './Profile Components/NavBtn'
import ProfleCHead from './Profile Components/ProfleCHead'
import './Profile.scss'
const Profile = () => {
  return (
    <div className='profile-container'>
        <div className='profile-navigate'>
          <NavBtn/>
        </div>
        <div className='profile-content'> 
        <ProfleCHead />
        <hr style={{margin:'20px 0px'}}/>
        <Outlet/>
        </div>
    </div>
  )
}

export default Profile