let magicGrid;

function addItems(numItems=10) {
  const container = document.querySelector(".container");
  const items = container.children;
  const lastItem = items[items.length - 1];
  const lastNumber = parseInt(lastItem.innerHTML);

  for (let i = 1; i <= numItems; i++){
    const newDiv = document.createElement("div");
    const newNumber = lastNumber + i;

    newDiv.innerText = newNumber.toString();
    container.appendChild(newDiv);
    newDiv.classList.add(`item${newNumber}`);
  }
}

function removeItems(numItems=10) {
  const container = document.querySelector(".container");
  const items = container.children;
  const lastIndex = items.length - 1;
  let stopIndex = lastIndex - numItems;

  if (stopIndex < 0) stopIndex = 0;

  for (let i = lastIndex; i > stopIndex; i--){
    items[i].remove();
  }
}

