const FormatPercentageRound = percentage => {
    // Convert the input to a number
    const parsedPercentage = parseFloat(percentage);
    if (!isNaN(parsedPercentage)) {
      if (Number.isInteger(parsedPercentage)) {
        return Math.round(parsedPercentage) + '%';
      } else {
        // If it has decimal places, keep it as it is and append '%' symbol
        return parsedPercentage + '%';
      }
    } else {
      // If the input is not a valid number, return it as it is
      return percentage;
    }
  };
  
  export default FormatPercentageRound;