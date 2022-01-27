export default function filterHolidays(holidaysData) {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;

  return holidaysData.response.holidays.filter((holiday) => {
    return (
      (holiday.date.datetime.month === currentMonth &&
        holiday.date.datetime.day >= currentDay) ||
      holiday.date.datetime.month > currentMonth
    );
  });
}
