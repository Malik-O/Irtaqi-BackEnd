export const extractISODate = ({ date = new Date(), fullDate, time } = {}) => {
    // console.log("-------------------------------");
    // console.log(date);
    if (+date) date = +date;
    date = new Date(date);
    if (time) return date.getTime();
    const iso = date.toISOString();
    // console.log(iso);
    // console.log("-------------------------------");
    return fullDate ? iso : iso.slice(0, 10);
};
