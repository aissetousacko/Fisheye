//affiche l'icone du photographe
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

/*****Affichage des informations du photographe******/

async function getPhotographer() {
	const data = await fetch("../data/photographers.json");
  const photographers = await data.json();
	//console.log(photographers);

  //on recherche le photographe avec le même id que photographerId et on le retourne
	const photographer = photographers.photographers.filter(function(photographer) {
		if(photographer.id == photographerId) {
			//console.log(photographer);
			return photographer;
		}
	});

  //console.log(photographer[0]);
	return photographer[0];
}

//Mimi Keel
const photographerId = 243;

async function init() {
  //console.log("init header");
	const photographer = await getPhotographer();
	//console.log(photographer);

	const photographHeader = document.querySelector(".photograph-header");
	const contactButton = document.querySelector(".contact_button");
	const photographDetail = document.createElement("article");
	photographHeader.insertBefore(photographDetail, contactButton);

	//name
	const h1 = document.createElement( 'h1' );
	h1.textContent = photographer.name;
	//city et country
	const location = document.createElement('h2');
	location.textContent = photographer.city + ", " + photographer.country;
	//tagline
	const taglineElement = document.createElement('p');
	taglineElement.textContent = photographer.tagline;

	//ajout des éléments dans l'article
	photographDetail.appendChild(h1);
	photographDetail.appendChild(location);
	photographDetail.appendChild(taglineElement);

  //photo de profil du photographe
	const picture = `assets/photographers/photographers-id-photos/${photographer.portrait}`;
  const img = document.createElement("img");
  img.setAttribute("src", picture);
  img.setAttribute("alt", photographer.name);
  photographHeader.appendChild(img);

};

init();

const icon = document.querySelector(".icon-down");
const filterPopularity = document.querySelector("#popularity");
const filterDate = document.querySelector("#date");
const filterTitle = document.querySelector("#title");

icon.addEventListener("click", function() {
  if(filterDate.style.display === "none") {
    filterDate.style.display = "block";
    filterTitle.style.display = "block";
    icon.classList.add("icon-up");
  } else {
    filterDate.style.display = "none";
    filterTitle.style.display = "none";
    icon.classList.remove("icon-up");
  }

});
