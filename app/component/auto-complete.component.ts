import {Component, Input, Output, Inject, EventEmitter} from 'angular2/core';


var $ = require('jquery');
var Rx = require('rx-dom');

@Component({
    selector: 'auto-complete',
    templateUrl: '/app/template/autoComplete.html'
})
export class AutoComplete { 

  @Input() data ;
  @Input() results ;
  @Input() minSearchChar;
  @Input() searchCallback;
  @Input() displayField;
  @Input() asyncLoading;


  @Output() selectCallback: EventEmitter<any> = new EventEmitter();
  
  
  query = "";
  throttledInput;

  constructor() {}

  ngOnInit() {
 
    
    var self = this;
    var textInput = document.querySelector('input[type="text"]');
    var throttledInput = Rx.DOM.keyup(textInput)
      .pluck('target', 'value')
      .filter(function(text) {
      return text.length > self.minSearchChar;
      })
      .debounce(500)
      .distinctUntilChanged()
    
    if (this.asyncLoading) {
      var suggestions = throttledInput.flatMapLatest(this.searchCallback);


          suggestions.subscribe(
        function(data) {
          self.formatResults(data.response[1]);
          $('.dropdown-menu').show();
        },
        function(err) {
          console.log(err);
        }
          );
    } else if(this.data){ //static data search
        throttledInput.subscribe(
         function(data){
           self.getSearchResults(data);
           $('.dropdown-menu').show();
      },
      function(err){
          console.log(err);
        })
    }

  }

  private formatResults(results){

    if (this.displayField) {
      this.results = results.map( (item) => item[this.displayField] );
    }
    else
      this.results = results;

  }


  emptyResults(){
    this.results = [];
  }

  selectItem(item) {

    this.selectCallback.emit(item);
    this.hideDropdownMenu();
    this.emptyResults();
  }

  getSearchResults(query){
  	
  	  var self = this;	
  	  this.results=[];
  	  this.data.forEach(function(item){
	      	if(item[self.displayField].toLowerCase().indexOf(query.toLowerCase())>=0)
	      		self.results.push(item[self.displayField]);
    	});  

  	
  }

  hideDropdownMenu(){
      $('.dropdown-menu').hide(); 
  }

  

}