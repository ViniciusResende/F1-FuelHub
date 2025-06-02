import cx from 'classnames';

/** Lib */
import { F1Team, F1Pilot } from '@/lib/data/enums/F1Enums';

/** Components */
import Image from '../Common/Image';

/** Styles */
import './F1TeamPilotImage.scss';

/** Base image dimensions in /public/assets/images/pilots/[team] */
const BASE_SIZE = 500;

interface F1TeamPilotImageProps {
  team: F1Team;
  pilot: F1Pilot;
  className?: string;
  width?: number;
  alt?: string;
}

export default function F1TeamPilotImage({
  team,
  pilot,
  className,
  width = BASE_SIZE,
  alt = `${pilot} - ${team}`,
}: F1TeamPilotImageProps) {
  return (
    <Image
      src={`/assets/images/pilots/${team.toLowerCase()}/${pilot.toLowerCase()}.png`}
      alt={alt}
      width={width}
      height={width}
      priority
      className={cx('f1-team-pilot-image', className)}
    />
  );
}
