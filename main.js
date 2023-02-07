// const place= ol.proj.fromLonLat([101.438309,0.510440]);

// const riauLayer = new ol.layer.Vector({
//     source: new ol.source.Vector({
//         format: new ol.format.GeoJSON(),
//         url: 'data/Provinsi_Riau.json'
//     }),
// })

// const gambutLayer = new ol.layer.Vector({
//   source: new ol.source.Vector({
//       format: new ol.format.GeoJSON(),
//       url: 'data/Gambut.json'
//   }),
// })

// const tuplahLayer = new ol.layer.Vector({
//   source: new ol.source.Vector({
//       format: new ol.format.GeoJSON(),
//       url: 'data/TupLah.json'
//   }),
// })

// const hotspotLayer = new ol.layer.Vector({
//     source: new ol.source.Vector({
//         format: new ol.format.GeoJSON(),
//         url: 'data/TitikHotspotRiau.json'
//     }),
//     style: new ol.style.Style({
//         image: new ol.style.Icon(({
//             anchor: [0.5,46],
//             anchorXUnits: 'fraticon',
//             anchorYUnits: 'pixels',
//             src: 'icon/icon.png'
//         }))
//     })
// });

var mapView = new ol.View ({
    center: ol.proj.fromLonLat([101.438309,0.510440]),
    zoom: 8
});

var map = new ol.Map ({
    target: 'map',
    view: mapView
});

var osmTile = new ol.layer.Tile ({
    title: 'Open Street Map',
    visible: true,
    source: new ol.source.OSM()
});

map.addLayer(osmTile);

var riauTile = new ol.layer.Vector({
    title: "Provinsi Riau",
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'data/Provinsi_Riau.json',
        visible: true
    })
});

map.addLayer(riauTile);

var tuplahTile = new ol.layer.Vector({
    title: "Daerah Tutup Lahan",
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'data/TupLah.json',
        visible: true
    })
});

map.addLayer(tuplahTile);

var gambutTile = new ol.layer.Vector({
    title: "Daerah Gambut",
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'data/Gambut.json',
        visible: true
    })
});

map.addLayer(gambutTile);

var hotspotTile = new ol.layer.Vector({
    title: "Titik Hotspot",
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'data/TitikHotspotRiau.json',
        visible: true
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon(({
            anchor: [0.5,46],
            anchorXUnits: 'fraticon',
            anchorYUnits: 'pixels',
            src: 'icon/icon.png'
        }))
    })
});

map.addLayer(hotspotTile);

// var IndiaStTile = new ol.layer.Tile({
//     title: "India States",
//     source: new ol.source.TileWMS({
//         url: 'http://localhost:8080/geoserver/GISSimplified/wms',
//         params: {'LAYERS':'GISSimplified:india_st', 'TILED': true},
//         serverType: 'geoserver',
//         visible: true
//     })
// });

// map.addLayer(IndiaStTile);

function toggleLayer(eve) {
    var lyrname = eve.target.value;
    var checkedStatus = eve.target.checked;
    var lyrList = map.getLayers();

    lyrList.forEach(function(element){
        if (lyrname == element.get('title')){
            element.setVisible(checkedStatus);
        }
    });
}

var container = document.getElementById('popup'),
  content_element = document.getElementById('popup-content'),
  closer = document.getElementById('popup-closer');

closer.onClick = function () {
    overlay.setPosition(undefined );
    closer.blur();
    return false;
};

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    offset: [0, -10]
});

map.addOverlay(overlay);
var FullScreen = new ol.control.FullScreen();
map.addControl(FullScreen);

map.on('click', function(evt){
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature,layer){
            return feature;
        });
    
    if (feature){
        var geometry = feature.getGeometry();
        var coord = geometry.getCoordinates();
        var content = "Nama Kabupaten : <h3>"+ feature.get('Kabupaten')+'</h3>';
        content += 'Kecamatan : <b>'+feature.get('Kecamatan')+'</b>';
        content_element.innerHTML = content;

        overlay.setPosition(coord);
        console.info(feature.getProperties());
    }
});


// var geocoder = new Geocoder('nominatim', {
//     provider: 'photon',
//     lang: 'it-IT',
//     placeholder: 'Cari ...',
//     limit: 5,
//     keepOpen: true
//     });
//     map.addControl(geocoder);
//-----------------
// var geocoder = new Geocoder('nominatim', {
//     provider: 'photon',
//     lang: 'it-IT',
//     placeholder: 'Inserisci indirizzo ...',
//     limit: 5,
//     keepOpen: true
// });
// map.addControl(geocoder);

// var addr_popup = new ol.Overlay.Popup();
// map.addOverlay(addr_popup);
// var getf_popup = new ol.Overlay.Popup();
// map.addOverlay(getf_popup);

// geocoder.on('addresschosen', function(evt) {
//     map.getView().setCenter(evt.coordinate)
//     map.getView().setZoom(18)
//     window.setTimeout(function() {
//         addr_popup.show(evt.coordinate, evt.address.formatted);
//     }, 3000);
// });

// var layerSwitcher = new ol.control.LayerSwitcher({
//     tipLabel: 'Legenda' // Optional label for button
// });
// map.addControl(layerSwitcher);

// map.on('singleclick', function(evt) {
//     map_getf.getView().setCenter(ol.proj.transform(map.getView().getCenter(), 'EPSG:3857', ETRS89proj));
//     map_getf.getView().setZoom(map.getView().getZoom());
//     var viewResolution = map_getf.getView().getResolution();
//     var url = parcel_source.getGetFeatureInfoUrl(
//         ol.proj.transform(evt.coordinate, 'EPSG:3857', ETRS89proj), map_getf.getView().getResolution(), ETRS89proj.getCode(), {
//             'INFO_FORMAT': 'text/html',
//             'QUERY_LAYERS': ['CP.CadastralParcel']
//         });
//     if (url) {
//         var xhttp;
//         xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//                 getf_popup.show(evt.coordinate, xhttp.responseText);;
//             }
//         };
//         //bypass cors policy
//         xhttp.open("GET", "https://cors-anywhere.herokuapp.com/" + url, true);
//         xhttp.send();

//     }
// });
