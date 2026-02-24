<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editar perfil</title>
    @vite('resources/css/perfil.css')
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</head>
<body>

  <header class="header">
      <a href="#" class="logo-link">
        <img src="{{ asset('images/logo_blanco.png') }}" alt="Logo Varchate" class="logo">
      </a>

      <button id="btn-darkmode" class="icono-tema" aria-label="Cambiar tema">
        <img src="{{ asset('images/modo-oscuro.svg') }}" alt="" />
      </button>

    <img src="{{ asset('images/olas1.svg') }}" alt="Decoración olas" class="olas">
  </header>


    <main class="container">
      <div class="volver-header">
      <button class="btn-regresar">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
        fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" 
            d="M15 8a.5.5 0 0 1-.5.5H3.707l4.147 4.146a.5.5 
            0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 
            0 0 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
    </svg>Regresar</button>
    </div>
    
    <section class="perfil">
      <h2>Perfil de usuario</h2>
      <form id="perfilForm" class="perfil-card">
        <div class="perfil-imagen">
       
          <img src="images/foto-de-perfil.png" alt="Foto de perfil" id="perfil-imagen" data-default="images/foto-de-perfil.png">
          
             <div class="acciones-foto">
              <button type="button" class="eliminar-foto" aria-label="Eliminar foto">
                <img src="images/delete-icon.svg" alt="Eliminar">
              </button>
              <button type="button" class="editar-foto" aria-label="Editar foto">
                <img src="images/editar-cuadrado.svg" alt="Editar">
              </button>
            </div>
        </div>
        <div class="perfil-info">
          <div class="campo">
            <label for="usuario">Usuario</label>
    
            <input type="text" id="usuario" name="name" value="Pepe Perez">
          </div>
          <div class="campo">
            <label for="nombre">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" value="Johan Felipe Perez Acosta" disabled>
            <small>Conectado vía OAuth no editable.</small>
          </div>
          <div class="campo">
            <label for="correo">Correo electrónico</label>
            <input type="email" id="correo" name="correo" value="pepitoperez@gmail.com">
          </div>
          <div class="campo">
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" value="********">
          </div>
  
          <input type="hidden" id="current_password" name="current_password" value="">
        </div>
      </form>
       <div class="botones">
          <button type="reset" form="perfilForm" class="cancelar">Cancelar</button>
          <button type="submit" form="perfilForm" class="guardar">Guardar cambios</button>
        </div>
    </section>


    <section class="progreso">
      <h2>Progreso</h2>
      <div class="contenedor-progreso">
      <div class="grid-progreso">
        <div class="card">
          <h3>INTRODUCCIÓN A LA PROGRAMACIÓN</h3>
          <div class="barra"><div></div></div>
          <span></span>
        </div>
        <div class="card">
          <h3>HTML</h3>
          <div class="barra"><div></div></div>
          <span></span>
        </div>
        <div class="card">
          <h3>CSS</h3>
          <div class="barra"><div></div></div>
          <span></span>
        </div>
        <div class="card">
          <h3>JS</h3>
          <div class="barra"><div></div></div>
          <span></span>
        </div>
        <div class="card">
          <h3>SQL</h3>
          <div class="barra"><div></div></div>
          <span></span>
        </div>
        <div class="card">
          <h3>PHP</h3>
          <div class="barra"><div></div></div>
          <span></span>
        </div>
      </div>
    </div>
    </section>
  </main>

  <footer class="ola-bottom">
    <img src="images/ola-bottom.svg" alt="Ola inferior">
  </footer>

 
  <div class="modal-overlay" id="modalAvatar">
    <div class="modal-box" tabindex="-1">
      <h2>Selecciona un avatar</h2>
      <div class="avatar-grid">

        <div class="avatar-option" data-id="1" tabindex="0"><img src="images/pinguino.png" alt="Pinguino"></div>
        <div class="avatar-option" data-id="2" tabindex="0"><img src="images/gatoavatar.png" alt="Gato"></div>
        <div class="avatar-option" data-id="3" tabindex="0"><img src="images/panda.png" alt="Panda"></div>
        <div class="avatar-option" data-id="4" tabindex="0"><img src="images/zorro.png" alt="Zorro"></div>
        <div class="avatar-option" data-id="5" tabindex="0"><img src="images/loro.png" alt="Loro"></div>
        <div class="avatar-option" data-id="6" tabindex="0"><img src="images/pig.png" alt="Cerdo"></div>
        <div class="avatar-option" data-id="7" tabindex="0"><img src="images/flamenco.png" alt="Flamenco"></div>
        <div class="avatar-option" data-id="8" tabindex="0"><img src="images/koala.png" alt="Koala"></div>
      </div>
      <div class="modal-buttons">
        <button class="btn btn-cancel">Cancelar</button>
        <button class="btn btn-save">Guardar cambios</button>
      </div>
    </div>
  </div>

  <div id="modalEliminar" class="modal-eliminar">
    <div class="modal-eliminar-content">
      <p>¿Estás segur@ de eliminar la foto?</p>
      <button id="confirmarEliminar" class="btn-confirm">Sí, eliminar</button>
      <button id="cancelarEliminar" class="btn-cancel">Cancelar</button>
    </div>
  </div>

  @vite('resources/js/perfil.js')
</body>
</html>