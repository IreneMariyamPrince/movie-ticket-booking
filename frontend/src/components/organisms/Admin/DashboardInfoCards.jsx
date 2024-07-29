/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/Admin/Cards';

const DashboardInfoCards = ({ counts, percentageDifference }) => {
  return (
    <div className='row'>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='dark'
          iconName='groups'
          count={Number(counts?.regionActiveUsers)}
          percentageDifference={percentageDifference?.regionCount}
        >
          Public Users
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='primary'
          iconName='theaters'
          count={Number(counts?.employerActiveUsers)}
          percentageDifference={percentageDifference?.employerCount}
        >
          Theaters
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6 mb-xl-0 mb-4'>
        <Cards
          background='success'
          iconName='event'
          count={Number(counts?.candidateActiveUsers)}
          percentageDifference={percentageDifference?.candidateCount}
        >
          Events
        </Cards>
      </div>
      <div className='col-xl-3 col-sm-6'>
        <Cards background='info' iconName='festival' count={70}>
          Total Shows
        </Cards>
      </div>
    </div>
  );
};
export default DashboardInfoCards;