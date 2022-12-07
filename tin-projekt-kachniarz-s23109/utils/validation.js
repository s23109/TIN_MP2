const isEmail = (email) => {
    // true jak mail , fałsz jak reszta
    const regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

    return regex.test(email);
};

const containsZnaki = (znaki, wyraz) => {
    for (let ch of wyraz) {
        if (znaki.contains(ch)){
            return true;
        };
    };

    return false;
};


const containsWhiteChar = (wyraz) => {
    let before = wyraz.length;
    let after = wyraz.trim().length;

    return !(before===after);
}

const containsSpecialChar = (wyraz) => {
    let regex = /[~|`|!|@|#|$|%|^|&|*|(|)|_|-|=|+|[|{|}|\]|;|:|'|"|,|<|.|>|/|?|\\|\|]/i;

    return regex.test(wyraz);
}

let fun = {};
fun.isEmail = isEmail;
fun.containsWhiteChar = containsWhiteChar;
fun.containsSpecialChar = containsSpecialChar;
module.exports = fun;