// ---------------------------------- Eventos ----------------------------------

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("inicio-sec").style.display = "flex";

  document
    .getElementById("ingresar-btn")
    .addEventListener("click", function () {
      document.getElementById("inicio-sec").style.display = "none";
      document.getElementById("web-sec").style.display = "flex";
      document.getElementById("aportaciones-sec").style.display = "flex";
    });

  document
    .getElementById("register-btn")
    .addEventListener("click", function () {
      document.getElementById("inicio-sec").style.display = "none";
      document.getElementById("registro-sec").style.display = "flex";
    });

  document.getElementById("perfil-btn").addEventListener("click", function () {
    document.getElementById("perfil-sec").style.display = "flex";
    document.getElementById("aportaciones-sec").style.display = "none";
    document.getElementById("casilleros-sec").style.display = "none";
  });

  document
    .getElementById("aportaciones-btn")
    .addEventListener("click", function () {
      document.getElementById("perfil-sec").style.display = "none";
      document.getElementById("aportaciones-sec").style.display = "flex";
      document.getElementById("casilleros-sec").style.display = "none";
    });

  document
    .getElementById("casilleros-btn")
    .addEventListener("click", function () {
      document.getElementById("perfil-sec").style.display = "none";
      document.getElementById("aportaciones-sec").style.display = "none";
      document.getElementById("casilleros-sec").style.display = "flex";
    });

  document.getElementById("logout-btn").addEventListener("click", function () {
    document.getElementById("inicio-sec").style.display = "flex";
    document.getElementById("web-sec").style.display = "none";
    document.getElementById("aportaciones-sec").style.display = "none";
    document.getElementById("perfil-sec").style.display = "none";
    document.getElementById("casilleros-sec").style.display = "none";
  });
});

// Validar el formulario de registro
document.getElementById("register-form").onsubmit = function (event) {
  event.preventDefault();

  var email = document.getElementById("reg-email").value;
  var password = document.getElementById("reg-password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    showNotification("Las contraseñas no coinciden.", "error");
    return;
  }
  send_code(email);
};

// Manejar el envío del formulario de verificación
document.getElementById("verificationForm").onsubmit = function (event) {
  event.preventDefault();
  var email = document.getElementById("reg-email").value;
  var verificationCode = document.getElementById("verification-code").value;
  verify_code(email, verificationCode);
};

// ---------------------- BACKEND Python ----------------------

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
        document.getElementById("verificationModal").style.display = "none";
        showNotification("Registro exitoso", "success");
        document.getElementById("registro-sec").style.display = "none";
        document.getElementById("inicio-sec").style.display = "flex";
      } else {
        showNotification("Código de verificación inválido.", "error");
      }
    })
    .catch((error) => console.error("Error:", error));
}
function send_code(email) {
  fetch("http://localhost:5000/send_code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.message);
      if (data.message === "Verification code sent to your email.") {
        document.getElementById("verificationModal").style.display = "block";
      } else {
        showNotification(data.message, "error");
      }
    });
}

// ---------------------- FRONTEND ----------------------

function showNotification(message, type) {
  var notificationBar = document.getElementById("notification-bar");
  notificationBar.textContent = message;
  notificationBar.className = "notification-bar " + type;
  notificationBar.style.display = "block";
  setTimeout(function () {
    notificationBar.style.display = "none";
  }, 3000); // Ocultar la barra después de 3 segundos
}

// Función para previsualizar la imagen seleccionada
function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("image-preview-img");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Cuando el usuario hace clic en <span> (x), cierra el modal
document.getElementsByClassName("close")[0].onclick = function () {
  document.getElementById("verificationModal").style.display = "none";
};

// ------------ Validaciones ------------

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
