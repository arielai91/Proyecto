function showPanel(panelId) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        panel.classList.remove('active'); // Hide all panels
    });
    document.getElementById(panelId).classList.add('active'); // Show the selected panel
}

function openImageModal(imageSrc) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = imageSrc;
    modal.style.display = 'flex'; // Show the image modal
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none'; // Hide the image modal
}

function openRejectModal() {
    const modal = document.getElementById('reject-modal');
    modal.style.display = 'flex'; // Show the reject modal
}

function closeRejectModal() {
    const modal = document.getElementById('reject-modal');
    modal.style.display = 'none'; // Hide the reject modal
}

function openApproveModal() {
    const modal = document.getElementById('approve-modal');
    modal.style.display = 'flex'; // Show the approve modal
}

function closeApproveModal() {
    const modal = document.getElementById('approve-modal');
    modal.style.display = 'none'; // Hide the approve modal
}

function confirmApproval() {
    // Logic to approve the request
    alert('Solicitud aprobada.');
    closeApproveModal(); // Close the approve modal
}