
const maxPages = 2137;

// tu np do sprawdzania żeby nie można było wpisać wypożyczenia sprzed istnienia biblioteki
// yyyy mm dd
const minDate = "1999-01-01";

function resetErrors(inputs, errorTexts, errorInfo) {

    for (let i = 0; i < inputs.length; i++) {
        //usuń klasę z elementu - error input -> css formatowanie 
        inputs[i].classList.remove("error-input");
    }

    for (let i = 0; i < errorTexts.length; i++) {
        //czyść każdego chara ? z tekstu
        errorTexts[i].innerText = "";
    }
    //wyszyść error-sumarry?
    errorInfo.innerText = "";

}

function checkRequired(value) {
    //w skrócie false jak pusta wartość
    if (!value) {
        return false;
    }

    value = value.toString().trim();

    //jeśli jest pustym stringiem , to wywal błąd
    if (value === "") {
        return false;
    }
    // == - czy wartości się zgadzają
    // === - czy wartości i typy się zgadzają

    return true;

}

function checkTextLengthRange(value, min, max) {

    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const length = value.length;

    if (max && length > max) {
        return false;
    }

    if (min && length < min) {
        return false;
    }

    // przekształcenia - szybsze niż zwykłe sprawdzenie pomiędzy?

    return true;

}

function checkEmail(value) {
// uwaga , funkcja sprawdza tylko regex , a nie czy pole zostało podane


    value = value.toString().trim();

    // zły regex ? 
    const regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    return regex.test(value);

}

function checkNumber(value) {

    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }

    return true;
}

function checkNumberRange(value, min, max) {

    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }

    value = parseFloat(value);

    if (value < min) {
        return false;
    }

    if (value > max) {
        return false;
    }

    return true;

}

function checkDate(value) {

    if (!value) {
        return false;
    }
    //DD-MM-YYYY
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    return pattern.test(value);
}
function checkDateIfAfter(value, compareTo) {
    // jeśli równe, to będzie true, reszta wiadomo
    if (!value) {
        return false;
    }

    if (!compareTo) {
        return false;
    }

    //DD-MM-YYYY
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    if (!pattern.test(value)) {
        return false;
    }

    if (!pattern.test(compareTo)) {
        return false;
    }

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);

    if (valueDate.getTime() <= compareToDate.getTime()) {
        return false;
    }
    return true;

}



function checkIfPagesGreaterThanLimit(value) {
    // true jeśli jest większa od tego
    // false jeśli reszta
    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }

    if (value > maxPages) {
        return true;
    }

    return false;
}

function checkIfDateBeforeLimit(value) {
    // jeśli jest po , to false
    if (checkDateIfAfter(value, minDate)) {
        return false;
    }

    if (value == minDate) {
        return false;
    }

    return true;

}

function checkIfContainsNumbers(value) {

    if (!value) {
        return false;
    }

    // mini regex na czy zawiera liczbę
    return /\d/.test(value);

}
