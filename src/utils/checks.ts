/*
 * This file defines a series of checks that are used to verify parameters passed to certain API endpoints. Don't forget
 * to call next() or your endpoint won't get called.
*/

export const checkAscii = (str: string): boolean => {
    // make sure that from the beginning to the end of the string, all characters are alphabetic and there is at least 1
    return /^[ a-zA-Z0-9\-.$(),'/]+$/.test(str);
};

export const checkDate: (dateString: string) => boolean = (dateString: string) => {
    const msec = Date.parse(dateString);
    return !isNaN(msec);
};
