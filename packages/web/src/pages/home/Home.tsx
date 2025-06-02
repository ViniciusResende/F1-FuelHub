import { useEffect, useRef, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

/** Lib */
import { F1Team } from '@/lib/data/enums/F1Enums';

/** Components */
import F1TeamCard from '@/components/F1TeamCard/F1TeamCard';

/** Styles */
import './Home.scss';

function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | undefined>(undefined);

  const handleScrollCheck = () => {
    if (!mainRef.current) return;

    const mainRect = mainRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate progress based on main content's position
    // When main content is at viewport bottom, progress is 0
    // When main content is at viewport top, progress is 1
    const progress = Math.max(0, Math.min(1, 1 - (mainRect.top / viewportHeight)));
    
    setScrollProgress(progress);
    document.documentElement.style.setProperty('--scroll-progress', progress.toString());
  };

  const handleScrollOnClick = () => {
    if (!mainRef.current) return;

    mainRef.current.scrollIntoView({ behavior: 'smooth' });

    // Clear any existing animation tracking
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    // Track scroll progress during smooth scroll animation
    const trackScrollProgress = () => {
      handleScrollCheck();
      
      // Continue tracking until we reach the target (progress = 1)
      if (mainRef.current?.getBoundingClientRect().top !== 0) {
        scrollAnimationRef.current = requestAnimationFrame(trackScrollProgress);
      }
    };

    scrollAnimationRef.current = requestAnimationFrame(trackScrollProgress);
  };

  useEffect(() => {
    const scrollHandler = () => {
      requestAnimationFrame(handleScrollCheck);
    };  

    window.addEventListener('wheel', scrollHandler, { passive: true });
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initial check
    handleScrollCheck();

    return () => {
      window.removeEventListener('wheel', scrollHandler);
      window.removeEventListener('scroll', scrollHandler);
      
      // Clean up any ongoing animation tracking
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  return (
    <main className="home">
      <div className="background-wrapper">
        <div className="overlay" />
      </div>
      
      <section className="landing-section">
        <div className="content-wrapper">
          <h1 className="title">Welcome to F1 FuelHub</h1>
          <h2 className="subtitle">Your ultimate Formula 1 resource center</h2>
        </div>
        
        <button 
          className="scroll-button" 
          onClick={handleScrollOnClick}
          style={{ visibility: scrollProgress >= 1 ? 'hidden' : 'visible' }}
        >
          <div className="circle">
            <FaChevronDown />
          </div>
        </button>
      </section>

      <div className="main-content" ref={mainRef}>
        <F1TeamCard
          team={F1Team.Ferrari}
          title='Ferrari'
          description='Ferrari is an Italian Formula 1 team, known for its rich history and iconic red cars.'
          placement='second'
          Overlay={<h1>Teste</h1>}
        />
        <F1TeamCard
          team={F1Team.Ferrari}
          title='Ferrari'
          description='Ferrari is an Italian Formula 1 team, known for its rich history and iconic red cars.'
          placement='second'
          Overlay={<h1>Teste</h1>}
        />
        <F1TeamCard
          team={F1Team.Ferrari}
          title='Ferrari'
          description='Ferrari is an Italian Formula 1 team, known for its rich history and iconic red cars.'
          placement='second'
          Overlay={<h1>Teste</h1>}
        />
      </div>
    </main>
  );
}

export default Home;
