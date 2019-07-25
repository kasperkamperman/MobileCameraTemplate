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

  uploadImage(base64imageUrl) {
    
    var settings = {
      "async": true,
      "url": 'https://foodhere-imageupload.azurewebsites.net/api/ImageUpload',
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
      console.log(response);
      this.setImageStatus(response);
    })
    .catch(error => {
      this.disableSpinner();
      this.setBoxShadow('rgba(255, 0, 0, 0.8)');
      console.error(error);
    });
  };
  
  setImageStatus(blobName, startTime = Date.now()) {
    
    var settings = {
      "async": true,
      "url": 'https://foodhere-imageupload.azurewebsites.net/api/ImageStatus?name=' + blobName,
      "method": "get",
      "headers": {
        "Content-Type": "text/plain",
        "cache-control": "no-cache"
      }
    };
    
    $.ajax(settings)
    .always(response => {
      
      if (response.status == 300) {
        console.log('no result yet, will retry later.')
        if (Date.now() - startTime < 20*1000) {
          setTimeout(() => this.setImageStatus(blobName, startTime), 1000);
        }
        else {
          // this.setBoxShadow('rgba(255, 127, 0, 0.8)');
        }
      }
      else if (response.status == 302) {
        this.setBoxShadow('rgba(0, 255, 0, 0.8)');  
        return;      
      }
      else if (response.status == 404) {
        this.setBoxShadow('rgba(255, 0, 0, 0.8)');   
        return;     
      }
      else 
        console.error(response);  
        return;   
      });
  }
  
  setImage(base64imageUrl) {
    let image = this.shadowRoot.querySelector('img');
    image.setAttribute('src', base64imageUrl);
  }
  
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