import {Http, HTTP_BINDINGS} from 'angular2/http';
import {Injectable} from 'angular2/core';

var Rx = require('rx-dom');
@Injectable()
export class DataService{


	http;
	
	constructor(http: Http) {
			this.http = http;
	}

	getObjervable(query:string){
		var url = 'http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(query)
	 				+ '&callback=JSONPCallback';
		return Rx.DOM.jsonpRequest(url);
		// return this.http.get(this.url)
  //             .map(res => res.json()['data'])
       
	}


	getData(jsonData){
		return jsonData['data'];
	}


}