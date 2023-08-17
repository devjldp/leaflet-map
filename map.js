let restaurantIcon = L.icon({
    iconUrl: './icons/gourmet_0star.png',
    iconSize:     [40, 40], 
    iconAnchor:   [20, 0], 
    popupAnchor:  [0,0] 
});

let beachIcon = L.icon({
    iconUrl: './icons/beach_icon.png',
    iconSize:     [40, 40], 
    iconAnchor:   [20, 0], 
    popupAnchor:  [0, 0] 
});

let museumIcon = L.icon({
    iconUrl: './icons/museum.png',
    iconSize:     [40, 40], 
    iconAnchor:   [20, 0], 
    popupAnchor:  [0, 0] 
});

let currentPositionIcon = L.icon({
    iconUrl: './icons/posicion.png',
    iconSize:     [40, 40], 
    iconAnchor:   [20, 0], 
    popupAnchor:  [0, 0]
})
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
    const restaurants = await getData('./json/food.json');
    const beaches = await getData('./json/beachs.json');
    const museums = await getData('./json/museums.json');

    const position = await getGeoLocation();
    // console.log(prueba)
    // console.log(typeof restaurants)

    let map = L.map('map').setView([position[0],position[1]],16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.marker([position[0],position[1]], {icon: currentPositionIcon}).addTo(map)
    let group = []
    for(let clave in restaurants){
        if(restaurants[clave]['web'] !=''){
            
            if(restaurants[clave]['stars'] == 2){
                console.log(restaurants[clave]['stars'])
                restaurantIcon = L.icon({ iconUrl: './icons/gourmet_2stars.png' });
            } else if(restaurants[clave]['stars'] == 1) {
                restaurantIcon = L.icon({ iconUrl: './icons/gourmet_1star.png' });
            } else if(restaurants[clave]['stars'] == 0){
                restaurantIcon = L.icon({ iconUrl: './icons/gourmet_0star.png' });
            }
            group.push(L.marker([restaurants[clave]['lat'],restaurants[clave]['lon']], {icon: restaurantIcon}).addTo(map)
        .bindPopup(`${restaurants[clave]['name']} </br> ${restaurants[clave]['location']} </br> <a href="${restaurants[clave]['web']}" target="_blank">${restaurants[clave]['name']}</a>`))
        } else{
            restaurantIcon = L.icon({ iconUrl: './icons/gourmet_0star.png' });
            group.push(L.marker([restaurants[clave]['lat'],restaurants[clave]['lon']], {icon: restaurantIcon}).addTo(map)
        .bindPopup(`${restaurants[clave]['name']} </br> ${restaurants[clave]['location']}`))
        }
        
    }
    let restaurantLayer = L.layerGroup(group)
    group = []
    for(let clave in beaches){
        group.push(L.marker([beaches[clave]['lat'],beaches[clave]['lon']], {icon: beachIcon}).addTo(map)
        .bindPopup(`${beaches[clave]['name']} </br> `))
    }
    let beachLayer = L.layerGroup(group) 
    group = []
    for(let clave in museums){
        group.push(L.marker([museums[clave]['lat'],museums[clave]['lon']], {icon: museumIcon}).addTo(map)
        .bindPopup(`${museums[clave]['name']} </br> `))
    }
    let museumLayer = L.layerGroup(group) 
    //Add legend

    L.control.Legend({
        position: "bottomright",
        collapsed: true,
        column: 1,
        legends: [{
            label: "Restaurant",
            type: "image",
            url: "./icons/gourmet_0star.png",
            layers: [restaurantLayer],
            inactive: false
        },
        { label: "Beach",
        type: "image",
        url: "./icons/beach_icon.png",
        layers: beachLayer,
        inactive: false
    },
    { label: "Museum",
    type: "image",
    url: "./icons/museum.png",
    layers: museumLayer,
    inactive: false
}]
    }).addTo(map);
    // Add markers to restaurants

    /*
    L.marker([43.379055,-5.865849]).addTo(map).bindPopup("Naranco")
    for(let clave in restaurants){
    L.marker([restaurants[clave]['lat'],restaurants[clave]['lon']],{icon: myIcon}).addTo(map)
    .bindPopup(`${restaurants[clave]['name']} <br> <a href="${restaurants[clave]['web']}" target="_blank">${restaurants[clave]['name']}</a>`)
    
    }
    for(let clave in prueba){
        L.marker([prueba[clave]['coord_y'],prueba[clave]['coord_x']],{icon: myIconBeach}).addTo(map)
        .bindPopup(`${prueba[clave]['nombre']} <br> ${prueba[clave]['municipio']}`)
        
        }*/

})
// 43.41838996896437, -5.193123562254709
/*Usando Google: 

L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,  // Nivel máximo de zoom
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],  // Subdominios de Google Maps
    attribution: '© Google Maps' 
}).addTo(map);*/

// var map = L.map('map').setView([51.505, -0.09], 13);



