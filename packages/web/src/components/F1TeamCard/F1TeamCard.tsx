import { ReactElement } from 'react';

/** Lib */
import { F1Team, TeamEnumToTeamNameMap } from '@/lib';

/** Components */
import F1TeamImage from '../F1TeamImage';
import F1CarImage from '../F1CarImage';

/** Assets */
import {
  FirstPlaceMedalIcon,
  SecondPlaceMedalIcon,
  ThirdPlaceMedalIcon,
} from '@/assets/svg/icons';

/** Styles */
import './F1TeamCard.scss';

type placementType = 'first' | 'second' | 'third';

interface F1TeamCardProps {
  team: F1Team;
  title: string;
  description?: string;
  Overlay?: ReactElement;
  placement?: placementType;
  teamImageWidth?: number;
}

const TeamMedalIconMap = new Map<placementType, ReactElement>([
  ['first', <FirstPlaceMedalIcon key='first' />],
  ['second', <SecondPlaceMedalIcon key='second' />],
  ['third', <ThirdPlaceMedalIcon key='third' />],
]);

export default function F1TeamCard({
  team,
  title,
  description,
  Overlay,
  placement,
  teamImageWidth = 200,
}: F1TeamCardProps) {
  return (
    <section className='f1-team-card'>
      <div className='f1-team-card__background'>
        <F1CarImage team={team} />
      </div>
      <div className='f1-team-card__content'>
        <main>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
          {Overlay && Overlay}
          <div className='f1-team-card__badge'>
            {placement && TeamMedalIconMap.get(placement)}
          </div>
        </main>
        <footer>
          <F1TeamImage team={team} width={teamImageWidth} />
          <strong>{TeamEnumToTeamNameMap.get(team)}</strong>
        </footer>
      </div>
    </section>
  );
}
