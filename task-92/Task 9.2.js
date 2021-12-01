let userExpression=prompt('введите выражение', '1. 6-1/ 2.5/3 + 7*2.6*4.10 + 0.1=');

console.log(calculateOfExpression(userExpression));

function resultOfCalculate () {
    let input = document.querySelector('.btn');
    calculateOfExpression(input.value);
    let div = document.createElement('div');

    div.innerHTML = `Решение: ${calculateOfExpression (input.value)}`;
    document.body.append(div);
  };

function actionOfOper (operOfMassive, k, x, y) {
    if (operOfMassive[k] == "+") { return x + y }
    else if (operOfMassive[k] == "-") { return x - y }
    else if (operOfMassive[k] == "*") { return x * y }
    else if (operOfMassive[k] == "/") { return x / y }
}

function calculateOfExpression (expression) {
    let arrSymbols=["+", "-", "/", "*"];

    let exprWithoutSpace = expression.split(' ').join('')

    let exprWithoutOper = exprWithoutSpace.split((/[/ -+*=-]/));

    let operInExpression=[];

    for (let i=0; i <= (exprWithoutSpace.length-2); i++) {
        if (arrSymbols.includes(exprWithoutSpace[i])) {
            operInExpression.push(exprWithoutSpace[i]);
        } 
    } operInExpression

    let result = +exprWithoutOper[0];

    for (let j=1; j<=(exprWithoutOper.length-2); j++) {
        result = actionOfOper (operInExpression, j-1, result, +exprWithoutOper[j])
    } return result.toFixed(2)
}