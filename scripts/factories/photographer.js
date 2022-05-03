function photographerFactory(data) {
    //on récupère les données dont on a besoin
    const { name, portrait, city, country, tagline, price } = data;

    //on récupère le chemin de l'image
    const picture = `assets/photographers/photographers-id-photos/${portrait}`;

    //Crée la carte du photographe en utilisant le DOM
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        //image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        //name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //city et country
        const location = document.createElement('h3');
        location.textContent = city + ", " + country;
        //tagline
        const taglineElement = document.createElement('h4');
        taglineElement.textContent = tagline;
        //price
        const priceElement = document.createElement('p');
        priceElement.textContent = price + "€/jour";

        //ajout des éléments dans l'article
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}