//Get all photographers
async function getPhotographers() {
    const data = await fetch("../data/photographers.json");
    return await data.json();
}

//Display all photographer's profile
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

//Execute functions
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
