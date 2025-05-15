const yearValidator = (year) => {
    const minYear = 1991;
    const maxYear = new Date().getFullYear();
    year = parseInt(year);
    if (isNaN(year)) {
        throw new Error('Year must be a number');
    }
    if (year < minYear || year > maxYear) {
        throw new Error(`Year must be between ${minYear} and ${maxYear}`);
    }
}
export default yearValidator;