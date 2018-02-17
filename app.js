'use strict';

//array to store the objects
var allProducts = [];
var previousShown = [];
var counter = 0;
var firstRandom;
var secondRandom;
var thirdRandom;
var imgEl1 = document.getElementById('image-one');
var imgEl2 = document.getElementById('image-two');
var imgEl3 = document.getElementById('image-three');
var total = document.getElementById('total');
var numLoops = 25;

//Load from local storage.
if (localStorage.products) {
  var strProducts = localStorage.getItem('products');
  var products = JSON.parse(strProducts);
  console.log(products);
  for (var prod of products) {
    console.log(prod);
    new Product(prod.name, prod.filepath, prod.shown, prod.clicked);
  }
  calculateResults();
  console.log('I am here!');
  disableImageOnClick();
}
else {
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
}

function storeLocalStorage() {
  var strProducts = JSON.stringify(allProducts);
  localStorage.setItem("products", strProducts);
  console.log(strProducts);
}

showRandomImages();

//make my constructor function
function Product(name, filepath, shown = 0, clicked = 0) {
  this.name = name;
  this.filepath = filepath;
  this.shown = shown;
  this.clicked = clicked;

  allProducts.push(this);
}

function randomProductIndex() {
  var randomIndex = Math.random() * allProducts.length;
  var roundedRandomIndex = Math.floor(randomIndex);
  return roundedRandomIndex;
}

function showRandomImages() {

  firstRandom = null;
  secondRandom = null;
  thirdRandom = null;

  // Generate first image.
  var unique = false;
  var newImageIndex = null;

  while (!unique) {
    // Generate new index and check against previous 3 images.
    newImageIndex = randomProductIndex();

    // Set unique to true as we start with the assumption that we got a unique
    // index and will try to negate that.
    unique = true;

    // Check against previous three images. If there is a match then index is
    // not unique.
    for (var i = 0; i < previousShown.length; i++) {
      if (previousShown[i].filepath === allProducts[newImageIndex].filepath) {
        unique = false;
        break;
      }
    }
    // If unique is still true then we have found the first image.
    if (unique === true) {
      firstRandom = allProducts[newImageIndex];
      console.log('firstRandom: ', firstRandom);
      break;
    }
  }

  // Generate second image.
  unique = false;

  while (!unique) {
    // Generate new index and check against previous 3 images + firstRandom.
    newImageIndex = randomProductIndex();

    // Set unique to true as we start with the assumption that we got a unique
    // index and will try to negate that.
    unique = true;

    // Check against previous three images. If there is a match then index is
    // not unique.
    for (var j = 0; j < previousShown.length; j++) {
      if (previousShown[j].filepath === allProducts[newImageIndex].filepath) {
        unique = false;
        break;
      }
    }
    // Also check against firstRandom for uniqueness.
    if (firstRandom.filepath === allProducts[newImageIndex].filepath) {
      unique = false;
    }

    // If unique is still true then we have found the second image.
    if (unique === true) {
      secondRandom = allProducts[newImageIndex];
      console.log('secondRandon: ', secondRandom);
      break;
    }
  }

  // Generate third image.
  unique = false;
  while (!unique) {
    // Generate new index and check against previous 3 images + firstRandom and secondRandom.
    newImageIndex = randomProductIndex();

    // Set unique to true as we start with the assumption that we got a unique
    // index and will try to negate that.
    unique = true;

    // Check against previous three images. If there is a match then index is
    // not unique.
    for (var k = 0; k < previousShown.length; k++) {
      if (previousShown[k].filepath === allProducts[newImageIndex].filepath) {
        unique = false;
        break;
      }
    }
    if ((firstRandom.filepath === allProducts[newImageIndex].filepath) ||
      (secondRandom.filepath === allProducts[newImageIndex].filepath)) {
      unique = false;
    }

    // If unique is still true then we have found the third image.
    if (unique === true) {
      thirdRandom = allProducts[newImageIndex];
      console.log('thirdRandom: ', thirdRandom);
      break;
    }
  }

  // We should now have 3 unique images which were not repeated the last time.
  // Display them
  imgEl1.setAttribute('src', firstRandom.filepath);
  imgEl2.setAttribute('src', secondRandom.filepath);
  imgEl3.setAttribute('src', thirdRandom.filepath);

  counter++;

  // Udpate previous shown & update counts.
  previousShown = [];
  previousShown.push(firstRandom);
  previousShown.push(secondRandom);
  previousShown.push(thirdRandom);
  firstRandom.shown++;
  secondRandom.shown++;
  thirdRandom.shown++;

} // EOF - showRandomImages.

