import {Page, NavController, NavParams, Geolocation} from 'ionic/ionic';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Despacho} from '../despacho/despacho';

@Page({
  	templateUrl: 'build/pages/despacho-detalle/despacho-detalle.html',
})
export class DespachoDetalle {
  	constructor(nav:NavController, navParams:NavParams, http:Http, options:RequestOptions) {
  		this.nav=nav;
  		this.navParams=navParams;
  		this.http=http;
  		this.map = null;

  		this.headers=new Headers();
    	this.headers.append('Content-Type':'application/json');
    	this.headers.append('Accept':'application/json');

    	this.http._defaultOptions.headers._headersMap=this.headers;

  		let obj=navParams.get('despacho');
  		this.despacho=obj[0];
  		this.nombreEstado=["Terminado!", "En camino", "Esperando...", "Despachando", "Terminado!"];
      this.loadMap();
  	}
  	listaDespachos(){
  		this.nav.push(Despacho);
  	}
  	cambiarEstado(){
  		if(this.despacho.estado<5){
			this.despacho.estado++;
		}
		let body=JSON.stringify(this.despacho);
		this.http.put('http://localhost:3000/api/despacho/'+this.despacho._id, body)
	    .subscribe(data => {
	    	let data = data.json();
	      	this.despacho=data;
	    }, error => {
	        console.error(error);
	    });
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
    /*getGeolaction(){
       let options = {timeout: 10000, enableHighAccuracy: true};
      Geolocation.getCurrentPosition(options).then((position) => {  
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);  
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }  
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);  
      });
    }*/
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
}
