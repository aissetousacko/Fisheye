async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    /* const photographers = [
        {
            "name": "Ma data test",
            "id": 1,
            "city": "Paris",
            "country": "France",
            "tagline": "Ceci est ma data test",
            "price": 400,
            "portrait": "account.png"
        },
        {
            "name": "Autre data test",
            "id": 2,
            "city": "Londres",
            "country": "UK",
            "tagline": "Ceci est ma data test 2",
            "price": 500,
            "portrait": "account.png"
        },
    ] */
    // et bien retourner le tableau photographers seulement une fois
    /* return ({
        photographers: [...photographers, ...photographers, ...photographers]
    }) */

    //on récupère les données de photographers.json
    /* await fetch("../data/photographers.json")
    .then(function(res) {
        if(res.ok) {
           return res.json();
        }
    })
    .then(function(data) {
        console.log("fetch");
        console.log(data.photographers);
        return data.photographers;
    })
    .catch(function(err) {
        console.log(err);
    }) */

    const data = await fetch("../data/photographers.json");
    return await data.json();
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
