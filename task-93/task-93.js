function moveAll(fromList, toList, part) { 
    let elements = part.querySelectorAll(`select.${fromList} > option`);
    let searchTable = part.querySelector(`.${toList}`);
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
 

function moveOne(inList, part) {
    let checked = part.querySelectorAll(':checked');
    let searchTable = part.querySelector(`.${inList}`);
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


document.addEventListener('click', function(event) {
    let target = event.target;
    let targetParent = target.closest('.buttons');
    let batterflyBox = target.closest('.batterfly');
    if (!targetParent || !batterflyBox) return;
    let actionTarget = target.dataset.action;

    function changeBox(box) {
        switch (actionTarget) {
            case "allToRight":
                moveAll('leftTable','rightTable', box);
                break;
            case "allToLeft":
                moveAll('rightTable','leftTable', box);
                break;
            case "moveOneTorightTable":
                moveOne("rightTable", box);
                break;
            case "moveOneToleftTable":
                moveOne("leftTable", box);
                break;
        }
    }
    changeBox(batterflyBox);

});


