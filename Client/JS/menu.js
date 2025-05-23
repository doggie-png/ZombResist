document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".personaje-btn").forEach(button => {
        button.addEventListener("click", function() {
            document.getElementById("personaje-seleccionado").src = this.dataset.img;
            seleccionarBoton(this, "personaje-btn");
        });
    });

    document.querySelectorAll(".arma-btn").forEach(button => {
        button.addEventListener("click", function() {
            seleccionarBoton(this, "arma-btn");
        });
    });

    document.querySelectorAll(".zombie-btn").forEach(button => {
        button.addEventListener("click", function() {
            seleccionarBoton(this, "zombie-btn");
        });
    });
    document.querySelectorAll(".mapa-btn").forEach(button => {
        button.addEventListener("click", function() {
            seleccionarBoton(this, "mapa-btn");
        });
    });

    function seleccionarBoton(botonSeleccionado, clase) {
        document.querySelectorAll("." + clase).forEach(button => {
            button.classList.remove("btn-seleccionado");
        });
        botonSeleccionado.classList.add("btn-seleccionado");
    }
});