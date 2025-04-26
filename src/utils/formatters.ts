export const formatNumber = (number: number): string => {
    if (number === null || number === undefined) {
      return 'N/A';
    }
    if (Math.abs(number) >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        unitDisplay: 'short',
      }).format(number);
    }
    return new Intl.NumberFormat('en-US').format(number);
  };