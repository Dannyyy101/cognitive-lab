export const formatTimeFromSeconds = (time: number) => {
    const seconds = Math.floor(time % 60).toString().padStart(2, "0")
    const minutes = Math.floor(time / 60).toString().padStart(2, "0")
    const hour = Math.floor(time / 3600).toString().padStart(2, "0")

    return `${hour}:${minutes}:${seconds}`
}

export const getTimeView = (minutes: number) => {
    if (minutes < 60) {
        return ` < ${Math.floor(minutes) + 1} Minuten`
    }
    if(minutes / 60 < 24){
        return ` < ${Math.floor(minutes / 60) + 1} Stunden`
    }
    if(minutes / 60 / 24 < 100){
        return ` < ${Math.floor(minutes / 60 / 24) + 1} Tage`
    }
}