export default function() {
  return {
    year: new Date().getUTCFullYear(),
    month: new Date().getUTCMonth(),
    day: new Date().getUTCDate(),
  };
}
