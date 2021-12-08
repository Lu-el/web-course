function moveAll(fromList, toList) { 
    let elements = document.querySelectorAll(`ul.${fromList} > li`);
    let searchTable = document.querySelector(`.${toList}`);
    if (elements.length) {
        for (let elem of elements) {
            let li = document.createElement('li');
            li.style.listStyleType = 'none';
            li.textContent = elem.textContent;
            searchTable.append(li);
            elem.remove();
        }
    } else {
        alert(`Нет элементов в списке`)
    }
}
 

function moveOne(inList) {
    let selector = document.getSelection().toString();
    if (selector) {
        let searchTable = document.querySelector(`.${inList}`);
        let li = document.createElement('li');
        li.style.listStyleType = 'none';
        li.innerHTML = (`${selector}`);
        searchTable.append(li);
        document.getSelection().deleteFromDocument();
    } else {
        alert('Не выбран элемент')
    }
}
