'use strict';

var allCats = [];
var catform = document.getElementById('catform');
var catlist = document.getElementById('catlist');

function Cat(name){
  this.name = name;
  this.render = function(){
    var liEl = document.createElement('li');
    liEl.textContent = this.name;
    catlist.appendChild(liEl);
  },
  allCats.push(this);
}

function handleCatSubmit(e){
  e.preventDefault();
  var newCat = new Cat(e.target.kitteh.value);
  catform.reset();
  newCat.render();
  localStorage.setItem('cats', JSON.stringify(allCats));
  console.log('this is what is in local storage', localStorage.cats);
}