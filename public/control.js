var currentLanguage = "en"; 
const countdownLaunchSound = new Audio('assets/countdown-and-launch.mp3'); 

document.addEventListener("DOMContentLoaded", () => {
    const volumenSlider = document.getElementById("volumen");

    const savedVolume = localStorage.getItem('audioVolume');
    if (savedVolume !== null) {
        countdownLaunchSound.volume = parseFloat(savedVolume);
        volumenSlider.value = savedVolume;
    } else {
        countdownLaunchSound.volume = 0.05;
        volumenSlider.value = 0.05;
    }
    volumenSlider.addEventListener("input", () => {
        const newVolume = volumenSlider.value;
        countdownLaunchSound.volume = newVolume;
        
        localStorage.setItem('audioVolume', newVolume);
    });

    document.getElementById("language-select").addEventListener("change", function(event) {
        currentLanguage = event.target.value;
        updateStaticText(currentLanguage);
        planetData(currentSystem, currentSystem.planets[indexPlanet], currentLanguage);
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
        temperature : "Temperature: ",
        radius: "Radius: ",
        density: "Density: ",
        size: "Size: ",
        earth_unit: " Earth/s",
        days_unit: " days",
        star_unit: " Star/s",
        info:"🚀 StellarSights invites you to explore real planetary systems with NASA data, randomly generated on each visit for a unique experience. Discover planets with detailed information on mass, radius, distance, and more, customize parameters, and navigate interactively through each system. Powered by an optimized Node.js and Express server, data is processed in real-time, while AI generates unique images based on their real characteristics. 🌌✨ Embark on a stellar journey and explore the unknown!"
    },
    es: {
        subtitle_page: "Elige el sistema solar para visitar",
        proxy_warning: "El servidor proxy, alojado en una plataforma gratuita, tarda entre 1 y 2 minutos en activarse desde el modo de suspensión. La página funciona, pero requiere esperar este tiempo.",
        discovery: "Descubierto en: ",
        mass: "Masa: ",
        orbital: "1 año equivale a: ",
        distance: "Distancia: ",
        unknown: "Desconocido",
        planet_name: "Nombre del planeta no disponible",
        system_name: "Sistema desconocido",
        temperature: "Temperatura: ",
        radius: "Radio: ",
        density: "Densidad: ",
        size: "Tamaño: ",
        earth_unit: " Tierras",
        days_unit: " días",
        star_unit: " Estrellas",
        info: "🚀 StellarSights te invita a explorar sistemas planetarios reales con datos de la NASA, generados aleatoriamente en cada visita para una experiencia única. Descubre planetas con información detallada sobre masa, radio, distancia y más. Personaliza parámetros y navega de forma interactiva por cada sistema. Impulsado por un servidor optimizado en Node.js y Express, los datos se procesan en tiempo real, mientras que la IA genera imágenes únicas basadas en sus características reales. 🌌✨ ¡Embárcate en un viaje estelar y explora lo desconocido!"
    },
    de: {
        subtitle_page: "Wähle das Sonnensystem zum Besuchen",
        proxy_warning: "Der Proxy-Server, der auf einer kostenlosen Plattform gehostet wird, benötigt 1 bis 2 Minuten, um aus dem Ruhezustand zu starten. Die Seite funktioniert, aber es erfordert etwas Geduld.",
        discovery: "Entdeckt im Jahr: ",
        mass: "Masse: ",
        orbital: "1 Jahr entspricht: ",
        distance: "Entfernung: ",
        unknown: "Unbekannt",
        planet_name: "Planetennamen nicht verfügbar",
        system_name: "Unbekanntes System",
        temperature: "Temperatur: ",
        radius: "Radius: ",
        density: "Dichte: ",
        size: "Größe: ",
        earth_unit: " Erden",
        days_unit: " Tage",
        star_unit: " Sterne",
        info: "🚀 StellarSights lädt dich ein, echte Planetensysteme mit NASA-Daten zu erkunden, die bei jedem Besuch zufällig generiert werden, um eine einzigartige Erfahrung zu bieten. Entdecke Planeten mit detaillierten Informationen zu Masse, Radius, Entfernung und mehr. Passe Parameter an und navigiere interaktiv durch jedes System. Unterstützt von einem optimierten Node.js- und Express-Server werden die Daten in Echtzeit verarbeitet, während KI einzigartige Bilder basierend auf ihren realen Eigenschaften generiert. 🌌✨ Begib dich auf eine Reise zu den Sternen und erkunde das Unbekannte!"
    },
    it: {
        subtitle_page: "Scegli il sistema solare da visitare",
        proxy_warning: "Il server proxy, ospitato su una piattaforma gratuita, impiega tra 1 e 2 minuti per attivarsi dalla modalità sospensione. La pagina funziona, ma è necessario attendere questo tempo.",
        discovery: "Scoperto nel: ",
        mass: "Massa: ",
        orbital: "1 anno è: ",
        distance: "Distanza: ",
        unknown: "Sconosciuto",
        planet_name: "Nome del pianeta non disponibile",
        system_name: "Sistema sconosciuto",
        temperature: "Temperatura: ",
        radius: "Raggio: ",
        density: "Densità: ",
        size: "Dimensione: ",
        earth_unit: " Terre",
        days_unit: " giorni",
        star_unit: " Stelle",
        info: "🚀 StellarSights ti invita a esplorare sistemi planetari reali con dati della NASA, generati casualmente a ogni visita per un'esperienza unica. Scopri pianeti con informazioni dettagliate su massa, raggio, distanza e altro ancora. Personalizza i parametri e naviga interattivamente attraverso ogni sistema. Supportato da un server Node.js e Express ottimizzato, i dati vengono elaborati in tempo reale, mentre l'intelligenza artificiale genera immagini uniche basate sulle loro caratteristiche reali. 🌌✨ Parti per un viaggio stellare ed esplora l'ignoto!"
    },
    pt: {
        subtitle_page: "Escolha o sistema solar para visitar",
        proxy_warning: "O servidor proxy, hospedado em uma plataforma gratuita, leva entre 1 e 2 minutos para ser ativado a partir do modo de suspensão. A página funciona, mas é necessário aguardar esse tempo.",
        discovery: "Descoberto em: ",
        mass: "Massa: ",
        orbital: "1 ano é: ",
        distance: "Distância: ",
        unknown: "Desconhecido",
        planet_name: "Nome do planeta indisponível",
        system_name: "Sistema desconhecido",
        temperature: "Temperatura: ",
        radius: "Raio: ",
        density: "Densidade: ",
        size: "Tamanho: ",
        earth_unit: " Terras",
        days_unit: " dias",
        star_unit: " Estrelas",
        info: "🚀 StellarSights convida você a explorar sistemas planetários reais com dados da NASA, gerados aleatoriamente a cada visita para uma experiência única. Descubra planetas com informações detalhadas sobre massa, raio, distância e muito mais. Personalize os parâmetros e navegue interativamente por cada sistema. Suportado por um servidor Node.js e Express otimizado, os dados são processados em tempo real, enquanto a inteligência artificial gera imagens únicas baseadas nas características reais deles. 🌌✨ Embarque em uma viagem estelar e explore o desconhecido!"         
    },
    zh:{
        subtitle_page: "选择要访问的太阳系",
        proxy_warning: "代理服务器托管在一个免费的平台上，从休眠模式激活需要1到2分钟的时间。页面可以正常使用，但需要等待这个时间。",
        discovery: "发现于：",
        mass: "质量：",
        orbital: "1年为：",
        distance: "距离：",
        unknown: "未知",
        planet_name: "行星名称不可用",
        system_name: "系统未知",
        temperature: "温度：",
        radius: "半径：",
        density: "密度：",
        size: "大小：",
        earth_unit: " 地球",
        days_unit: " 天",
        star_unit: " 星星",
        info: "🚀 StellarSights邀请你探索真实的行星系统，使用来自NASA的数据，每次访问时随机生成，提供独特的体验。发现有关质量、半径、距离等详细信息的行星。自定义参数，并通过每个系统进行互动式导航。支持经过优化的Node.js和Express服务器，数据实时处理，同时人工智能根据其真实特征生成独特的图像。🌌✨启程进行星际之旅，探索未知！"
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
    const temperature_b = document.getElementById("temperature");
    const radius_b = document.getElementById("radius");
    const density_b = document.getElementById("density");
    const radius_to_star_b = document.getElementById("radius_compared_to_star");

    if (
        !discovery_b || 
        !mass_b || 
        !orbital_b || 
        !distance_b || 
        !planet_name_h2 || 
        !system_name_b || 
        !temperature_b || 
        !radius_b || 
        !density_b || 
        !radius_to_star_b
    ) {
        console.error("Error: No se encontraron algunos elementos en el DOM.");
        return;
    }
    

    // Asignar valores a los elementos del HTML
    discovery_b.textContent = currentPlanet.discovery_year
        ? translations[currentLanguage].discovery + currentPlanet.discovery_year 
        : translations[currentLanguage].discovery + translations[currentLanguage].unknown;

    mass_b.textContent = currentPlanet.mass_compared_earth
        ? translations[currentLanguage].mass + currentPlanet.mass_compared_earth.toFixed(1) + translations[currentLanguage].earth_unit
        : translations[currentLanguage].mass + translations[currentLanguage].unknown;

    orbital_b.textContent = currentPlanet.orbital_duration_in_days
        ? translations[currentLanguage].orbital + (currentPlanet.orbital_duration_in_days).toFixed(1) + translations[currentLanguage].days_unit
        : translations[currentLanguage].orbital + translations[currentLanguage].unknown;

    distance_b.textContent = currentPlanet.ps_distance_in_Parsecs
        ? translations[currentLanguage].distance + (currentPlanet.ps_distance_in_Parsecs).toFixed(1) + " Parsecs" 
        : translations[currentLanguage].distance + translations[currentLanguage].unknown;

    temperature_b.textContent = currentPlanet.temperature_in_kelvin
        ? translations[currentLanguage].temperature + (currentPlanet.temperature_in_kelvin).toFixed(1) + " K"
        : translations[currentLanguage].temperature + translations[currentLanguage].unknown;

    radius_b.textContent = currentPlanet.radius_compared_earth
        ? translations[currentLanguage].radius + currentPlanet.radius_compared_earth + translations[currentLanguage].earth_unit
        : translations[currentLanguage].radius + translations[currentLanguage].unknown;
        
    density_b.textContent = currentPlanet.density
        ? translations[currentLanguage].density + currentPlanet.density + translations[currentLanguage].earth_unit
        : translations[currentLanguage].density + translations[currentLanguage].unknown;
        
    radius_to_star_b.textContent = currentPlanet.planetToStarRadiusRatio
        ? translations[currentLanguage].size + currentPlanet.planetToStarRadiusRatio + translations[currentLanguage].star_unit
        : translations[currentLanguage].size + translations[currentLanguage].unknown;

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

function info(){
    const info = document.getElementById("section_info");
    info.classList.toggle("visible");
}

function configButton() {
    const configButtons = document.querySelectorAll(".config_button");
    
    configButtons.forEach(button => {
        button.classList.toggle("visible");
    });
    
}

function add_remove_buttons() {
    const config_list = document.querySelector(".ls_datos");
    const config_minus = document.getElementById("config_minus");
    const config_plus = document.getElementById("config_plus");

    
    config_minus.addEventListener("click", () => {
        const config_items = Array.from(config_list.querySelectorAll(".li_datos"));
        const lastVisibleItem = config_items.reverse().find(item => item.style.display !== "none");
        if (lastVisibleItem && config_items.filter(item => item.style.display !== "none").length > 2) {
            lastVisibleItem.style.display = "none";
        }
    });

    config_plus.addEventListener("click", () => {
        const config_items = Array.from(config_list.querySelectorAll(".li_datos"));
        const visibleItems = config_items.filter(item => item.style.display !== "none");

        if (visibleItems.length < 8) {
            for (const item of config_items) {
                if (item.style.display === "none") {
                    item.style.display = "list-item";
                    return;
                }
            }
            if (config_items.length < 8) {
                const newItem = document.createElement("li");
                newItem.classList.add("li_datos");
                newItem.textContent = `Item ${config_items.length + 1}`;
                config_list.appendChild(newItem);
            }
        }
    });
}






// Llamar a la función cuando se cargue la página
obtenerSistemasPlanetarios();
cambiarPlaneta();
updateStaticText(currentLanguage);
add_remove_buttons();


