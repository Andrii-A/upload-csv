export const mapDate = (dateString) => {
  const d = new Date(dateString);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
