const getHistoryItem = (initDate, data) => ({
  date: initDate.toLocaleString('ru'),
  id: initDate.getTime(),
  ...data,
});

export default getHistoryItem;
