function validateForm() {
    console.log("Klient- validateForm");
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorSummary = document.getElementById('errorSummary');

    const errWhiteCharMess = document.getElementById('whiteCharErr');


    resetErrors([firstNameInput, lastNameInput, emailInput], [errorFirstName, errorLastName, errorEmail], errorSummary);
    let whiteChar = [false,false,false];
    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        // brak wartości 
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = document.getElementById("err.required").innerText;
    }
    else if (!checkTextLengthRange(firstNameInput.value, 2, 32)) {
        //per diagram , max length = 32
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = document.getElementById("err.len_2-32").innerText;
    } else if (checkIfContainsNumbers(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = document.getElementById("err.contains_numbers").innerText;

    } else if (containsSpecialChar(firstNameInput.value)){
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = document.getElementById("err.contains_special-char").innerText;
    } else if (containsWhiteChar(firstNameInput.value)){
        whiteChar[0]=true;
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = document.getElementById("err.contains_white-char").innerText;
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = document.getElementById("err.required").innerText;
    }
    else if (!checkTextLengthRange(lastNameInput.value, 2, 32)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = document.getElementById("err.len_2-32").innerText;
    } else if (checkIfContainsNumbers(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = document.getElementById("err.contains_numbers").innerText;
    } else  if (containsSpecialChar(lastNameInput.value)){
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = document.getElementById("err.contains_special-char").innerText;
    } else if (containsWhiteChar(lastNameInput.value)){
        whiteChar[1]=true;
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = document.getElementById("err.contains_white-char").innerText;
    }


    if ((emailInput.value.toString().trim().length) > 0) {
        //if non empty - optional field

        if (!checkEmail(emailInput.value)) {
            //bad regex
            valid = false;
            emailInput.classList.add("error-input");
            errorEmail.innerText = document.getElementById("err.notEmail").innerText;
        } else if (containsWhiteChar(emailInput.value)){
            whiteChar[2]=true;
            valid = false;
            emailInput.classList.add("error-input");
            errorEmail.innerText = document.getElementById("err.contains_white-char").innerText;
        }


    }

    if (whiteChar.includes(true)){



        if (confirm(errWhiteCharMess.innerText)){
            if (whiteChar[0]){
                firstNameInput.value = firstNameInput.value.trim();
                firstNameInput.classList.remove("error-input");
                errorFirstName.innerText = "";
            }

            if (whiteChar[1]){
                lastNameInput.value = lastNameInput.value.trim();
                lastNameInput.classList.remove("error-input");
                errorLastName.innerText = "";
            }

            if (whiteChar[2]){
                emailInput.value = emailInput.value.trim();
                emailInput.classList.remove("error-input");
                errorEmail.innerText="";
            }

            if (!whiteChar.includes(false)){
                //wszystkie błędy przez białe znaki
                valid = true;
            }
        };
    }

    if (!valid) {
        errorSummary.innerText = document.getElementById("err.formHasErrors").innerText;
        document.querySelector('form').scrollIntoView({ behavior: "smooth" });
    }


    return valid;
}   