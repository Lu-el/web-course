function resultOfCalculate () {
    let input = document.querySelector('.btn');
    calculateOfExpression(input.value);
    let div = document.createElement('div');
    div.innerHTML = `Решение: ${calculateOfExpression (input.value)}`;
    document.body.append(div);
  };

function getOperationFn(operation) {
    const operationType = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y, 
        '*': (x, y) => x * y,
        '/': (x, y) => x / y,
    }
    return operationType[operation]
}

function calculateOfExpression (expression) {
    const supportedOperations =["+", "-", "/", "*"];

    const exprWithoutSpace = expression.split(' ').join('')

    const exprWithoutOper = exprWithoutSpace.split((/[/ -+*=-]/));

    const operInExpression=[];

    for (let i=0; i <= (exprWithoutSpace.length-2); i++) {
        if (supportedOperations.includes(exprWithoutSpace[i])) {
            operInExpression.push(exprWithoutSpace[i]);
        } 
    } 

    let result = +exprWithoutOper[0];

    for (let j=1; j<=(exprWithoutOper.length-2); j++) {
        const makeOperation = getOperationFn(operInExpression[j-1])
        result = makeOperation(result, +exprWithoutOper[j]);
    } return result.toFixed(2)
}

