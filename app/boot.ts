import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './demo/app.component';
import {DataService} from './demo/DataService' ;



function main() {
  return bootstrap(AppComponent, [
    // These are dependencies of our App
  	HTTP_PROVIDERS,DataService
  ])
  
}

document.addEventListener('DOMContentLoaded', main);