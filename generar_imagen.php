<?php
$jugador = $_GET['jugador'] ?? 'Jugador';
$puntos = $_GET['puntos'] ?? '0';

// Crear imagen en blanco
$imagen = imagecreatetruecolor(800, 418);

// Colores
$fondo = imagecolorallocate($imagen, 20, 20, 20);       // gris oscuro
$texto = imagecolorallocate($imagen, 255, 255, 255);     // blanco
$verde = imagecolorallocate($imagen, 0, 255, 0);

// Fondo
imagefilledrectangle($imagen, 0, 0, 800, 418, $fondo);

// Texto
$fuente = __DIR__ . '/fuentes/Oswald/Oswald-VariableFont_wght.ttf'; // Usa una fuente TTF real

imagettftext($imagen, 30, 0, 50, 100, $verde, $fuente, "ZombResist Score");
imagettftext($imagen, 24, 0, 50, 180, $texto, $fuente, "Jugador: $jugador");
imagettftext($imagen, 24, 0, 50, 240, $texto, $fuente, "Puntaje: $puntos");

// Encabezado de imagen
header('Content-Type: image/png');
imagepng($imagen);
imagedestroy($imagen);
?>
