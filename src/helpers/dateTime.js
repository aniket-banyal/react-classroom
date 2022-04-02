export function getDateAndTimeInLocale(date, locale = 'en-US', timeStyle = 'short') {

    let dateFormat = {
        month: "short", day: "numeric"
    }

    const now = new Date()
    if (date.getFullYear() !== now.getFullYear())
        dateFormat.year = "numeric"

    const localeDate = date.toLocaleDateString(locale, dateFormat)
    const localeTime = date.toLocaleTimeString(locale, { timeStyle: timeStyle })
    return [localeDate, localeTime]
}
