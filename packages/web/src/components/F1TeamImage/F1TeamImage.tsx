import cx from 'classnames';

/** Lib */
import { F1Team } from '@/lib/data/enums/F1Enums';

/** Components */
import Image from '../Common/Image';

/** Styles */
import './F1TeamImage.scss';

/** Base image dimensions in /public/assets/images/teams/ */
const BASE_SIZE = 300;

interface F1TeamImageProps {
  team: F1Team;
  className?: string;
  width?: number;
  alt?: string;
}

export default function F1TeamImage({
  team,
  className,
  width = BASE_SIZE,
  alt = `${team} team logo`,
}: F1TeamImageProps) {
  return (
    <Image
      src={`/assets/images/teams/${team.toLowerCase()}.png`}
      alt={alt}
      width={width}
      height={width}
      priority
      className={cx('f1-team-image', className)}
    />
  );
}
