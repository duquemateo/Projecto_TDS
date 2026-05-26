// 1. Buscador dinámico para el Comparador de Precios
document
    .querySelector(".search-box button")
    .addEventListener("click", function () {
        let busqueda = document
            .querySelector(".search-box input")
            .value.toLowerCase();
        let filas = document.querySelectorAll(".tabla-precios tbody tr");

        filas.forEach((fila) => {
            let nombreComponente = fila.cells[0].innerText.toLowerCase();
            if (nombreComponente.includes(busqueda)) {
                fila.style.display = "";
                fila.style.backgroundColor = "rgba(0, 212, 255, 0.1)"; // Resalta el hallazgo
            } else {
                fila.style.display = "none";
            }
        });
    });

// 2. Simulación de Verificación de Compatibilidad (Propuesta TDS)
function verificarCompatibilidad() {
    // Esto es una simulación de lo que haría tu motor 3D
    const componentes = ["Procesador Intel", "Placa Base ASUS", "RAM DDR5"];
    console.log("Verificando compatibilidad de: " + componentes.join(", "));

    // Mostramos un mensaje de éxito (Verde Neón como en tu paleta)
    alert(
        "✅ TDS Check: Los componentes seleccionados son 100% compatibles.",
    );
}

// 3. Gestión del Formulario de Soporte Técnico
document
    .querySelector(".soporte-form form")
    .addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que la página se recargue

        const nombre = this.querySelector("input").value;
        const servicio = this.querySelector("select").value;

        // Feedback visual para el usuario
        this.innerHTML = `
<div style="text-align: center; padding: 20px;">
    <h3 style="color: #39ff14;">¡Solicitud Enviada!</h3>
    <p>Gracias ${nombre}, un técnico de TDS te contactará en breve para el servicio de: <strong>${servicio}</strong>.</p>
    <button onclick="location.reload()" style="margin-top:10px; background:none; border:1px solid #00d4ff; color:#00d4ff; cursor:pointer;">Enviar otra consulta</button>
</div>
`;
    });
const menuToggle = document.getElementById("mobile-menu");
const navList = document.querySelector(".nav-list");
const navLinks = document.querySelectorAll(".nav-list li a");

// Función para abrir/cerrar
menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
    menuToggle.classList.toggle("is-active");
});

// CERRAR AUTOMÁTICAMENTE al hacer clic en cualquier enlace
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navList.classList.remove("active");
        menuToggle.classList.remove("is-active");
    });
});
// ===========================================
//         LÓGICA DEL RECOMENDADOR TDS
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    const formReco = document.getElementById("form-recomendador");
    const resultado = document.getElementById("resultado-recomendador");

    formReco.addEventListener("submit", (e) => {
        e.preventDefault();

        const uso = document.getElementById("uso").value;
        const presupuesto = parseInt(document.getElementById("presupuesto").value);
        const tamano = document.getElementById("tamano").value;

        let recomendacion = generarRecomendacion(uso, presupuesto, tamano);

        resultado.innerHTML = recomendacion;
        resultado.style.display = "block";
    });


    function generarRecomendacion(uso, dinero, tamano) {
        let titulo = "";
        let cpu = "";
        let gpu = "";
        let ram = dinero < 700 ? "16GB" : "32GB";
        let almacenamiento = dinero < 900 ? "500GB NVMe" : "1TB NVMe";

        // Lógica simple de CPU / GPU
        if (uso === "gaming") {
            titulo = "Configuración Gaming Recomendada";
            gpu = dinero > 1000 ? "RTX 4070" : "RTX 4060";
            cpu = dinero > 1000 ? "Ryzen 7 7700" : "Ryzen 5 5600";
        }
        else if (uso === "oficina") {
            titulo = "Configuración para Oficina / Estudio";
            gpu = "Gráficos Integrados";
            cpu = "Intel i5 12400";
        }
        else if (uso === "edicion") {
            titulo = "Configuración para Edición y Render";
            gpu = dinero > 1200 ? "RTX 4070 Ti" : "RTX 4070";
            cpu = "Ryzen 7 7700X";
        }
        else if (uso === "streaming") {
            titulo = "Configuración para Streaming";
            gpu = "RTX 4060 Ti";
            cpu = "Ryzen 5 7600";
        }

        // Tamaño del equipo
        let tipoCaja = {
            "mini": "Caja Mini-ITX compacta",
            "medio": "Caja Micro-ATX versátil",
            "grande": "Caja ATX con máximo airflow"
        }[tamano];

        // Resultado en HTML
        return `
            <h3 style="color: var(--accent-blue); margin-bottom: 10px;">${titulo}</h3>
            <p><strong>CPU:</strong> ${cpu}</p>
            <p><strong>GPU:</strong> ${gpu}</p>
            <p><strong>RAM:</strong> ${ram}</p>
            <p><strong>Almacenamiento:</strong> ${almacenamiento}</p>
            <p><strong>Tamaño del equipo:</strong> ${tipoCaja}</p>
            <p style="margin-top: 15px; color: var(--accent-green); font-weight: bold;">
                ✔ Lista para montaje — 100% compatible
            </p>
        `;
    }
});
// ========= Toggle de tema =========
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('toggleTheme');
  const saved = localStorage.getItem('tds-theme');

  // Respeta lo guardado
  if (saved) {
    root.setAttribute('data-theme', saved);
    if (btn) btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (current === 'light') root.removeAttribute('data-theme'); // light por defecto
      else root.setAttribute('data-theme', 'dark');

      localStorage.setItem('tds-theme', current);
      btn.textContent = current === 'dark' ? '🌙' : '☀️';
    });
  }
})();