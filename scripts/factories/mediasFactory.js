function mediasFactory(data) {
    const { photographerId, id, title, image, video, likes } = data;

    function getMediaCardDOM() {

        const mediaArticle = document.createElement('article');
        mediaArticle.setAttribute("id", id);
        mediaArticle.className = "media-article";

        if("video" in data) {
            const videoFile = `assets/photographers/${photographerId}/${video}`;
            // vidéo
            const videoElement = document.createElement('video');
            videoElement.className = "media-video";
            videoElement.setAttribute("controls", "");
            videoElement.setAttribute("tabindex", "0");
            videoElement.dataset.id = id
            const sourceVideo = document.createElement('source');
            sourceVideo.setAttribute("src",videoFile);
            sourceVideo.setAttribute("type","video/mp4");
            
            mediaArticle.appendChild(videoElement);
            videoElement.appendChild(sourceVideo);
        } else {
            const picture = `assets/photographers/${photographerId}/${image}`;
            //image
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            img.setAttribute("tabindex", "0");
            img.dataset.id = id
            img.className = "media-img";
            mediaArticle.appendChild(img);
        }

        // Div for title, likes and heart icon
        const mediaDescription = document.createElement('div');
        mediaDescription.className = "media-description";
        mediaArticle.appendChild(mediaDescription);       
        const mediaText = document.createElement("h3");
        mediaText.textContent = title;
        mediaDescription.appendChild(mediaText);

        // Div for numbers of likes and heart icon
        const mediaLikes = document.createElement("div");
        mediaLikes.className= "media-likes";
        mediaDescription.appendChild(mediaLikes);
        const span = document.createElement("span");
        span.textContent = likes;
        const icon = document.createElement("i");
        icon.className = "fa-solid fa-heart icon-heart";
        icon.setAttribute("tabindex", 0);
        icon.setAttribute("title", "Like icon");
        icon.setAttribute("role","button");
        mediaLikes.appendChild(span);
        mediaLikes.appendChild(icon);

        
        return mediaArticle;
    }

    return { getMediaCardDOM }
}
