function mediasFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price, index } = data;

    function getMediaCardDOM() {

        const mediaArticle = document.createElement('article');
        mediaArticle.classList.add("media-article");

        if("video" in data) {
            const videoFile = `assets/photographers/MimiKeel/${video}`;
            // vidéo
            const videoElement = document.createElement('video');
            videoElement.classList.add("media-video");
            videoElement.setAttribute("controls", "");
            const sourceVideo = document.createElement('source');
            sourceVideo.setAttribute("src",videoFile);
            sourceVideo.setAttribute("type","video/mp4");
            
            mediaArticle.appendChild(videoElement);
            videoElement.appendChild(sourceVideo);
        } else {
            const picture = `assets/photographers/MimiKeel/${image}`;
            //image
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            img.classList.add("media-img");
            mediaArticle.appendChild(img);
        }

        // Div pour titre, nombre de likes et icone coeur
        const mediaDescription = document.createElement('div');
        mediaDescription.className = 'media-description';
        mediaArticle.appendChild(mediaDescription);       
        const mediaText = document.createElement('h3');
        mediaText.textContent = title;
        mediaDescription.appendChild(mediaText);

        // Div pour nombre de likes et icone coeur
        const mediaLikes = document.createElement('div');
        mediaLikes.className= 'media-likes';
        mediaDescription.appendChild(mediaLikes);
        const span = document.createElement('span');
        span.textContent = likes;
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-heart icon-heart';
        icon.setAttribute("tabindex", 0);
        icon.setAttribute("title", "Like icon");
        icon.setAttribute("role","button");
        mediaLikes.appendChild(span);
        mediaLikes.appendChild(icon);

        
        return mediaArticle;
    }

    return { getMediaCardDOM }
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
    
    console.log(photographerId)
    console.log(medias)
    
    const photographerMediasSection = document.querySelector(".medias-display");
  
    medias.forEach(media => {
        // Si le photographerId de chaque media = à l'Id du photographe
        if (media.photographerId == photographerId) {
            // Alors on affiche le media sur la page dans la section .photograph-medias
            // Récupération de chaque media en le faisant passer dans la MediasFactory
            const photographerMedia = new mediasFactory(media);  
            console.log(photographerMedia);    
            // Mise en forme de chaque média dans le DOM
            const mediaCardDOM = photographerMedia.getMediaCardDOM();
            photographerMediasSection.appendChild(mediaCardDOM);       
        } 
    });
}

getMedias();