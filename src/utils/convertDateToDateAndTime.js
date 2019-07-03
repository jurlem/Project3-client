export function convertDateToDateAndTime (date) {
  const newDate = new Date (date);
  const year = newDate.getFullYear ();
  const m = newDate.getMonth () + 1;
  const d = newDate.getUTCDate ();
  const month = ('0' + m).slice (-2);
  const day = ('0' + d).slice (-2);
  const h = newDate.getHours ();
  const hour = ('0' + h).slice (-2);
  const min = newDate.getMinutes ();
  const minutes = ('0' + min).slice (-2);
  return ` ${hour}:${minutes} ${day}-${month}-${year} `;
}

export function convertDateToStringTwo (date) {
  const newDate = date;
}
