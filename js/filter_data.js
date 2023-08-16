const category = new URLSearchParams(window.location.search).get('category');
var finalData = {};
var step = 0;
async function applyFilters() {
    var sections = document.querySelectorAll(".filter-section");
    var filtersToApply = { "PriceRange": [], "Brand": [], "Color": [] };
    try {
        sections.forEach((section) => {
            filtersToApply[section.id] = getSectionSelection(document.getElementById(`${section.id}`));
        });
        const filteredItems = await fetchDataFromJSONFile(filtersToApply);

        return filteredItems;
    } catch (error) {
        console.error('Error applying filters:', error);
    }
}

function getSectionSelection(sectionId) {
    let result = [];
    if (sectionId.id === "PriceRange") {
        let prices = sectionId.querySelectorAll("input[type='number']");
        prices.forEach((price) => {
            result.push(parseInt(price.value));
        });
    }
    else {
        let inputs = sectionId.querySelectorAll("input[type='checkbox']:checked");

        inputs.forEach((input) => {
            result.push(input.id);
        });
    }

    return result;
}
async function fetchData() {
    const response = await fetch('https://c4-nexus-project.vercel.app/json_data/products.json');
    const data = response.ok ? await response.json() : await fetch('http://192.168.0.104:8080/json_data/products.json').json();
    return data[category];
}
async function fetchDataFromJSONFile(filters) {
    try {
        const data = await fetchData();

        const filteredItems = {};
        console.log()
        for (const itemId in data) {
            const item = data[itemId];
            let passesAllFilters = true;

            for (const filterGroup in filters) {
                const options = filters[filterGroup];

                if (filterGroup === "PriceRange") {
                    if (item["Price"] < options[0] || item["Price"] > options[1]) {
                        passesAllFilters = false;
                        break;
                    }
                } else {
                    // Check if the item matches any of the chosen options for the filter group
                    if (options.length > 0 && !options.includes(item[filterGroup])) {
                        passesAllFilters = false;
                        break;
                    }
                }
            }

            if (passesAllFilters) {
                // Add a copy of the matched item to the filteredItems object.
                filteredItems[itemId] = { ...item };
            }
        }
        console.log(filteredItems);
        return filteredItems;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }
}


function displayData(data) {
    const container = document.querySelector(".products-grid");
    container.innerHTML = "";
    container.setAttribute("id", `${category}`);
    if (data.length === 0) {
        const noItemsMessage = document.createElement("p");
        noItemsMessage.textContent = "No items match the selected criteria.";
        container.appendChild(noItemsMessage);
    }
    else {
        for (const itemId in data) {

            const item = data[itemId];

            const listItem = Object.assign(document.createElement("li"), { className: "grid-item", id: `${itemId}` });

            const itemHeader = Object.assign(document.createElement("div"), { className: "item-header" });

            itemHeader.innerHTML = `
            <img src="${item.ImageSource}" alt="">
            <i class="fa-solid fa-cart-shopping"></i>
          `;
            listItem.appendChild(itemHeader);

            const itemBody = Object.assign(document.createElement("div"), { className: "item-body" });

            itemBody.innerHTML = `
            <div class="item-name">
              <span>${item.Name}</span>
            </div>
            <div class="item-price-rating">
              <span>${item.Price} $</span>
              <div class="stars">
                    <form action="">
                        <input class="star star-5" id="star-5" type="radio" name="star" ${item.Rating === 5 ? "checked" : ""} disabled/>
                        <label class="star star-5" for="star-5"></label>
                        <input class="star star-4" id="star-4" type="radio" name="star" ${item.Rating === 4 ? "checked" : ""} disabled/>
                        <label class="star star-4" for="star-4"></label>
                        <input class="star star-3" id="star-3" type="radio" name="star" ${item.Rating === 3 ? "checked" : ""} disabled/>
                        <label class="star star-3" for="star-3"></label>
                        <input class="star star-2" id="star-2" type="radio" name="star" ${item.Rating === 2 ? "checked" : ""} disabled/>
                        <label class="star star-2" for="star-2"></label>
                        <input class="star star-1" id="star-1" type="radio" name="star" ${item.Rating === 1 ? "checked" : ""} disabled/>
                        <label class="star star-1" for="star-1"></label>
                    </form>
                </div>
            </div>
            </div>
            <div class="item-description">
              <p>${item.Description}</p>
            </div>
          `

            listItem.appendChild(itemBody);

            container.appendChild(listItem);
        }
    }
}
async function setCategoryDetails() {
    document.querySelector(".category-container").innerHTML = `
    This our finest collection of <b>${category}</b>. We have over ${Object.keys(await fetchData()).length} items available to choose from. What are you waiting for, shop now!
    `;
}

async function loadData() {
    const maxItems = 20;
    const element = document.getElementById("load-more");

    // Fetch filtered data
    const filteredData = await applyFilters();
    const keys = Object.keys(filteredData);

    // Display the elements on the page
    let move = step * maxItems;

    finalData = {};
    
    keys.slice(0, maxItems + move).forEach((key) => {
        finalData[key] = filteredData[key];
    });

    step++;

    // If all elements have been displayed, hide the button
    if (keys.length <= maxItems + move) {
        element.style.display = "none";
    }

    displayData(finalData);
}


