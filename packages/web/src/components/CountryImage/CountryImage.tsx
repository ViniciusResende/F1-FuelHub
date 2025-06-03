import cx from 'classnames';

/** Lib */
import { F1Country } from '@/lib';

/** Components */
import Image from '../Common/Image';

/** Styles */
import './CountryImage.scss';

/** Base image dimensions in /public/assets/images/flags/ */
const BASE_WIDTH = 96;
const BASE_HEIGHT = 64;
const RATIO = BASE_HEIGHT / BASE_WIDTH;

interface CountryImageProps {
  country: F1Country;
  className?: string;
  width?: number;
  alt?: string;
}

export default function CountryImage({
  country,
  className,
  width = BASE_WIDTH,
  alt = `${country} country flag`,
}: CountryImageProps) {
  const height = Math.round(width * RATIO);

  return (
    <Image
      src={`/assets/images/flags/${country.toLowerCase()}.png`}
      alt={alt}
      width={width}
      height={height}
      priority
      className={cx('country-image', className)}
    />
  );
}
