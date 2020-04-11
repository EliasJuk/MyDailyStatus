import React from 'react'
import Navbar from './Navbar'

const Header = () => {
    return(
        <div className='bg-gray-200 font-bold'>
            <h1>
                <img 
                    src="/logo.png" 
                    className="h-32 mx-auto py-4" 
                    alt="MyDailyStatus-Logo" 
                    height="60" 
                />
            </h1>
            <Navbar />
        </div>
    )
}

export default Header