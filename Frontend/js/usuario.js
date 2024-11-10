import { ImageUpdater } from "../content/Image.js";

// Función para mostrar el panel seleccionado
function showPanel(panelId) {
    const panels = document.querySelectorAll(".panel");
    panels.forEach(panel => panel.classList.remove("active"));

    const selectedPanel = document.getElementById(panelId);
    if (selectedPanel) {
        selectedPanel.classList.add("active");
    }

    const menuButtons = document.querySelectorAll(".menu button");
    menuButtons.forEach(button => {
        button.classList.remove("active");
        if (button.getAttribute("onclick").includes(panelId)) {
            button.classList.add("active");
        }
    });
}

// Función para mostrar/ocultar el modal de cambio de contraseña
function togglePasswordModal() {
    const modal = document.getElementById("password-modal");
    modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}

// Crear el modal de confirmación de casillero
function createLockerModal() {
    const modal = document.createElement("div");
    modal.id = "locker-modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="toggleLockerModal()">&times;</span>
            <h2>Confirmar selección</h2>
            <p>¿Desea seleccionar el casillero <span id="selected-locker-number"></span>?</p>
            <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                <button onclick="toggleLockerModal()" style="background-color: gray" class="submit-btn">Cancelar</button>
                <button onclick="confirmLockerSelection()" class="submit-btn">Seleccionar</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Crear el modal de éxito
function createSuccessModal() {
    const modal = document.createElement("div");
    modal.id = "success-modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <h2>¡Selección Exitosa!</h2>
            <div style="color: var(--primary); font-size: 5rem; margin: 2rem 0;">✓</div>
            <p>El casillero ha sido asignado satisfactoriamente.</p>
            <button onclick="toggleSuccessModal()" class="submit-btn" style="margin-top: 2rem;">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Crear el modal de no disponible
function createUnavailableModal() {
    const modal = document.createElement("div");
    modal.id = "unavailable-modal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <h2>Plan sin Casillero</h2>
            <p style="margin: 2rem 0;">Su plan actual no incluye casillero. Debe realizar una solicitud.</p>
            <button onclick="redirectToSolicitudes()" class="submit-btn">Ir a Solicitudes</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// Función para mostrar/ocultar el modal de confirmación
function toggleLockerModal(lockerNumber = null) {
    const modal = document.getElementById("locker-modal");
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        document.getElementById("selected-locker-number").textContent = lockerNumber;
        modal.style.display = "flex";
    }
}

// Función para mostrar/ocultar el modal de éxito
function toggleSuccessModal() {
    const modal = document.getElementById("success-modal");
    modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}

// Función para mostrar/ocultar el modal de no disponible
function toggleUnavailableModal() {
    const modal = document.getElementById("unavailable-modal");
    modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
}

// Función para confirmar la selección del casillero
function confirmLockerSelection() {
    const lockerNumber = document.getElementById("selected-locker-number").textContent;

    if (parseInt(lockerNumber) % 2 === 0) {
        toggleLockerModal();
        toggleSuccessModal();

        const selectedLocker = document.querySelector(`.locker:nth-child(${lockerNumber})`);
        selectedLocker.style.backgroundColor = "var(--primary)";
        document.querySelector(".locker_info p").textContent = `${lockerNumber}`;
    } else {
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
    const modals = [
        document.getElementById("password-modal"),
        document.getElementById("locker-modal"),
        document.getElementById("success-modal"),
        document.getElementById("unavailable-modal")
    ];

    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// Event listener para el formulario de cambio de contraseña
document.getElementById("password-form")?.addEventListener("submit", function (e) {
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
    showPanel("plan-actual");

    const modal = document.getElementById("password-modal");
    modal.style.display = "none";

    const profileImage = document.getElementById("profile-image");
    if (profileImage) {
        profileImage.style.objectFit = "cover";
    }

    document.querySelectorAll(".locker.available").forEach(locker => {
        locker.addEventListener("click", () => {
            toggleLockerModal(locker.textContent);
        });
    });

    // Configurar los botones del menú para llamar a showPanel
    const menuButtons = document.querySelectorAll(".menu button");
    menuButtons.forEach(button => {
        button.addEventListener("click", () => {
            const panelId = button.getAttribute("onclick").match(/'([^']+)'/)[1];
            showPanel(panelId);
        });
    });
});

const imageUpdater = new ImageUpdater(
    "http://localhost:3000/bucket/image/logo_aeis.png",
    ".logo_aeis"
);
imageUpdater.updateImage();