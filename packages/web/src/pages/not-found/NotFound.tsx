/** Next Js */
import { useRouter } from 'next/router';

/** Components */
import Button from '../../components/Button';

/** Assets */
import { CarRepairIllustration } from '../../assets/svg/illustrations';

/** Styles */
import './NotFound.scss';

function NotFound() {
  const router = useRouter();

  const goHome = () => router.push('/');

  return (
    <main className='wrapper'>
      <CarRepairIllustration className='illustration' />
      <h1 className='title'>404 – Page Not Found</h1>
      <p className='text'>Looks like you took a wrong turn in the pit lane.</p>

      <Button onClick={goHome} modifier='default'>
        Back to Home
      </Button>
    </main>
  );
}

/** Exports */
export default NotFound;
