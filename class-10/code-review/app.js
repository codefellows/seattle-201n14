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

  var tdEl = document.createElement('td');
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);
  
  for (var i = 0; i < hours.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = this.totalDailyCookies;
  trEl.appendChild(tdEl);
}

var pike = new CookieStand('Pike Place Market', 23, 65, 6.3, 'pike');
new CookieStand('SeaTac Airport', 3, 24, 1.2, 'seatac');
new CookieStand('Seattle Center', 11, 38, 3.7, 'seattlecenter');
new CookieStand('Capitol Hill', 20, 38, 2.3, 'caphill');
new CookieStand('Alki', 2, 16, 4.6, 'alki');


function handleForm(e){
  e.preventDefault();

  var loc = e.target.locName.value;
  var min = parseInt(e.target.min.value);
  var max = parseInt(e.target.max.value);
  var avg = parseFloat(e.target.avg.value);

  for (var i = 0; i < allStores.length; i++){
    if(loc === allStores[i].locationName) {
      // reassigning the starter properties
      allStores[i].minCustomersPerHour = min;
      allStores[i].maxCustomersPerHour = max;
      allStores[i].avgCookiesPerSale = avg;

      // zeroing out the results of our calculations
      allStores[i].customersEachHour = [];
      allStores[i].totalDailyCookies = 0;
      allStores[i].cookiesEachHour = [];

      // doing the calculations
      allStores[i].calcCookiesEachHour();
      clearForm();
      renderTable();
      return;
    }
  }

  new CookieStand(loc, min, max, avg);

  function clearForm() {
    e.target.locName.value = null;
    e.target.min.value = null;
    e.target.max.value = null;
    e.target.avg.value = null;
    CookieStand.renderTable();
  }
}

function makeHeaderRow() {
  var trEl = document.createElement('tr');

  var thEl = document.createElement('th');
  thEl.textContent = 'Locations';
  trEl.appendChild(thEl);

  for (var i = 0; i < hours.length; i++) {
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  
  var thEl = document.createElement('th');
  thEl.textContent = 'Location Totals';
  trEl.appendChild(thEl);

  tableEl.appendChild(trEl);
}

function makeFooterRow() {
  var trEl = document.createElement('tr');
  
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Hourly Totals for All Locations';
  trEl.appendChild(tdEl);

  var totalOfTotals = 0;
  var hourlyTotal = 0;

  for (var i = 0; i < hours.length; i++) {
    hourlyTotal = 0;
    for (var j = 0; j < allStores.length; j++){
      hourlyTotal += allStores[j].cookiesEachHour[i];
      totalOfTotals += allStores[j].cookiesEachHour[i];
    }

    var tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotal;
    trEl.appendChild(tdEl);
  }

  var tdEl = document.createElement('td');
  tdEl.textContent = totalOfTotals;
  trEl.appendChild(tdEl);

  tableEl.appendChild(trEl);
}

function renderTable() {
  tableEl.innerHTML = '';

  makeHeaderRow();

  for(var i = 0; i < allStores.length; i++){
    allStores[i].render();
  }

  makeFooterRow();
}

formEl.addEventListener('submit', handleForm);

renderTable();

