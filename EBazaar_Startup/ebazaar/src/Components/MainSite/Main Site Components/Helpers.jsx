import React from 'react'
import HMain from './Helpers Components/HMain'
import HSearch from './Helpers Components/HSearch'
import './Helpers.scss'
const Helpers = () => {
  return (
    <div className='helpers-container'>
      <HSearch/>
      <HMain/>
    </div>
  )
}

export default Helpers