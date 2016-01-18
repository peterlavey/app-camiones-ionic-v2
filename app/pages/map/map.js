import {Page, NavController, NavParams, Geolocation} from 'ionic/ionic';
import {DespachoDetalle} from '../despacho-detalle/despacho-detalle';

@Page({
  	templateUrl: 'build/pages/map/map.html',
})
export class Map {
  	constructor(nav:NavController, navParams:NavParams) {
  		this.nav=nav;
  		this.navParams=navParams;
  		this.map = null;

      this.despacho = navParams.get('despacho')

      this.loadMap();
  	}
  	loadMap(){
      let latLng = new google.maps.LatLng(this.despacho.direccion.lat, this.despacho.direccion.lon);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
	  }
    addMarker(){
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });    
      let content = "<h4>Information!</h4>";             
      this.addInfoWindow(marker, content);    
    }
    addInfoWindow(marker, content){
      let infoWindow = new google.maps.InfoWindow({
        content: content
      });  
      google.maps.event.addListener(marker, 'click', function(){
        infoWindow.open(this.map, marker);
      });   
    }
    viewDetalleDespacho(){
      this.map={};
      this.nav.push(DespachoDetalle, {
        despacho: this.despacho
      });
    }
}
