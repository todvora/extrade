import React, {findDOMNode} from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import '../styles/LeafletMap.less';
import countries from '../resources/countries.geojson';

export default class LeafletMap extends React.Component {

  constructor(props) {
    super();
    this.createCountriesLayer = this.createCountriesLayer.bind(this);
    this.updateLayer = this.updateLayer.bind(this);
  }

  createCountriesLayer(info, visible) {

    const styleFunction = function(feature) {
      return {
        color: "#ff7800",
        weight: 1,
        opacity: 0.65
      }
    };

    const onLeaveArea = function(event) {
      this.layer.resetStyle(event.target);
      info.update('<h4>Zvolte myší oblast...</h4>');
    }.bind(this);

    const onEnterArea = function(feature, event) {
       var layer = event.target;

       layer.setStyle({
            weight: 4
       });

        info.update(this.props.infoboxRenderer(feature, event));
    };

    const onEachFeature = function(feature, layer) {
        layer.on({
          mouseover : onEnterArea.bind(this, feature),
          mouseout: onLeaveArea
        });
    }.bind(this)


    const featureFilter = function(feature, layer) {
        return visible.indexOf(feature.properties.iso_a2) !== -1;
    }

    this.layer = L.geoJson(countries, {style: styleFunction,  onEachFeature: onEachFeature, filter: featureFilter});

    return this.layer;
  }

  updateLayer(map, info, countries) {
    if(typeof this.layer !== 'undefined') {
      map.removeLayer(this.layer);
    }
    var layer = this.createCountriesLayer(info, countries);
    layer.addTo(map);
  }

  componentWillReceiveProps(newProps) {
    this.updateLayer(this.map, this.info, newProps.countries);
  }

  componentDidMount() {

    const self = this;

    var map = this.map = L.map(findDOMNode(this.refs.map), {
      minZoom: 2,
      maxZoom: 20,
      layers: [
        L.tileLayer(
         'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
         {attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'})
      ],
        attributionControl: false,
    });

    var info = L.control({position:'bottomright'});
    var infoElement = L.DomUtil.create('div', 'info');

    info.onAdd = function (map) {
        info.update('<h4>Zvolte myší oblast...</h4>');
        return infoElement;
    };

    info.update = function (rawHtml) {
        infoElement.innerHTML = rawHtml;
    };

    info.addTo(map);
    this.info = info;

    map.fitWorld();
    this.updateLayer(map, info, this.props.countries);
  }

  componentWillUnmount() {
         this.map.off('click', this.onMapClick);
         this.map = null;
  }

  render() {
     return (
         <div className='map' ref='map'></div>
     );
  }
}

Map.propTypes = {
  countries: React.PropTypes.array.isRequired,
  infoboxRenderer: React.PropTypes.func.isRequired
};