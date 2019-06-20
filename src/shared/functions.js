// These are functions that I reuse:

export const compareTime = function(a, b) {
  const aValue = a.time;
  const bValue = b.time;
  let comparison = 0;
  if(aValue > bValue) {
    comparison = 1;
  } else if (aValue < bValue) {
    comparison = -1;
  } 
  return comparison;
};
