const commentTemplate = (avatar, message) => `
<li class="social__comment">
    <img class="social__picture" src= ${avatar} alt="Аватар комментатора фотографии" width="35" height="35">
    <p class="social__text">
        ${message}
    </p>
</li>`;

export default commentTemplate;
