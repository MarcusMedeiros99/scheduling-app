
function UTCToTimeString(datetime) {
  const date = new Date(datetime);
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  return `${hour}:${minute}`;
}

export default UTCToTimeString;