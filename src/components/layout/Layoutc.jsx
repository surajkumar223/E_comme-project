import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../navbar/Navbar'
 

function Layoutc({children}) {
  return (
    <div>
      
       <Navbar/>
       <div className="min-h-screen main-content">
        {children}
       </div>
      <Footer/>
     
      </div>
  )
}

export default Layoutc