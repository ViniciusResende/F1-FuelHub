import { useEffect, useState } from 'react';
import { FaTrophy } from 'react-icons/fa';

/** Lib */
import Lib, {
  F1Team,
  ITeamsData,
  TeamEnumToTeamNameMap,
  LocalStorageKeysEnum,
} from '@/lib';

/** Components */
import F1TeamCard from '@/components/F1TeamCard';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Common/Loader';
import VoteModal from '@/components/VoteModal';

/** Styles */
import './Teams.scss';

function Teams() {
  const [teamsData, setTeamsData] = useState<ITeamsData>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<F1Team | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | undefined>();
  const [favoriteTeam, setFavoriteTeam] = useState<F1Team | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Lib.teams.getTeamsData();
        setTeamsData(data);

        // Load saved email and favorite team from local storage
        const savedEmail = Lib.utils.localStorage.getLocalStorageItem(
          LocalStorageKeysEnum.USER_EMAIL,
        );
        if (savedEmail) {
          setEmail(savedEmail);
          setStoredEmail(savedEmail);
        }

        const savedTeam = Lib.utils.localStorage.getLocalStorageItem(
          LocalStorageKeysEnum.FAVOTIRE_TEAM,
        );
        if (savedTeam) {
          setFavoriteTeam(savedTeam as F1Team);
        }
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

  const handleTeamClick = (team: F1Team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
    setEmailError(undefined);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError(undefined);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handleVoteSubmit = async () => {
    if (!selectedTeam) return;

    if (!storedEmail && !validateEmail(email)) {
      return;
    }

    try {
      await Lib.teams.voteForTeam(email, selectedTeam);

      // Save email and team to local storage
      Lib.utils.localStorage.setLocalStorageItem(
        LocalStorageKeysEnum.USER_EMAIL,
        email,
      );
      Lib.utils.localStorage.setLocalStorageItem(
        LocalStorageKeysEnum.FAVOTIRE_TEAM,
        selectedTeam,
      );

      // Update stored email state
      setStoredEmail(email);

      // Update favorite team state
      setFavoriteTeam(selectedTeam);

      // Refresh teams data
      const updatedData = await Lib.teams.getTeamsData();
      setTeamsData(updatedData);

      // Close modal
      handleModalClose();
    } catch (err) {
      Lib.utils.logging.error(
        err instanceof Error ? err.message : 'Failed to submit vote',
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!teamsData) {
    return null;
  }

  // Get all teams from the enum to ensure we display all of them
  const allTeams = Object.values(F1Team);

  // Create a map of team votes for easy lookup
  const teamVotesMap = new Map(
    teamsData.teams.map((team) => [team.team, team.voteCount]),
  );

  return (
    <div className='teams-wrapper'>
      <Header />
      <div className='background-wrapper'>
        <div className='overlay' />
      </div>

      <main className='teams'>
        <section className='most-voted-team-section'>
          <h2 className='section-title'>
            <FaTrophy style={{ marginRight: '0.5rem', color: '#FFD700' }} />
            Most Voted Team
          </h2>
          <div className='most-voted-team-card'>
            <F1TeamCard
              team={teamsData.mostVotedTeam.team}
              title={`${teamsData.mostVotedTeam.voteCount} Votes`}
              description={`${TeamEnumToTeamNameMap.get(
                teamsData.mostVotedTeam.team,
              )} is currently leading the votes!`}
              placement='first'
              teamImageWidth={200}
            />
          </div>
        </section>

        <section className='all-teams-section'>
          <h2 className='section-title'>All Teams</h2>
          <div className='teams-grid'>
            {allTeams.map((team) => (
              <div
                key={team}
                className={`team-card ${
                  favoriteTeam === team ? 'favorite' : ''
                }`}
                onClick={() => handleTeamClick(team)}>
                <F1TeamCard
                  team={team}
                  title={`${teamVotesMap.get(team) || 0} Votes`}
                  teamImageWidth={120}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <VoteModal
        isOpen={isModalOpen}
        teamName={selectedTeam ? TeamEnumToTeamNameMap.get(selectedTeam)! : ''}
        email={email}
        emailError={emailError}
        onEmailChange={handleEmailChange}
        onConfirm={handleVoteSubmit}
        onCancel={handleModalClose}
        hasStoredEmail={Boolean(storedEmail)}
      />

      <Footer />
    </div>
  );
}

export default Teams;
