import {Component} from 'angular2/core';
import {AutoComplete} from '../component/auto-complete.component' ;
import {DataService} from './DataService' ;


@Component({

  selector: 'my-app',
  template: '<auto-complete [data]=model minSearchChar=2 [asyncLoading]=false [searchCallback]="onSearchQuery"' +
  '(selectCallback)="onSelectHandler($event)"  displayField="name" [results]=results></auto-complete>',
  directives:[AutoComplete]
})

export class AppComponent{
	
  sourceUrl = "/app/data/data.json" ;

  model =[
  	{"id":1,"name":"Red"},
  	{"id":2,"name":"Orange"},
  	{"id":3,"name":"Greeen"}
  ];
  results = [];
  static dataService;

  constructor(dataService:DataService){
      AppComponent.dataService = dataService;
  }

  onSelectHandler(item){
    console.log("Item selected is ",item);
  }

  onSearchQuery(item){
    
    return AppComponent.dataService.getObjervable(item);
    
  }


}