import { Search } from 'lucide-react'
import React from 'react'

export default function SearchBar() {
  return (
    <div className='flex items-center justify-center max-w-xl mx-auto'>
      <div className='flex items-center w-full space-x-3  py-2 px-2 md:px-4 md:py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200'>
        <input 
          type="search" 
          placeholder='Search your turf...'
          className='w-full outline-none text-gray-700 placeholder-gray-500   pl-2 text-sm md:text-md'
        />
        <Search 
          size={22} 
          className='text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-200'
        />
      </div>
    </div>
  )
}
