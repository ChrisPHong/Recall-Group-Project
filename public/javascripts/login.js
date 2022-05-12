const divClose = document.querySelector('#loginGrey')

window.addEventListener('DOMContentLoaded', event => {
    document
        .querySelector('video')
        .addEventListener('click', event => {
            event.stopPropagation();
            video.play();
        });
});
