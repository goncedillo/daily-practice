const $createItemForm = document.querySelector('#create-item');
const $addItemBtn = document.querySelector('#add-item-btn');
const $itemValue = document.querySelector('#item-value');
const $itemsArea = document.querySelector('#items-area');
const $buyItems = document.querySelectorAll('.buy-items');

function getMountedItem(value) {
    return `
        <div class="buy-item">
            <div class="buy-item--icon">
                <img alt="buy-icon" src="/images/tag.svg" />
            </div>
            <div class="item-image">
                <img src="" />
            </div>
            ${value}
        </div>
    `;
}

function removeItem(e) {
    $itemsArea.removeChild(e.currentTarget);
}

function drawImageInItem(id, value) {
    // request en GET
    // 1. Promesa con los datos sin parsear a JSON
    // 2. Promesa con los datos parseados
    fetch(`https://pixabay.com/api/?key=10246394-d6631a4f04bc86d1f9d0dc42f&q=${value}&image_type=photo`)
        .then(resp => resp.json())
        .then(data => {
            if (data.hits.length > 0) {
                // Si tiene imagen la búsqueda
                // pinto la url en la img del item
                $itemsArea.querySelector(`#${id} .item-image img`).src = data.hits[0].previewURL;
            }
        })
        .catch(err => console.err(err));


}

function handleCreateItem(e) {
    // Evito el comportamiento por defecto
    e.preventDefault();

    // recojo valores
    const value = $itemValue.value;
    const currentId = `item-${$itemsArea.childNodes.length}`;
    const newItem = document.createElement('div');
    const classesToAdd = ['col', 'col-12', 'col-sm-6', 'col-lg-4', 'col-xl-3'];

    newItem.classList.add(...classesToAdd);
    newItem.id = currentId;
    newItem.innerHTML = getMountedItem(value);

    newItem.addEventListener('click', removeItem);

    // Compruebo posición para insertar el nodo
    if ($itemsArea.childNodes.length > 0) {
        $itemsArea.insertBefore(newItem, $itemsArea.childNodes[0]);
    } else {
        $itemsArea.appendChild(newItem);
    }

    // Pido imagen a la API de imágenes
    drawImageInItem(currentId, value);

    // Reseteo el input a vacío
    $itemValue.value = '';
}

$createItemForm.addEventListener('submit', handleCreateItem);
$addItemBtn.addEventListener('click', handleCreateItem);