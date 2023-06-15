import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';

import Hero from './Components/Hero';
import About from './Components/About';
import Work from './Components/Work';
import Contact from './Components/Contact';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';


import SpotifyWebApi from 'spotify-web-api-js';
import Face from './Components/Face';
import Watch from './Components/Watch';



function App() {
	const stageRef = useRef(null);
	const sideScreenRef = useRef(null);
	const faceRef = useRef(null)
	const [initialX, setInitialX] = useState(0);
	const [initialY, setInitialY] = useState(0);
	const [isSmallViewport, setIsSmallViewport] = useState(false);
	const [isBigViewport, setIsBigViewport] = useState(false);
	const [computedWidth, setComputedWidth] = useState(0);
	const [computedHeight, setComputedHeight] = useState(0);

	const CLIENT_ID = 'ed27c4fadd0e474f9534bf0210057ee1'; 
	const REDIRECT_URI = 'http://localhost:5173/';

	const [currentTrack, setCurrentTrack] = useState(null);

	const marqueeRef = useRef(null);

	const [time, setTime] = useState(new Date());

	const [sideScrolled, setSideScrolled ] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		const handleViewportChange = () => {
		  window.location.reload(); // Trigger page refresh
		};
	
		window.addEventListener('resize', handleViewportChange);
	
		return () => {
		  window.removeEventListener('resize', handleViewportChange);
		};
	  }, []);

	const localTimeOptions = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		hourCycle: 'h23', 
		timeZone: 'Europe/Budapest',
	};

	const localTimeString = time.toLocaleTimeString([], localTimeOptions).replace(/ AM| PM/g, '').replace(/^24:/, '00:');

	

	useEffect(() => {
		const marqueeElement = marqueeRef.current;
		const scrollDuration = 10000; // 10 seconds

		const scrollStep = () => {
			if (marqueeElement.scrollLeft >= marqueeElement.scrollWidth) {
				marqueeElement.scrollLeft = 0;
			} else {
				marqueeElement.scrollLeft += 1;
				requestAnimationFrame(scrollStep);
			}
		};

		const scrollInterval = setInterval(scrollStep, 10);

		// Clean up interval on component unmount
		return () => {
			clearInterval(scrollInterval);
		};
	}, []);

	useEffect(() => { 
		const calculateDimensions = () => {
			const parentElements = document.getElementsByClassName('rounded');
			Array.from(parentElements).forEach(parentElement => {
				const parentStyles = window.getComputedStyle(parentElement);
				const parentBorderRadius = parseFloat(parentStyles.borderRadius);
				const childElements = parentElement.getElementsByClassName('rounded');

				Array.from(childElements).forEach(childElement => {
					const childBorderRadius = parentBorderRadius / 2;
					const parentWidth = parseFloat(parentStyles.width);
					const parentHeight = parseFloat(parentStyles.height);

					const additionalClasses = Array.from(childElement.classList).filter(className => className !== 'rounded');
					const existingStyles = window.getComputedStyle(childElement, additionalClasses.join(', '));
					const childWidth = parseFloat(existingStyles.width) - 2 * childBorderRadius;
					const childHeight = parseFloat(existingStyles.height) - 2 * childBorderRadius;

					const childMargin = `${(childBorderRadius / parentWidth) * 100}%`;

					childElement.style.borderRadius = `${childBorderRadius}px`;
					childElement.style.margin = childMargin;
					childElement.style.width = `calc((${(childWidth / parentWidth) * 100}%))`;
					childElement.style.height = `calc((${(childHeight / parentHeight) * 100}%))`;
				});
			});
		};

		calculateDimensions();
	}, []);

	let mm = gsap.matchMedia();

	const animateScroll = (targetScrollLeft) => {
		let scrollTween = gsap.timeline();
		gsap.to(sideScreenRef.current, { duration: 3.12, scrollLeft: targetScrollLeft, ease: 'power3.easeInOut' });
		if (!sideScrolled){
			scrollTween.progress(1, false);
			scrollTween.to(".time",{autoAlpha: 0, duration: 0.5})
			setSideScrolled(true);
		}else{
			scrollTween.progress(1, false);
			scrollTween.to(".time",{autoAlpha: 1, duration: 3, delay: 2})
			setSideScrolled(false);
		}
	};

	const stageHero = () => {
		mm.add('(min-width: 960px)', () => {
			gsap.to(stageRef.current, { duration: 1, y: initialY + '%', ease: 'power3.easeIn' });
		});

		mm.add('(max-width: 959px)', () => {
			gsap.to(stageRef.current, { duration: 0.75, x: initialX + '%', ease: 'power3.easeIn' });
		});

		animateScroll(0);
	};

	const stageAbout = () => {
		mm.add('(min-width: 960px)', () => {
			gsap.to(stageRef.current, { duration: 1, y: initialY - 25 + '%', ease: 'power3.easeIn' });
		});

		mm.add('(max-width: 959px)', () => {
			gsap.to(stageRef.current, { duration: 0.75, x: initialX - 25 + '%', ease: 'power3.easeIn' });
		});

		animateScroll(sideScreenRef.current.scrollWidth);
	};

	const stageWork = () => {
		mm.add('(min-width: 960px)', () => {
			gsap.to(stageRef.current, { duration: 1, y: initialY - 50 + '%', ease: 'power3.easeIn' });
			if (faceRef.current) {
				gsap.to(faceRef.current, { 
					opacity: 1, 
					duration: 1,
					onComplete: () => {
						faceRef.classList.remove('face-aux-empty'); 
						faceRef.classList.add('face-aux-project');  
					  gsap.to(faceRef, {
						opacity: 1, 
						duration: 1, 
					  });
					},
				  });
			  }
		});

		mm.add('(max-width: 959px)', () => {
			gsap.to(stageRef.current, { duration: 0.75, x: initialX - 50 + '%', ease: 'power3.easeIn' });
		});

		animateScroll(sideScreenRef.current.scrollWidth);
	};

	const stageContact = () => {
		mm.add('(min-width: 960px)', () => {
			gsap.to(stageRef.current, { duration: 1, y: initialY - 75 + '%', ease: 'power3.easeIn' });
		});

		mm.add('(max-width: 959px)', () => {
			gsap.to(stageRef.current, { duration: 0.75, x: initialX - 75 + '%', ease: 'power3.easeIn' });
		});

		animateScroll(sideScreenRef.current.scrollWidth);
	};

	useEffect(() => {
		setInitialX(stageRef.current.getBoundingClientRect().left);
		setInitialY(stageRef.current.getBoundingClientRect().top);
	}, []);

	return (
		<>
			<div className="wrapper">
				<p className='mobile-home' onClick={stageHero} >| <span className='mobile-home-g' >G</span> |</p>
				<div className="main-wrapper" ref={stageRef}>
					<Hero />
					<About />
					<Work />
					<Contact />
				</div>
				
				<div className="side-wrapper">
					<div className="side-screen" ref={sideScreenRef}>
						<div className="screen-children rounded">
							<div className='rounded time-location'>
								<div className='location rounded'>
									<div className='icon-time rounded'>
												<div className='location-time'>
													<div className='clock2'>
													<span>{localTimeString.split(':')[0]}</span>
													<span className="blink">:</span>
													<span>{localTimeString.split(':')[1]}</span>
												</div>
											</div>
									</div>
									
									<div className='rounded city'>Debrecen, HU</div>									
									<div className='rounded remote'>(Remote)</div>
								</div>
								<div className='time rounded'>
									{/* <Watch /> */}
								</div>
							</div>
							<div className='gk rounded spotify-wrapper'>
								<div className='spotify-icon'><FontAwesomeIcon icon={faSpotify} /></div>
								<div className='rounded spotify'>
									<div className='track-name'>
										<div className='marquee' ref={marqueeRef}>Coffee don't read signs</div>
										<div className='marquee' ref={marqueeRef}>Coffee don't read signs</div>
									</div>
									<p className='artist-name'>Odeal</p>
								</div>
							</div>
						</div>
						<div onClick={stageHero} className="screen-children2 rounded">
							<Face ref={faceRef}/>
						</div>
					</div>
					<div className='nav-border'></div>
					<nav className='nav-wrapper rounded'>
						{/* <button onClick={stageHero} className='nav-item rounded'>Home</button> */}
						<button onClick={stageAbout} className='nav-item rounded'>About</button>
						<button onClick={stageWork} className='nav-item rounded'>Work</button>
						<button onClick={stageContact} className='nav-item rounded'>Contact</button>
					</nav>
				</div>
			</div>
		</>
	);
}

export default App;
