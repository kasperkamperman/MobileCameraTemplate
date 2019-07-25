const currentDocument = document.currentScript.ownerDocument;

class UploadableImage extends HTMLElement {
  
  connectedCallback() {
    console.log('connectedCallback');
    
    const template = currentDocument.querySelector('#uploadable-image-template');
    const instance = template.content.cloneNode(true);
    
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(instance);
    
    let base64imageUrl = this.getAttribute('url');    
    this.setImage(base64imageUrl);
    this.uploadImage(base64imageUrl);
  }
  
  setImage(base64imageUrl) {
    let image = this.shadowRoot.querySelector('img');
    image.setAttribute('src', base64imageUrl);
  }

  uploadImage(base64imageUrl) {
    
    var settings = {
      "async": true,
      "url": imageUplodaUri,
      "method": "POST",
      "headers": {
        "Content-Type": "text/plain",
        "cache-control": "no-cache"
      },
      "data": base64imageUrl.substr(23) //remove 'data:image/jpeg;base64,' prefix from dataurl
    };
    
    $.ajax(settings)
    .done(response => {
      this.disableSpinner();
      this.setBoxShadow('rgba(0, 255, 0, 0.8)');
      console.log(response);
    })
    .catch(error => {
      this.disableSpinner();
      this.setBoxShadow('rgba(255, 0, 0, 0.8)');
      console.error(error);
    });
  };
  
  
  disableSpinner() {
    console.log('disableSpinner');
    let spinner = this.shadowRoot.querySelector('.cssload-loader');
    spinner.parentNode.removeChild(spinner);
  }
  
  setBoxShadow(grbaColor) {
    console.log(grbaColor);
    let container = this.shadowRoot.querySelector('.image-inner-container');
    container.style.boxShadow = "0px 0px 3px 3px " + grbaColor
  }
  
}

customElements.define('uploadable-image', UploadableImage);