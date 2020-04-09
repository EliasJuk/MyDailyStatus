import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return(
        <div className='bg-gray-200'>
            <h1>
                <img 
                    src="/logo.png" 
                    className="h-24 mx-auto py-4" 
                    alt="MyDailyStatus-Logo" 
                    height="60" 
                />
            </h1>
            <Navbar />
        </div>
    )
}

export default Header