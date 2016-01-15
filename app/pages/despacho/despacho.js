import {Page, NavController} from 'ionic/ionic';
import {Http} from 'angular2/http';
import {DespachoDetalle} from '../despacho-detalle/despacho-detalle';

@Page({
  	templateUrl: 'build/pages/despacho/despacho.html',
})
export class Despacho {
  	constructor(http:Http, nav:NavController) {
  		this.http=http;
      this.nav=nav;
  		let id=sessionStorage.getItem('usuario');
  		this.http.get('http://localhost:3000/api/usuario/'+id)
      .subscribe(data => {
      	let data = data.json();
      	this.despachos=data;
      }, error => {
          alert(error);
      });

      this.nombreEstado=["Terminado!", "En camino", "Esperando...", "Despachando", "Terminado!"];
  	}
  	seleccionaDespacho(id){
  		this.despacho=this.despachos.filter((despacho)=>{
  			if(despacho._id==id){
  				return despacho;
  			}
  		});
      this.nav.push(DespachoDetalle, {
        despacho: this.despacho
      });
      //this.nav.setRoot(DespachoDetalle);
  	}
}
