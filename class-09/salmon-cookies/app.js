'use strict';

// hours array
var hours = ['6am', '7am', '8am', '9am'];
// a var to hold the table
var tableEl = document.getElementById('table');
var formEl = document.getElementById('form');
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
  var trEl = document.createElement('tr');

  var tdEl = document.createElement('td');
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);

  for(var i = 0; i < hours.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesPerHour[i];
    trEl.appendChild(tdEl);
  }

  var thEl = document.createElement('th');
  thEl.textContent = this.dailyTotal;
  trEl.appendChild(thEl);

  tableEl.appendChild(trEl);
}

var pike = new Stores('Pike', 1, 10, 100);
pike.calcCookiesPerHour();

// helper functions
  // render table data
  // render footer
    // nested for loop
function random(min, max){
  return Math.ceil(Math.random() * (max - min +1) + min);
}

function renderHeader(){
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  // store name cell
  var thEl = document.createElement('th');
  thEl.textContent = 'Locations';
  trEl.appendChild(thEl);

  for(var i = 0; i < hours.length; i++){
    // create an element
    var thEl = document.createElement('th');
    // add content
    var text = document.createTextNode(`${hours[i]}`);
    // attach to parent
    thEl.appendChild(text);
    trEl.appendChild(thEl);

  }
}

function renderAllStores(){
  for(var i = 0; i < allStores.length; i++){
    allStores[i].render();
  }
}

function renderFooter(){
  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  
  var tdEl = document.createElement('td');
  tdEl.textContent = "Hourly Sales";
  trEl.appendChild(tdEl);

  for(var i = 0; i < hours.length; i++){
    var hourlyTotal = 0;
    for(var j = 0; j < allStores.length; j++){
      hourlyTotal = hourlyTotal + allStores[j].cookiesPerHour[i];
    }
    tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotal;
    trEl.appendChild(tdEl);
  }

}

function handleSubmit(event){
  event.preventDefault();

  var name = event.target.storeName.value;
  var min = Number(event.target.storeMin.value);
  var max = Number(event.target.storeMax.value);
  var average = Number(event.target.average.value);

  new Stores(name, min, max, average);

  tableEl.innerHTML = '';

  renderHeader();
  renderAllStores();
  renderFooter();
  
}

// event listener
formEl.addEventListener('submit', handleSubmit);


// render the table
renderHeader();
renderAllStores();
renderFooter();