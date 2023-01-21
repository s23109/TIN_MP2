function validateForm() {
    console.log("Egzemplarz Ksiazki- validateForm");

    const titleInput = document.getElementById('title');
    const dateInput = document.getElementById('date');
    const pagesInput = document.getElementById('pages');
    const damageInput = document.getElementById('damage');


    const errorTitle = document.getElementById('errorTitle');
    const errorDate = document.getElementById('errorDate');
    const errorPages = document.getElementById('errorPages');
    const errorDamage = document.getElementById('errorDamage');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([titleInput, dateInput, pagesInput, damageInput], [errorTitle, errorDate, errorPages, errorDamage], errorSummary);

    let whiteChar = false;

    //today date
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    //gdy miesiąc / dzień jest krótki (i zwykle dodaje się 0 przed)
    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    const nowString = [year, month, day].join('-');

    let valid = true;

    if (!checkRequired(titleInput.value)) {
        //brak tytuł
        valid = false;
        titleInput.classList.add("error-input");
        errorTitle.innerText = "err.required";


    } else if (!checkTextLengthRange(titleInput.value, 2, 64)) {
        //zła długosc tekstu 
        valid = false;
        titleInput.classList.add('error-input');
        errorTitle.innerText = "err.len_2-64";

    } else if (containsWhiteChar(titleInput.value)){
        whiteChar= true;
        // w confirmie valid
        //   valid = false;
        titleInput.classList.add('error-input');
        errorTitle.innerText = "err.contains_white-char";
    }

    if (!checkRequired(dateInput.value)) {
        //brak daty
        valid = false;
        dateInput.classList.add("error-input");
        errorDate.innerText = "err.isNotDate";

    } else if (checkDateIfAfter(dateInput.value, nowString)) {
        // data jest po ,,dziś'' , nie można
        valid = false;
        dateInput.classList.add('error-input');
        errorDate.innerText = "err.isDateAfterToday";

    } else if (checkIfDateBeforeLimit(dateInput.value)) {

        valid = false;
        dateInput.classList.add('error-input');
        errorDate.innerText = "err.isDateBeforeLimit";


    }

    if (!checkRequired(pagesInput.value)) {
        //NAN 
        valid = false;
        pagesInput.classList.add('error-input');
        errorPages.innerText = "err.required";

    } else {
        //jeśli to ma coś

        if (!checkNumber(pagesInput.value)) {
            //jeśli to nie liczba
            valid = false;
            pagesInput.classList.add('error-input');
            errorPages.innerText = "err.isNotANumber";

        } else if (!checkNumberRange(pagesInput.value, 1, Infinity)) {
            //jeśli nie dodatnia
            valid = false;
            pagesInput.classList.add('error-input');
            errorPages.innerText = "err.isNegative";
        }
        else if (pagesInput.value % 1 != 0) {
            valid = false;
            pagesInput.classList.add('error-input');
            errorPages.innerText = "err.isNotInteger";
        } else if (checkIfPagesGreaterThanLimit(pagesInput.value)) {
            valid = false;
            pagesInput.classList.add('error-input');
            errorPages.innerText = "err.isBiggerThan";
        }


    }

    if (whiteChar){

        if (confirm("err.messages.fields-with-white-char")){
            titleInput.value = titleInput.value.trim();
            titleInput.classList.remove('error-input');
            errorTitle.innerText = ""
        }
        else {
            valid=false;
        }

    }

    if (!valid) {
        errorSummary.innerText = "err.formHasErrors";
        document.querySelector('form').scrollIntoView({ behavior: "smooth" });
    }


    return valid;
}