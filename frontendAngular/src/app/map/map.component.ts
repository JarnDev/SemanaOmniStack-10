import { Component, OnInit } from '@angular/core';

import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat, toLonLat } from 'ol/proj.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import Overlay from 'ol/Overlay';
import Select from 'ol/interaction/Select';

import { Dev_apiService } from '../services/dev_api.service'

// declare var $: any;
let clickEvent = new BehaviorSubject(null)
var selectSingleClick = new Select()
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private view: View;
  private map: Map;
  private OSMLayer = new TileLayer({
    source: new OSM(),
  });
  element = document.getElementById('popup')
  private popup = new Overlay({
    element: this.element,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -50]
  });

  techs: string = '';

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        resolve([resp.coords.longitude, resp.coords.latitude]);
      },
        err => {
          reject(err);
        });
    });

  }



  constructor(private api_service: Dev_apiService) { }
  ngOnInit() {

    this.getPosition().then(pos => {
      this.setMap(pos)
      this.map.addInteraction(selectSingleClick);
      selectSingleClick.on('select', function (e) {
        if (!e.selected[0]) {
          return
        }
        let gitHub = e.selected[0].get('gitHub')
        let url = `https://github.com/${gitHub}`
        window.open(url, "_blank");
        selectSingleClick.getFeatures().clear();
      });
    })
  }



  setMap(startView) {
    this.view = new View({
      center: fromLonLat(startView),
      zoom: 15
    });
    this.map = new Map({
      target: 'map',
      layers: [this.OSMLayer],
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: false,
      view: this.view
    });
    this.map.addOverlay(this.popup)
  }

  getDev() {
    this.clearMap()
    let pos = toLonLat(this.map.getView().getCenter())
    this.api_service.getDev(pos, this.techs).subscribe(devs => {
      for (let dev in devs) {
        this.showDev(devs[dev])
      }
    })

  }

  showDev(dev) {
    var iconFeature = new Feature({
      geometry: new Point(fromLonLat(dev.location.coordinates)),
      population: 4000,
      rainfall: 500,
      gitHub: dev.github_username
    });

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0, 0],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: dev.avatar_url,
        scale: 0.1
      })
    });

    iconFeature.setStyle(iconStyle);

    var vectorSource = new VectorSource({
      features: [iconFeature]
    });

    var vectorLayer = new VectorLayer({
      source: vectorSource,
      name: 'Devs',
    });

    this.map.addLayer(vectorLayer)
  }

  async clearMap() {
    while (true) {
      let exit = true
      let layers = await this.map.getLayers().getArray()
      for (let layer in layers) {
        if (layers[layer].get('name') === "Devs") {
          exit = false
          await this.map.removeLayer(layers[layer])
        }
      }
      if (exit) {
        return
      }
    }
  }
}
