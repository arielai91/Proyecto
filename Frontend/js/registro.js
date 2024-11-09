document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const verificacionModal = document.getElementById('verificacionModal');
    const verificacionForm = document.getElementById('verificacionForm');
    const editarCorreoLink = document.getElementById('editarCorreo');
    const emailInput = document.getElementById('email');
    const emailDisplay = document.getElementById('emailDisplay');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('password_confirm');
    const cedulaInput = document.getElementById('cedula');
    const termsCheckbox = document.getElementById('terms');
    const validationMessage = document.getElementById('validationMessage');

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Limpiar mensajes de validación previos
        validationMessage.innerHTML = '';
        validationMessage.style.display = 'none';

        // Array para almacenar los errores
        const errors = [];

        // Validación de contraseñas
        if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push('Las contraseñas no coinciden.');
        }

        // Validación de cédula (10 dígitos)
        if (cedulaInput.value.length !== 10) {
            errors.push('La cédula debe tener 10 dígitos.');
        }

        // Validación de correo institucional
        if (!emailInput.value.endsWith('@epn.edu.ec')) {
            errors.push('El correo debe terminar con el dominio @epn.edu.ec.');
        }

        // Validación de términos y condiciones
        if (!termsCheckbox.checked) {
            errors.push('Debes aceptar los términos y condiciones.');
        }

        // Mostrar mensajes de validación si hay errores
        if (errors.length > 0) {
            errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error;
                validationMessage.appendChild(li);
            });
            validationMessage.style.display = 'block';
        } else {
            validationMessage.style.display = 'none';

            emailDisplay.textContent = emailInput.value;
            verificacionModal.classList.add('active');
        }
    });

    editarCorreoLink.addEventListener('click', function(e) {
        e.preventDefault();

        verificacionModal.classList.remove('active');
        emailInput.focus();
    });

    verificacionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        alert('Código verificado con éxito!');
        verificacionModal.classList.remove('active');
    });

    verificacionModal.addEventListener('click', function(e) {
        if (e.target === verificacionModal) {
            verificacionModal.classList.remove('active');
        }
    });
});
