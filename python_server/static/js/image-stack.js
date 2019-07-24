console.log("loading image-stack.js ...")
function pushImage(url) {

    console.log("pushing image url " + url)

    let imgUrl1 = url;
    let imgUrl2 = $('#img1').attr('src');
    let imgUrl3 = $('#img2').attr('src');
    let imgUrl4 = $('#img3').attr('src');
    let imgUrl5 = $('#img4').attr('src');
    let imgUrl6 = $('#img5').attr('src');
    let imgUrl7 = $('#img6').attr('src');

    $('#img1').attr('src', imgUrl1);
    $('#img2').attr('src', imgUrl2);
    $('#img3').attr('src', imgUrl3);
    $('#img4').attr('src', imgUrl4);
    $('#img5').attr('src', imgUrl5);
    $('#img6').attr('src', imgUrl6);
    $('#img7').attr('src', imgUrl7);

}

function getRandomColor() {

    console.log("getting random color");

    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$(document).ready(function(){

    console.log("takePhotoButton clicked")
    let newImage = 'https://via.placeholder.com/150/' + getRandomColor();
    pushImage(newImage);

});