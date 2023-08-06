// const category = new URLSearchParams(window.location.search).get('category');

async function sortByName(reverse) {
    const productsGrid = document.querySelector('.products-grid');
    const liElements = Array.from(productsGrid.querySelectorAll('li.grid-item'));

    const response = await fetch('http://192.168.0.104:8080/json_data/products.json');
    const data = await response.json();

    liElements.sort((liA, liB) => {
        const nameA = data[category][liA.id].Name.toLowerCase();
        const nameB = data[category][liB.id].Name.toLowerCase();

        console.log(nameB);
        return reverse === true ? nameB.localeCompare(nameA) : nameA.localeCompare(nameB);
    });
    // Clear the current contents of the products grid
    productsGrid.innerHTML = '';

    // Append the sorted li elements back to the products grid
    liElements.forEach((liElement) => {
        productsGrid.appendChild(liElement);
    });

}

async function sortByPrice(reverse) {
    const productsGrid = document.querySelector('.products-grid');
    const liElements = Array.from(productsGrid.querySelectorAll('.grid-item'));


    const response = await fetch('http://192.168.0.104:8080/json_data/products.json');
    const data = await response.json();

    liElements.sort((liA, liB) => {
        const priceA = data[category][liA.id].Price;
        const priceB = data[category][liB.id].Price;
        console.log(priceB);
        return reverse === true ? priceB - priceA : priceA - priceB;
    });
    // Clear the current contents of the products grid
    productsGrid.innerHTML = '';

    // Append the sorted li elements back to the products grid
    liElements.forEach((liElement) => {
        productsGrid.appendChild(liElement);
    });

}

const sortButton = document.querySelector(".mix-button button");

sortButton.addEventListener("click", function () {
    const menu = document.querySelector(".menu");
    const content = document.querySelector(".filters-container");
    const sortingOptions = document.querySelector(".sorting-options");

    content.style.display = "block";
    sortingOptions.style.display = "block";
    menu.style.display = 'block';

    menu.innerHTML = '';

    console.log(menu);

    const div = document.createElement("div");

    div.innerHTML = `
    <i class="fa-solid fa-xmark" onclick="closeWindow()"></i>
    
    `;

    const filterWrapper = Object.assign(document.createElement("div"), { className: "filter-wrapper" });
    
    const h3Filter = Object.assign(document.createElement("h3"), { className: "filter-text" });
    h3Filter.innerHTML = "Filtering";

    filterWrapper.appendChild(h3Filter);

    filterWrapper.appendChild(content);

   

    const sortingContainer = Object.assign(document.createElement("div"), { className: "sorting-container" });

    const h3Sort = Object.assign(document.createElement("h3"), { className: "sorting-text" });

    h3Sort.innerHTML = "Sorting";

    sortingContainer.appendChild(h3Sort);

    sortingContainer.appendChild(sortingOptions);

    menu.appendChild(div);
    menu.appendChild(filterWrapper);
    menu.appendChild(sortingContainer);

    document.querySelector("body").style.overflow = "hidden";
});
function closeWindow(){
    document.querySelector(".menu").style.display = "none";
    document.querySelector("body").style.overflow = "auto";
}