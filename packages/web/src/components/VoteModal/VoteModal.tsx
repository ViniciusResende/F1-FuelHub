/** React Imports */
import React from 'react';
import { FaVoteYea } from 'react-icons/fa';

/** Components */
import Input from '../Common/Input';
import Button from '../Common/Button';

/** Styles */
import './VoteModal.scss';

interface VoteModalProps {
  isOpen: boolean;
  teamName: string;
  email: string;
  emailError?: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  onCancel: () => void;
  hasStoredEmail?: boolean;
}

export default function VoteModal({
  isOpen,
  teamName,
  email,
  emailError,
  onEmailChange,
  onConfirm,
  onCancel,
  hasStoredEmail = false,
}: VoteModalProps) {
  const isEmailValid = hasStoredEmail || (email && !emailError);

  return (
    <>
      <div
        className={`vote-modal-overlay ${isOpen ? 'open' : ''}`}
        onClick={onCancel}
      />
      <div className={`vote-modal-container ${isOpen ? 'open' : ''}`}>
        <div className='vote-modal-icon'>
          <FaVoteYea size={32} color='#E10600' />
        </div>
        <h3>Vote for Team</h3>
        <span className='vote-modal-message'>
          {hasStoredEmail ? (
            <>
              You are voting for {teamName} using your email {email}. Would you
              like to confirm your vote?
            </>
          ) : (
            <>
              You are voting for {teamName}. Please enter your email to confirm
              your vote.
            </>
          )}
        </span>
        {!hasStoredEmail && (
          <div className='vote-modal-form'>
            <Input
              controlId='email'
              inputLabel='Email'
              value={email}
              onChange={onEmailChange}
              customErrorMessage={emailError}
            />
          </div>
        )}
        <div className='vote-modal-buttons'>
          <Button type='button' modifier='secondary' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type='button'
            modifier='default'
            onClick={onConfirm}
            disabled={!isEmailValid}>
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}
