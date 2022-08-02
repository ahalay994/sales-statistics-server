module.exports = {
    formatDate(date) {
        date = new Date(date);
        return ("0" + date.getDate()).slice(-2) + "." + ("0" + (date.getMonth() + 1)).slice(-2) + "." + date.getFullYear();
    },
    formatDateToTimestamp(date) {
        return (new Date(date)).getTime();
    },
    formatDateTime(dateTime) {
        dateTime = new Date(dateTime);
        return ("0" + dateTime.getDate()).slice(-2) + "." + ("0" + (dateTime.getMonth() + 1)).slice(-2) + "." +
            dateTime.getFullYear() + " " + ("0" + dateTime.getHours()).slice(-2) + ":" + ("0" + dateTime.getMinutes()).slice(-2);
    },
};
