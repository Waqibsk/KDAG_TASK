import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav className="bg-gray-800 text-gray-300  flex justify-between items-center p-3 max-[400px]:flex-col">
      <div className="flex items-center space-x-2 p-2">
        <img className=" rounded-sm w-[20%]" src="https://media.licdn.com/dms/image/v2/D4D0BAQFYn-N0fzx9nQ/company-logo_200_200/company-logo_200_200/0/1704312041712/kdag_logo?e=2147483647&v=beta&t=XdA1RKLiBvnR1Q7_MeTjLvdklii453_MLiF8B3NgWa8" alt="" />
        <p className=" text-white font-light text-2xl ">Kharagpur <span className='font-bold '>Data<br/> Analytics</span>  Group</p>
      </div>
    <div className='flex space-x-8 max-[400px]:flex-col '>
        <Link to="/add" className='text-xl p-2 font-medium hover:bg-white hover:text-black rounded-lg transition duration-400'>
            Add post
        </Link>
        <Link to="/" className='text-xl p-2 mr-4  hover:bg-white hover:text-black rounded-lg transition duration-400'>
            Home
        </Link>
    
    </div>


      
    </nav>
    </div>
  )
}
