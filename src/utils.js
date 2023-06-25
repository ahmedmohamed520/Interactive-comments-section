export function dateDiffInDays(a, b) {
    const _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 30 * 12;
    const _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 30;
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const _MS_PER_HOUR = 1000 * 60 * 60;
    const _MS_PER_MINUTE = 1000 * 60;
    const _MS_PER_SECOND = 1000;
    // Discard the time and time-zone information.

    const diffInMS = b - a;
    const diffInSeconds = Math.floor(diffInMS / _MS_PER_SECOND);
    const diffInMinutes = Math.floor(diffInMS / _MS_PER_MINUTE);
    const diffInHours = Math.floor(diffInMS / _MS_PER_HOUR);
    const diffInDays = Math.floor(diffInMS / _MS_PER_DAY);
    const diffInMonths = Math.floor(diffInMS / _MS_PER_MONTH);
    const diffInYears = Math.floor(diffInMS / _MS_PER_YEAR);

    console.log(a, b);
    if (diffInMS < 1000) {
        return "just now";
    }
    if (diffInSeconds < 60 && diffInSeconds > 0) {
        return `${diffInSeconds} seconds ago`;
    }
    if (diffInMinutes < 60 && diffInMinutes > 0) {
        return `${diffInMinutes} minutes ago`;
    }
    if (diffInHours < 24 && diffInHours > 0) {
        return `${diffInHours} hours ago`;
    }
    if (diffInDays < 30 && diffInDays > 0) {
        return `${diffInDays} days ago`;
    }
    if (diffInMonths < 12 && diffInMonths > 0) {
        return `${diffInMonths} months ago`;
    }
    return `${diffInYears} years ago`;
}

export const getFormatedDate = (date) => {
    const now = new Date();
    return dateDiffInDays(date, now);
};
// test it
