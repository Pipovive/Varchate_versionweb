<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enlace de Confirmación</title>
  <!-- Anti-flash: aplicar tema ANTES del render -->
  <script>try { var t = localStorage.getItem('varchate_theme'); if (t === 'dark') { document.documentElement.classList.add('dark-mode'); } } catch (e) { }</script>
  @vite('resources/js/theme.js')
  @vite('resources/css/dark-mode.css')
  @vite('resources/css/enlace.css')
</head>

<body>
  <div class="container">
    <header>
      <img src="{{ asset('images/logo2.png')}}" alt="varchate" class="logo">
    </header>
    <main class="box">

    </main>
    <footer>
    </footer>
  </div>
  <div class="wave-section">
    <img src="{{ asset('images/ola2.png') }}" alt="Ola inferior" class="ola2">
  </div>
  @vite('resources/js/correo.js')
</body>

</html>