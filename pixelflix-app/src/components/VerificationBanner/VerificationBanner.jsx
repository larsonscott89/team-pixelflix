import React from 'react';
import './VerificationBanner.scss';

function VerificationBanner({ message, isVerified }) {
  return (
    <div className={`verification-banner ${isVerified ? 'verified' : 'unverified'}`}>
      {message}
    </div>
  );
}

export default VerificationBanner;
