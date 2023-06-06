import React from 'react'

import Dino from './Dino'

function Hero() {
  return (
    <div className='section-wrapper'>
      <div className='section-inner-wrapper rounded'>
        <div className='hero-wrapper rounded'>
          <div className='hero-top'>
          <p className='hero-text metal-text'>I'm Gabriel, a creative Frontend developer passionate about crafting unique and interactive digital experiences.</p>
          </div>
          <div className='hero-border'></div>
          <div className='hero-bottom'>
          {/* <Dino /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero