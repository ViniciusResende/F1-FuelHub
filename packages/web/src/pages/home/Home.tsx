import { useEffect, useRef, useState } from 'react';
import {
  FaChevronDown,
  FaTrophy,
  FaFlag,
  FaClock,
  FaBolt,
} from 'react-icons/fa';

/** Lib */
import Lib, { F1Team, F1Pilot, IHomeData } from '@/lib';

/** Components */
import F1TeamCard from '@/components/F1TeamCard';
import F1TeamPilotImage from '@/components/F1TeamPilotImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Common/Loader';

/** Styles */
import './Home.scss';

function PilotStatsOverlay({
  pilot,
  positions,
}: {
  pilot: F1Pilot;
  positions: {
    first: number;
    second: number;
    third: number;
    team: F1Team;
  };
}) {
  const total = positions.first + positions.second + positions.third;

  return (
    <div className='stats-overlay'>
      <F1TeamPilotImage
        pilot={pilot}
        team={positions.team}
        className='pilot-image'
      />
      <div className='stats'>
        <div className='total'>{total}</div>
        <div className='positions'>
          <div className='position'>
            <div className='circle gold' />
            {positions.first}
          </div>
          <div className='position'>
            <div className='circle silver' />
            {positions.second}
          </div>
          <div className='position'>
            <div className='circle bronze' />
            {positions.third}
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [homeData, setHomeData] = useState<IHomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const mainRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Lib.home.getHomeData();
        setHomeData(data);
      } catch (err) {
        Lib.utils.logging.error(
          err instanceof Error ? err.message : 'Failed to fetch data',
        );
        throw err;
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScrollCheck = () => {
    if (!mainRef.current) return;

    const mainRect = mainRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const progress = Math.max(
      0,
      Math.min(1, 1 - mainRect.top / viewportHeight),
    );

    setScrollProgress(progress);
    document.documentElement.style.setProperty(
      '--scroll-progress',
      progress.toString(),
    );
  };

  const handleScrollOnClick = () => {
    if (!mainRef.current) return;

    mainRef.current.scrollIntoView({ behavior: 'smooth' });

    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current);
    }

    const trackScrollProgress = () => {
      handleScrollCheck();

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

    handleScrollCheck();

    return () => {
      window.removeEventListener('wheel', scrollHandler);
      window.removeEventListener('scroll', scrollHandler);

      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!homeData) {
    return null;
  }

  return (
    <div className='home-wrapper'>
      <Header isVisible={scrollProgress > 0} />
      <div className='background-wrapper'>
        <div className='overlay' />
      </div>

      <main className='home'>
        <section className='landing-section'>
          <div className='content-wrapper'>
            <h1 className='title'>Welcome to F1 FuelHub</h1>
            <h2 className='subtitle'>
              Your ultimate Formula 1 resource center
            </h2>
          </div>

          <button
            className='scroll-button'
            onClick={handleScrollOnClick}
            style={{ visibility: scrollProgress >= 1 ? 'hidden' : 'visible' }}>
            <div className='circle'>
              <FaChevronDown />
            </div>
          </button>
        </section>

        <div className='main-content' ref={mainRef}>
          <section className='section most-voted-section'>
            <h2 className='section-title'>
              <FaTrophy style={{ marginRight: '0.5rem', color: '#FFD700' }} />
              Most Voted Team
            </h2>

            <div className='votes-info'>
              <div className='votes-count'>
                {homeData.mostVotedTeam.voteCount}
              </div>
              <div className='votes-label'>Total Votes</div>
            </div>

            <div className='team-card-wrapper'>
              <F1TeamCard
                team={homeData.mostVotedTeam.team}
                title={homeData.mostVotedTeam.teamName}
                description={`${homeData.mostVotedTeam.teamName} leads the popularity contest with ${homeData.mostVotedTeam.voteCount} votes from Formula 1 fans.`}
                placement='first'
              />
            </div>
          </section>

          <section className='section top-drivers-section'>
            <h2 className='section-title'>
              <FaFlag style={{ marginRight: '0.5rem', color: '#FFD700' }} />
              Top Pole Position Drivers
            </h2>

            <div className='drivers-container'>
              {homeData.topPoleDrivers.map((driver, index) => (
                <div
                  key={driver.driverNumber}
                  className={`driver-card ${
                    ['first', 'second', 'third'][index]
                  }`}>
                  <F1TeamCard
                    team={driver.team}
                    title={driver.driverName}
                    placement={['first', 'second', 'third'][index] as any}
                    Overlay={
                      <PilotStatsOverlay
                        pilot={driver.driver}
                        positions={{
                          first: driver.firstPlaces,
                          second: driver.secondPlaces,
                          third: driver.thirdPlaces,
                          team: driver.team,
                        }}
                      />
                    }
                    teamImageWidth={150}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className='section fastest-pitstops-section'>
            <h2 className='section-title'>
              <FaClock style={{ marginRight: '0.5rem', color: '#FFD700' }} />
              Fastest Pit Stops
            </h2>

            <div className='pitstops-container'>
              <div className='pitstop-card current-year'>
                <h3>
                  Fastest Pit Stop{' '}
                  {homeData.fastestPitstops.currentSeason.seasonYear}
                </h3>
                <F1TeamCard
                  team={homeData.fastestPitstops.currentSeason.team}
                  title={`${homeData.fastestPitstops.currentSeason.durationInSeconds.toFixed(
                    2,
                  )}s`}
                  description={`${
                    homeData.fastestPitstops.currentSeason.driverName
                  } and ${
                    homeData.fastestPitstops.currentSeason.teamName
                  } set the fastest pit stop of ${
                    homeData.fastestPitstops.currentSeason.seasonYear
                  } with an incredible time of ${homeData.fastestPitstops.currentSeason.durationInSeconds.toFixed(
                    2,
                  )} seconds.`}
                  placement='first'
                  teamImageWidth={170}
                />
              </div>

              <div className='pitstop-card all-time'>
                <h3>All-Time Record</h3>
                <F1TeamCard
                  team={homeData.fastestPitstops.allTime.team}
                  title={`${homeData.fastestPitstops.allTime.durationInSeconds.toFixed(
                    2,
                  )}s`}
                  description={`${
                    homeData.fastestPitstops.allTime.driverName
                  } and ${
                    homeData.fastestPitstops.allTime.teamName
                  } hold the all-time record with an astonishing ${homeData.fastestPitstops.allTime.durationInSeconds.toFixed(
                    2,
                  )} seconds pit stop in ${
                    homeData.fastestPitstops.allTime.seasonYear
                  }.`}
                  placement='first'
                  teamImageWidth={170}
                />
              </div>
            </div>
          </section>

          <section className='section top-speed-section'>
            <h2 className='section-title'>
              <FaBolt style={{ marginRight: '0.5rem', color: '#FFD700' }} />
              Top Speed Record
            </h2>

            <div className='speed-card'>
              <h3>Fastest Speed {homeData.latestTopSpeed.seasonYear}</h3>
              <F1TeamCard
                team={homeData.latestTopSpeed.team}
                title={`${homeData.latestTopSpeed.speedInKph.toFixed(1)} km/h`}
                description={`${
                  homeData.latestTopSpeed.driverName
                } achieved an incredible top speed of ${homeData.latestTopSpeed.speedInKph.toFixed(
                  1,
                )} km/h driving for ${homeData.latestTopSpeed.teamName} in ${
                  homeData.latestTopSpeed.seasonYear
                }.`}
                placement='first'
                teamImageWidth={170}
              />
            </div>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default Home;
