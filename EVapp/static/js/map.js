var map = L.map('map', {
    'center': [40.73, -74.0059],
    'zoom': 12,
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

async function loadCSV(file) {
    return await d3.csv(file);
}

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
                minDistances.push([minLng, minLat]);
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

var data = [];
loadCSV("Electric_Vehicle_Population_Data.csv")
    .then(csvData => {
        for (let i = 0; i < 100; i++) {
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


