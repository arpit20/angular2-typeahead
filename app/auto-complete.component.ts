import {Component,Input,Output} from 'angular2/core';
import {DataService} from './DataService' ;

var $ = require('jquery');

@Component({
    selector: 'auto-complete',
    templateUrl: '/app/template/autoComplete.html'
})
export class AutoComplete { 

  @Input() data ;
  @Input() minSearchChar;
  @Input() onSelectCallback;
  @Input() displayField;

  query:any="";
  results;
  dataService;

  constructor(dataService:DataService){

  	this.results = new Array<any>();
  	this.dataService = dataService;
  }

  private getData(){

  	if(this.data && this.data.length>0)
  		 this.showResults(this.data);

  	else {

  		this.dataService.getObjervable(this.query).subscribe(  
  		  data => this.showResults(this.dataService.getData(data)),
          err => console.log('Error while fetching the data')
        );
  	}


  }

  selectItem(item){

  	this.onSelectCallback(item);
  	$('.dropdown-menu').hide(); 
  }

  showResults(sourceData){
  	
  	  var self = this;	
  	  this.results=[];
  	  sourceData.forEach(function(item){
	      	if(item.name.toLowerCase().indexOf(self.query.toLowerCase())>=0)
	      		self.results.push(item);
	});  

  	 $('.dropdown-menu').show(); 
  }
	
  doneTyping($event){

	  if(this.query.length>=this.minSearchChar)
				this.getData();


  }


}