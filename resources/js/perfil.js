
const modal = document.getElementById("modalAvatar");
const abrirModalBtn = document.querySelector(".editar-foto");
const cancelarBtn = modal.querySelector(".btn-cancel");
const guardarBtn = modal.querySelector(".btn-save");

abrirModalBtn.addEventListener("click", () => {
  modal.classList.add("show");
  modal.classList.remove("hide");
  const modalBox = modal.querySelector(".modal-box");
  modalBox.focus();
  trapFocus(modalBox);
});

function cerrarModal() {
  modal.classList.add("hide");
  setTimeout(() => modal.classList.remove("show", "hide"), 400);
}

cancelarBtn.addEventListener("click", cerrarModal);
guardarBtn.addEventListener("click", () => {
  const seleccionado = modal.querySelector(".avatar-option.selected img");
  if (seleccionado) document.querySelector(".perfil-imagen img").src = seleccionado.src;
  cerrarModal();
});


const opciones = modal.querySelectorAll(".avatar-option");
opciones.forEach(op => {
  op.addEventListener("click", () => {
    opciones.forEach(o => o.classList.remove("selected"));
    op.classList.add("selected");
  });
  op.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); op.click(); }
  });
});


const eliminarBtn = document.querySelector(".eliminar-foto");
const modalEliminar = document.getElementById("modalEliminar");
const confirmarEliminarBtn = document.getElementById("confirmarEliminar");
const cancelarEliminarBtn = document.getElementById("cancelarEliminar");
const perfilImg = document.querySelector(".perfil-imagen img");

eliminarBtn.addEventListener("click", () => {
  modalEliminar.classList.add("show");
  modalEliminar.classList.remove("hide");
  modalEliminar.style.display = "flex";
  const focusables = modalEliminar.querySelectorAll('button:not([disabled]), [tabindex]:not([tabindex="-1"])');
  if (focusables.length) focusables[0].focus();
  trapFocus(modalEliminar);
});

function cerrarModalEliminar() {
  modalEliminar.classList.add("hide");
  setTimeout(() => { modalEliminar.classList.remove("show", "hide"); modalEliminar.style.display = "none"; }, 400);
}
cancelarEliminarBtn.addEventListener("click", cerrarModalEliminar);
confirmarEliminarBtn.addEventListener("click", () => {
  perfilImg.src = "images/foto-de-perfil.png";
  cerrarModalEliminar();
});
window.addEventListener("click", (e) => { if (e.target === modalEliminar) cerrarModalEliminar(); });

function trapFocus(element) {
  const focusableEls = element.querySelectorAll(`
    a[href], area[href], input:not([disabled]),
    select:not([disabled]), textarea:not([disabled]),
    button:not([disabled]), [tabindex]:not([tabindex="-1"])
  `);
  const firstFocusable = focusableEls[0];
  const lastFocusable = focusableEls[focusableEls.length - 1];

  element.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) { e.preventDefault(); lastFocusable.focus(); }
      } else {
        if (document.activeElement === lastFocusable) { e.preventDefault(); firstFocusable.focus(); }
      }
    }
  });
}


const modulos = [
  { nombre: "INTRODUCCIÓN A LA PROGRAMACIÓN", progreso: 50 },
  { nombre: "HTML", progreso: 30 },
  { nombre: "CSS", progreso: 20 },
  { nombre: "JS", progreso: 10 },
  { nombre: "SQL", progreso: 0 },
  { nombre: "PHP", progreso: 0 }
];

window.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const barra = card.querySelector(".barra div");
    const span = card.querySelector("span");
    if (modulos[index]) {
      span.textContent = modulos[index].progreso + "%";
      setTimeout(() => { barra.style.width = modulos[index].progreso + "%"; }, 300);
    }
  });
  

  cargarDatosUsuario();
});


async function cargarDatosUsuario() {
  const token = localStorage.getItem("token");
  if (!token) return;
  
  try {
    const res = await fetch("http://localhost:8001/api/me", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    
    if (res.ok) {
      const user = await res.json();
      document.getElementById("usuario").value = user.name || '';
     
      if (user.avatar_id) {
        const avatarOption = modal.querySelector(`.avatar-option[data-id="${user.avatar_id}"]`);
        if (avatarOption) {
          avatarOption.classList.add("selected");
          perfilImg.src = avatarOption.querySelector("img").src;
        }
      }
    }
  } catch (error) {
    console.error("Error cargando datos del usuario:", error);
  }
}



const perfilForm = document.getElementById("perfilForm");
const API_UPDATE_PROFILE = "http://localhost:8001/api/me";
const API_UPDATE_PASSWORD = "http://localhost:8001/api/me/password";

perfilForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const token = localStorage.getItem("token");
  if (!token) {
    alert("No hay sesión activa");
    return;
  }

 
  const guardarBtn = document.querySelector(".guardar");
  const originalText = guardarBtn.textContent;
  guardarBtn.textContent = "Guardando...";
  guardarBtn.disabled = true;

  try {
    
    const usuario = document.getElementById("usuario").value;
    const avatarSeleccionado = modal.querySelector(".avatar-option.selected");
    const avatar_id = avatarSeleccionado ? avatarSeleccionado.dataset.id : null;

   
    if (usuario || avatar_id) {
      const profileData = {};
      if (usuario) profileData.name = usuario;
      if (avatar_id) profileData.avatar_id = parseInt(avatar_id);

      const res = await fetch(API_UPDATE_PROFILE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(profileData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al actualizar perfil");

      if (avatarSeleccionado) {
        perfilImg.src = avatarSeleccionado.querySelector("img").src;
      }
    }

   
    const passwordField = document.getElementById("password");
    const new_password = passwordField.value;
    const current_password = document.getElementById("current_password").value;

    
    if (new_password && new_password !== "********" && new_password.trim() !== "") {
      
      if (!current_password || current_password.trim() === "") {
        alert("Debes ingresar tu contraseña actual en el campo de contraseña");
        return;
      }

      const passwordData = {
        current_password: current_password,
        password: new_password,
        password_confirmation: new_password
      };

      const resPass = await fetch(API_UPDATE_PASSWORD, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(passwordData)
      });

      const dataPass = await resPass.json();
      if (!resPass.ok) throw new Error(dataPass.message || "Error al cambiar contraseña");

  
      passwordField.value = "********";
      document.getElementById("current_password").value = "";
    }

    alert("Perfil actualizado correctamente");
   
    if (modal.classList.contains("show")) {
      cerrarModal();
    }

  } catch (err) {
    console.error("Error:", err);
    alert(err.message || "Error al conectar con el servidor");
  } finally {
    
    guardarBtn.textContent = originalText;
    guardarBtn.disabled = false;
  }
});

// ==========================
// BOTÓN CANCELAR
// ==========================
const cancelarBtn2 = document.querySelector(".cancelar");
cancelarBtn2.addEventListener("click", () => {

  cargarDatosUsuario();

  document.getElementById("password").value = "********";
  document.getElementById("current_password").value = "";

  opciones.forEach(o => o.classList.remove("selected"));
});