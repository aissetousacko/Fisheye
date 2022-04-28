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
    fetch("../data/photographers.json")
    //on récupère la requête au format json et on vérifie si tout s'est bien passé
    .then(function(res) {
        if(res.ok) {
           return res.json();
        }
    })
    //on récupère la requête au format json et retournons la valeur de la requête
    .then(function(data) {
        console.log(data.photographers);
        return data.photographers;
    })
    .catch(function(err) {
        console.log(err);
    })
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
