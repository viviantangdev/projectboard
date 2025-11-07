const Badge = <T extends string>({
  value,
  colorMap,
  onClick,
}: {
  value: T;
  colorMap: Record<T, string>;
  onClick?: () => void;
}) => {
  return (
    <span
      onClick={onClick}
      className={`${onClick && 'cursor-pointer'} ${
        colorMap[value]
      } rounded  py-1 px-2`}
    >
      {value}
    </span>
  );
};

export default Badge;
