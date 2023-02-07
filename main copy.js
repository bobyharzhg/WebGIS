const place= ol.proj.fromLonLat([101.438309,0.510440]);

const riauLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'data/Provinsi_Riau.json'
    }),
})

const gambutLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'data/Gambut.json'
  }),
})

const tuplahLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: 'data/TupLah.json'
  }),
})

const hotspotLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'data/TitikHotspotRiau.json'
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

const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),riauLayer, tuplahLayer, hotspotLayer
    ],
    view: new ol.View({
      center: place,
      zoom: 8,
    }),
  });

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