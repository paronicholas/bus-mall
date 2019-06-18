'use strict';

// Global Variables
var numOfImagesOnPage = 3;
var totalCLicks = 0;
var maxClicks = 25;

// temp storage for images on page - allows for checking against previously shown images
// in function pickImage().
var previousItemArray = [];
var currentItemArray = [];

// Global DOM elements - import from dom_manipulation.js
var resultUlTag = getUlIdTag('clickResults');
var imageSectionTag = getSectionIdTag('centerBox');

// Constructor
function ItemPicture(name, imageSrc, timesClicked, timesShown){
  this.name = name;
  this.url = imageSrc ? imageSrc : 'https://placehold.it/220x300/111';
  this.timesClicked = timesClicked ? timesClicked : 0;
  this.timesShown = timesShown ? timesShown : 0;

  ItemPicture.allImages.push(this);
}
ItemPicture.allImages = [];

function buildItemPicture(){
  new ItemPicture('Bag', './img/bag.jpg');
  new ItemPicture('Banana', './img/banana.jpg');
  new ItemPicture('Bathroom', './img/bathroom.jpg');
  new ItemPicture('Boots', './img/boots.jpg');
  new ItemPicture('Breakfast', './img/breakfast.jpg');
  new ItemPicture('Bubblegum', './img/bubblegum.jpg');
  new ItemPicture('Chair', './img/chair.jpg');
  new ItemPicture('Cthulhu', './img/cthulhu.jpg');
  new ItemPicture('Dog-Duck', './img/dog-duck.jpg');
  new ItemPicture('Dragon', './img/dragon.jpg');
  new ItemPicture('Pen', './img/pen.jpg');
  new ItemPicture('Pet Sweep', './img/pet-sweep.jpg');
  new ItemPicture('Scissors', './img/scissors.jpg');
  new ItemPicture('Shark', './img/shark.jpg');
  new ItemPicture('Sweep', './img/sweep.png');
  new ItemPicture('Tauntaun', './img/tauntaun.jpg');
  new ItemPicture('Unicorn', './img/unicorn.jpg');
  new ItemPicture('USB', './img/usb.gif');
  new ItemPicture('Water Can', './img/water-can.jpg');
  new ItemPicture('Wine Glass', './img/wine-glass.jpg');
}

function indexGenerator(){
  var indexGen = randomInclusiveNumGen(0, ItemPicture.allImages.length - 1);
  return indexGen;
}

// Rendering Functions
function renderImage(imageIndex){
  var divTag = setDivTag();
  var imageTag = setImageTag();
  var imageH3 = setH3Tag();

  imageTag.src = ItemPicture.allImages[imageIndex].url;
  imageTag.setAttribute('id', imageIndex);
  divTag.appendChild(imageTag);
  imageH3.textContent = ItemPicture.allImages[imageIndex].name;
  divTag.appendChild(imageH3);
  imageSectionTag.appendChild(divTag);
}

function renderResultsList(){
  var clickPercent, liEl;
  for(let i = 0; i < ItemPicture.allImages.length; i++){
    liEl = document.createElement('li');
    if(ItemPicture.allImages[i].timesClicked === 0 && ItemPicture.allImages[i].timesShown === 0){
      clickPercent = 0;
    } else{
      clickPercent = (ItemPicture.allImages[i].timesClicked / ItemPicture.allImages[i].timesShown) * 100;
    }
    clickPercent = clickPercent.toFixed(2);
    liEl.textContent = ItemPicture.allImages[i].name + ' : ' + clickPercent + '%';
    resultUlTag.appendChild(liEl);
  }
}

// Handle Functions
function pickImage(numImages){
  for(let i=0; i<numImages; i++){
    do {
      var imageIndex = indexGenerator();
    } while(previousItemArray.includes(imageIndex) || currentItemArray.includes(imageIndex));
    currentItemArray.push(imageIndex);
    ItemPicture.allImages[imageIndex].timesShown++;
    renderImage(imageIndex);
  }
  previousItemArray = currentItemArray;
  currentItemArray = [];
}

function handleClickOnImage(e){
  var idNum = e.target.id;
  // handles if no image is clicked, only increments if image is clicked
  if(ItemPicture.allImages[idNum]){
    ItemPicture.allImages[idNum].timesClicked++;
    imageSectionTag.innerHTML = '';
    pickImage(numOfImagesOnPage);
    totalCLicks++;
    if(totalCLicks === maxClicks){
      imageSectionTag.removeEventListener('click', handleClickOnImage);
      imageSectionTag.innerHTML = ''; // clears the images from the HTML section to allow new item to be placed
      renderResultsList();
    }
  }
}

// APP INITIALIZER
function initPage(){
  buildItemPicture();
  imageSectionTag.addEventListener('click', handleClickOnImage);
  pickImage(numOfImagesOnPage);
}

initPage();
