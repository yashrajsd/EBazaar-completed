import { async } from '@firebase/util'
import { doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db } from '../../../firebase'
import './ProfileSettings.scss'
import { useContext } from 'react'
import { UserContext } from '../../../Context/user.context'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
const ProfileSettings = () => {
    

    //context
    const {currentUser,userDB} = useContext(UserContext)
    const navigate =useNavigate()
    //context
    var emailAddress=null
    if(userDB?.email){
      emailAddress=userDB?.email
    }
    const userInfo={
        name:userDB?.name,
        city:userDB?.city,
        verified:userDB?.verified,
        email:emailAddress,
        state:userDB?.state,
        zipcode:userDB?.zipcode,
        address:userDB?.address
    }
    //form data
    const [data,setData]=useState(userInfo);
    const {name,city,verified,email,state,zipcode,address} = data;
    //form data
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const updateProfile=async(e)=>{
        e.preventDefault()
        const docRef =doc(db,'users',currentUser.uid)
        await updateDoc(docRef,{
            name:name,
            city:city,
            zipcode:zipcode,
            state:state,
            address:address,
            email:email
        })
        toast.success('Profile updates successfully')
        navigate('/')
    }
  return (
    <div className='profile-settings'>
        <div className='profile-banner' style={{backgroundImage:'url(https://thumbs.dreamstime.com/b/natural-background-banner-glaciers-snow-hillside-185879590.jpg)',backgroundPosition:'center'}}>
            
        </div>
        <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className='p-settings'>
            <div className='setting-header'>
                <img src="https://firebasestorage.googleapis.com/v0/b/ebazaar-final.appspot.com/o/photolab803472.jpg?alt=media&token=7e7fdc15-eac4-452b-aa36-d967cf2d79e0" alt="" />
                <div>
                    <h1>{name}</h1>
                    <p>{verified ? (<>Account has been verified :)</>):(<>Account not verified <span className='verify-btn'>verify now</span></>)}</p>
                </div>
            </div>
            <form action="submit" onSubmit={updateProfile} style={{marginTop:'20px'}}>
                 <div className="space-y-12">


        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                  Your display name
              </label>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={name}
                  type="text"
                  name="name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2   sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={handleChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2  sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  value={address}
                  onChange={handleChange}
                  type="text"
                  name="address"
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  value={city}
                  onChange={handleChange}
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  value={state}
                  onChange={handleChange}
                  type="text"
                  name="state"
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  value={zipcode}
                  onChange={handleChange}
                  type="text"
                  name="zipcode"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          Save
        </button>
      </div>
            </form>   
        </div>
        </div>
       {!userDB.admin && (
         <div className='wannabe-farmer'>
         <div className='div'>
           <div className='div-1'>
             <h1>Switch to farmer account!</h1>
             <p>Are you a farmer? switch your account to farmer and create your digital farm on EBazaar today</p>
           </div>
           <div className='div-2'>
             <Link to={'/profile/create-farm'}>
             <button>Create Farm</button>
             </Link>
           </div>
         </div>
       </div>
       )}
    </div>
  )
}

export default ProfileSettings