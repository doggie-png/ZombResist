document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none"; // Oculta la pantalla de carga
        document.body.classList.remove("loading-bg"); // Quita el fondo inicial
        document.body.classList.add("default-bg"); // Agrega el fondo normal
        document.getElementById("content").classList.remove("hidden"); // Muestra el contenido
    }, 3000); // Espera 3 segundos antes de mostrar el contenido
});
function updateVolumeValue(value) {
    document.getElementById("volumeValue").textContent = value;
}

