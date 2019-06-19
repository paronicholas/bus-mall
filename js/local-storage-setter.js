'use strict';

function setLocalStorage(key, value){
  var setValue = JSON.stringify(value);
  localStorage.setItem(key, setValue);
}

function getLocalStorage(storedKey){
  var getValue = JSON.parse(localStorage.getItem(storedKey));
  return getValue;
}
