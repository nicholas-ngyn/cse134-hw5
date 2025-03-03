document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');
    const errorMessage = document.getElementById('error-message');
    const infoMessage = document.getElementById('info-message');
    const formErrorsField = document.getElementById('form-errors');
    
    let formErrors = [];

    function maskInput(event, regex) {
        if (!regex.test(event.key)) {
            event.preventDefault();
            flashError(event.target, "Invalid character entered.");
        }
    }

    function flashError(input, message) {
        console.log(`Error logged for field: ${input.name} - ${message}`); // Debugging line

        formErrors.push({
            field: input.name,
            error: message,
            timestamp: new Date().toISOString()
        });

        errorMessage.textContent = message;
        errorMessage.style.opacity = 1;
        errorMessage.classList.remove('error-fade');
        setTimeout(() => {
            errorMessage.classList.add('error-fade');
        }, 2000);

        setTimeout(() => {
            errorMessage.style.opacity = 0;
            setTimeout(() => {
                errorMessage.textContent = "";
            }, 500);
        }, 3000);
    }

    // Event listeners for input masking
    nameInput.addEventListener('keypress', (event) => {
        maskInput(event, /^[A-Za-z\s]+$/);
    });

    commentsInput.addEventListener('keypress', (event) => {
        maskInput(event, /^[A-Za-z0-9\s.,!?'-]+$/);
    });

    commentsInput.addEventListener('input', () => {
        const remaining = 300 - commentsInput.value.length;
        infoMessage.textContent = `${remaining} characters remaining`;

        if (remaining <= 100 && remaining > 25) {
            infoMessage.classList.add('char-warning');
            infoMessage.classList.remove('char-error');
        } else if (remaining <= 25) {
            infoMessage.classList.add('char-error');
            infoMessage.classList.remove('char-warning');
        } else {
            infoMessage.classList.remove('char-warning', 'char-error');
        }

        if (commentsInput.value.length > 300) {
            commentsInput.value = commentsInput.value.slice(0, 300);
            flashError(commentsInput, `Maximum character limit (300) reached!`);
        }
    });

    form.addEventListener('submit', (event) => {
        let isValid = true;

        if (!nameInput.checkValidity()) {
            if (nameInput.validity.valueMissing) {
                flashError(nameInput, "Name is required.");
            } else if (nameInput.validity.tooShort || nameInput.validity.tooLong) {
                flashError(nameInput, "Name must be between 1 and 50 characters.");
            } else if (nameInput.validity.patternMismatch) {
                flashError(nameInput, "Name can only contain letters and spaces.");
            }
            isValid = false;
        }

        if (!emailInput.checkValidity()) {
            if (emailInput.validity.valueMissing) {
                flashError(emailInput, "Email is required.");
            } else if (emailInput.validity.typeMismatch) {
                flashError(emailInput, "Please enter a valid email address.");
            }
            isValid = false;
        }

        if (commentsInput.value.length > 300) {
            flashError(commentsInput, "Comments must be 300 characters or less.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            formErrorsField.value = JSON.stringify(formErrors);
        }
    });

    nameInput.addEventListener('input', () => {
        if (!nameInput.checkValidity()) {
            if (nameInput.validity.valueMissing) {
                flashError(nameInput, "Name is required.");
            } else if (nameInput.validity.tooShort || nameInput.validity.tooLong) {
                flashError(nameInput, "Name must be between 1 and 50 characters.");
            } else if (nameInput.validity.patternMismatch) {
                flashError(nameInput, "Name can only contain letters and spaces.");
            }
        }
    });

    emailInput.addEventListener('input', () => {
        if (!emailInput.checkValidity()) {
            if (emailInput.validity.valueMissing) {
                flashError(emailInput, "Email is required.");
            } else if (emailInput.validity.typeMismatch) {
                flashError(emailInput, "Please enter a valid email address.");
            }
        }
    });

    commentsInput.addEventListener('input', () => {
        if (commentsInput.value.length > 300) {
            flashError(commentsInput, "Comments must be 300 characters or less.");
        }
    });
});