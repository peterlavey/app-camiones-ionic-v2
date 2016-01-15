import {App, Platform, Config, StatusBar} from 'ionic/ionic';
import {Login} from './pages/login/login';
import {Headers} from 'angular2/http';

@App({
  templateUrl: 'build/app.html',
  // Check out the config API docs for more info
  // http://ionicframework.com/docs/v2/api/config/Config/
  config: {}
})
export class MyApp {
  constructor(platform: Platform) {
    this.root = Login;
   
    platform.ready().then(() => {
      //StatusBar.setStyle(StatusBar.DEFAULT);
    });
  }
}
