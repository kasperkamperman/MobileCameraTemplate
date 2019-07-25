const currentDocument = document.currentScript.ownerDocument;

class UploadableImage extends HTMLElement {
  
  connectedCallback() {
    console.log('connectedCallback');
    
    const template = currentDocument.querySelector('#uploadable-image-template');
    const instance = template.content.cloneNode(true);
    
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(instance);
    
    let image = this.shadowRoot.querySelector('img');
    let base64imageUrl = this.getAttribute('url');
    image.setAttribute('src', base64imageUrl);
    
    this.uploadImage(base64imageUrl);
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
      this.setBoxShadow('green');
      console.log(response);
    })
    .catch(error => {
      this.setBoxShadow('red');
      console.error(error);
    });
  };
  
  
  disableSpinner() {
    console.log('disableSpinner');
  }
  
  setBoxShadow(color) {
    console.log(color);
  }
  
}

customElements.define('uploadable-image', UploadableImage);