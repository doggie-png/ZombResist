<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="CSS/puntuaciones.css">
  <title>Zombresist</title>
</head>
<body>
  <div class="scoreboard-container">
    <h1>Apocalyptic City - Tabla de Puntuaciones</h1>
    <table>
      <thead>
        <tr>
          <th>Jugador</th>
          <th>Zombies Eliminados</th>
          <th>Muertes</th>
          <th>Puntaje final</th>
          <th>Tiempo de Partida</th>
        </tr>
      </thead>
      <tbody>
        <tr class="highlight">
          <td class="player-tag">Fulano66</td>
          <td>7</td>
          <td>2</td>
          <td>230</td>
          <td>10:45</td>
        </tr>
        <tr>
          <td class="player-tag">voliyoyo</td>
          <td>4</td>
          <td>4</td>
          <td>140</td>
          <td>05:47</td>
        </tr>
        <tr>
          <td class="player-tag">ZucoDeFresa</td>
          <td>1</td>
          <td>6</td>
          <td>57</td>
          <td>02:06</td>
        </tr>
        <tr>
          <td class="player-tag">Mike330</td>
          <td>0</td>
          <td>8</td>
          <td>1</td>
          <td>00:35</td>
        </tr>
      </tbody>
    </table>

    <div class="button-container">
      <button class="cod-button" onclick="window.location.href='play.html'">Reiniciar Partida</button>
      <button class="cod-button" onclick="window.location.href='menu.html'">Regresar al Lobby</button>
    </div>
    <h2 id="bienvenida">Inicia sesión para compartir tus logros</h2>
    <button class="cod-button" onclick="compartirResultado(275)">Compartir resultado</button>

<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>

<script>

  window.fbAsyncInit = function () {
    FB.init({
      appId: '1056228816556802', 
      cookie: true,
      xfbml: true,
      version: 'v22.0'
    });

    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  function statusChangeCallback(response) {
    if (response.status === 'connected') {
      FB.api('/me', { fields: 'name' }, function (userData) {
        usuarioFacebook = userData.name;
        document.getElementById('bienvenida').innerText = `Hola, ${userData.name}`;
        document.getElementById('btnCompartir').disabled = false;
      });
    }
  }

  function iniciarSesionFacebook() {
    FB.login(function (response) {
      if (response.authResponse) {
        statusChangeCallback(response);
      } else {
        alert('Inicio de sesión cancelado');
      }
    }, { scope: 'public_profile,email' });
  }

  function compartirResultado(puntos) {
  const jugador = 'Fulano66'; 
  const url = `https://tudominio.com/ZombResist/compartir.php?jugador=${encodeURIComponent(jugador)}&puntos=${puntos}`;

  FB.ui({
    method: 'share',
    href: url,
    hashtag: "#ZombResist"
  }, function (response) {
    if (response && !response.error_message) {
      alert('¡Compartido!');
    } else {
      alert('No se pudo compartir');
    }
  });
}

</script>

  </div>
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>

</body>
</html>
