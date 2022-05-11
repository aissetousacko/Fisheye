//affiche l'icone du photographe
function photographerFactory(data) {
    //on récupère les données dont on a besoin
    const { name, id, portrait, city, country, tagline, price } = data;

    //on récupère le chemin de l'image
    const picture = `assets/photographers/photographers-id-photos/${portrait}`;

    //Crée la carte du photographe en utilisant le DOM
    function getUserCardDOM() {
      const photographerArticle = document.createElement("article");
      
      //link
      const photographerLink = document.createElement("a");
      const photographerURL = `photographer.html?id=${id}`;
      photographerLink.setAttribute("href", photographerURL);

      //image
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", "Photo de " + name);
      
      //name
      const h2 = document.createElement("h2");
      h2.textContent = name;
      
      //city et country
      const location = document.createElement("h3");
      location.textContent = city + ", " + country;
      
      //tagline
      const taglineElement = document.createElement("h4");
      taglineElement.textContent = tagline;
      
      //price
      const priceElement = document.createElement("p");
      priceElement.textContent = price + "€/jour";
      
      //ajout des éléments dans l'article
      photographerArticle.appendChild(photographerLink);

      photographerLink.appendChild(img);
      photographerLink.appendChild(h2);
      photographerLink.appendChild(location);
      photographerLink.appendChild(taglineElement);
      photographerLink.appendChild(priceElement);
      
      return (photographerArticle);
    
    }
    
    return { name, picture, getUserCardDOM }
}
