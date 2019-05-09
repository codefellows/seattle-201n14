var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
var theTable = document.getElementById('sales-table');

var allLocations = [];

function CookieStand(locationName, minCustomersPerHour, maxCustomersPerHour, avgCookiesPerSale) {
  this.locationName = locationName;
  this.minCustomersPerHour = minCustomersPerHour;
  this.maxCustomersPerHour = maxCustomersPerHour;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookies = 0;
  allLocations.push(this);
}

CookieStand.prototype.calcCustomersEachHour = function() {
  for (var i = 0; i < hours.length; i++) {
    this.customersEachHour.push(random(this.minCustomersPerHour, this.maxCustomersPerHour));
  }
};

CookieStand.prototype.calcCookiesEachHour = function() {
  this.calcCustomersEachHour();
  for (var i = 0; i < hours.length; i++) {
    var oneHour = Math.ceil(this.customersEachHour[i] * this.avgCookiesPerSale);
    this.cookiesEachHour.push(oneHour);
    this.totalDailyCookies += oneHour;
  }
};

CookieStand.prototype.render = function() {
  this.calcCookiesEachHour();
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);
  for (var i = 0; i < hours.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);
  }
  var thEl = document.createElement('th');
  thEl.textContent = this.totalDailyCookies;
  trEl.appendChild(thEl);
  theTable.appendChild(trEl);
};

new CookieStand('Pike Place Market', 23, 65, 6.3, 'pike');
new CookieStand('SeaTac Airport', 3, 24, 1.2, 'seatac');
new CookieStand('Seattle Center', 11, 38, 3.7, 'seattlecenter');
new CookieStand('Capitol Hill', 20, 38, 2.3, 'caphill');
new CookieStand('Alki', 2, 16, 4.6, 'alki');

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Locations';
  trEl.appendChild(thEl);
  for (var i = 0; i < hours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Location Totals';
  trEl.appendChild(thEl);
  theTable.appendChild(trEl);
}

function makeFooterRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Hourly Totals for All Locations';
  trEl.appendChild(thEl);
  var totalOfTotals = 0;
  var hourlyTotal = 0;
  for (var i = 0; i < hours.length; i++) {
    hourlyTotal = 0;
    for (var j = 0; j < CookieStand.all.length; j++){
      hourlyTotal += CookieStand.all[j].cookiesEachHour[i];
      totalOfTotals += CookieStand.all[j].cookiesEachHour[i];
    }
    thEl = document.createElement('th');
    thEl.textContent = hourlyTotal;
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = totalOfTotals;
  trEl.appendChild(thEl);
  theTable.appendChild(trEl);
}

(function renderTable() {
  makeHeaderRow();
  for(var i = 0; i < CookieStand.all.length; i++){
    CookieStand.all[i].render();
  }
  makeFooterRow();
})();
