/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '../../atoms/Icon';
import FormatPercentageRound from '../../utilities/FormatPercentageRound';

const Cards = ({ children, iconName, background, count, percentageDifference }) => {
  const [displayedCount, setDisplayedCount] = useState(0);

  useEffect(() => {
    setDisplayedCount(0);
    let currentCount = 0; // Initialize currentCount

    const interval = setInterval(() => {
      if (currentCount < count) {
        setDisplayedCount(prevCount => prevCount + 1);
        currentCount++; // Increment currentCount
      } else {
        clearInterval(interval);
      }
    }, 1000 / count); // Increment count in 10 seconds

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className='card'>
      <div className='card-header p-3 pt-2'>
        <div
          className={`icon icon-lg icon-shape bg-gradient-${background} shadow-dark text-center border-radius-xl mt-n4 position-absolute`}
        >
          <Icon className='material-icons opacity-10'>{iconName}</Icon>
        </div>
        <div className='text-end pt-1'>
          <p className='text-sm mb-0 text-capitalize'>{children}</p>
          <h4 className='mb-0'>{displayedCount}</h4>
        </div>
      </div>
      {percentageDifference !== undefined && <hr className='dark horizontal my-0' />}
      <div className='card-footer p-3'>
        {percentageDifference !== undefined && (
          <p className='mb-0'>
            <span className='text-success text-sm font-weight-bolder me-2'>
              {FormatPercentageRound(percentageDifference)}
            </span>
            than last week
          </p>
        )}
      </div>
    </div>
  );
};

Cards.propTypes = {
  children: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  percentageDifference: PropTypes.number, // Making it optional
};

export default Cards;