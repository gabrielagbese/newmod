import React from 'react'
import { useEffect } from 'react'
import { Tilt } from 'react-tilt'

function Face() {


    useEffect(() => {
        const container = document.querySelector('.face-container');
        const eyes = document.querySelectorAll('.eye');
        const pupils = document.querySelectorAll('.pupil');
        const neck = document.querySelector('.neck');
        //const pseudoElement = document.querySelector('.face-container::before');

        document.addEventListener('mousemove', e => {
            const x = e.clientX;
            const y = e.clientY;

            // Calculate the sway angle based on the mouse position
            const swayAngleX = (x / window.innerWidth) * 30 - 25;
            const swayAngleY = (y / window.innerHeight / 2) * 35 - 15;

            // Apply the sway angle to the container element
            container.style.transform = `perspective(1500px) rotateY(${swayAngleX}deg) rotateX(${-swayAngleY-10}deg)`;

            // Move the pupils based on the mouse position
            const pupilX = (x / window.innerWidth) * 50;
            const pupilY = (y / window.innerHeight) * 40;
            pupils.forEach(pupil => {
                pupil.style.transform = `translate(${pupilX - 30}%, ${pupilY}%)`;
            });

            //move neck
            // const neckTilt = (x / window.innerWidth) * 40 - 35;
            // neck.style.transform = `rotateZ(${-neckTilt/10}deg)`;

            const divCenterX = container.offsetLeft + container.offsetWidth / 2;
			const divCenterY = container.offsetTop + container.offsetHeight / 2;

			const angle = (divCenterX - x) / 200;
            neck.style.transform = `translate(0%, 0%) rotateZ(${angle}deg)`;

            const divCenterX2 = tiltingDiv.offsetLeft + tiltingDiv.offsetWidth / 2;
			const divCenterY2 = tiltingDiv.offsetTop + tiltingDiv.offsetHeight / 2;

			const angleX = (y - divCenterY2) / 100;
			const angleY = (divCenterX2 - x) / 100;

			neck.style.transform = `translate(0%, 0%) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            
        });

    });

    return (
        <div className='face-wrapper rounded'>
            <div className='face-container'>
                <div className='face-back'>
                    <div class="eye-left eye">
                        <div class="pupil"></div>
                    </div>
                    <div class="eye-right eye">
                        <div class="pupil"></div>
                    </div>
                </div>
                <div className='face-front'></div>
            </div>
            <div className='neck'>

            </div>
        </div>
    )
}

export default Face