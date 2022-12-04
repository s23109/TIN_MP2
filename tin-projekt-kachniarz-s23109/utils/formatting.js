// /utils/formatting.js

//add leading zeros
const zeroPad = (num, places) => String(num).padStart(places, '0')

const formatDate = (value) => {

    //safe check for null or undefined values
    if(!value) return "";

    if(value instanceof Date) {
    // jeśli jest datą to konvertuje
        const year = value.getFullYear();
        const yearZ = zeroPad(year, 4);

        //month in date object starts from 0
        const month = value.getMonth() + 1;
        const monthZ = zeroPad(month, 2);

        const day = value.getDate();
        const dayZ = zeroPad(day, 2);

        //an example of string interpolation in JS
        const res = `${yearZ}-${monthZ}-${dayZ}`;

        return res;
    } else {
        //dla reszty
        return value;
    }
};

const removeQuoteIfExist = (title) => {
    if (title[0] == '"' && title[title.length-1] == '"') {
        return title.slice(1,title.length-2);
    }
    return title;
};

const addQuoteIfNotExist = (title) => {
    if (!(title[0] == '"' && title[title.length-1] == '"')) {
        return "\"" + title + "\"" ;
    }
    return title;
}

let fmt = {};
fmt.formatDate = formatDate;
fmt.removeQuoteIfExist = removeQuoteIfExist;
fmt.addQuoteIfNotExist = addQuoteIfNotExist;

module.exports = fmt;
