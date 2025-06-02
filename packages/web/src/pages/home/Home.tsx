import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaTrophy, FaFlag, FaClock, FaBolt } from 'react-icons/fa';

/** Lib */
import { F1Team, F1Pilot } from '@/lib/data/enums/F1Enums';

/** Components */
import F1TeamCard from '@/components/F1TeamCard';
import F1TeamPilotImage from '@/components/F1TeamPilotImage';

/** Styles */
import './Home.scss';

// Mock data for top drivers
const TOP_DRIVERS = [
  {
    pilot: F1Pilot.Verstappen,
    team: F1Team.RedBull,
    positions: {
      first: 30,
      second: 15,
      third: 8
    }
  },
  {
    pilot: F1Pilot.Leclerc,
    team: F1Team.Ferrari,
    positions: {
      first: 25,
      second: 20,
      third: 10
    }
  },
  {
    pilot: F1Pilot.Bortoleto,
    team: F1Team.KickSauber,
    positions: {
      first: 22,
      second: 18,
      third: 12
    }
  }
];

// Mock data for pit stops
const FASTEST_PITSTOPS = {
  currentYear: {
    team: F1Team.RedBull,
    time: 1.82,
    year: 2025
  },
  allTime: {
    team: F1Team.RedBull,
    time: 1.82,
    year: 2019
  }
};

// Mock data for top speed
const TOP_SPEED = {
  pilot: F1Pilot.Verstappen,
  team: F1Team.RedBull,
  speed: 362.4,
  year: 2025
};

function getPilotName(pilot: F1Pilot): string {
  switch (pilot) {
    case F1Pilot.Verstappen:
      return 'Max Verstappen';
    case F1Pilot.Leclerc:
      return 'Charles Leclerc';
    case F1Pilot.Bortoleto:
      return 'Gabriel Bortoleto';
    default:
      return 'Unknown Pilot';
  }
}

function PilotStatsOverlay({ pilot, positions }: { pilot: F1Pilot, positions: { first: number; second: number; third: number; } }) {
  const total = positions.first + positions.second + positions.third;

  return (
    <div className="stats-overlay">
      <F1TeamPilotImage 
        pilot={pilot} 
        team={TOP_DRIVERS.find(d => d.pilot === pilot)?.team || F1Team.RedBull}
        className="pilot-image" 
      />
      <div className="stats">
        <div className="total">{total}</div>
        <div className="positions">
          <div className="position">
            <div className="circle gold" />
            {positions.first}
          </div>
          <div className="position">
            <div className="circle silver" />
            {positions.second}
          </div>
          <div className="position">
            <div className="circle bronze" />
            {positions.third}
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <section className="section most-voted-section">
          <h2 className="section-title">
            <FaTrophy style={{ marginRight: '0.5rem', color: '#FFD700' }} />
            Most Voted Team
          </h2>
          
          <div className="votes-info">
            <div className="votes-count">1,234</div>
            <div className="votes-label">Total Votes</div>
          </div>

          <div className="team-card-wrapper">
            <F1TeamCard
              team={F1Team.RedBull}
              title='Red Bull Racing'
              description='Red Bull Racing, the current dominant force in Formula 1, known for their aerodynamic excellence and strategic mastery.'
              placement='first'
            />
          </div>
        </section>

        <section className="section top-drivers-section">
          <h2 className="section-title">
            <FaFlag style={{ marginRight: '0.5rem', color: '#FFD700' }} />
            Top Pole Position Drivers
          </h2>

          <div className="drivers-container">
            {TOP_DRIVERS.map((driver, index) => (
              <div key={driver.pilot} className={`driver-card ${['first', 'second', 'third'][index]}`}>
                <F1TeamCard
                  team={driver.team}
                  title={getPilotName(driver.pilot)}
                  placement={['first', 'second', 'third'][index] as any}
                  Overlay={<PilotStatsOverlay pilot={driver.pilot} positions={driver.positions} />}
                  teamImageWidth={150}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="section fastest-pitstops-section">
          <h2 className="section-title">
            <FaClock style={{ marginRight: '0.5rem', color: '#FFD700' }} />
            Fastest Pit Stops
          </h2>

          <div className="pitstops-container">
            <div className="pitstop-card current-year">
              <h3>Fastest Pit Stop {FASTEST_PITSTOPS.currentYear.year}</h3>
              <F1TeamCard
                team={FASTEST_PITSTOPS.currentYear.team}
                title={`${FASTEST_PITSTOPS.currentYear.time.toFixed(2)}s`}
                description={`${FASTEST_PITSTOPS.currentYear.team} set the fastest pit stop of ${FASTEST_PITSTOPS.currentYear.year} with an incredible time of ${FASTEST_PITSTOPS.currentYear.time.toFixed(2)} seconds.`}
                placement="first"
                teamImageWidth={170}
              />
            </div>

            <div className="pitstop-card all-time">
              <h3>All-Time Record</h3>
              <F1TeamCard
                team={FASTEST_PITSTOPS.allTime.team}
                title={`${FASTEST_PITSTOPS.allTime.time.toFixed(2)}s`}
                description={`${FASTEST_PITSTOPS.allTime.team} holds the all-time record with an astonishing ${FASTEST_PITSTOPS.allTime.time.toFixed(2)} seconds pit stop in ${FASTEST_PITSTOPS.allTime.year}.`}
                placement="first"
                teamImageWidth={170}
              />
            </div>
          </div>
        </section>

        <section className="section top-speed-section">
          <h2 className="section-title">
            <FaBolt style={{ marginRight: '0.5rem', color: '#FFD700' }} />
            Top Speed Record
          </h2>

          <div className="speed-card">
            <h3>Fastest Speed {TOP_SPEED.year}</h3>
            <F1TeamCard
              team={TOP_SPEED.team}
              title={`${TOP_SPEED.speed.toFixed(1)} km/h`}
              description={`${getPilotName(TOP_SPEED.pilot)} achieved an incredible top speed of ${TOP_SPEED.speed.toFixed(1)} km/h driving for ${TOP_SPEED.team} in ${TOP_SPEED.year}.`}
              placement="first"
              teamImageWidth={170}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Home;
