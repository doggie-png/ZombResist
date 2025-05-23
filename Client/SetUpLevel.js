function Personaje(personaje) {
    localStorage.setItem('Personaje', personaje);
    //redirigir a otra página
    //window.location.href = "otra_pagina.html";
}

function Arma(arma){
    localStorage.setItem('Arma', arma);
}

function Mapa(mapa){
    localStorage.setItem('Mapa', mapa);
}

function Dificultad(dificultad){
    localStorage.setItem('Dificultad', dificultad);
}