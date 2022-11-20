function validateForm() {
    console.log("Klient- validateForm");
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorSummary = document.getElementById('errorSummary');

    resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        // brak wartości 
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(firstNameInput.value, 2, 32)) {
        //per diagram , max length = 32
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole musi mieć długość z przedziału 2-32 znaki";
    } else if (checkIfContainsNumbers(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole nie może zawierać liczb";

    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(lastNameInput.value, 2, 32)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole musi mieć długość z przedziału 2-32 znaki";
    } else if (checkIfContainsNumbers(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole nie może zawierać liczb";
    }


    if ((emailInput.value.toString().trim().length) > 0) {
        //if non empty - optional field

        if (!checkEmail(emailInput.value)) {
            //bad regex
            valid = false;
            emailInput.classList.add("error-input");
            errorEmail.innerText = "Pole musi zawierać poprawny adres Email";
        }

    }

    if (!valid) {
        errorSummary.innerText = "Formularz zawiera błędy";
        document.querySelector('form').scrollIntoView({ behavior: "smooth" });
    }


    return valid;
}   