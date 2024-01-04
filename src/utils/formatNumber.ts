export const formatNumber = (s: string) => {
  return (
    "+" + s.slice(0, 2) + " " + s.slice(2, 3) + s.slice(3, 7) + "-" + s.slice(7)
  );
};
