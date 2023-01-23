function validateForm() {
    console.log("Wypozyczenie - validateForm");

    const ksiazkaInput = document.getElementById('ksiazka');
    const klientInput = document.getElementById('klient');
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');


    // temp pomocnicze wartości, używane czy aby ,,selecty'' nie wybierają wartości spoza bazy danych
    const ksiazkaMax = 3;
    const klientMax = 3;

    const errorKsiazkaInput = document.getElementById('errorKsiazka');
    const errorKlientInput = document.getElementById('errorKlient');
    const errorDateFromInput = document.getElementById('errorDateFrom');
    const errorDateToInput = document.getElementById('errorDateTo');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([ksiazkaInput, klientInput, dateFromInput, dateToInput], [errorKsiazkaInput, errorKlientInput, errorDateFromInput, errorDateToInput], errorSummary);

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

    if (!checkRequired(ksiazkaInput.value)) {
        //raczej tak jakby jakimś cudem dał rade odznaczyć wybór ? 
        //nwm jak , ale taki ,,failsafe''

        valid = false;
        ksiazkaInput.classList.add("error-input");
        errorKsiazkaInput.innerText = document.getElementById("err.required").innerText;

    }
    else if (ksiazkaInput.value == "default") {
        //if defalut select - czytaj wartość "--Wybierz Książkę--"
        valid = false;
        ksiazkaInput.classList.add("error-input");
        errorKsiazkaInput.innerText = document.getElementById("err.selectDefault").innerText;

    }



    if (!checkRequired(klientInput.value)) {
        //raczej tak jakby jakimś cudem dał rade odznaczyć wybór ? 
        //nwm jak , ale taki ,,failsafe''
        valid = false;
        klientInput.classList.add("error-input");
        errorKlientInput.innerText = document.getElementById("err.required").innerText;
    }
    else if (klientInput.value == "default") {
        valid = false;
        klientInput.classList.add("error-input");
        errorKlientInput.innerText = document.getElementById("err.selectDefault").innerText;

    }

    if (!checkRequired(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFromInput.innerText = document.getElementById("err.required").innerText;
    } else if (!checkDate(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFromInput.innerText = document.getElementById("err.isNotDate").innerText;
    } else if (checkDateIfAfter(dateFromInput.value, nowString)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFromInput.innerText = document.getElementById("err.isDateAfterToday").innerText;
    } else if (checkIfDateBeforeLimit(dateFromInput.value)) {
        valid = false;
        dateFromInput.classList.add("error-input");
        errorDateFromInput.innerText = document.getElementById("err.isDateBeforeLimit").innerText;
    }

    if (dateToInput.value.length > 0) {

        //non empty

        if (!checkDate(dateToInput.value)) {
            valid = false;
            dateToInput.classList.add("error-input");
            errorDateToInput.innerText = document.getElementById("err.isNotDate").innerText;
        } else if (checkDateIfAfter(dateToInput.value, nowString)) {
            valid = false;
            dateToInput.classList.add("error-input");
            errorDateToInput.innerText = document.getElementById("err.isDateAfterToday").innerText;
        } else if (checkIfDateBeforeLimit(dateToInput.value)) {
            valid = false;
            dateToInput.classList.add("error-input");
            errorDateToInput.innerText = document.getElementById("err.isDateBeforeLimit").innerText;

        }
        else if (checkDateIfAfter(dateFromInput.value, dateToInput.value)) {
            valid = false;
            dateToInput.classList.add("error-input");
            errorDateToInput.innerText = document.getElementById("err.isBeforeDate").innerText;
        }


    }

    if (!valid) {
        errorSummary.innerText = document.getElementById("err.formHasErrors").innerText;
        document.querySelector('form').scrollIntoView({ behavior: "smooth" });
    }

    return valid;

}