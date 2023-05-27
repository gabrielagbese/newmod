import React from 'react'
import { useEffect } from 'react'
import { Tilt } from 'react-tilt'

function Face() {

    useEffect(() => {
        const container = document.querySelector('.face-container');
        const eyes = document.querySelectorAll('.eye');
        const pupils = document.querySelectorAll('.pupil');
        const pseudoElement = document.querySelector('.face-container::before');

        document.addEventListener('mousemove', e => {
            const x = e.clientX;
            const y = e.clientY;

            // Calculate the sway angle based on the mouse position
            const swayAngleX = (x / window.innerWidth) * 30 - 25;
            const swayAngleY = (y / window.innerHeight/2) * 35 - 15;

            // Apply the sway angle to the container element
            container.style.transform = `perspective(1500px) rotateY(${swayAngleX+5}deg) rotateX(${-swayAngleY}deg)`;

            // Move the pupils based on the mouse position
            const pupilX = (x / window.innerWidth) * 50;
            const pupilY = (y / window.innerHeight) * 40;
            pupils.forEach(pupil => {
                pupil.style.transform = `translate(${pupilX - 75}%, ${pupilY + 20}%)`;
            });
        });

    });

    return (
        <div className='face-container'>
            <div class="eye left"> 
                <div class="pupil"></div>
            </div>
            <div class="eye right">
                <div class="pupil"></div>
            </div>
        </div>
    )
}

export default Face