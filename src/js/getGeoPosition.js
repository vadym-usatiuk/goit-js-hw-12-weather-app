'use strict';
const getGeoPosition = () => {
  const options = {
    maximumAge: (1, 8 * Math.pow(10, 6)),
  };
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default getGeoPosition;
