export const formatTimeFromSeconds = (seconds: number) => {
    const leftSeconds = Math.floor(seconds % 60)
    const leftMinutes = Math.floor(seconds / 60)
    const leftHours = Math.floor(seconds / 3600)
    let time = ""

    if (seconds > 3599) time += `${leftHours}h `
    if (seconds > 59) time += `${leftMinutes}m `
    if (seconds > 0) time += `${leftSeconds}s`

    return time
}
export const getTimeView = (minutes: number) => {
    if (minutes < 60) {
        return ` < ${Math.floor(minutes) + 1} Minuten`
    }
    if (minutes / 60 < 24) {
        return ` < ${Math.floor(minutes / 60) + 1} Stunden`
    }
    if (minutes / 60 / 24 < 100) {
        return ` < ${Math.floor(minutes / 60 / 24) + 1} Tage`
    }
}