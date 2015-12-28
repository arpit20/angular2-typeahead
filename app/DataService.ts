import {Http, HTTP_BINDINGS} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export class DataService{

	url:String='/app/data/data.json';
	http;

	constructor(http:Http){

		this.http = http;
	}

	getObjervable(query:String){
		 return   this.http.get(this.url)
              .map(res => res.json())
       
	}


	getData(jsonData){
		return jsonData['data'];
	}


}