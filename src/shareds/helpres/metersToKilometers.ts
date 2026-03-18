const metersToKilometers = (value: number) => {
  value = Math.round(value) / 1000;
  return Math.round(value * 10) / 10;
};

export default metersToKilometers;
