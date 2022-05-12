//Mettre le code JavaScript lié à la page photographer.html

/* const photographerId = 243; */
// Get "Id" from URL of photographer's page
const photographerId = new URLSearchParams(window.location.search).get("id");

/*****Affichage des informations du photographe******/
//on récupère le photographe
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

/**Pour récupérer les médias**/
async function getMedias() {
  console.log("init medias")
  const data = await fetch ("data/photographers.json")
  let medias = await data.json();
  medias = medias.media.filter((media) => {
    if(media.photographerId == photographerId) {
        return medias;
    }
  })
  /* console.log("photographer ID")
  console.log(photographerId)
  console.log("tous les médias")
  console.log(medias) */
  
  return medias;
  //on sélectionne l'endroit où les médias doivent s'afficher
  /* const photographerMediasSection = document.querySelector(".medias-display");

  //on parcourt tous les médias
  medias.forEach(media => {
      // Si le photographerId de chaque media = à l'Id du photographe
      if (media.photographerId == photographerId) {
          // Alors on affiche le media sur la page dans la section .photograph-medias
          // mise au bon format avec le mediaFactory
          const photographerMedia = new mediasFactory(media);     
          // Mise en forme de chaque média dans le DOM
          const mediaCardDOM = photographerMedia.getMediaCardDOM();
          photographerMediasSection.appendChild(mediaCardDOM);       
      } 
  }); */
  
}

function displayMedia(medias) {
  //on sélectionne l'endroit où les médias doivent s'afficher
  const photographerMediasSection = document.querySelector(".medias-display");
  //console.log(medias);
  //on parcourt tous les médias
  medias.forEach(media => {
      // Si le photographerId de chaque media = à l'Id du photographe
      
          // Alors on affiche le media sur la page dans la section .photograph-medias
          // mise au bon format avec le mediaFactory
          const photographerMedia = new mediasFactory(media);     
          // Mise en forme de chaque média dans le DOM
          const mediaCardDOM = photographerMedia.getMediaCardDOM();
          photographerMediasSection.appendChild(mediaCardDOM);       
      } 
  );
}

function filterIcon() {
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

function allLikes(media) {
  let sum = 0;
  media.forEach(like => {
    sum += like.likes
  });
  //console.log(sum);

  const allLikes = document.querySelector(".tag-likes p");
  //console.log(allLikes);
  allLikes.textContent = sum;
  return sum;
}


function stickyTag(photographer) {
  

  //Tag
  const tag = document.querySelector(".tag");
  //likes
  const likes = document.createElement("div");
  likes.className = "tag-likes";
  const likesText = document.createElement("p");
  const likesIcon = document.createElement("i");
  likesIcon.className = "fa-solid fa-heart";
  likes.appendChild(likesText);
  likes.appendChild(likesIcon);

  //price
  const price = document.createElement("span");
  price.textContent = photographer.price + "€/jour";

  tag.appendChild(likes);
  tag.appendChild(price);

  return tag;
}

//onc rée une event qui target les coeurs et augmente leur nombre
function incrementLikes() {
  const likesIcon = document.querySelectorAll(".icon-heart");
  const allLikes = document.querySelector(".tag-likes p");
  //console.log(likesIcon)
  //console.log(allLikes)

  //on parcourt tous les icones likes
  for(let i = 0; i < likesIcon.length; i++) {
    //sur chaque icone on met un event click
    likesIcon[i].onclick = () => {
      //on récupère l'élément qui contient le texte du nombre des likes
      let likeText = likesIcon[i].previousElementSibling;
      //console.log(likeText)
      //si l'élément contient la classe liked on décrémente sinon on incrémente
      if(likeText.classList.contains("liked")) {
        likeText.textContent--;
        likeText.classList.remove("liked");
        allLikes.textContent--;
      } else {
        likeText.textContent++;
        likeText.classList.add("liked");
        allLikes.textContent++;
      }
    }
  }
  
  
}

async function init() {
  //console.log("init header");
	const photographer = await getPhotographer();
	//console.log(photographer);


  //Photographer header
  const photographerData = photographerFactory(photographer);
  photographerData.getPhotographerHeader();

  //on récupère tous les médias
  /* getMedias(); */
  const medias = await getMedias();
  displayMedia(medias);
  
  filterIcon();
  stickyTag(photographer);
  allLikes(medias)
  incrementLikes()
  
};  

init();
