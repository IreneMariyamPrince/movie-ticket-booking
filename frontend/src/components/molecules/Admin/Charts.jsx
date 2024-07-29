/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types';
import DateFormat from '../../utilities/DateFormat';

const Charts = ({
  type,
  background,
  shadow,
  title,
  description,
  fromDate,
  toDate,
  chartLabel,
  label,
  data,
}) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      // Destroy the existing chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Initialize a new Chart.js instance
      const ctx = chartRef.current.getContext('2d');
      chartRef.current.chart = new Chart(ctx, {
        type: type,
        data: {
          // labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          labels: chartLabel,
          datasets: [
            {
              label: label,
              borderColor: 'rgba(255, 255, 255, .8)',
              borderWidth: 1,
              backgroundColor: 'rgba(255, 255, 255,0.8)',
              // data: [50, 20, 10, 22, 50, 10, 40],
              data: data,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, .2)',
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 500,
                beginAtZero: true,
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: 'Roboto',
                  style: 'normal',
                  lineHeight: 2,
                },
                color: '#fff',
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, .2)',
              },
              ticks: {
                display: true,
                color: '#f8f9fa',
                padding: 10,
                font: {
                  size: 14,
                  weight: 300,
                  family: 'Roboto',
                  style: 'normal',
                  lineHeight: 2,
                },
              },
            },
          },
          indexAxis: 'x', // change the axis for bar chart
          barThickness: 5, // Adjust the width of the bars
        },
      });
    }
  }, [label, data]);

  return (
    <div className='card z-index-2'>
      <div className='card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent'>
        <div className={`bg-gradient-${background} shadow-${shadow} border-radius-lg py-3 pe-1`}>
          <div className='chart'>
            <canvas ref={chartRef} id='chart-bar' className='chart-canvas' height='170'></canvas>
          </div>
        </div>
      </div>
      <div className='card-body'>
        <h6 className='mb-0'>{title}</h6>
        <p className='text-sm'>{description}</p>
        <hr className='dark horizontal' />
        <div className='d-flex'>
          <i className='material-icons text-sm my-auto me-1'>schedule</i>
          <p className='mb-0 text-sm'>
            {DateFormat(fromDate)} - {DateFormat(toDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

Charts.propTypes = {
  type: PropTypes.string.isRequired, // Assuming children will be a string
  background: PropTypes.string.isRequired,
  shadow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  update: PropTypes.string,
};
export default Charts;