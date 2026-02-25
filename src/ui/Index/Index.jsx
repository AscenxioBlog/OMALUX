import React from 'react'
import Intro from './Intro'
import Newarrival from './Newarrival'
import Topsales from './Topsales'
import FeaturedProducts from './FeaturedProducts'
import Handpicked from './Handpicked'
import OmasStore from './OmasStore'

function Index() {
  return (
    <div className='px-4 lg:px-18'>
           
            <Intro />
              
                <Newarrival />

                <Topsales />

                <FeaturedProducts />

                <Handpicked />

                <OmasStore />

    </div>
  )
}

export default Index