const filterHeaders = document.querySelectorAll(".filter-header");
filterHeaders.forEach(header => {
    header.addEventListener("click", function () {
        // Get the closest .filter-body element from the clicked icon
        const filterBody = header.closest(".filter-section").querySelector(".filter-body");
        // Check if the filterBody is found
        if (filterBody) {
            // Add your action here using the filterBody element
            const icon = header.querySelector(".fa-solid");

            if (filterBody.style.display === "block") {
                filterBody.style.display = "none";
                icon.classList.remove("fa-chevron-up");
                icon.classList.add("fa-chevron-down");
            }
            else {
                filterBody.style.display = "block";
                icon.classList.remove("fa-chevron-down");
                icon.classList.add("fa-chevron-up");
            }
        } else {
            console.log("No filter body found.");
        }
    });
});

const sortingButton = document.getElementById("sorting-button");

sortingButton.addEventListener("click", function () {
    const sortingOptions = document.querySelector(".sorting-options");
    if (sortingOptions.style.display === "block") {
        sortingOptions.style.display = "none";
    }
    else {
        sortingOptions.style.display = "block";
    }
});

loadData();
setCategoryDetails();

// async function setFilterInformation() {
//     try {
//         const response = await fetch('http://192.168.0.104:8080/json_data/products.json');

//         // Check if the response is successful
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();

//         var filterData = {};

//         for (var itemId in data) {
//             const category = itemId.split('-')[1];
//             if (!(category in filterData)) {
//                 filterData[category] = getFiltersFromPage();
//             }
//             for (const filterKey in filterData[category]) {
//                 filterData[category][filterKey].push(data[itemId].filterKey);
//             }

//         }

//         const jsonData = JSON.stringify(filterData, null, 2);
//         writeToFile(jsonData);
//     }
//     catch (error) {
//         console.error('Error fetching JSON data:', error);
//     }
// }

// function getFiltersFromPage() {
//     var filters = document.querySelectorAll(".filter-section");
//     var filterData = {};
//     for (const filter in filters) {
//         filterData[filter.id] = [];
//     }
//     return filterData;
// }

// function writeToFile(data) {
//     const fs = require('fs');

//     const filePath = 'http://192.168.0.104:8080/json_data/filter_preset.json';

//     fs.writeFile(filePath, data, 'utf8', (err) => {
//         if (err) {
//             console.error('Error writing to the file:', err);
//         } else {
//             console.log('Data saved to file successfully.');
//         }
//     });
// }

// // setFilterInformation();

// async function displayFilterInformation(id) {
//     var rawData = await fetchFilterData();

//     const container = document.querySelector(".filters-container");
//     container.innerHTML = "";

//     console.log(rawData);

//     for (const itemId in rawData[id]) {

//         const item = data[itemId];

//         window[`create${itemId}Filter`](item);
//     }

// }

// async function fetchFilterData() {
//     try {
//         const response = await fetch('http://192.168.0.104:8080/json_data/filter_data.json');

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();

//         return data;
//     } catch (error) {
//         console.error('Error fetching JSON data:', error);
//     }
// }


// function createPriceRangeFilter(data) {
//     const container = document.querySelector(".filters-container");
//     container.innerHTML = "";

//     const section = Object.assign(document.createElement("div"), { className: "filter-section", id: `${itemId}` });

//     const sectionHeader = Object.assign(document.createElement("div"), { className: "filter-header" });

//     sectionHeader.innerHTML = `
//         <button>Price (lv)</button>
//         <i class="fa-solid fa-chevron-down"></i>
//       `;

//     section.appendChild(sectionHeader);

//     const filterBody = Object.assign(document.createElement("div"), { className: "filter-body" });

//     const innerContainer = Object.assign(document.createElement("div"), { className: "inner-filter-container" });

//     innerContainer.innerHTML = `
//     <div>
//         <label for="from-price">From</label>
//         <br>
//         <input type="number" id="from-price" value="${data[0]}"/>
//     </div>

//     <i class="fa-solid fa-minus"></i>

//     <div>
//         <label for="to-price">To</label>
//         <br>
//         <input type="number" id="to-price" value="${data[1]}"/>
//     </div>
//   `;

//     filterBody.appendChild(innerContainer);

//     const sliderContainer = Object.assign(document.createElement("div"), { className: "slider-container" });

//     sliderContainer.innerHTML = `
//         <div class="slider">
//             <div class="progress">

//             </div>
//         </div>
//         <div class="range-input">
//             <input type="range" class="range-min" min="${data[0]}" max="${data[1]}" value="${data[0]}">
//             <input type="range" class="range-max" min="${data[0]}" max="${data[1]}" value="${data[1]}">
//         </div>
//     `;

//     listItem.appendChild(itemBody);

//     console.log(listItem);

//     container.appendChild(listItem);
// }
