<?php
$jugador = $_GET['jugador'] ?? 'Jugador';
$puntos = $_GET['puntos'] ?? '0';
$imagenUrl = "https://tudominio.com/PIA_GCW/ZombResist/generar_imagen.php?jugador=" . urlencode($jugador) . "&puntos=" . urlencode($puntos);
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="¡Mi récord en ZombResist!" />
  <meta property="og:description" content="¡<?= htmlspecialchars($jugador) ?> logró <?= htmlspecialchars($puntos) ?> puntos en el apocalipsis zombie!" />
  <meta property="og:image" content="<?= $imagenUrl ?>" />
  <meta property="og:url" content="https://tudominio.com/PIA_GCW/ZombResist/compartir.php?jugador=<?= urlencode($jugador) ?>&puntos=<?= urlencode($puntos) ?>" />
  <meta property="og:type" content="website" />
</head>
<body>
  <p>Redirigiendo...</p>
  <script>
    setTimeout(() => {
      window.location.href = "puntuaciones.php";
    }, 3000);
  </script>
</body>
</html>
