import { useEffect, useState } from 'react';
import { FaFlag, FaTrophy } from 'react-icons/fa';

/** Lib */
import Lib, { IDriverPoleStatsWithCountry, IDriverBasicInfo } from '@/lib';

/** Components */
import F1TeamPilotImage from '@/components/F1TeamPilotImage';
import F1TeamImage from '@/components/F1TeamImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Common/Loader';

/** Styles */
import './Drivers.scss';
import CountryImage from '@/components/CountryImage';

const countryCodeMap: Record<string, string> = {
  argentina: 'AR',
  australia: 'AU',
  brazil: 'BR',
  canada: 'CA',
  italy: 'IT',
  france: 'FR',
  japan: 'JP',
  monaco: 'MC',
  newzealand: 'NZ',
  netherlands: 'NL',
  thailand: 'TH',
  germany: 'DE',
  spain: 'ES',
  unitedstates: 'US',
  unitedkingdom: 'GB',
};

function TopDriverCard({
  driver,
  position,
}: {
  driver: IDriverPoleStatsWithCountry;
  position: 'first' | 'second' | 'third';
}) {
  const positionColors = {
    first: '#FFD700',
    second: '#C0C0C0',
    third: '#CD7F32',
  };

  return (
    <div className={`top-driver-card ${position}`}>
      <div
        className='position-indicator'
        style={{ backgroundColor: positionColors[position] }}>
        <FaTrophy />
      </div>
      <div className='driver-image-wrapper'>
        <F1TeamPilotImage
          pilot={driver.driver}
          team={driver.team}
          width={200}
          className='driver-image'
        />
      </div>
      <div className='driver-info'>
        <div className='driver-name'>{driver.driverName}</div>
        <div className='driver-number'>#{driver.driverNumber}</div>
        <div className='team-info'>
          <div className='team-logo'>
            <F1TeamImage team={driver.team} width={120} />
          </div>
          <div className='team-name'>{driver.teamName}</div>
        </div>
        <div className='stats'>
          <div className='stat'>
            <div className='value'>{driver.totalPodiums}</div>
            <div className='label'>Total Podiums</div>
          </div>
          <div className='positions'>
            <div className='position'>
              <div className='circle gold' />
              <div className='value'>{driver.firstPlaces}</div>
            </div>
            <div className='position'>
              <div className='circle silver' />
              <div className='value'>{driver.secondPlaces}</div>
            </div>
            <div className='position'>
              <div className='circle bronze' />
              <div className='value'>{driver.thirdPlaces}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Drivers() {
  const [topPoleDrivers, setTopPoleDrivers] = useState<
    IDriverPoleStatsWithCountry[]
  >([]);
  const [drivers, setDrivers] = useState<IDriverBasicInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Lib.drivers.getDriversData();
        setTopPoleDrivers(data.topPoleDrivers);
        setDrivers(data.drivers);
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='drivers-wrapper'>
      <Header />
      <div className='background-wrapper'>
        <div className='overlay' />
      </div>

      <main className='drivers'>
        <section className='top-drivers-section'>
          <h2 className='section-title'>
            <FaFlag style={{ marginRight: '0.5rem', color: '#FFD700' }} />
            Top Pole Position Drivers
          </h2>

          <div className='podium-container'>
            {topPoleDrivers.map((driver, index) => (
              <TopDriverCard
                key={driver.driverNumber}
                driver={driver}
                position={
                  ['first', 'second', 'third'][index] as
                    | 'first'
                    | 'second'
                    | 'third'
                }
              />
            ))}
          </div>
        </section>

        <section className='all-drivers-section'>
          <h2 className='section-title'>All Drivers</h2>
          <div className='drivers-grid'>
            {drivers.map((driver) => (
              <div key={driver.driverNumber} className='driver-card'>
                <div className='driver-image-container'>
                  <F1TeamPilotImage
                    pilot={driver.driver}
                    team={driver.team}
                    className='driver-image'
                    width={300}
                  />
                </div>
                <div className='driver-info'>
                  <div className='driver-header'>
                    <div className='driver-name-container'>
                      <div className='driver-name'>{driver.driverName}</div>
                      <div className='driver-number'>
                        #{driver.driverNumber}
                      </div>
                      <div className='driver-country'>
                        <CountryImage country={driver.country} width={40} />
                      </div>
                    </div>
                    <div className='team-logo'>
                      <F1TeamImage team={driver.team} width={80} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Drivers;
