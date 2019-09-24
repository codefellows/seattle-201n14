'use strict';

// hours array
var hours = ['6am', '7am', '8am', '9am'];

// an array to hold the store objects
var allStores = [];

function Stores(name, min, max, averageCookies){
  this.name = name;
  this.min = min;
  this.max = max;
  this.averageCookies = Number(averageCookies);
  this.customersPerHour = [];
  this.cookiesPerHour = [];
  this.dailyTotal = 0;

  allStores.push(this);
}


// prototypes
  // calculate the number of customers per hour
  // calculate the cookies sold per hour
Stores.prototype.calcCustomersPerHour = function(){
  for(var i = 0; i < hours.length; i++){
    this.customersPerHour.push(random(this.min, this.max))

  }
}

Stores.prototype.calcCookiesPerHour = function(){
  this.calcCustomersPerHour();

  for(var i = 0; i < hours.length; i++){
    var oneHour = this.customersPerHour[i] * this.averageCookies;

    this.cookiesPerHour.push(oneHour);

    this.dailyTotal += oneHour;
  }
}

Stores.prototype.render = function(){
  this.calcCookiesPerHour();
  
  $('#table').append('<tr>');
  $('tr:last-child').append(`<td>${this.name}</td>`);
  
  for(var i = 0; i < hours.length; i++){
    console.log('in the render function', i, this.cookiesPerHour[i]);
    $('tr:last-child').append(`<td>${this.cookiesPerHour[i]}</td>`);
  }
  
  $('tr:last-child').append(`<th>${this.dailyTotal}</th>`);
}

var pike = new Stores('Pike', 1, 10, 100);
new Stores('Bob', 4, 10, 4);

function random(min, max){
  return Math.ceil(Math.random() * (max - min +1) + min);
}

function renderHeader(){
  $('#table').append('<tr>');

  $('tr').append(`<th>Locations</th>`);

  for(var i = 0; i < hours.length; i++){
    $('tr').append(`<th>${hours[i]}</th>`);
  }
}

function renderAllStores(){
  for(var i = 0; i < allStores.length; i++){
    allStores[i].render();
  }
}

function renderFooter(){
  $('#table').append('<tr>');

  $('tr:last-child').append(`<td>Hourly Sales</td>`);

  for(var i = 0; i < hours.length; i++){
    var hourlyTotal = 0;
    for(var j = 0; j < allStores.length; j++){
      hourlyTotal = hourlyTotal + allStores[j].cookiesPerHour[i];
    }

    $('tr:last-child').append(`<td>${hourlyTotal}</td>`);
  }

}

function handleSubmit(event){
  event.preventDefault();

  var name = event.target.storeName.value;
  var min = Number(event.target.storeMin.value);
  var max = Number(event.target.storeMax.value);
  var average = Number(event.target.average.value);

  new Stores(name, min, max, average);

  $('#table').html('');

  renderHeader();
  renderAllStores();
  renderFooter();
  
}

// event listener
$('#form').bind('submit', handleSubmit);


// render the table
renderHeader();
renderAllStores();
renderFooter();