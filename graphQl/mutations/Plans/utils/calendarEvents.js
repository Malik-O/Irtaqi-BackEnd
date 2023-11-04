import { extractISODate } from "./extractISODate";
// function
const calendarEvents = ({
    courseTitle,
    stringify,
    versesPerPage,
    surahAdj,
    $vuetify,
    plans,
}) => {
    let events = [];
    // style to fit calendar
    plans.forEach((plan) => {
        plan.custom_plans.forEach((day) => {
            const name = stringify({
                    title: plan.title,
                    day,
                    courseTitle,
                    versesPerPage,
                    surahAdj,
                    $vuetify,
                    showDate: false,
                }),
                date = extractISODate({ date: +day.date });
            events.push({
                id: day.id,
                start: date,
                end: date,
                name,
                color: plan.color || "primary",
            });
        });
    });

    return events;
};

export { calendarEvents };
