import React from 'react';

export const Price = ({price}) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const FormatDateTime = ({time}) => {
  // Tách phần ngày và thời gian
  const [datePart, timePart] = time.split('T');
  
  // Chuyển đổi dấu gạch ngang trong ngày thành dấu gạch chéo
  const formattedDate = datePart.replace(/-/g, '/');
  
  // Tách phần giờ phút giây và lấy phần giờ phút
  const formattedTime = timePart.slice(0, 5);

  // Ghép lại phần ngày và giờ với dấu gạch ngang
  return `${formattedDate} - ${formattedTime}`;
};