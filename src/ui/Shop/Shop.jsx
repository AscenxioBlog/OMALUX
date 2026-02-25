import React from 'react'
import Shopintro from './Shopintro'
import Shopproducts from './Shopproducts'

function Shop() {
  return (
    <div>
        
         <Shopintro />


         <div  className='px-4 lg:px-18'>

               <Shopproducts />
               
         </div>

    </div>
  )
}

export default Shop