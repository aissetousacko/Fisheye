//Mettre le code JavaScript lié à la page photographer.html

/* const photographerId = 243; */
// Get "Id" from URL of photographer's page
const photographerId = new URLSearchParams(window.location.search).get("id");

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

async function init() {
  console.log("init header");
	const photographer = await getPhotographer();
	console.log(photographer);

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

  filterIcon();
  stickyTag();

};



async function filterIcon() {
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

}



/* async function allLikes(photographerId) {
  let likes = 0;
  const data = await fetch ("data/photographers.json")
  let medias = await data.json();
  medias = medias.media.filter((media) => {
      if(media.photographerId == photographerId) {
          return medias;
      }
  })
  
} */


async function stickyTag() {
  /* const data = await fetch ("data/photographers.json")
  let medias = await data.json();
  medias = medias.media.filter((media) => {
      if(media.photographerId == photographerId) {
          return medias;
      }
  }); */

  //Tag
  const tag = document.querySelector(".tag");
  //likes
  const likes = document.createElement("div");
  likes.className = "tag-likes";
  const likesText = document.createElement("p");
  likesText.textContent = 22;
  const likesIcon = document.createElement("i");
  likesIcon.className = "fa-solid fa-heart";
  likes.appendChild(likesText);
  likes.appendChild(likesIcon);

  //price
  const price = document.createElement("span");
  price.textContent = "400€/jour";

  tag.appendChild(likes);
  tag.appendChild(price);

  return tag;
}


init();
