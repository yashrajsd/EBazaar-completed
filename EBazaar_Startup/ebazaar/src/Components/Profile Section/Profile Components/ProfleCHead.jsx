import React from 'react'
import './ProfleCHead.scss'
import { useState,useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext } from 'react';
import { UserContext } from '../../../Context/user.context';
const ProfleCHead = () => {
    const [time, setTime] = useState(new Date());
    const {userDB} = useContext(UserContext)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();

  let greeting;
  if (hours >= 5 && hours < 12) {
    greeting = 'Good morning';
  } else if (hours >= 12 && hours < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }
  return (
    <div className='ProfleCHead-container'>
        <div className='div-1'>
            <p>{greeting}</p>
        </div>
        <div className='div-2'>
            <AccountCircleIcon className='icon'/>
            <p>{userDB && (userDB?.name)}</p>
        </div>
    </div>
  )
}

export default ProfleCHead