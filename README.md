# Mobile (and Desktop) Camera App Template (HTML, CSS, JS and WebRTC)

I like to experiment with Computer Vision and AI API's (like Azure Cognetive Services, Google Cloud Vision, IBM Watson) to see if I can utilise them for some ideas. 

The most easy way to test those scripts and APIs them is by directly making a photo and sending image data to the API/script, instead of uploading files. I didn't find a fast mobile first camera template for HTML5 as a starting point for my prototypes, so I developed one myself. The interface setup is mainly inspired by the standard Android and iOS Cameras.

The template doesn't do anything with the image(canvas) data yet, I'll leave that up to you. 

Feel free to use it in your next Computer Vision or AI project. 

### Requirements

- WebRTC is only supported on secure connections. So you need to serve it from https. 
*You can test and debug in Chrome from localhost though (this doesn't work in Safari).* 

- A recent OS and browser. It should work on recent Phones and OS-es. If it isn't, please 
  let me know (issue) (including a suggestion to fix it). Also add the debugging info in the console.

### Functionalities

- Fullscreen mode (not on Safari mobile (iOS))
- Take Photo
- Flip Camera (environment / user)
- Supports both portrait and landscape mode

**Check the [demo](https://demo.kasperkamperman.com/mobilecamtemplate/)**

## Used Libraries:

- Fullscreen functionality: [Screenfull.js](https://github.com/sindresorhus/screenfull.js/)
- Detect WebRTC support: [DetectRTC.js](https://www.webrtc-experiment.com/DetectRTC/)
- WebRTC cross-browser: [Adapter.js](https://github.com/webrtc/adapter)
- UI click sound: [Howler.js](https://howlerjs.com)

## Used Assets:

- ["Basic Click Wooden"](https://freesound.org/people/GameAudio/sounds/220200/) - by [GameAudio](https://www.gameaudio101.com)
- [Material Design Icons](https://material.io/icons/) (camera front, camera rear, photo camera, fullscreen, fullscreen exit)

## Tested with:

- Chrome Android 8.0 (Nokia 5)
- Chrome 65 - MacOs 10.12.6
- Safari 11.0.3 - MacOs 10.12.6
- Safari mobile - iOS 11

## Created by 

[Kasper Kamperman](https://www.kasperkamperman.com/blog/camera-template/)

Credits and a link to my website are always appreciated. 
I'm always curious how people end up using my stuff, so
feel free to [mail](https://www.kasperkamperman.com/contact/) or [send a tweet @kasperkamperman](https://twitter.com/kasperkamperman). 

## Good WebRTC resources

- https://webrtc.github.io/samples/
- https://www.webrtc-experiment.com/
- https://www.html5rocks.com/en/tutorials/getusermedia/intro/
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia