export const transformValuesToArray = (
  valueObj: Record<string, string>,
) => {
  const newObj = {} as Record<string, string[]>;
  Object.keys(valueObj).forEach((item) => {
    newObj[item] = valueObj[item as keyof object].split(', ');
  });
  return newObj;
};
