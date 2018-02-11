'use strict';

//array to store the objects
var allProducts = [];
var currentImages = [];
var previousImages = [];
var repeat = false;
//counter for set of 3 images displayed at a time
var counter = 0;

//make my constructor function
function Product(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.clicked=0;
  this.display=0;
  allProducts.push(this);
}

//use my constructor function to create new Product instances
new Product('Bag', 'images/bag.jpg');
new Product('Banana', 'images/banana.jpg');
new Product('Bathroom', 'images/bathroom.jpg');
new Product('Boots', 'images/boots.jpg');
new Product('Breakfast', 'images/breakfast.jpg');
new Product('Bubblegum', 'images/bubblegum.jpg');
new Product('Chair', 'images/chair.jpg');
new Product('Cthulhu', 'images/cthulhu.jpg');
new Product('Dog-duck', 'images/dog-duck.jpg');
new Product('Dragon', 'images/dragon.jpg');
new Product('Pen', 'images/pen.jpg');
new Product('Pet-sweep', 'images/pet-sweep.jpg');
new Product('Tauntaun', 'images/tauntaun.jpg');
new Product('Unicorn', 'images/unicorn.jpg');
new Product('Usb', 'images/usb.gif');
new Product('Water-can', 'images/water-can.jpg');
new Product('Wine-glass', 'images/wine-glass.jpg');

function randomIndex() {
  var randomIndex = Math.floor(Math.random() * allProducts.length);
  return randomIndex;
}

function repeatImg(imgEl) {
  for (var i=0; i<currentImages.length; i++) {
    if (currentImages[i] === imgEl.src) {
      repeat = true;
      break;
    }
  }

  if (repeat === false){
    for (i=0; i<previousImages.length; i++){
      if (previousImages[i] === imgEl.src) {
        repeat = true;
        break;
      }
    }
  }
}

function showProducts() {
  for (var j=0; j<3; j++){
    var rand = randomIndex();
    var imgEl = document.getElementById('product-pic' + (j+1));

    imgEl.src = allProducts[rand].filepath;
    repeatImg(imgEl);

    // if (repeat === true) {
    //   j--;
    // }
    // else {
    // imgEl.onclick = function () {
    //   allProducts[rand].clicked++;
    //   counter++;
    // };
    currentImages.push(imgEl.src);
    allProducts[rand].display++;
    // }
    console.log(repeat);
    repeat = false;
  }
  console.log(counter);
}
var threeprods = document.getElementById('threeprods');
threeprods.addEventListener('click', showProducts);



// {
//   event.preventDefault();
//   allProducts[rand].clicked++;
//   // showProducts();
// });


//   if (j===3){
//previousImages = currentImages;
//     counter++;
//     console.log(counter);
//   }
// }

//  function showResultsTable() {
//  var trEl = document.createElement('tr');
//  var thEl = document.createElement('th');
//  var total = document.getElementById('total');
//  thEl.textContent = 'Product Name';
//  trEl.appendChild(thEl);

//  thEl = document.createElement('th');
//  thEl.textContent = 'Number of times Displyed';

//  thEl = document.createElement('th');
//  thEl.textContent = 'Number of times Clicked';

//  for(var k=0; k<allProducts.length; k++){
//    trEl = document.createElement('tr');
//    var tdEL = document.createElement('td');

//    tdEL.textContent = allProducts[k].name;
//    trEl.appendChild(tdEL);

//    tdEl= document.createElement('td');
//    tdEL.textContent = allProducts[k].display;

//    tdEl= document.createElement('td');
//    tdEL.textContent = allProducts[k].clicked;

//    total.appendChild('tr');
//  }

showProducts();
// showResultsTable()