function handleClick1() {
  firstRandom.clicked++;
  if (counter < numLoops) {
    showRandomImages();
  }
  else {
    disableImageOnClick();
    calculateResults();
  }
}

if (!localStorage.products) {
  imgEl1.addEventListener('click', handleClick1);
}

function handleClick2() {
  secondRandom.clicked++;
  
  if (counter < numLoops) {
    showRandomImages();
  }
  else {
    disableImageOnClick();
    calculateResults();
  }
}

if (!localStorage.products) {
  imgEl2.addEventListener('click', handleClick2);
}

function handleClick3() {
  thirdRandom.clicked++;
  if (counter < numLoops) {
    showRandomImages();
  }
  else {
    disableImageOnClick();
    calculateResults();
  }
}

if (!localStorage.products) {
  imgEl3.addEventListener('click', handleClick3);
}

function disableImageOnClick(){

  imgEl1.removeEventListener('click', handleClick1);
  imgEl2.removeEventListener('click', handleClick2);
  imgEl3.removeEventListener('click', handleClick3);

}

function makeHeaderRow(total) {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');

  thEl.textContent = 'Product Name';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Number of times Image Displayed';
  trEl.appendChild(thEl);

  thEl = document.createElement('th');
  thEl.textContent = 'Number of times Image Clicked';
  trEl.appendChild(thEl);

  total.appendChild(trEl);
  console.log('Making header row');
}

function calculateResults() {
  makeHeaderRow(total);

  for (var l = 0; l < allProducts.length; l++) {
    var trEl = document.createElement('tr');
    var tdEl_productName = document.createElement('td');
    var tdEl_numDisplayed = document.createElement('td');
    var tdEl_clicked = document.createElement('td');

    tdEl_productName.textContent = allProducts[l].name;
    tdEl_numDisplayed.textContent = allProducts[l].shown;
    tdEl_clicked.textContent = allProducts[l].clicked;

    trEl.appendChild(tdEl_productName);
    trEl.appendChild(tdEl_numDisplayed);
    trEl.appendChild(tdEl_clicked);
    console.log('Calculating results');
    total.appendChild(trEl);
  }
  generateChart();
  storeLocalStorage();
}

function generateChart() {
  var chartLabels = [];
  var chartValues = [];
  for (var m =0; m<allProducts.length; m++){
    chartLabels[m] = allProducts[m].name;
    chartValues[m] = allProducts[m].clicked;
  }

  var labelColors = ['rgba(227, 97, 97, 1)',
    'rgba(217, 89, 183, 1)',
    'rgba(191, 38, 79, 1)',
    'rgba(140, 148, 14, 1)',
    'rgba(221,82,6, 1)',
    'rgba(112, 146, 216, 1)',
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(1107, 78, 78, 1)',
    'rgba(69, 22, 17, 1)',
    'rgba(55, 142, 167, 1)',
    'rgba(80, 100, 71, 1)',
    'rgba(120, 152, 122, 1)',
    'rgba(0, 96, 128, 1)',
    'rgba(128, 0, 32, 1)'];

  var ctx = document.getElementById('chart').getContext('2d');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [{
        label: '# of Clicks',
        data: chartValues,
        backgroundColor: labelColors
      }]
    },
  });
}

var clearLS = document.getElementById('clearSession');

clearLS.addEventListener('click', function() {
  console.log('click it!');
  localStorage.clear();
});