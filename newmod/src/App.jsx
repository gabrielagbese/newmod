import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './App.css';

import Hero from './Components/Hero';
import About from './Components/About';
import Work from './Components/Work';
import Contact from './Components/Contact';

function App() {
	const stageRef = useRef(null);
	const sideScreenRef  = useRef(null);
	const [initialX, setInitialX] = useState(0);
	const [initialY, setInitialY] = useState(0);
	const [isSmallViewport, setIsSmallViewport] = useState(false);
	const [isBigViewport, setIsBigViewport] = useState(false);

	useEffect(() => {
		const handleViewportChange = () => {
			const currentWidth = window.innerWidth;
			const isViewportAbove960px = currentWidth > 960;
			const isViewportBelow960px = currentWidth <= 960;

			if (isViewportAbove960px && !isBigViewport) {
				gsap.matchMediaRefresh();
				setIsBigViewport(true);
				setIsSmallViewport(false);
				gsap.set(stageRef.current, { clearProps: 'all' });
				setInitialY(0);
				setInitialX(0);
			} else if (!isViewportAbove960px && !isSmallViewport) {
				gsap.matchMediaRefresh();
				setIsSmallViewport(true);
				setIsBigViewport(false);
				gsap.set(stageRef.current, { clearProps: 'all' });
				setInitialX(0);
				setInitialY(0);
			}

			if (isViewportBelow960px && !isSmallViewport) {
				gsap.matchMediaRefresh();
				setIsSmallViewport(true);
				setIsBigViewport(false);
				gsap.set(stageRef.current, { clearProps: 'all' });
				setInitialX(0);
				setInitialY(0);
			} else if (!isViewportBelow960px && !isBigViewport) {
				gsap.matchMediaRefresh();
				setIsBigViewport(true);
				setIsSmallViewport(false);
				gsap.set(stageRef.current, { clearProps: 'all' });
				setInitialY(0);
				setInitialX(0);
			}
		};

		window.addEventListener('resize', handleViewportChange);
		return () => {
			window.removeEventListener('resize', handleViewportChange);
		};
	}, [isSmallViewport, isBigViewport]);

	let mm = gsap.matchMedia();

	const animateScroll = (targetScrollLeft) => {
		gsap.to(sideScreenRef.current, { duration: 1.5, scrollLeft: targetScrollLeft, ease: 'power3.easeInOut' });
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
				<div className="main-wrapper" ref={stageRef}>
					<Hero />
					<About />
					<Work />
					<Contact />
				</div>
				<div className="side-wrapper">
					<div className="side-screen" ref={sideScreenRef}>
						<div className="screen-children rounded"></div>
            			<div className="screen-children2 rounded"></div>
					</div>
					<button onClick={stageHero}>Hero</button>
					<button onClick={stageAbout}>About</button>
					<button onClick={stageWork}>Work</button>
					<button onClick={stageContact}>Contact</button>
				</div>
			</div>
		</>
	);
}

export default App;
