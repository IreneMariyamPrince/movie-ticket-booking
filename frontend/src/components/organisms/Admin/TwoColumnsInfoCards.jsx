/* eslint-disable react/prop-types */
import React from 'react';
import Cards from '../../molecules/Admin/Cards';

const TwoColumnsInfoCards = ({ totalCount, totalActive }) => {
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
    </div>
  );
};
export default TwoColumnsInfoCards;