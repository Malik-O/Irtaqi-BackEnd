export default function (date = new Date()) {
    let currYear = date.getFullYear(),
        currMonth = date.getMonth(),
        // getting first day of month
        firstDayOfMonth_date = new Date(currYear, currMonth, 1),
        firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(),
        // getting last date of month
        lastDateOfMonth_Date = new Date(currYear, currMonth + 1, 0),
        lastDateOfMonth = lastDateOfMonth_Date.getDate(),
        // getting last day of month
        lastDayOfMonth_date = new Date(currYear, currMonth, lastDateOfMonth),
        lastDayOfMonth = lastDayOfMonth_date.getDay(),
        // getting next month
        nextMonth_date = new Date(
            firstDayOfMonth_date.setMonth(firstDayOfMonth_date.getMonth() + 1)
        ),
        // getting last date of previous month
        lastDateOfLastMonth_Date = new Date(currYear, currMonth, 0),
        lastDateOfLastMonth = lastDateOfLastMonth_Date.getDate(),
        // days list
        daysList = [];
    // *creating li of previous month last days
    for (let i = firstDayOfMonth; i > 0; i--) {
        let day = lastDateOfLastMonth - i + 1,
            liDate = new Date(lastDateOfLastMonth_Date.setDate(day));
        daysList.push({
            day,
            date: liDate,
            inactive: true,
        });
    }
    // *creating li of all days of current month
    for (let i = 1; i <= lastDateOfMonth; i++) {
        // adding active class to li if the current day, month, and year matched
        let isToday =
            i === date.getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear();
        // push to list
        let liDate = new Date(lastDateOfMonth_Date.setDate(i));
        daysList.push({ day: i, date: liDate, isToday: !!isToday });
    }
    // *creating li of next month first days
    for (let i = lastDayOfMonth; i < 6; i++) {
        let day = i - lastDayOfMonth + 1,
            liDate = new Date(nextMonth_date.setDate(day));
        daysList.push({ day, date: liDate, inactive: true });
    }
    // split to weeks
    const weeksList = [];
    while (daysList.length) weeksList.push(daysList.splice(0, 7));
    // return
    return weeksList;
}
