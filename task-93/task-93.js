function moveAll(fromList, toList) { 
    let elements = document.querySelectorAll(`select.${fromList} > option`);
    let searchTable = document.querySelector(`.${toList}`);
    if (elements.length) {
        for (let elem of elements) {
            let option = document.createElement('option');
            option.textContent = elem.textContent;
            searchTable.append(option);
            elem.remove();
        }
    } else {
        alert(`Нет элементов в списке`)
    }
}
 

function moveOne(inList) {
    let checked = document.querySelectorAll(':checked');
    let searchTable = document.querySelector(`.${inList}`);
    if (checked.length) {
        for (let check of checked) {
            let option = document.createElement('option');
            option.textContent = check.textContent;
            searchTable.append(option);
            check.remove();
        }
    } else {
        alert('Не выбран элемент')
    }
}
