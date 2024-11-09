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

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        // Aquí puedes implementar la lógica para mostrar notificaciones en tu UI
        alert(message);  // O reemplazar por una notificación en pantalla
    }

    // Función para verificar el código
    function verify_code(email, verificationCode) {
        fetch("http://localhost:5000/verify_code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, code: verificationCode }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                if (data.message === "Verification successful!") {
                    verificacionModal.style.display = "none";
                    showNotification("Registro exitoso", "success");
                    document.getElementById("registro-sec").style.display = "none";
                    document.getElementById("inicio-sec").style.display = "flex";
                } else {
                    showNotification("Código de verificación inválido.", "error");
                }
            })
            .catch((error) => console.error("Error:", error));
    }

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();

        validationMessage.innerHTML = '';
        validationMessage.style.display = 'none';

        const errors = [];

        if (passwordInput.value !== confirmPasswordInput.value) {
            errors.push('Las contraseñas no coinciden.');
        }

        if (cedulaInput.value.length !== 10) {
            errors.push('La cédula debe tener 10 dígitos.');
        }

        if (!emailInput.value.endsWith('@epn.edu.ec')) {
            errors.push('El correo debe terminar con el dominio @epn.edu.ec.');
        }

        if (!termsCheckbox.checked) {
            errors.push('Debes aceptar los términos y condiciones.');
        }

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

    verificacionForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const verificationCode = document.getElementById('codigo').value;
        const email = emailInput.value;

        verify_code(email, verificationCode);
    });

    editarCorreoLink.addEventListener('click', function(e) {
        e.preventDefault();
        verificacionModal.classList.remove('active');
        emailInput.focus();
    });

    verificacionModal.addEventListener('click', function(e) {
        if (e.target === verificacionModal) {
            verificacionModal.classList.remove('active');
        }
    });
});
