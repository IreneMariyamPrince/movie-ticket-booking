/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/Admin/Cards';

const ThreeColumnsInfoCards = ({ totalCount, totalActive, totalPending }) => {
  return (
    <div className='row d-flex flex-wrap justify-content-around'>
      <div className='col mb-4'>
        <Cards background='primary' iconName='equalizer' count={Number(totalCount)}>
          Total
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='success' iconName='insert_emoticon' count={Number(totalActive)}>
          Active
        </Cards>
      </div>
      <div className='col mb-4'>
        <Cards background='secondary' iconName='hourglass_top' count={Number(totalPending)}>
          Pending
        </Cards>
      </div>
    </div>
  );
};
export default ThreeColumnsInfoCards;