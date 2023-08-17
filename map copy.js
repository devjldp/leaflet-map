let myIcon = L.icon({
    iconUrl: 'gourmet_3stars.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [40, 40], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 0], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
});

let myIconBeach = L.icon({
    iconUrl: 'beach_icon.png',
    // shadowUrl: 'leaf-shadow.png',

    iconSize:     [40, 40], // size of the icon
    // shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 0], // point of the icon which will correspond to marker's location
    // shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

//Geolocalizacion
// Función asincrónica para obtener la ubicación geográfica del usuario
const getGeoLocation = async () => {
    return new Promise((resolve, reject) => {
        // Opciones de configuración para la obtención de la ubicación
        const options = {
            enableHighAccuracy: true,  // Habilita la alta precisión
            timeout: 1000,  // Tiempo máximo para obtener la ubicación (en milisegundos)
            maximumAge: 0,  // Edad máxima de la caché de la ubicación
        };

        // Función de éxito que se llama cuando se obtiene la ubicación
        const success = (position) => {
            // Extraer latitud y longitud de la posición
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            // Resuelve la promesa con un array [latitud, longitud]
            resolve([lat, lon]);
        };

        // Función de error que se llama cuando ocurre un problema al obtener la ubicación
        const error = (msg) => {
            // Rechaza la promesa con el mensaje de error proporcionado
            reject(msg);
        };

        // Obtener la ubicación actual del usuario utilizando el objeto navigator.geolocation
        navigator.geolocation.getCurrentPosition(success, error, options);
    });
}

const getData = async (url) => {
    let data = await fetch(url)
    let restaurants = await data.json()
    return restaurants
}

window.addEventListener('DOMContentLoaded', async () => {
    // const current = await getGeoLocation();
    const restaurants = await getData('restaurants.json');
    const beaches = await getData('beachs.json')
    const prueba = await getData('playas.json')
    console.log(prueba)
    // console.log(typeof restaurants)
    
    let map = L.map('map').setView([43.379055,-5.865849],15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([43.379055,-5.865849]).addTo(map).bindPopup("Naranco")
    for(let clave in restaurants){
    L.marker([restaurants[clave]['lat'],restaurants[clave]['lon']],{icon: myIcon}).addTo(map)
    .bindPopup(`${restaurants[clave]['name']} <br> <a href="${restaurants[clave]['web']}" target="_blank">${restaurants[clave]['name']}</a>`)
    
    }
    for(let clave in prueba){
        L.marker([prueba[clave]['coord_y'],prueba[clave]['coord_x']],{icon: myIconBeach}).addTo(map)
        .bindPopup(`${prueba[clave]['nombre']} <br> ${prueba[clave]['municipio']}`)
        
        }

})
// 43.41838996896437, -5.193123562254709
/*Usando Google: 

L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,  // Nivel máximo de zoom
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],  // Subdominios de Google Maps
    attribution: '© Google Maps' 
}).addTo(map);*/

// var map = L.map('map').setView([51.505, -0.09], 13);



