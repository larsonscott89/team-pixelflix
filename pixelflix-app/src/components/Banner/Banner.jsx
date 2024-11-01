import React from 'react';
import './Banner.scss';

const Banner = ({ message, isSuccess}) => {
  return (
    <div className={`banner ${isSuccess ? 'success' : 'error'}`}>
      <p>{message}</p>
    </div>
  );
};

export default Banner;
