import React from 'react'
import { Textfit } from 'react-textfit';
import Typewriter from 'typewriter-effect';
import { Tilt } from 'react-tilt'

function Hero() {

	const defaultOptions = {
		reverse:        true,  // reverse the tilt direction
		max:            1,     // max tilt rotation (degrees)
		perspective:    300,   // Transform perspective, the lower the more extreme the tilt gets.
		scale:          1.01,    // 2 = 200%, 1.5 = 150%, etc..
		speed:          500,   // Speed of the enter/exit transition
		transition:     true,   // Set a transition on enter/exit.
		axis:           'x',   // What axis should be disabled. Can be X or Y.
		reset:          false,    // If the tilt effect has to be reset on exit.
		easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
		//"mouse-event-element":  null,   // css-selector or link to HTML-element what will be listen mouse events
		gyroscope:              true,   // Boolean to enable/disable device orientation detection,
		gyroscopeMinAngleX:     -45,    // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
		gyroscopeMaxAngleX:     45,     // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
		gyroscopeMinAngleY:     -45,    // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
		gyroscopeMaxAngleY:     45,     // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
	}

	return (
		<div className='section-wrapper'>
			<div className='section-inner-wrapper rounded'>
				<div className='hero-wrapper rounded'>
					<div className='hero-space'></div>
					<div className='hero-top'>
						<div className='hi-text'>Hi, I'm</div>
						<div className='name-text'>Gabriel <span className='surname-text'>Agbese</span></div>
					</div>
					{/* <div className='hero-border'></div> */}
					<div className='hero-bottom'>
						<div className='hero-left'>
							<p className='hero-text'>I'm a creative frontend developer passionate about crafting unique and interactive digital experiences.</p>
							<div className='opportunity-text'>
								<p>Available for&nbsp;</p>
								<p><Typewriter
									options={{
										strings: ['freelance', 'fulltime', 'part-time', 'internship'],
										autoStart: true,
										loop: true,
									}}
								/>
								</p>
								<p>&nbsp;positions</p>
							</div>
							<div className='hero-social'>
								<div className='hero-social-icon'>Github</div>
								<div className='hero-social-icon'>LinkedIn</div>
								<div className='hero-social-icon'>Email</div>
							</div>
						</div>
						{/* <div className='hero-border'></div> */}
						<div className='hero-right'>
							<div className='game-space'>
										<div className='layer-wrapper'>
											<div className='layer0'></div>
											{/* <div className='layer1'></div>
											<div className='layer2'></div>
											<div className='layer3'></div>
											<div className='layer4'></div>  */}
										</div>
								<div className="scanline"></div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default Hero