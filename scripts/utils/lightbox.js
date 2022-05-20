let index = 0;

function diplayLightbox(mediasList) {

    //on sélectionne chaque image et vidéo pour qu'au click la lightbox s'affiche
    const mediasDom = document.querySelectorAll(".media-img, .media-video");
    //console.log(mediasDom)
    mediasDom.forEach(media => {
        //au click sur l'image du média on ouvre la lightbox
        media.onclick = (e) => {
            console.log("click")
            let currentMediaTarget = e.target;
            console.log(e.target)
            //on va chercher l'élément cliqué dans le tableau
            const currentMedia = mediasList.find((media) => media.id == currentMediaTarget.dataset.id)
            console.log("current media")
            console.log(currentMedia)
            index = parseInt(e.target.getAttribute('data-id'));
            //console.log(index)
            display(mediasList, index, currentMedia)
        }
    });
}

function display(mediasList, index, currentMedia) {
    //lightbox
    const lightboxContainer = document.createElement("div");
    lightboxContainer.className = "lightbox-container";
    document.body.appendChild(lightboxContainer);

    //lightbox modal
    const lightboxModal = document.createElement("div");
    lightboxModal.className = "lightbox-modal";
    lightboxContainer.appendChild(lightboxModal);

    //flèche précédent
    const lightboxPrevious = document.createElement("button");
    lightboxPrevious.className = "lightbox-previous";
    lightboxModal.appendChild(lightboxPrevious);
    const previousIcon = document.createElement("i");
    previousIcon.className = "fa-solid fa-chevron-left";
    lightboxPrevious.appendChild(previousIcon);

    //lightbox media (image+titre)
    const lightboxMedia = document.createElement("div");
    lightboxMedia.className = "lightbox-media";
    lightboxModal.appendChild(lightboxMedia);
    if(currentMedia.image) {
        //image
        const lightboxImage = document.createElement("img");
        lightboxImage.className = "lightbox-image";
        lightboxImage.setAttribute("src", `assets/photographers/${currentMedia.photographerId}/${currentMedia.image}`);
        lightboxImage.setAttribute("alt", currentMedia.title);
        lightboxImage.dataset.id = index;
        lightboxMedia.appendChild(lightboxImage);
    } 
    
    else if(currentMedia.video) {
        //video
        const lightboxVideo = document.createElement("video");
        const lightboxSourceVideo = document.createElement("source")
        lightboxVideo.className = "lightbox-video";
        lightboxVideo.setAttribute("alt", currentMedia.title);
        lightboxVideo.setAttribute("controls", "");
        lightboxVideo.dataset.id = index;
        lightboxSourceVideo.setAttribute("src", `assets/photographers/${currentMedia.photographerId}/${currentMedia.video}`);
        lightboxSourceVideo.setAttribute("type", "video/mp4");
        lightboxMedia.appendChild(lightboxVideo);
        lightboxVideo.appendChild(lightboxSourceVideo);
    }
    //title
    const lightboxTitle = document.createElement("h3");
    lightboxTitle.className = "lightbox-title";
    lightboxTitle.textContent = currentMedia.title;
    lightboxMedia.appendChild(lightboxTitle);

    //close
    const lightboxClose = document.createElement("button");
    lightboxClose.className = "lightbox-close";
    lightboxModal.appendChild(lightboxClose);
    const closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    lightboxClose.appendChild(closeIcon);
    //next
    const lightboxNext = document.createElement("button");
    lightboxNext.className = "lightbox-next";
    lightboxModal.appendChild(lightboxNext);
    const nextIcon = document.createElement("i");
    nextIcon.className = "fa-solid fa-chevron-right";
    lightboxNext.appendChild(nextIcon);

    lightboxContainer.setAttribute("aria-hidden", "false");
    lightboxContainer.style.display = "block";

    eventHandler(mediasList, currentMedia);
}

function eventHandler(mediasList, currentMedia) {
    const lightboxClose = document.querySelector(".lightbox-close");
    const lightboxPrevious = document.querySelector(".lightbox-previous");
    const lightboxNext = document.querySelector(".lightbox-next");

    lightboxClose.onclick = () => {
        closeLightbox();
    }

    lightboxPrevious.onclick = () => {
        displayPrevious(mediasList, currentMedia);
    }
    
    lightboxNext.onclick = () => {
        displayNext(mediasList, currentMedia);
    }

    document.addEventListener("keydown", (e) => {
        if(e.key === "ArrowLeft") {
            displayPrevious(mediasList, currentMedia);
        } else if(e.key === "ArrowRight") {
            displayNext(mediasList, currentMedia);
        } else if(e.key === "Escape") {
            closeLightbox();
        }
    })
}

function closeLightbox() {
    const lightboxContainer = document.querySelector(".lightbox-container");
    lightboxContainer.style.display = "none";
    lightboxContainer.setAttribute("aria-hidden", "true");
    lightboxContainer.remove();
}

function displayNext(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);

    //console.log(index)
    if(index === mediasList.length - 1) {
        currentMedia = mediasList[0]
    } else {
        currentMedia = mediasList[index + 1]
    }

    document.querySelector(".lightbox-container").remove();
    
    display(mediasList, index, currentMedia)
}

function displayPrevious(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);

    //console.log(index)
    if(index === 0) {
        currentMedia = mediasList[mediasList.length - 1]
    } else {
        currentMedia = mediasList[index - 1]
    }

    document.querySelector(".lightbox-container").remove();
    
    display(mediasList, index, currentMedia)
}
