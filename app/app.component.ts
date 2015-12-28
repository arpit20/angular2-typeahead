import {Component} from 'angular2/core';
import {AutoComplete} from './auto-complete.component' ;


@Component({
	
	selector:'my-app',
	template:'<auto-complete [data]=model minSearchChar=2 [onSelectCallback]=onSelectHandler displayField="name"></auto-complete>',
	directives:[AutoComplete]
})

export class AppComponent{
	
  sourceUrl = "/app/data/data.json" ;

  model =[
  	// {"id":1,"name":"Red"},
  	// {"id":2,"name":"Orange"},
  	// {"id":3,"name":"Greeen"}
  ];


  onSelectHandler(item){
    console.log("Item selected is ",item);
  }

}