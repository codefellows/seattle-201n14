
loadCurrentPoints();
var level = [0, 10, 20, 50, 100, 200, 400, 1000, 2500];
var i = 0;
Character.allCharacter = [];

function Character(filename, filepath){
this.filename = filename;
this.filepath = filepath;
Character.allCharacter.push(this);
}
new Character('sick-girl', 'img/sick-girl.png');
new Character('farmer', 'img/farmer.png');
new Character('masterfarmer', 'img/masterfarmer.png');
new Character('artist', 'img/artist.png');
new Character('leader', 'img/leader.png');
new Character('king', 'img/king.png');
new Character('magicain', 'img/magician.png');
new Character('queen', 'img/queen.png');
new Character('zeus', 'img/zeus.png');

var picture1 = document.getElementById('slideimg0');
var picture2 = document.getElementById('slideimg1');

function addImage(){
    for(i=0; currentPoints >= level[i]; i++){
    }
    picture1.alt = Character.allCharacter[i-2].filename;
    picture1.src = Character.allCharacter[i-2].filepath;
    picture2.alt = Character.allCharacter[i-1].filename;
    picture2.src = Character.allCharacter[i-1].filepath;
    
}



function changePic(){
var timer = setInterval(nextImage, 1000);
var curImage = 0;
var numImages = 2;

function nextImage(pic, pic2) {
    var pic;
    // remove showMe class from current image
    pic = document.getElementById("slideimg" + curImage);
    removeClass(pic, "");

    // compute next image
    curImage++;
    // if (curImage > numImages - 1) {
    //     curImage = 0;
    // }

    // add showMe class to next image
    
    pic = document.getElementById("slideimg" + curImage);
    addClass(pic, "showMe");
    pic2 = document.getElementById("slideimg0");
    removeClass(pic2, "showMe");
}


function addClass(elem, name) {
    var change = elem.className;
    if (change) change += " ";  // if not blank, add a space separator
    change += name;
    elem.className = change;
}

function removeClass(elem, name) {
    var change = elem.className;
    elem.className = change.replace(name, "").replace(/   /g, " ").replace(/^ | $/g, "");  // remove name and extra blanks
}
}


function doAll(){
   if (currentPoints >= 10){
addImage();
changePic();
characterImage();
}
else{

}
}

doAll();