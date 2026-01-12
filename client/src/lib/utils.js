
export const formatDuration = (minutes) => {
    if (!minutes || minutes <= 0) return 'N/A'

    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hrs === 0) return `${mins}min`
    return `${hrs}h ${mins}min`
}
