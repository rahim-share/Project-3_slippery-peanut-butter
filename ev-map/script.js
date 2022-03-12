var map = L.map('map', {
    'center': [0, 0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'attribution': 'Map data &copy; OpenStreetMap contributors'
        })
    ]
});

var geojsonData = {
    "type": "FeatureCollection",
    "features": []
};

map.on("mousedown", function (event) {
    if (event.originalEvent.srcElement.src === "http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/images/marker-icon-2x.png") {

        let minDistances = [];
        let make;
        let model;
        let electricVehicleType;

        for (feature of geojsonData.features) {

            let lng = Math.abs(feature.geometry.coordinates[0]);
            let lat = Math.abs(feature.geometry.coordinates[1]);

            let clickedLng = Math.abs(event.latlng.lng);
            let clickedLat = Math.abs(event.latlng.lat);

            let minLng = Math.abs(clickedLng - lng);
            let minLat = Math.abs(clickedLat - lat);

            if(minDistances.length === 0) {
                minDistances.push(minLng);
                minDistances.push(minLat);
                make = data.filter(row => row.latitude === lat.toString())[0].make;
                model = data.filter(row => row.latitude === lat.toString())[0].model;
                electricVehicleType = data.filter(row => row.latitude === lat.toString())[0].electric_vehicle_type;
            } else {
                if (minLng < minDistances[0] && minLat < minDistances[1]) {
                    minDistances[0] = minLng;
                    minDistances[1] = minLat;
                    make = data.filter(row => row.latitude === lat.toString())[0].make;
                    model = data.filter(row => row.latitude === lat.toString())[0].model;
                    electricVehicleType = data.filter(row => row.latitude === lat.toString())[0].electric_vehicle_type;
                }
            }
        }

        L.popup()
            .setLatLng(event.latlng)
            .setContent(`The car make: ${make}, the car model: ${model}, the electric vehicle type: ${electricVehicleType}`)
            .openOn(map);
    }
});

async function loadCSV(file) {
    return await d3.csv(file);
}

var data = [];
loadCSV("Electric_Vehicle_Population_Data.csv")
    .then(csvData => {
        // iterate just 100 times because if using data.length the app will crash
        // if you want to filter by state it would be ideal to have more than one state
        // you can loop up to 370 and you will have two states but the performance of the app will decrease
        for (let i = 0; i < 365; i++) {
            let point = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: []
                }
            };
            if (csvData[i]["latitude"] && csvData[i]["longitude"]) {
                point.geometry.coordinates.push(parseFloat(csvData[i]["longitude"]));
                point.geometry.coordinates.push(parseFloat(csvData[i]["latitude"]));
                geojsonData.features.push(point);
                data.push(csvData[i]);
            }
        }
        var geojsonLayer = L.geoJson(geojsonData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    });

let zipCode = document.getElementById("zipCode");
let state = document.getElementById("state");
let city = document.getElementById("city");



zipCode.addEventListener('keyup', () => {
    //98109
    let filteredData = data;
    geojsonData.features = [];

    let zipCodeValue = zipCode.value;
    let stateValue = state.value;
    let cityValue = city.value;

    if (zipCodeValue) {
        filteredData = data.filter(row => row.zip_Code === zipCodeValue);
    }

    if (stateValue) {
        filteredData = data.filter(row => row.state === stateValue);
    }

    if (cityValue) {
        filteredData = data.filter(row => row.city === cityValue);
    }

    for (let i = 0; i < filteredData.length; i++) {
        let point = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: []
            }
        };
        if (filteredData[i]["latitude"] && filteredData[i]["longitude"]) {
            point.geometry.coordinates.push(parseFloat(filteredData[i]["longitude"]));
            point.geometry.coordinates.push(parseFloat(filteredData[i]["latitude"]));
            geojsonData.features.push(point);
        }
    }

    if (geojsonData.features.length > 0) {
        var geojsonLayer = L.geoJson(geojsonData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    } else {
        for (let i = 0; i < data.length; i++) {
            let point = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: []
                }
            };
            if (data[i]["latitude"] && data[i]["longitude"]) {
                point.geometry.coordinates.push(parseFloat(data[i]["longitude"]));
                point.geometry.coordinates.push(parseFloat(data[i]["latitude"]));
                geojsonData.features.push(point);
            }
        }
        var geojsonLayer = L.geoJson(geojsonData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    }
});

state.addEventListener('keyup', () => {
    //WA
    let filteredData = data;
    geojsonData.features = [];

    let zipCodeValue = zipCode.value;
    let stateValue = state.value;
    let cityValue = city.value;

    if (zipCodeValue) {
        filteredData = data.filter(row => row.zip_Code === zipCodeValue);
    }

    if (stateValue) {
        filteredData = data.filter(row => row.state === stateValue);
    }

    if (cityValue) {
        filteredData = data.filter(row => row.city === cityValue);
    }

    for (let i = 0; i < filteredData.length; i++) {
        let point = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: []
            }
        };
        if (filteredData[i]["latitude"] && filteredData[i]["longitude"]) {
            point.geometry.coordinates.push(parseFloat(filteredData[i]["longitude"]));
            point.geometry.coordinates.push(parseFloat(filteredData[i]["latitude"]));
            geojsonData.features.push(point);
        }
    }

    if (geojsonData.features.length > 0) {
        var geojsonLayer = L.geoJson(geojsonData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    } else {
        for (let i = 0; i < data.length; i++) {
            let point = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: []
                }
            };
            if (data[i]["latitude"] && data[i]["longitude"]) {
                point.geometry.coordinates.push(parseFloat(data[i]["longitude"]));
                point.geometry.coordinates.push(parseFloat(data[i]["latitude"]));
                geojsonData.features.push(point);
            }
        }
        var geojsonLayer = L.geoJson(geojsonData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    }
});

city.addEventListener('keyup', () => {
    //SEATTLE
    let filteredData = data;
    geojsonData.features = [];

    let zipCodeValue = zipCode.value;
    let stateValue = state.value;
    let cityValue = city.value;

    if (zipCodeValue) {
        filteredData = data.filter(row => row.zip_Code === zipCodeValue);
    }

    if (stateValue) {
        filteredData = data.filter(row => row.state === stateValue);
    }

    if (cityValue) {
        filteredData = data.filter(row => row.city === cityValue);
    }

    for (let i = 0; i < filteredData.length; i++) {
        let point = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: []
            }
        };
        if (filteredData[i]["latitude"] && filteredData[i]["longitude"]) {
            point.geometry.coordinates.push(parseFloat(filteredData[i]["longitude"]));
            point.geometry.coordinates.push(parseFloat(filteredData[i]["latitude"]));
            geojsonData.features.push(point);
        }
    }

    if (geojsonData.features.length > 0) {
        var geojsonLayer = L.geoJson(geojsonData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    } else {
        for (let i = 0; i < data.length; i++) {
            let point = {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: []
                }
            };
            if (data[i]["latitude"] && data[i]["longitude"]) {
                point.geometry.coordinates.push(parseFloat(data[i]["longitude"]));
                point.geometry.coordinates.push(parseFloat(data[i]["latitude"]));
                geojsonData.features.push(point);
            }
        }
        var geojsonLayer = L.geoJson(geojsonData).addTo(map);
        map.fitBounds(geojsonLayer.getBounds());
    }
});


