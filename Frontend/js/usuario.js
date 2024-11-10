// Función para mostrar el panel seleccionado
function showPanel(panelId) {
    const panels = document.querySelectorAll(".panel");
    panels.forEach(panel => panel.style.display = "none");

    const selectedPanel = document.getElementById(panelId);
    if (selectedPanel) {
        selectedPanel.style.display = "block";
    }

    // Actualizar estado activo de los botones
    const menuButtons = document.querySelectorAll(".menu button");
    menuButtons.forEach(button => {
        button.classList.remove("active");
        const buttonPanelId = button.getAttribute("onclick").match(/'([^']+)'/)[1];
        if (buttonPanelId === panelId) {
            button.classList.add("active");
        }
    });
}

// Función para mostrar/ocultar modales
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = modal.style.display === "flex" ? "none" : "flex";
    }
}

// Funciones específicas para cada modal
function togglePasswordModal() {
    toggleModal("password-modal");
}

function toggleLockerModal(lockerNumber = null) {
    const modal = document.getElementById("locker-modal");
    if (lockerNumber !== null) {
        document.getElementById("selected-locker-number").textContent = lockerNumber;
    }
    toggleModal("locker-modal");
}

function toggleSuccessModal() {
    toggleModal("success-modal");
}

function toggleUnavailableModal() {
    toggleModal("unavailable-modal");
}

// Función para confirmar la selección del casillero
function confirmLockerSelection() {
    const lockerNumber = document.getElementById("selected-locker-number").textContent;
    const numericLockerNumber = parseInt(lockerNumber);

    if (numericLockerNumber % 2 === 0) {
        // Si es par, mostrar modal de éxito
        toggleLockerModal();
        toggleSuccessModal();

        // Actualizar el estado visual del casillero
        const selectedLocker = document.querySelector(`.locker:nth-child(${numericLockerNumber})`);
        if (selectedLocker) {
            selectedLocker.style.backgroundColor = "var(--primary)";
            selectedLocker.classList.remove("available");
            document.querySelector(".locker_info p").textContent = `${lockerNumber}`;
        }
    } else {
        // Si es impar, mostrar modal de no disponible
        toggleLockerModal();
        toggleUnavailableModal();
    }
}

// Función para redirigir a solicitudes
function redirectToSolicitudes() {
    toggleUnavailableModal();
    showPanel("solicitudes");
}

// Event listener para cerrar modales al hacer clic fuera
window.addEventListener("click", (event) => {
    const modals = {
        "password-modal": togglePasswordModal,
        "locker-modal": toggleLockerModal,
        "success-modal": toggleSuccessModal,
        "unavailable-modal": toggleUnavailableModal
    };

    Object.entries(modals).forEach(([modalId, toggleFunction]) => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            toggleFunction();
        }
    });
});

// Event listener para el formulario de cambio de contraseña
document.getElementById("password-form")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword !== confirmPassword) {
        alert("Las contraseñas nuevas no coinciden");
        return;
    }

    alert("Contraseña cambiada exitosamente");
    togglePasswordModal();
    this.reset();
});

// Event listener para la carga inicial de la página
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar panel inicial
    showPanel("plan-actual");

    // Configurar imagen de perfil
    const profileImage = document.getElementById("profile-image");
    if (profileImage) {
        profileImage.style.objectFit = "cover";
    }

    // Configurar listeners para casilleros disponibles
    document.querySelectorAll(".locker.available").forEach(locker => {
        locker.addEventListener("click", () => {
            toggleLockerModal(locker.textContent);
        });
    });

    // Configurar botones del menú
    document.querySelectorAll(".menu button").forEach(button => {
        button.addEventListener("click", () => {
            const panelId = button.getAttribute("onclick").match(/'([^']+)'/)[1];
            showPanel(panelId);
        });
    });

    // Configurar botones de redirección
    document.querySelector(".cta-button")?.addEventListener("click", () => {
        showPanel("planes-disponibles");
    });

    document.querySelector(".button-aportar")?.addEventListener("click", () => {
        showPanel("solicitudes");
    });
});

// Configurar la actualización de la imagen si es necesario
if (typeof ImageUpdater !== 'undefined') {
    const imageUpdater = new ImageUpdater(
        "http://localhost:3000/bucket/image/logo_aeis.png",
        ".logo_aeis"
    );
    imageUpdater.updateImage();
}