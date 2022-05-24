
// Get the ID from the URL of the photographer's page
const photographerId = new URLSearchParams(window.location.search).get("id");
//Array of all the photographer's medias
let mediasList = [];
let namePhotographer;

//Get the photographer's infos
async function getPhotographer() {
	const data = await fetch("../data/photographers.json");
  const photographers = await data.json();

  //Return the photographer with the same ID
	const photographer = photographers.photographers.filter(function(photographer) {
		if(photographer.id == photographerId) {
      namePhotographer = photographer.name;
			return photographer;
		}
	});

	return photographer[0];
}

//Get the medias of the photographer
async function getMedias() {
  const data = await fetch ("data/photographers.json")
  let medias = await data.json();

  medias = medias.media.filter((media) => {
    if(media.photographerId == photographerId) {
      return medias;
    }
  })
}

//Display the medias in the page
function displayMedia(medias) {
  const photographerMediasSection = document.querySelector(".medias-display");
  photographerMediasSection.innerHTML = "";
  
  medias.forEach(media => {
    const photographerMedia = new mediasFactory(media);     
    const mediaCardDOM = photographerMedia.getMediaCardDOM();
    photographerMediasSection.appendChild(mediaCardDOM);
    mediasList.push(media)
  });
  
}

let isOpen = false;
//Management of the filter style
function filterDisplay() {
  const icon = document.querySelector(".icon-filter");
  const filterOptionsBox = document.querySelector(".filter-select-options");
  const selected = document.querySelector(".selected");
  
  selected.onclick = () => {
    if(isOpen) {
      closeBox();
    } else {
      filterOptionsBox.style.display = "flex";
      filterOptionsBox.setAttribute("aria-expanded", "true");
      icon.classList.add("icon-rotate");
      filterOptionsBox.classList.add("open")
      isOpen = true;
    }
  }
}

//Close the filter
function closeBox() {
  const icon = document.querySelector(".icon-filter");
  icon.classList.remove("icon-rotate");
  const filterOptionsBox = document.querySelector(".filter-select-options");
  
  filterOptionsBox.style.display = "none";
  filterOptionsBox.setAttribute("aria-expanded", "false");
  return isOpen = false
  
}

//Get sorted medias
function sortMedias(medias) {
  const filterOptions = document.querySelectorAll(".filter-option");
  const selected = document.querySelector(".selected");
  
  //Sort medias by popularity in default
  medias = medias.sort((media1, media2) => {
    return media2.likes - media1.likes;
  });
  displayMedia(medias)
  diplayLightbox(mediasList)

  filterOptions.forEach(filter => {
    filter.onclick = (e) => {

      switch (e.target.textContent) {
        case "Popularité":
          medias = medias.sort((media1, media2) => {
            return media2.likes - media1.likes;
          });
          break;

        case "Date":
          medias = medias.sort((media1, media2) => {
            return new Date(media2.date) - new Date(media1.date)
          });
          break;
    
        case "Titre":
          medias = medias.sort((media1, media2) => {
            return media1.title.localeCompare(media2.title);
          });
          break;
      }

      //change the text in the filter
      const buttonSelected = filter.textContent
      filter.textContent = selected.textContent
      selected.textContent = buttonSelected;

      closeBox()
      displayMedia(medias)
      incrementLikes()
      diplayLightbox(mediasList)
      
    }
    
  })

}

//Get all likes
function allLikes(media) {
  let sum = 0;
  media.forEach(like => {
    sum += like.likes
  });
  const allLikes = document.querySelector(".tag-likes p");
  allLikes.textContent = sum;
  return sum;
}

//Sticky bar in the bottom right of the page
function stickyTag(photographer) {
  const tag = document.querySelector(".tag");

  const likes = document.createElement("div");
  likes.className = "tag-likes";
  const likesText = document.createElement("p");
  const likesIcon = document.createElement("i");
  likesIcon.className = "fa-solid fa-heart";
  likes.appendChild(likesText);
  likes.appendChild(likesIcon);

  const price = document.createElement("span");
  price.textContent = photographer.price + "€/jour";

  tag.appendChild(likes);
  tag.appendChild(price);

  return tag;
}

//Increment and decrement the likes
function incrementLikes() {
  const likesIcon = document.querySelectorAll(".icon-heart");
  const allLikes = document.querySelector(".tag-likes p");

  likesIcon.forEach(like => {
    //Onclick event
    like.onclick = () => {
      increment(like);
    }

    //Keyboard event
    like.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
        increment(like)
      }
    })
  })

  //Increment the text of the number of likes in the media-article and the sticky bar
  function increment(like) {
    let likeText = like.previousElementSibling;

    if(likeText.classList.contains("liked")) {
      likeText.classList.remove("liked");
      likeText.textContent--;
      allLikes.textContent--;
    } else {
      likeText.classList.add("liked");
      likeText.textContent++;
      allLikes.textContent++;
    }
  }
}

//Execute functions
async function init() {
  //Init the header
	const photographer = await getPhotographer();
  //Photographer header
  const photographerData = photographerFactory(photographer);
  photographerData.getPhotographerHeader();

  getPhotographerName(namePhotographer);
  //Get all medias
  const medias = await getMedias();

  sortMedias(medias);
  filterDisplay();
  stickyTag(photographer);
  allLikes(medias)
  incrementLikes()
};  

init();
