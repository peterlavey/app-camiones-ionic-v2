import {Page} from 'ionic/ionic';
import {Http} from 'angular2/http';

@Page({
  	templateUrl: 'build/pages/despacho/despacho.html',
})
export class Despacho {
  	constructor(http:Http) {
  		this.http=http;
  		let id=sessionStorage.getItem('usuario');
  		this.http.get('http://localhost:3000/api/usuario/'+id)
        .subscribe(data => {
        	let data = data.json();
        	this.despachos=data;
        }, error => {
            alert(error);
        });
  	}
  	seleccionaDespacho(id){
  		this.despacho=this.despachos.filter((despacho)=>{
  			if(despacho._id==id){
  				return despacho;
  			}
  		});
  	}
}
