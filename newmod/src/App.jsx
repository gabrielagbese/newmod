import { useState, useRef, useEffect } from 'react'
import {gsap} from 'gsap'
import './App.css'

import Hero from './Components/Hero'
import About from './Components/About'
import Work from './Components/Work'
import Contact from './Components/Contact'

function App() {

  const stageRef = useRef(null);

  useEffect(() => {
    const handleViewportChange = () => {
      gsap.matchMediaRefresh();
    };

    window.addEventListener('resize', handleViewportChange);
    return () => {
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  let mm = gsap.matchMedia();

	const stageHero = () => {
		mm.add("(min-width: 800px)", () => {
			gsap.to(stageRef.current, { duration: 1, y: -0 + "%", ease: 'power3.easeIn', });
		});

		mm.add("(max-width: 799px)", () => {
			gsap.to(stageRef.current, { duration: 0.75, x: -0 + "%", ease: 'power3.easeIn', });
		});

	};

	const stageAbout = () => {
		mm.add("(min-width: 800px)", () => {
			gsap.to(stageRef.current, { duration: 1, y: -25 + "%", ease: 'power3.easeIn', });
		});

		mm.add("(max-width: 799px)", () => {
			gsap.to(stageRef.current, { duration: 0.75, x: -25 + "%", ease: 'power3.easeIn', });
		});

	};

	const stageWork = () => {
		mm.add("(min-width: 800px)", () => {
			gsap.to(stageRef.current, { duration: 1, y: -50 + "%", ease: 'power3.easeIn', });
		});

		mm.add("(max-width: 799px)", () => {
			gsap.to(stageRef.current, { duration: 0.75, x: -50 + "%", ease: 'power3.easeIn', });
		});

	};
	const stageContact = () => {
		mm.add("(min-width: 800px)", () => {
			gsap.to(stageRef.current, { duration: 1, y: -75 + "%", ease: 'power3.easeIn', });
		});

		mm.add("(max-width: 799px)", () => {
			gsap.to(stageRef.current, { duration: 0.75, x: -75 + "%", ease: 'power3.easeIn', });
		});

	};

  return (
    <>
      <div className='wrapper'>
        <div className='main-wrapper' ref={stageRef} >
          <Hero />
          <About />
          <Work />
          <Contact />
        </div>
        <div className='side-wrapper'>
          <button onClick={stageHero}>Hero</button>
          <button onClick={stageAbout}>About</button>
          <button onClick={stageWork}>Work</button>
          <button onClick={stageContact}>Contact</button>
        </div>
      </div>
    </>
  )
}

export default App
