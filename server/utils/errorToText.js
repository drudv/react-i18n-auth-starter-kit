module.exports = function toText(error, defaultText = 'An unknown error occurred') {
    if (error) {
        if (typeof error === 'string' || typeof error === 'number') {
            return error + '';
        } else if (typeof error === 'object' && error.message) {
            return error.message;
        }
    }
    return defaultText;
}