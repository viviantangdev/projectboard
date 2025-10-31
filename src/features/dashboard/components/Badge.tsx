const Badge = <T extends string>({
  value,
  colorMap,
}: {
  value: T;
  colorMap: Record<T, string>;
}) => {
  return (
    <span className={`${colorMap[value]} py-1 px-2 rounded text-xs`}>
      {value}
    </span>
  );
};

export default Badge;
