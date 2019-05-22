'use strict';

// need an array to hold the hours
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pikeEl = document.getElementById('sales-table');

// object literal (multiple) for each store
  // min customers per hour
  // max customers per hour
  // average cooker per customer
  // an array of customer each hour based on the min and the max
    // a random number between the min and the max
  // an arry of cookies sold each hour
    // multiply customers each hour by the average cookies sales per customer
  // render this to the DOM
  // total cookies for the day

var pikePlace = {
  name: 'Pikes Place',
  minCustomersEachHour: 23,
  maxCustomersEachHour: 65,
  averageCookiesPerCustomer: 6.3,
  customersEachHour: [],
  cookiesEachHour: [],
  totalCookiesForTheDay: 0,
  calcCustomersEachHour: function(){
    for(var i = 0; i < hours.length; i++){
      this.customersEachHour.push(getRandomCustomer(this.minCustomersEachHour, this.maxCustomersEachHour));
    }
  },

  calcCookiesEachHour: function(){
    this.calcCustomersEachHour();

    for(var i = 0; i < hours.length; i++){
      var oneHourOfCookies = Math.ceil(this.customersEachHour[i]*this.averageCookiesPerCustomer);

      this.cookiesEachHour.push(oneHourOfCookies);

      this.totalCookiesForTheDay += oneHourOfCookies
    }
  },
  
  render: function(){
    this.calcCookiesEachHour();

    for(var i = 0; i < hours.length; i++){
      // create an element, give it content, attach it to the DOM
      // 6am: 45 cookies
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.cookiesEachHour[i]} cookies`;

      pikeEl.appendChild(liEl);
    }

    liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalCookiesForTheDay} cookies`;
    pikeEl.appendChild(liEl);
  }
}

pikePlace.render();

// helper function

// I got this code from MDN math.random()
function getRandomCustomer(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}







