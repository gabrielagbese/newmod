import React from 'react'

import Dino from './Dino'

function Hero() {
  return (
    <div className='section-wrapper'>
      <div className='section-inner-wrapper rounded'>
        <div className='hero-wrapper rounded'>
          <div className='hero-top'>
            <Dino />
          </div>
          <div className='hero-bottom'></div>
        </div>
      </div>
    </div>
  )
}

export default Hero