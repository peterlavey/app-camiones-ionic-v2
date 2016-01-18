import {Page, NavParams, Geolocation} from 'ionic/ionic';

@Page({
  	templateUrl: 'build/pages/map/map.html',
})
export class Map {
  	constructor(navParams:NavParams) {
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
     /* let destroyer = document.getElementById("map") || document.createElement('div');
      destroyer.remove();
      let wrapper = document.getElementById("wrapper");
      let node = document.createElement('div');     
      node.setAttribute('id', 'map');    
      node.setAttribute('style', 'width: 100%;height: 100%;');  
      wrapper.appendChild(node);                             
*/
      let map = new google.maps.Map(document.getElementById("map"), mapOptions);
	  }
    /*addMarker(){
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
    }*/
}
