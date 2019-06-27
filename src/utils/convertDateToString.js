export function convertDateToString(date){
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const m = newDate.getMonth() + 1;
  const d = newDate.getUTCDate();
  const month =('0' + m).slice(-2);
  const day = ('0' + d).slice(-2);
  return`${year}-${month}-${day}`
}