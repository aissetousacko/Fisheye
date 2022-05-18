//Ici se trouve le code pour la LightBox
//ajouter  médias dans les paramètres plus tard
function lightboxDOM(media) {
    const lightboxContainer = document.createElement("section");
    lightboxContainer.className = "lightbox-container";
    document.body.appendChild(lightboxContainer);

    const lightboxModal = document.createElement("div");
    lightboxModal.className = "lightbox-modal";
    //lightboxModal.textContent = "lightbox modal";
    lightboxContainer.appendChild(lightboxModal);

    const lightboxPrevious = document.createElement("button");
    lightboxPrevious.className = "lightbox-previous";
    lightboxModal.appendChild(lightboxPrevious);
    const previousIcon = document.createElement("i");
    previousIcon.className = "fa-solid fa-chevron-left";
    lightboxPrevious.appendChild(previousIcon);

    const lightboxMedia = document.createElement("div");
    lightboxMedia.className = "lightbox-media";
    lightboxModal.appendChild(lightboxMedia);
    if(media.image) {
        //image
        const lightboxImage = document.createElement("img");
        lightboxImage.className = "lightbox-image";
        lightboxImage.setAttribute("src", `assets/photographers/${media.photographerId}/${media.image}`);
        lightboxImage.setAttribute("alt", media.title);
        lightboxMedia.appendChild(lightboxImage);
    } else {
        //video
        const lightboxVideo = document.createElement("video");
        const lightboxSourceVideo = document.createElement("source")
        lightboxVideo.className = "lightbox-video";
        lightboxVideo.setAttribute("alt", media.title);
        lightboxVideo.setAttribute("controls", "");
        lightboxSourceVideo.setAttribute("src", `assets/photographers/${media.photographerId}/${media.video}`);
        lightboxSourceVideo.setAttribute("type", "video/mp4");
        lightboxMedia.appendChild(lightboxVideo);
        lightboxVideo.appendChild(lightboxSourceVideo);
    }
    //title
    const lightboxTitle = document.createElement("h3");
    lightboxTitle.className = "lightbox-title";
    lightboxTitle.textContent = media.title;
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
    lightboxContainer.style.display = "block"

    //fermeture lightbox
    lightboxClose.onclick = () => {
        lightboxContainer.style.display = "none";
        lightboxContainer.setAttribute("aria-hidden", "true");
        lightboxContainer.remove();
    }
    
}