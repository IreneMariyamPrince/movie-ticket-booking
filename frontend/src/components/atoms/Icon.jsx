import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ children, tooltip, ...props }) => {
  const { className } = props;
  const title = tooltip ? tooltip : '';
  return (
    <>
      <i className={className} title={title}>
        {children}
      </i>
    </>
  );
};

Icon.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  tooltip: PropTypes.string,
};

export default Icon;