// -----------   locales Ukr   --------------

const daysUkr = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];
const monthsUkr = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
];

// ------------------------  locales rus -------------

const daysRus = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const monthsRus = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабр",
];

// a function that sets the language of the calendar

function setCalendarLanguage(days, months) {
    const locale = {
        localize: {
            day: (n) => days[n],
            month: (n) => months[n],
        },
        formatLong: {
            date: () => "mm/dd/yyyy",
        },
    };
    return locale
}

// a function that selects the calendar in the desired language


export function getLocaleCalendar(language) {
    if (language === "ua") {
        return setCalendarLanguage(daysUkr, monthsUkr)
    } else if (language === "ru") {
        return setCalendarLanguage(daysRus, monthsRus)
    } else {
        return "en"
    }
}