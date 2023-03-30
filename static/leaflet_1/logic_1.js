// create map function
function earthQuake(earthquakes) {

    //adding the base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
      let baseMaps = {
        "maps": street,
      };
      // adding the overlay with features response
      let overlayMaps = {
        earthquackFeatures: earthquakes
      };
      // create the map with base layer and earthquake data
      let emap = L.map("map", {
        center: [
          0, 0
        ],
        zoom: 2,
        layers: [street, earthquakes]
      });
      // adding the layer control Layer Control 
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(emap);
    
      legend.addTo(emap)
    
    }
  // calling the api
 
                  
  d3.json(url).then(function (data) {
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
  
     // adding popup to each layer using onEachfeature method specified for geoJson data
      function onEachFeature(feature, layer){
        layer.bindPopup("<h3> Location: " + feature.properties.place +"</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<br><h3> Magnitude: " + feature.properties.mag +  "</h3>" + "<br><h3> depth: " + feature.geometry.coordinates[2] + "</h3>"); }
  
      // ading the latlng features on each circle
      function circlefeatures(feature, latlng){
         let options = {
          radius:feature.properties.mag*3,
          color: "black",
          fillColor: fill_color(feature.geometry.coordinates[2]),
          weight: 0.25,
          opacity: 100,
          fillOpacity: 1
         } 
         return L.circleMarker(latlng,options);
      }
  //defining the colors for markers used in latlng
  function fill_color(i) {
    if (i>= 90) return "#644D8E";
    else if (i >= 70 && i > 50) return "#8F5A91";  
    else if (i >= 50 && i > 30) return "#C86C8F";
    else if (i >= 30 && i > 10) return "#DC828E";
    else if (i >= 10 && i > -10) return "#EC998D";
    else return "#FFC30F";
  }
  
      // Create a GeoJSON layer containing the features array on the earthquakeData object
      let earthquakes = L.geoJSON(earthquakeData, {
          onEachFeature: onEachFeature,
          pointToLayer: circlefeatures
      });
  
      // Send earthquakes layer to the createMap function - will start creating the map and add features
     earthQuake(earthquakes);
  }
  
  //adding legend characters to the map
  let legend = L.control({position: 'bottomright'});
  legend.onAdd = function(myMap) {
      let div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += "<h4 style='text-align: center'> Earthquake_Depth </h4>";
           grades = [-10,10,30, 50,70,90]  
           colors = ["#FFC30F", "#FF9300", "#FF5733","#C7594B", "#AD3D6F", "#932191"]
      // loop through density intervals
      for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<div><span style="background-color:' + colors[i]  + '"></span><span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+') + '</span></div>';
      }
      return div; };