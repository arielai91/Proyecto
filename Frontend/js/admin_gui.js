import { ImageUpdater } from "../content/Image.js";

// Variables globales para tracking
let currentRequestId = null;
let activePanel = 'solicitudes-pendientes';

// Función para mostrar diferentes paneles
function showPanel(panelId) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(panelId).classList.add('active');
    activePanel = panelId;
}

// Funciones para manejar modales
function showModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Cerrar modales si se hace click fuera del contenido
window.onclick = function (event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Función para expandir imagen
function expandImage(imgElement) {
    const modal = document.getElementById('image-modal');
    const expandedImg = document.getElementById('expanded-image');
    expandedImg.src = imgElement.src;
    modal.style.display = 'flex';
}

// Funciones para aprobar/rechazar solicitudes
function showApproveModal(requestId, userName) {
    currentRequestId = requestId;
    document.getElementById('approve-user-name').textContent = userName;
    showModal('approve-modal');
}

function showRejectModal(requestId) {
    currentRequestId = requestId;
    showModal('reject-modal');
}

function approveRequest() {
    const solicitud = document.querySelector(`[data-id="${currentRequestId}"]`);
    if (solicitud) {
        // Crear copia de la solicitud para el panel de aprobadas
        const solicitudClone = solicitud.cloneNode(true);

        // Remover botones de acción
        const actionButtons = solicitudClone.querySelector('.action-buttons');
        if (actionButtons) {
            actionButtons.remove();
        }

        // Añadir fecha de aprobación
        const summary = solicitudClone.querySelector('summary');
        const approvalDate = document.createElement('span');
        approvalDate.className = 'approval-date';
        approvalDate.textContent = `APROBADO EN: ${new Date().toLocaleDateString()}`;
        summary.appendChild(approvalDate);

        // Mover al panel de aprobadas
        document.querySelector('#solicitudes-aprobadas .solicitudes-container').appendChild(solicitudClone);
        solicitud.remove();
    }

    closeModal('approve-modal');
    currentRequestId = null;
}

function rejectRequest() {
    const solicitud = document.querySelector(`[data-id="${currentRequestId}"]`);
    if (solicitud) {
        // Crear copia de la solicitud para el panel de rechazadas
        const solicitudClone = solicitud.cloneNode(true);

        // Modificar botones de acción
        const actionButtons = solicitudClone.querySelector('.action-buttons');
        if (actionButtons) {
            actionButtons.innerHTML = '<button class="approve-btn full-width" onclick="showApproveModal(' + currentRequestId + ', \'' + solicitud.querySelector('.solicitud-name').textContent + '\')">Aprobar Solicitud</button>';
        }

        // Añadir fecha de rechazo
        const summary = solicitudClone.querySelector('summary');
        const rejectDate = document.createElement('span');
        rejectDate.className = 'reject-date';
        rejectDate.textContent = `RECHAZADO EN: ${new Date().toLocaleDateString()}`;
        summary.appendChild(rejectDate);

        // Mover al panel de rechazadas
        document.querySelector('#solicitudes-rechazadas .solicitudes-container').appendChild(solicitudClone);
        solicitud.remove();
    }

    closeModal('reject-modal');
    currentRequestId = null;
}

// Función para crear nuevo administrador
function createAdmin(event) {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Aquí iría la lógica para crear el administrador en la base de datos
    alert('Administrador creado exitosamente');
    event.target.reset();
}

// Función para cambiar contraseña (placeholder)
function togglePasswordModal() {
    alert('Funcionalidad de cambio de contraseña en desarrollo');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Mostrar el panel inicial
    showPanel('solicitudes-pendientes');

    // Cerrar modales con la tecla Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
});

if (typeof ImageUpdater !== 'undefined') {
    const imageUpdater = new ImageUpdater(
        "http://localhost:3000/bucket/image/logo_aeis.png",
        ".logo_aeis"
    );
    imageUpdater.updateImage();
}