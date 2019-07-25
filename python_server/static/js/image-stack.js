console.log("loading image-stack.js ...")

function pushImageToStackView(url) {

    console.log("pushing image url with length: " + (url || '').length)

    let uploadableImage = document.createElement('uploadable-image');
    uploadableImage.setAttribute('url', url);

    let container = $('#image-stack-container0');
    container.prepend(uploadableImage);
    
    console.log("container.children().length: " + container.children().length)
    if (container.children().length > 7) {
        container.children().last().remove();
    }
}