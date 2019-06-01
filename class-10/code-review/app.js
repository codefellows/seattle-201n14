'use strict';

var allStores = [];
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var tableEl = document.getElementById('table');
var formEl = document.getElementById('form');

function CookieStand(locationName, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerSale) {
  this.locationName = locationName;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;

  allStores.push(this);
}

CookieStand.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

CookieStand.prototype.calcCustomersEachHour = function() {
  for (var i = 0; i < hours.length; i++) {
    this.customersEachHour.push(CookieStand.random(this.minCustomersPerHour, this.maxCustomersPerHour));
  }
};

CookieStand.prototype.calcCookiesEachHour = function() {
  this.calcCustomersEachHour();
  this.totalDailyCookies = 0;
  for (var i = 0; i < hours.length; i++) {
    var oneHour = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerSale);
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

CookieStand.prototype.render = function() {
  this.calcCookiesEachHour();

  var trEl = document.createElement('tr');
  tableEl.appendChild(trEl);

  var tdEl = CookieStand.addElement('td', this.locationName, trEl);
  
  for (var i = 0; i < hours.length; i++) {
    CookieStand.addElement('td', this.cookiesEachHour[i], trEl);
  }

  CookieStand.addElement('td', this.totalDailyCookies, trEl);
}

var pike = new CookieStand('Pike Place Market', 23, 65, 6.3, 'pike');
new CookieStand('SeaTac Airport', 3, 24, 1.2, 'seatac');
new CookieStand('Seattle Center', 11, 38, 3.7, 'seattlecenter');
new CookieStand('Capitol Hill', 20, 38, 2.3, 'caphill');
new CookieStand('Alki', 2, 16, 4.6, 'alki');


function handleForm(e){
  e.preventDefault();

  var loc = e.target.storeName.value;
  var min = parseInt(e.target.min.value);
  var max = parseInt(e.target.max.value);
  var avg = parseFloat(e.target.avg.value);
  
  new CookieStand(loc, min, max, avg);

  function clearForm() {
    e.target.storeName.value = null;
    e.target.min.value = null;
    e.target.max.value = null;
    e.target.avg.value = null;
  }

  clearForm()
  renderTable();
}


function makeHeaderRow() {
  var trEl = CookieStand.addElement('tr', null, tableEl);

  var thEl = CookieStand.addElement('th', 'Locations', trEl);

  for (var i = 0; i < hours.length; i++) {
    CookieStand.addElement('th', hours[i], trEl);
  }
  
  var thEl = CookieStand.addElement('th', 'Location Totals', trEl);
}

function makeFooterRow() {
  var trEl = CookieStand.addElement('tr', null, tableEl);

  var tdEl = CookieStand.addElement('td', 'Hourly Totals for All Locations', trEl);

  var totalOfTotals = 0;
  var hourlyTotal = 0;

  for (var i = 0; i < hours.length; i++) {
    hourlyTotal = 0;
    for (var j = 0; j < allStores.length; j++){
      hourlyTotal += allStores[j].cookiesEachHour[i];
      totalOfTotals += allStores[j].cookiesEachHour[i];
    }

    var tdEl = CookieStand.addElement('td', hourlyTotal, trEl);
  }

  var tdEl = CookieStand.addElement('td', totalOfTotals, trEl);

}

function renderTable() {
  tableEl.innerHTML = '';

  makeHeaderRow();

  for(var i = 0; i < allStores.length; i++){
    allStores[i].render();
  }

  makeFooterRow();
}

CookieStand.addElement = function(element, content, parent){
  var newElement = document.createElement(element); 

  if(content){
    newElement.textContent = content;
  }

  parent.appendChild(newElement);
  return newElement;
}


formEl.addEventListener('submit', handleForm);

renderTable();

