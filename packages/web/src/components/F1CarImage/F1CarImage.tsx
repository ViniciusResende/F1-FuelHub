import cx from 'classnames';

/** Lib */
import { F1Team } from '@/lib';

/** Components */
import Image from '../Common/Image';

/** Styles */
import './F1CarImage.scss';

/** Base image dimensions in /public/assets/images/cars/ */
const BASE_WIDTH = 1320;
const BASE_HEIGHT = 743;
const RATIO = BASE_HEIGHT / BASE_WIDTH;

interface F1CarImageProps {
  team: F1Team;
  className?: string;
  width?: number;
  alt?: string;
}

export default function F1CarImage({
  team,
  className,
  width = BASE_WIDTH,
  alt = `${team} F1 car`,
}: F1CarImageProps) {
  const height = Math.round(width * RATIO);

  return (
    <Image
      src={`/assets/images/cars/${team}.png`}
      alt={alt}
      width={width}
      height={height}
      priority
      className={cx('f1-car-image', className)}
    />
  );
}
