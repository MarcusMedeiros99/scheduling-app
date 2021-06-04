
function UTCToDateString(datetime) {
  const date = new Date(datetime);
  return date.toDateString();
}

export default UTCToDateString;