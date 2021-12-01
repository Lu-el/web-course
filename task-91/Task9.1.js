'use strict'

function outputNoSymbols () {
    let input = document.querySelector('.btn');
    cutExtraSymbols(input.value);
    let div = document.createElement('div');
    div.className = "solution";
    div.innerHTML = `Решение: ${cutExtraSymbols(input.value)}`;
    document.body.append(div);
};

function cutExtraSymbols (userString) {
  let noExtraSymbols = Array.from(userString);
  for (let x=0; x <= (userString.length-1); x++){
      let doubleSymbol = getDoubleSymbols (userString);
      if ( doubleSymbol.includes( userString[x].toLowerCase()) ) {
        noExtraSymbols.splice(x, 1, '');
      }
  } return  noExtraSymbols.join('');
};

function getDoubleSymbols (userString) {
  const cutedMarks = cutMarks(userString);
  const doubleSymbols = [];
  let words = cutedMarks.split('+');
    for (let y=0; y <= (words.length-1); y++) {
      let smallWords = words[y].toLowerCase(); 
      for (let i=0; i <= (smallWords.length-1); i++){ 
        if ( smallWords.lastIndexOf(smallWords[i]) !== smallWords.indexOf(smallWords[i])) {
          doubleSymbols.push( smallWords[i].toLowerCase() );
        }
      } 
    } return doubleSymbols;
};

function cutMarks(userString) {
  const marks = ['.', ',', '?', '!', ':', ';',' ',];
  let stringNoMarks = Array.from(userString);
  for (let k=0; k <= (userString.length-1); k++){
    if ( marks.includes( userString[k]) ) {
      stringNoMarks.splice(k, 1, '+');
      } 
    } return stringNoMarks = stringNoMarks.join('') ;
};
