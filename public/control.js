var currentLanguage = "en"; // Idioma por defecto
const countdownLaunchSound = new Audio('assets/countdown-and-launch.mp3'); // Sonido de cuenta regresiva y despegue

document.addEventListener("DOMContentLoaded", () => {

    const volumenSlider = document.getElementById("volumen");

    // Cambiar volumen cuando se mueve la barra
    volumenSlider.addEventListener("input", () => {
        countdownLaunchSound.volume = volumenSlider.value;
    });

    document.getElementById("language-select").addEventListener("change", function(event) {
        currentLanguage = event.target.value;
        
        updateStaticText(currentLanguage);
        planetData(currentSystem, currentSystem.planets[indexPlanet],currentLanguage);
    
    });
});

//IDIOMAS

const translations = {
    en: {
        subtitle_page: "Choose the solar system to visit",
        proxy_warning: "The proxy server, hosted on a free platform, takes between 1 and 2 minutes to activate from sleep mode. The page works, but requires waiting this time.",
        discovery: "Discovered in: ",
        mass: "Mass: ",
        orbital: "1 year is: ",
        distance: "Distance: ",
        unknown: "Unknown",
        planet_name: "Planet name not available",
        system_name: "Unknown system",
        earth_unit: " Earth/s",  // Tierra/s en inglés
        days_unit: " days",
        info:"🚀 StellarSights invites you to explore real planetary systems with NASA data, randomly generated on each visit for a unique experience. Discover planets with detailed information on mass, radius, distance, and more, customize parameters, and navigate interactively through each system. Powered by an optimized Node.js and Express server, data is processed in real-time, while AI generates unique images based on their real characteristics. 🌌✨ Embark on a stellar journey and explore the unknown!"
    },
    es: {
        subtitle_page: "Elige el sistema solar para visitarlo",
        proxy_warning: "El servidor proxy, alojado en una plataforma gratuita, tarda entre 1 y 2 minutos en activarse desde el modo de suspensión. La página funciona, pero requiere esperar ese tiempo.",
        discovery: "Descubierto en: ",
        mass: "Masa: ",
        orbital: "1 año son: ",
        distance: "Distancia: ",
        unknown: "Desconocido",
        planet_name: "Nombre no disponible",
        system_name: "Sistema desconocido",
        earth_unit: " Tierra/s",
        days_unit: " días",
        info: "🚀 StellarSights te invita a explorar sistemas planetarios reales con datos de la NASA, generados aleatoriamente en cada visita para una experiencia única. Descubre planetas con información detallada sobre masa, radio, distancia y más, personaliza los parámetros y navega de forma interactiva a través de cada sistema. Gracias a un servidor optimizado en Node.js y Express, los datos se procesan en tiempo real, mientras que una IA crea imágenes únicas basadas en sus características reales. 🌌✨ ¡Embárcate en un viaje estelar y explora lo desconocido!"
    },
    de: {
        subtitle_page: "Wählen Sie das Sonnensystem aus, das Sie besuchen möchten",
        proxy_warning: "Der Proxy-Server, der auf einer kostenlosen Plattform gehostet wird, benötigt zwischen 1 und 2 Minuten, um aus dem Ruhezustand zu aktivieren. Die Seite funktioniert, aber es wird diese Zeit benötigt.",
        discovery: "Entdeckt in: ",
        mass: "Masse: ",
        orbital: "1 Jahr sind: ",
        distance: "Entfernung: ",
        unknown: "Unbekannt",
        planet_name: "Planetname nicht verfügbar",
        system_name: "Unbekanntes System",
        earth_unit: " Erdkörper",  // Tierra/s en alemán
        days_unit: " Tage",
        info:"🚀 StellarSights lädt dich ein, echte Planetensysteme mit NASA-Daten zu erkunden, die bei jedem Besuch zufällig generiert werden, um ein einzigartiges Erlebnis zu bieten. Entdecke Planeten mit detaillierten Informationen zu Masse, Radius, Entfernung und mehr, passe Parameter an und navigiere interaktiv durch jedes System. Dank eines optimierten Node.js- und Express-Servers werden die Daten in Echtzeit verarbeitet, während eine KI einzigartige Bilder basierend auf ihren realen Eigenschaften erstellt. 🌌✨ Begib dich auf eine Reise zu den Sternen und entdecke das Unbekannte!"
    },
    it: {
        subtitle_page: "Scegli il sistema solare da visitare",
        proxy_warning: "Il server proxy, ospitato su una piattaforma gratuita, richiede tra 1 e 2 minuti per attivarsi dalla modalità sospensione. La pagina funziona, ma richiede questo tempo.",
        discovery: "Scoperto nel: ",
        mass: "Massa: ",
        orbital: "1 anno sono: ",
        distance: "Distanza: ",
        unknown: "Sconosciuto",
        planet_name: "Nome del pianeta non disponibile",
        system_name: "Sistema sconosciuto",
        earth_unit: " Terra/e",  // Tierra/s en italiano
        days_unit: " giorni",
        info:"🚀 StellarSights ti invita a esplorare sistemi planetari reali con dati NASA, generati casualmente ad ogni visita per un'esperienza unica. Scopri pianeti con informazioni dettagliate su massa, raggio, distanza e altro, personalizza i parametri e naviga interattivamente attraverso ogni sistema. Grazie a un server ottimizzato con Node.js ed Express, i dati vengono elaborati in tempo reale, mentre un’IA genera immagini uniche basate sulle loro caratteristiche reali. 🌌✨ Parti per un viaggio tra le stelle ed esplora l’ignoto!"
    },
    pt: {
        subtitle_page: "Escolha o sistema solar para visitar",
        proxy_warning: "O servidor proxy, hospedado em uma plataforma gratuita, leva entre 1 e 2 minutos para ativar a partir do modo de suspensão. A página funciona, mas requer esperar esse tempo.",
        discovery: "Descoberto em: ",
        mass: "Massa: ",
        orbital: "1 ano é: ",
        distance: "Distância: ",
        unknown: "Desconhecido",
        planet_name: "Nome do planeta não disponível",
        system_name: "Sistema desconhecido",
        earth_unit: " Terra/s",  // Tierra/s en portugués
        days_unit: " dias",
        info:"🚀 StellarSights convida você a explorar sistemas planetários reais com dados da NASA, gerados aleatoriamente a cada visita para uma experiência única. Descubra planetas com informações detalhadas sobre massa, raio, distância e muito mais, personalize os parâmetros e navegue interativamente por cada sistema. Com um servidor otimizado em Node.js e Express, os dados são processados em tempo real, enquanto uma IA gera imagens exclusivas baseadas em suas características reais. 🌌✨ Embarque em uma jornada estelar e explore o desconhecido!"
    },
    zh: {
        subtitle_page: "选择要访问的太阳系",
        proxy_warning: "代理服务器托管在一个免费平台上，从睡眠模式激活需要1到2分钟的时间。页面可以正常工作，但需要等待这个时间。",
        discovery: "发现于: ",
        mass: "质量: ",
        orbital: "1年是: ",
        distance: "距离: ",
        unknown: "未知",
        planet_name: "行星名称不可用",
        system_name: "未知系统",
        earth_unit: " 地球/地球",  // Tierra/s en chino (simplificado)
        days_unit: " 天",
        info:"🚀 StellarSights 邀请您探索 真实的行星系统，利用 NASA 数据，每次访问都会随机生成，带来独特的体验。发现行星的详细信息，包括 质量、半径、轨道距离等，自定义参数，并在每个系统中交互式导航。借助 优化的 Node.js 和 Express 服务器，数据实时处理，同时 AI 根据行星真实特征生成独特图像。🌌✨ 踏上星际旅程，探索未知宇宙！"
    }
};


