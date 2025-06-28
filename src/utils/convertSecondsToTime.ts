export const convertSecondsToTime = (seconds: number) => {
    const leftSeconds = Math.floor(seconds % 60).toString()
    const leftMinutes = Math.floor(seconds / 60).toString()
    const leftHours = Math.floor(seconds / 3600).toString()


    return `${leftHours.padStart(2, "0")}:${leftMinutes.padStart(2, "0")}:${leftSeconds.padStart(2, "0")}`
}