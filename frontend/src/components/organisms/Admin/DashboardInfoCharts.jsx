/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Charts from '../../molecules/Admin/Charts';

const DashboardInfoCharts = ({
  regionChartData,
  employerChartData,
  candidateChartData,
  fromDate,
  toDate,
}) => {
  const [regionLabel, setRegionLabel] = useState();
  const [regionCount, setRegionCount] = useState();
  const [employerLabel, setEmployerLabel] = useState();
  const [employerCount, setEmployerCount] = useState();
  const [candidateLabel, setCandidateLabel] = useState();
  const [candidateCount, setCandidateCount] = useState();
  useEffect(() => {
    setRegionLabel(regionChartData?.map(day => day.dayName));
    setRegionCount(regionChartData?.map(count => count.count));
    setEmployerLabel(employerChartData?.map(day => day.dayName));
    setEmployerCount(employerChartData?.map(count => count.count));
    setCandidateLabel(candidateChartData?.map(day => day.dayName));
    setCandidateCount(candidateChartData?.map(count => count.count));
  }, [regionChartData, employerChartData, candidateChartData]);

  return (
    <div className='row mt-4'>
      <div className='col-lg-4 col-md-6 mt-4 mb-4'>
        <Charts
          type='bar'
          background='primary'
          shadow='primary'
          title='Ticket Sales'
          description='Total regions registered in last week'
          fromDate={fromDate}
          toDate={toDate}
          chartLabel={regionLabel}
          data={regionCount}
          label='Ticket Sales'
        />
      </div>
      <div className='col-lg-4 col-md-6 mt-4 mb-4'>
        <Charts
          type='bar'
          background='success'
          shadow='success'
          title='Logged Users'
          description='Total employers registered last week'
          chartLabel={employerLabel}
          data={employerCount}
          fromDate={fromDate}
          toDate={toDate}
          label='Logged Users'
        />
      </div>
      <div className='col-lg-4 mt-4 mb-3'>
        <Charts
          type='bar'
          background='dark'
          shadow='dark'
          title='Bookings'
          description='Total candidates registered in last week'
          chartLabel={candidateLabel}
          data={candidateCount}
          fromDate={fromDate}
          toDate={toDate}
          label='Bookings'
        />
      </div>
    </div>
  );
};

export default DashboardInfoCharts;