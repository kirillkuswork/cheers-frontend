interface IProps {
  idx: number;
  name: string;
  value: string;
}

export const ProductSearchDescItem = (props: IProps) => {
  const {
    idx,
    name,
    value,
  } = props;

  if (!value) {
    return null;
  }

  return (
    <span>
      {idx !== 0 && ', '}
      {value}
      {name === 'volume' && ' мл'}
    </span>
  );
};
