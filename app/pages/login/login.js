import {Page, NavController} from 'ionic/ionic';
import {Http} from 'angular2/http';
import {Despacho} from '../despacho/despacho';

@Page({
	templateUrl: 'build/pages/login/login.html'
})

export class Login{
	constructor(http: Http, nav: NavController){
		this.http = http;
		this.nav=nav;
	}
	login(event, username, password) {
		event.preventDefault();

		this.http.post("http://localhost:3000/api/usuario/"+username+"/"+password)
        .subscribe(data => {
        	let data = data.json();
            sessionStorage.setItem('token', data.token);
			sessionStorage.setItem('usuario', data.usuario._id);
	        this.nav.setRoot(Despacho);
        }, error => {
            alert(error);
        });
	}
}