function updateStaticText(currentLanguage){
    const subtitle = document.getElementById("subtitulo_pagina");
    const aviso = document.getElementById("p_aviso");
    const info = document.getElementById("section_info");

    if(subtitle && aviso && info){
        subtitle.textContent = translations[currentLanguage].subtitle_page;
        aviso.textContent = translations[currentLanguage].proxy_warning;
        info.textContent = translations[currentLanguage].info;

    } else{
        console.error("Error: No se encontraron algunos elementos en el DOM.");
    }
    
}


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
                    planetData(currentSystem, currentPlanet, currentLanguage);
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
    document.getElementById("button_navbar_config").style.display = "block";
    document.getElementById("button_navbar_info").style.display = "none";
    planetData(currentSystem, currentSystem.planets[indexPlanet],currentLanguage);
}

// Función para regresar a la vista de sistemas
function mostrarSistemas() {
    document.getElementById("main_div").style.display = "block";
    document.getElementById("planet_div").style.display = "none";
    document.getElementById("button_navbar_config").style.display = "none";
    document.getElementById("button_navbar_info").style.display = "block";
}

// Función para cambiar de planeta
function cambiarPlaneta() {
    const proximo_planeta = document.getElementById("flecha_derecha");
    const anterior_planeta = document.getElementById("flecha_izquierda");

    proximo_planeta.addEventListener("click", () => {
        if (currentSystem && indexPlanet < currentSystem.planets.length - 1) {
            indexPlanet++;
            planetData(currentSystem, currentSystem.planets[indexPlanet],currentLanguage);
            console.log(currentLanguage);
        }
    });

    anterior_planeta.addEventListener("click", () => {
        if (currentSystem && indexPlanet > 0) {
            indexPlanet--;
            planetData(currentSystem, currentSystem.planets[indexPlanet],currentLanguage);
        }
    });
}

// Función para mostrar la información de un planeta
function planetData(currentSystem, currentPlanet, currentLanguage) {

    if (!currentSystem || !currentPlanet) {
        console.error("Sistema o planeta no encontrado");
        return;
    }

    console.log("Mostrando datos de:", currentPlanet);
    console.log(currentLanguage);

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
        ? translations[currentLanguage].discovery + currentPlanet.discovery_year 
        : translations[currentLanguage].discovery + translations[currentLanguage].unknown;

    mass_b.textContent = currentPlanet.mass_compared_earth
        ? translations[currentLanguage].mass + currentPlanet.mass_compared_earth + translations[currentLanguage].earth_unit
        : translations[currentLanguage].mass + translations[currentLanguage].unknown;

    orbital_b.textContent = currentPlanet.orbital_duration_in_days
        ? translations[currentLanguage].orbital + (currentPlanet.orbital_duration_in_days).toFixed(1) + translations[currentLanguage].days_unit
        : translations[currentLanguage].orbital + translations[currentLanguage].unknown;

    distance_b.textContent = currentPlanet.ps_distance_in_Parsecs
        ? translations[currentLanguage].distance + (currentPlanet.ps_distance_in_Parsecs).toFixed(1) + " Parsecs" 
        : translations[currentLanguage].distance + translations[currentLanguage].unknown;

    planet_name_h2.textContent = currentPlanet.name || translations[currentLanguage].planet_name;
    system_name_b.textContent = currentSystem.system || translations[currentLanguage].system_name;
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
updateStaticText(currentLanguage);


