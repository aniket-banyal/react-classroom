export function getDateAndTimeInLocale(date, locale = 'en-US', dateStyle = 'medium', timeStyle = 'short') {
    const localeDate = date.toLocaleDateString(locale, { dateStyle: dateStyle })
    const localeTime = date.toLocaleTimeString(locale, { timeStyle: timeStyle })
    return [localeDate, localeTime]
}
