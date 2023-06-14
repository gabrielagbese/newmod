import React from 'react'
import { useEffect } from 'react'

function Watch() {

    useEffect(() => {
        setInterval(setClock, 1000)

        const hourHand = document.querySelector('[data-hour-hand]')
        const minuteHand = document.querySelector('[data-minute-hand]')
        const secondHand = document.querySelector('[data-second-hand]')

        function setClock() {
            // const currentDate = new Date();
            // const secondsRatio = currentDate.getSeconds() / 60;
            // const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
            // const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
            // setRotation(secondHand, secondsRatio);
            // setRotation(minuteHand, minutesRatio);
            // setRotation(hourHand, hoursRatio);
            const currentDate = new Date();
            const options = { timeZone: 'Europe/Budapest' };
            const adjustedDate = currentDate.toLocaleString('en-US', options);
            const secondsRatio = new Date(adjustedDate).getSeconds() / 60;
            const minutesRatio = (secondsRatio + new Date(adjustedDate).getMinutes()) / 60;
            const hoursRatio = (minutesRatio + new Date(adjustedDate).getHours()) / 12;
            setRotation(secondHand, secondsRatio);
            setRotation(minuteHand, minutesRatio);
            setRotation(hourHand, hoursRatio);

            //console.log(adjustedDate)
        }

        function setRotation(element, rotationRatio) {
            element.style.setProperty('--rotation', rotationRatio * 360)
        }
    },);

  return (
    <div className='clock'>
        <div className='hand hour' data-hour-hand></div>
        <div className='hand minute' data-minute-hand></div>
        <div className='hand second' data-second-hand></div>
        <div className='number number1 dial'></div>
        <div className='number number2 dial'></div>
        <div className='number number3 dial'><p>|</p></div>
        <div className='number number4 dial'></div>
        <div className='number number5 dial'></div>
        <div className='number number6 dial'><p>|</p></div>
        <div className='number number7 dial'></div> 
        <div className='number number8 dial'></div>
        <div className='number number9 dial'><p>|</p></div>
        <div className='number number10 dial'></div>
        <div className='number number11 dial'></div>
        <div className='number number12 dial'><p>||</p></div>
    </div>
  )
}

export default Watch