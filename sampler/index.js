/*

Есть HTML, где у каждого элемента может быть атрибут x-make со следующими значениями:

copy:n — скопировать текущий элемент n раз и поместить новые элементы после текущего;
remove:n — удалить n элементов, начиная со следующего. Если после текущего нет n элементов (количество_элементов_после_текущего < n), то удаляются все элементы, которые идут после текущего;
removeChildren:n — удалить n потомков элемента, начиная с первого;
switch:n — поменять текущий элемент местами с элементом через n шагов вперёд от текущего (стоит обратить внимание на примеры 2 и 3).
Условия:

Операции нужно выполнять в следующем порядке: сначала все copy-операции, потом — remove, далее — removeChildren, а switch — в последнюю очередь.
Сначала выполняются все операции на верхнем уровне, далее — на втором уровне и т.д.
Атрибут x-make необходимо удалять после осуществления операции из этого атрибута.
Примеры:

Пример 1:

solution(document.querySelector('entry'))

До:

<entry>
    <div>
        <div x-make="remove:1">Блок 1</div>
        <div x-make="copy:3">Блок 2</div>
    </div>
</entry>
После:

<entry>
    <div>
        <div>Блок 1</div>
        <div>Блок 2</div>
        <div>Блок 2</div>
        <div>Блок 2</div>
    </div>
</entry>
Пояснение:

"Блок 2" был скопирован 3 раза — теперь элементов "Блок 2" — четыре.

Дальше был удалён элемент, следующий за "Блок 1".

Пример 2:

solution(document.querySelector('entry'))

До:

<entry>
    <div x-make="removeChildren:2">
        <div x-make="copy:100">Блок 1</div>
        <div>Блок 2</div>
        <div x-make="switch:7">Блок 3</div>
        <div>Блок 4</div>
        <div>Блок 5</div>
    </div>
</entry>
После:

<entry>
    <div>
        <div>Блок 4</div>
        <div>Блок 3</div>
        <div>Блок 5</div>
    </div>
</entry>
Пояснение:

Количество блоков "Блок 1" не увеличилось, т.к. он был удалён родителем с помощью removeChildren.

"Блок 3" поменялся с "Блок 4", т.к. седьмой элемент, считая от "Блок 3", — "Блок 4".

Пример 3:

solution(document.querySelector('entry'))

До:

<entry>
    <section>
        <div x-make="switch:2">
            <div x-make="remove:5">Блок 1</div>
            <span>Блок 2</span>
        </div>
        <div x-make="copy:1">
            <div x-make="remove:5">Блок 3</div>
            <div x-make="switch:1">Блок 4</div>
        </div>
        <p>Блок 5</p>
    </section>
</entry>
После:

<entry>
    <section>
        <div>
            <div>Блок 3</div>
        </div>
        <div>
            <div>Блок 3</div>
        </div>
        <div>
            <div>Блок 1</div>
        </div>
        <p>Блок 5</p>
    </section>
</entry>
Пояснение:

Из-за приоритета операций сначала был скопирован второй элемент — в section теперь четыре элемента.
Из-за операции switch первый блок внутри section поменялся местами с третьим
Из-за remove:5 в "Блок 1" был удалён "Блок 2"
Из-за remove:5 в "Блок 3" был удалён "Блок 4" (в двух элементах внутри section, т.к. они были скопированы)
Пример 4:

solution(document.querySelector('entry'))

До:

<entry>
    <div x-make="switch:2">1</div>
    <div x-make="switch:3">2</div>
    <div x-make="switch:5">3</div>
</entry>
После:

<entry>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</entry>
Пояснение:

"Блок 1" меняется местами с "Блок 3". Далее в контейнере первым элементом с x-make будет идти "Блок 3" — он поменяется местами с "Блок 1". Оставшийся "Блок 2" меняется местами сам с собой, то есть остаётся на месте.

Примечания
Решение должно представлять из себя функцию с названием solution, принимающую на вход DOM-элемент - точку входа.

Исходный код нужно оформить следующим образом:

function solution(entryPoint) {  
    // ваше решение
}
Решение будет тестироваться в последней версии браузера Google Chrome.

*/


function copyN(node, n) {
    for (let index = 0; index < n; index++) {
        node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling);
    }
    //возвращает новые копии
}

function removeN(currentNode, n) {
    let nodesList = currentNode.parentNode.children;
    let currentIndex = Array.prototype.slice.call(nodesList).indexOf(currentNode)
    let index = 0;

    if (currentIndex == nodesList.length - 1) {
        return;
    }

    while (index < n && nodesList[currentIndex + 1]) {
        index++;
        nodesList[currentIndex + 1].remove();
    }
}

function removeChildren(currentNode, n) {
    let parentNode = currentNode.parentNode;
    let list = parentNode.children;

    if (list.length == 0) {
        return;
    }

    removeN(list[0], n - 1);
    list[0] && list[0].remove();
}

function switchN(currentNode, n) {
    if (!currentNode.parentNode) return
    let nodesList = currentNode.parentNode.children
    let currentIndex = Array.prototype.slice.call(nodesList).indexOf(currentNode)
    let insertIndex = (currentIndex + n) % nodesList.length;
    let insertNode = nodesList[insertIndex];
    currentNode.parentNode.insertBefore(currentNode, nodesList[insertIndex])
    currentNode.parentNode.insertBefore(insertNode, nodesList[currentIndex])
}


function solution(currentQuery) {
    let commands = {}
    for (let index = 0; index < currentQuery.children.length; index++) {
        const element = currentQuery.children[index];
        if (!element.getAttribute('x-make')) {
            continue
        }
        let [command, n] = element.getAttribute('x-make').split(':')
        if (!commands[command]) {
            commands[command] = []
        }
        commands[command].push([element, n])
    }
    if (commands['copy']) {
        commands['copy'].forEach(([element, n]) => {
            copyN(element, n)
        })
    }
    if (commands['remove']) {
        commands['remove'].forEach(([element, n]) => {
            removeN(element, n)
        })
    }
    if (commands['removeChildren']) {
        commands['removeChildren'].forEach(([element, n]) => {
            removeChildren(element, n)
        })
    }
    if (commands['switch']) {
        commands['switch'].forEach(([element, n]) => {
            switchN(element, n)
        })
    }
    for (let index = 0; index < currentQuery.children.length; index++) {
        const element = currentQuery.children[index];
        solution(element)
    }
}
