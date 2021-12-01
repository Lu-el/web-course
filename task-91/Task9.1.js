'use strict'

let input = document.querySelector('.btn');
console.log(input.value);
console.log(onlySpace (input.value));
console.log(indexInCase(input.value));
console.log(cutExtraSymbols(input.value));

function lastVariant () {
    let input = document.querySelector('.btn');
    cutExtraSymbols(input.value);
    let div = document.createElement('div');
    div.className = "task91";
    div.innerHTML = `Решение: ${cutExtraSymbols(input.value)}`;
    document.body.append(div);
};

function cutExtraSymbols (stroka) {
  let newStr = Array.from(stroka);
  for (let x=0; x <= (stroka.length-1); x++){
      let massive1 = indexInCase (stroka);
      if ( massive1.includes( stroka[x].toLowerCase()) ) {
          newStr.splice(x, 1, '');
      }
  } return  newStr.join('');
};

function indexInCase (str2) {
  let lineOf = onlySpace(str2);
  let ready = [];
  let strWords = lineOf.split('+');
    for (let y=0; y <= (strWords.length-1); y++) {
      let strSymbols = strWords[y].toLowerCase(); 
      for (let i=0; i <= (strSymbols.length-1); i++){ 
        if ( strSymbols.lastIndexOf(strSymbols[i]) !== strSymbols.indexOf(strSymbols[i])) {
          ready.push( strSymbols[i].toLowerCase() );
        }
      } 
    } return ready;
};

function onlySpace(qwerty) {
  let symb = ['.', ',', '?', '!', ':', ';',' ',];
  let newStr1 = Array.from(qwerty);
  for (let k=0; k <= (qwerty.length-1); k++){
    if ( symb.includes( qwerty[k]) ) {
      newStr1.splice(k, 1, '+');
      } 
    } return newStr1 = newStr1.join('') ;
};