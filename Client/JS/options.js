document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none"; 
        document.body.classList.remove("loading-bg");
        document.body.classList.add("default-bg");
        document.getElementById("content").classList.remove("hidden"); 
    }, 3000); 
});
function updateVolumeValue(value) {
    document.getElementById("volumeValue").textContent = value;
}

