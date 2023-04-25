import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import Person2Icon from '@mui/icons-material/Person2';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from 'react-router-dom'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import './Navbar.scss'
const products = [
  { name: 'All Products', description: 'Browse all products', href: '#', icon: ChartPieIcon },
  { name: 'Vegetables', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Fruits', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Dairy Items', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Other Products', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const helpers = [
  { name: 'Helping Hands', description: 'Browse all products', Link: '/helpers', icon: ChartPieIcon },
  { name: 'Rental Equipments', description: 'Speak directly to your customers', Link: '/rental-equipments', icon: CursorArrowRaysIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]
// const profileSettings=[
//   {
//     icon:'',
//     setting:'Profile Settings',
//     link:''
// }

// ]
// const beHelpers= [
//   { name: 'Be Helper', Link: '/be-helpers', icon: PlayCircleIcon },
//   { name: 'Rent Equipment', Link: 'rent-my-equipment', icon: PhoneIcon },
// ]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({user}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-40 navbar-container shadow-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global" style={{position:'relative'}}>
        <div className="flex lg:flex-1">
          <Link to={'/'} className="-m-1.5 p-1.5 logo">
            EBazaar
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          

          <Link to={'/products'} className="text-sm font-semibold leading-6 text-gray-900" style={{backgroundColor:'green',borderRadius:'5px',padding:'10px 20px',color:'white'}}>
            Market
          </Link>
          
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!user ? (<Link to={'/auth'} className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>):(
            <div style={{display:"flex",justifyContent:'center',alignItems:'center',gap:'20px'}}>
            <Link to={'/cart'}>
            <LocalMallIcon className='text-green-600'/>
            </Link>
            <Link to={'/profile'} style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'10px'}}>
            <button className='account-btn'>
              {/* <Person2Icon style={{marginRight:'10px'}}/> */}
              {user?.displayName.charAt(0)} 
            </button>
            {user?.displayName}
            </Link>
            {/* <span id='profile-dropDown'>
              
            </span> */}
            </div>
          )}
        </div>
      </nav>
      
    </header>
  )
}