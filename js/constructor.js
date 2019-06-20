'use strict';
/*global random_rgba */

// Constructor
function ItemPicture(name, imageSrc, timesClicked, timesShown){
  this.name = name;
  this.url = imageSrc ? imageSrc : 'https://placehold.it/220x300/111';
  this.timesClicked = timesClicked ? timesClicked : 0;
  this.timesShown = timesShown ? timesShown : 0;
  this.graphColor = random_rgba();

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
