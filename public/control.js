
const countdownLaunchSound = new Audio('assets/countdown-and-launch.mp3'); // Sonido de cuenta regresiva y despegue



//FETCH Y CONTROLES DE APIS

let indexPlanet = 0; // Índice del planeta
let currentSystem = null; // Variable global para el sistema actual
let sistemasCargados = false;


async function obtenerSistemasPlanetarios() {

    try {
        const response = await fetch('https://stellar-sights-backend.onrender.com/api/datos'); // Llamada a tu API

        if (!response.ok) throw new Error('Error al obtener los datos');
        
        const data = await response.json(); // Convertir respuesta a JSON
        console.log("Datos obtenidos:", data); // Ver los sistemas planetarios en consola

        const botones = document.querySelectorAll(".button_s");

        data.forEach((sistema, index) => {
            if (botones[index]) {
                botones[index].textContent = sistema.system;
                botones[index].addEventListener("click", () => {
                    currentSystem = data[index]; // Guardar el sistema actual
                    indexPlanet = 0; // Reiniciar al primer planeta
                    let currentPlanet = currentSystem.planets[indexPlanet];

                    console.log("Sistema seleccionado:", currentSystem);
                    console.log("Planeta seleccionado:", currentPlanet);
                    planetData(currentSystem, currentPlanet);
                });
            }
        });
            sistemasCargados=true;
            document.getElementById("p_aviso").style.display = "none";
            console.log(sistemasCargados);
    } catch (error) {
        console.error(error);
    } 
    asignAnimation();
}

// Función para cambiar de vista y mostrar los planetas
function mostrarPlanetas() {
    document.getElementById("main_div").style.display = "none";
    document.getElementById("planet_div").style.display = "block";
}

// Función para regresar a la vista de sistemas
function mostrarSistemas() {
    document.getElementById("main_div").style.display = "block";
    document.getElementById("planet_div").style.display = "none";
}

// Función para cambiar de planeta
function cambiarPlaneta() {
    const proximo_planeta = document.getElementById("flecha_derecha");
    const anterior_planeta = document.getElementById("flecha_izquierda");

    proximo_planeta.addEventListener("click", () => {
        if (currentSystem && indexPlanet < currentSystem.planets.length - 1) {
            indexPlanet++;
            planetData(currentSystem, currentSystem.planets[indexPlanet]);
        }
    });

    anterior_planeta.addEventListener("click", () => {
        if (currentSystem && indexPlanet > 0) {
            indexPlanet--;
            planetData(currentSystem, currentSystem.planets[indexPlanet]);
        }
    });
}

// Función para mostrar la información de un planeta
function planetData(currentSystem, currentPlanet) {
    if (!currentSystem || !currentPlanet) {
        console.error("Sistema o planeta no encontrado");
        return;
    }

    console.log("Mostrando datos de:", currentPlanet);

    // Obtener elementos del DOM
    const discovery_b = document.getElementById("d_year");
    const mass_b = document.getElementById("mass");
    const orbital_b = document.getElementById("orbital_d");
    const distance_b = document.getElementById("distance");
    const planet_name_h2 = document.getElementById("planet_name");
    const system_name_b = document.getElementById("system_name");

    if (!discovery_b || !mass_b || !orbital_b || !distance_b || !planet_name_h2 || !system_name_b) {
        console.error("Error: No se encontraron algunos elementos en el DOM.");
        return;
    }

    // Asignar valores a los elementos del HTML
    discovery_b.textContent = currentPlanet.discovery_year 
        ? "Descubierto en: " + currentPlanet.discovery_year 
        : "Descubierto en: Desconocido";

    mass_b.textContent = currentPlanet.mass_compared_earth 
        ? "Masa: " + currentPlanet.mass_compared_earth + " Tierra/s"
        : "Masa: Desconocido";

    orbital_b.textContent = currentPlanet.orbital_duration_in_days 
        ? "1 año son: " + (currentPlanet.orbital_duration_in_days).toFixed(1) + " días" 
        : "1 año: Desconocido";

    distance_b.textContent = currentPlanet.ps_distance_in_Parsecs 
        ? "Distancia: " + (currentPlanet.ps_distance_in_Parsecs).toFixed(1) + " Parsecs" 
        : "Distancia: Desconocido";

    planet_name_h2.textContent = currentPlanet.name || "Nombre no disponible";
    system_name_b.textContent = currentSystem.system || "Sistema desconocido";
}

//ANIMACIONES y SONIDOS

//Animacion Hyperspace Jump

const buttons = document.querySelectorAll(".button_s");
const buttonContainer = document.querySelector(".contenedor_sistemas");

//Contador en el boton
function startCountdown(button){
    button.disabled=true;
    let countdownValue = 3;
    const originalText = button.textContent;
    button.textContent = countdownValue;

    countdownLaunchSound.play(); //reproduce sonido

    setTimeout(() => {
        const countdownTimer = setInterval(function(){
            countdownValue--;

            if(countdownValue>0){
                button.textContent = countdownValue;
            } else {
                setTimeout(()=>button.textContent = "Launch!",200);
                clearInterval(countdownTimer);
                setTimeout(()=>{
                    button.disabled=false;
                    button.textContent = originalText;
                    countdownLaunchSound.pause();
                    countdownLaunchSound.currentTime=0;
                },9000);
            }
        },1000);
    },600);
}


function asignAnimation(){
    if(!sistemasCargados) return;
    else{
        buttons.forEach(button => {
            button.addEventListener("click", () =>{
                setStarSpeed(0.8);
                buttonContainer.style.transform = "translateZ(1000px)";
                setTimeout(() => setStarSpeed(-1), 3000);
                setTimeout(() => setStarSpeed(50), 4000);
                startCountdown(button);
                setTimeout(() => setStarSpeed(0.8), 9000);
                setTimeout(mostrarPlanetas,9000)
                setTimeout(()=>{
                    buttonContainer.style.transform = "translateZ(0px)";
                },9000)
            });
        });
    }
    
}








// Llamar a la función cuando se cargue la página
obtenerSistemasPlanetarios();
cambiarPlaneta();

