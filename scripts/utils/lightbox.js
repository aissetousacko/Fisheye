//lightbox container
const lightboxContainer = document.createElement("div");
lightboxContainer.className = "lightbox-container";
lightboxContainer.style.display = "none";
lightboxContainer.setAttribute("aria-hidden", "true");
document.body.appendChild(lightboxContainer);

let index = 0;

//On click event on all medias
function diplayLightbox(mediasList) {
    const mediasDom = document.querySelectorAll(".media-img, .media-video");

    mediasDom.forEach(media => {
        media.onclick = (e) => {
            let currentMediaTarget = e.target;
            //Get the element in the array mediasList
            let currentMedia = mediasList.find((media) => media.id == currentMediaTarget.dataset.id)
            index = parseInt(e.target.getAttribute('data-id'));
            lightboxDOM(currentMedia, index, mediasList)
        }

        //Keyboard event
        media.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                let currentMediaTarget = e.target;
                let currentMedia = mediasList.find((media) => media.id == currentMediaTarget.dataset.id)
                index = parseInt(e.target.getAttribute('data-id'));
                lightboxDOM(currentMedia, index, mediasList)
            }
        })
    })
}

//DOM of the lightbox
function lightboxDOM(currentMedia, index, mediasList) {

    const { photographerId, title, image, video } = currentMedia

    lightboxContainer.style.display = "block";
    lightboxContainer.setAttribute("aria-hidden", "false");

    //Lightbox modal
    const lightboxModal = document.createElement("div");
    lightboxModal.className = "lightbox-modal";
    lightboxContainer.appendChild(lightboxModal);

    //Previous
    const lightboxPrevious = document.createElement("button");
    lightboxPrevious.className = "lightbox-previous";
    lightboxModal.appendChild(lightboxPrevious);
    const previousIcon = document.createElement("i");
    previousIcon.className = "fa-solid fa-chevron-left";
    lightboxPrevious.appendChild(previousIcon);

    //Lightbox media (image + title)
    const lightboxMedia = document.createElement("div");
    lightboxMedia.className = "lightbox-media";
    lightboxModal.appendChild(lightboxMedia);
    if("image" in currentMedia) {
        //image
        const lightboxImage = document.createElement("img");
        lightboxImage.className = "lightbox-image";
        lightboxImage.setAttribute("src", `assets/photographers/${photographerId}/${image}`);
        lightboxImage.setAttribute("alt", title);
        lightboxImage.dataset.id = index;
        lightboxMedia.appendChild(lightboxImage);
    } 
    else {
        //video
        const lightboxVideo = document.createElement("video");
        const lightboxSourceVideo = document.createElement("source")
        lightboxVideo.className = "lightbox-video";
        lightboxVideo.setAttribute("alt", title);
        lightboxVideo.setAttribute("controls", "");
        lightboxVideo.dataset.id = index;
        lightboxSourceVideo.setAttribute("src", `assets/photographers/${photographerId}/${video}`);
        lightboxSourceVideo.setAttribute("type", "video/mp4");
        lightboxMedia.appendChild(lightboxVideo);
        lightboxVideo.appendChild(lightboxSourceVideo);
    }
    //Title
    const lightboxTitle = document.createElement("h3");
    lightboxTitle.className = "lightbox-title";
    lightboxTitle.textContent = title;
    lightboxMedia.appendChild(lightboxTitle);

    //Close
    const lightboxClose = document.createElement("button");
    lightboxClose.className = "lightbox-close";
    lightboxModal.appendChild(lightboxClose);
    const closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    lightboxClose.appendChild(closeIcon);

    //Next
    const lightboxNext = document.createElement("button");
    lightboxNext.className = "lightbox-next";
    lightboxModal.appendChild(lightboxNext);
    const nextIcon = document.createElement("i");
    nextIcon.className = "fa-solid fa-chevron-right";
    lightboxNext.appendChild(nextIcon);

    eventHandler(mediasList, currentMedia);
}

//Manage all events
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

//Close the lightbox
function closeLightbox() {
    const lightboxContainer = document.querySelector(".lightbox-container");
    lightboxContainer.style.display = "none";
    lightboxContainer.setAttribute("aria-hidden", "true");
}

//Display the next media
function displayNext(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);
    if(index === mediasList.length - 1) {
        currentMedia = mediasList[0]
    } else {
        currentMedia = mediasList[index + 1]
    }

    lightboxContainer.innerHTML = "";
    
    lightboxDOM(currentMedia, index, mediasList)
}

//Display the previous media
function displayPrevious(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);
    if(index === 0) {
        currentMedia = mediasList[mediasList.length - 1]
    } else {
        currentMedia = mediasList[index - 1]
    }

    lightboxContainer.innerHTML = "";
    
    lightboxDOM(currentMedia, index, mediasList)
}
