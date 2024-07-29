/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

const ConfirmationDialog = ({
  title,
  icon,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor,
  confirmButtonText,
  cancelButtonText,
  confirmAction,
  feature,
}) => {
  const { type, className, content, tooltip } = feature;
  const handleConfirm = () => {
    Swal.fire({
      title: title,
      icon: icon,
      showCancelButton: showCancelButton,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then(result => {
      if (result.isConfirmed) {
        confirmAction();
      }
    });
  };

  return type === 'icon' ? (
    <Link onClick={handleConfirm}>
      <Icon className={className} title={tooltip}>
        {content}
      </Icon>
    </Link>
  ) : null;
};

export default ConfirmationDialog;