document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.reach form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const errorOutput = document.querySelector('.error-message');
    const infoOutput = document.querySelector('.info-message');
    const errorLogField = document.createElement('input');
    errorLogField.type = 'hidden';
    errorLogField.name = 'form-errors';
    form.appendChild(errorLogField);

    let form_errors = [];

    form.addEventListener('submit', (e) => {
        form_errors = [];
        errorOutput.textContent = '';
        infoOutput.textContent = '';

        if (!nameInput.checkValidity()) {
            nameInput.setCustomValidity("Please enter a valid name (only letters, 2–30 characters).");
            form_errors.push({ field: "name", value: nameInput.value });
        } else {
            nameInput.setCustomValidity("");
        }

        if (!emailInput.checkValidity()) {
            emailInput.setCustomValidity("Enter a valid email address.");
            form_errors.push({ field: "email", value: emailInput.value });
        } else {
            emailInput.setCustomValidity("");
        }

        if (!messageInput.checkValidity()) {
            messageInput.setCustomValidity("Your message must be between 10 and 500 characters.");
            form_errors.push({ field: "message", value: messageInput.value });
        } else {
            messageInput.setCustomValidity("");
        }

        errorLogField.value = JSON.stringify(form_errors);
    });

    nameInput.addEventListener('input', () => {
        const validPattern = /^[A-Za-z\s]*$/;
        if (!validPattern.test(nameInput.value)) {
            nameInput.classList.add('flash-error');
            errorOutput.textContent = "Only letters and spaces allowed.";
            form_errors.push({ field: "name", value: nameInput.value, reason: "invalid characters" });
            errorLogField.value = JSON.stringify(form_errors);
            setTimeout(() => {
                nameInput.classList.remove('flash-error');
                errorOutput.textContent = '';
            }, 2000);
        }
    });

    const maxLength = messageInput.getAttribute('maxlength');
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    messageInput.parentElement.appendChild(counter);

    messageInput.addEventListener('input', () => {
        const remaining = maxLength - messageInput.value.length;
        counter.textContent = `${remaining} characters remaining`;
        if (remaining <= 50) {
            counter.style.color = "darkorange";
        } else {
            counter.style.color = "inherit";
        }
        if (remaining <= 0) {
            form_errors.push({ field: "message", reason: "too long" });
            errorLogField.value = JSON.stringify(form_errors);
        }
    });
});
