var allCats = [];

function Cat(name, age){
  this.name = name;
  this.age = age;
  allCats.push(this);
}

new Cat('tangerine', 3);
new Cat('Malaki', 1);

console.log('all Cats Array', allCats);

/////////////////// turn JS into JSON

var stringCats = JSON.stringify(allCats);

console.log(stringCats);

/////////////// put it in local storage

localStorage.setItem('kittyCat', stringCats);

console.log('my local storage is', localStorage);

////////////// get cats out of storage

var storageCats = localStorage.getItem('kittyCat');

console.log('storage cats:', storageCats);

///////////////// turn back into JS

var returnedCats = JSON.parse(storageCats);

console.log('my returned cats', returnedCats);








