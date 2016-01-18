import {Page, NavController, NavParams, Geolocation} from 'ionic/ionic';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Despacho} from '../despacho/despacho';
import {Map} from '../map/map';

@Page({
  	templateUrl: 'build/pages/despacho-detalle/despacho-detalle.html',
})
export class DespachoDetalle {
  	constructor(nav:NavController, navParams:NavParams, http:Http, options:RequestOptions) {
  		this.nav=nav;
  		this.navParams=navParams;
  		this.http=http;

  		this.headers=new Headers();
    	this.headers.append('Content-Type':'application/json');
    	this.headers.append('Accept':'application/json');

    	this.http._defaultOptions.headers._headersMap=this.headers;

  		this.despacho=navParams.get('despacho');
  		this.nombreEstado=["Terminado!", "En camino", "Esperando...", "Despachando", "Terminado!"];
  	}
  	listaDespachos(){
  		this.nav.push(Despacho);
  	}
  	cambiarEstado(){
  		if(this.despacho.estado<5){
			this.despacho.estado++;
		}
		let body=JSON.stringify(this.despacho);
		this.http.put('http://peaceful-wildwood-5772.herokuapp.com/api/despacho/'+this.despacho._id, body)
	    .subscribe(data => {
	    	let data = data.json();
	      	this.despacho=data;
	    }, error => {
	        console.error(error);
	    });
  	}
    viewMap(){
      this.nav.push(Map, {
        despacho: this.despacho
      });
    }
}
