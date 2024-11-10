import { ImageUpdater } from "../content/Image.js";

// Función para mostrar el panel seleccionado
function showPanel(panelId) {
  // Obtener todos los paneles
  const panels = document.querySelectorAll(".panel");

  // Ocultar todos los paneles
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });

  // Mostrar el panel seleccionado
  const selectedPanel = document.getElementById(panelId);
  if (selectedPanel) {
    selectedPanel.classList.add("active");
  }

  // Actualizar estado visual de los botones del menú
  const menuButtons = document.querySelectorAll(".menu button");
  menuButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.getAttribute("onclick").includes(panelId)) {
      button.classList.add("active");
    }
  });
}

// Función para el modal de cambio de contraseña
function togglePasswordModal() {
  const modal = document.getElementById("password-modal");
  if (modal.style.display === "flex") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
}

// Event listener para cerrar el modal cuando se hace clic fuera de él
window.addEventListener("click", (event) => {
  const modal = document.getElementById("password-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Event listener para el formulario de cambio de contraseña
document
  .getElementById("password-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }

    // Aquí iría la lógica para cambiar la contraseña
    alert("Contraseña cambiada exitosamente");
    togglePasswordModal();
    this.reset();
  });

// Event listener para la carga inicial de la página
document.addEventListener("DOMContentLoaded", () => {
  // Mostrar el panel inicial
  showPanel("plan-actual");

  // Asegurarse de que el modal esté oculto inicialmente
  const modal = document.getElementById("password-modal");
  modal.style.display = "none";

  // Ajustar la imagen de perfil si existe
  const profileImage = document.getElementById("profile-image");
  if (profileImage) {
    profileImage.style.objectFit = "cover";
  }
});

const imageUpdater = new ImageUpdater(
  "http://localhost:3000/bucket/image/logo_aeis.png",
  ".logo_aeis"
);
imageUpdater.updateImage();
