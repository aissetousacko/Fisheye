function photographerFactory(data) {

    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/photographers-id-photos/${portrait}`;

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
      
      photographerArticle.appendChild(photographerLink);

      photographerLink.appendChild(img);
      photographerLink.appendChild(h2);
      photographerLink.appendChild(location);
      photographerLink.appendChild(taglineElement);
      photographerLink.appendChild(priceElement);
      
      return (photographerArticle);
    
    }

    function getPhotographerHeader() {
      const photographerHeader = document.querySelector(".photograph-header");
	    const photographerDetail = document.createElement("article");
	    photographerHeader.prepend(photographerDetail);

	    //name
	    const h1 = document.createElement( 'h1' );
	    h1.textContent = name;
	    //city et country
	    const location = document.createElement('h2');
	    location.textContent = city + ", " + country;
	    //tagline
	    const taglineElement = document.createElement('p');
	    taglineElement.textContent = tagline;

	    photographerDetail.appendChild(h1);
	    photographerDetail.appendChild(location);
	    photographerDetail.appendChild(taglineElement);

	    const picture = `assets/photographers/photographers-id-photos/${portrait}`;
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", name);
      photographerHeader.appendChild(img);

      return photographerDetail;
    }
    
    return { picture, getUserCardDOM, getPhotographerHeader }
}
