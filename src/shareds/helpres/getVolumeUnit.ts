const getVolumeUnit = (value: string | undefined) => {
  if (!value) return '';
  const volumeNumber = +value;
  if (Number.isNaN(volumeNumber)) return value;
  return volumeNumber > 10 ? ' мл.' : ' л.';
};

export default getVolumeUnit;
