
var $overlay =$('<div id="overlay"></div');
var $image=$("<img>");
var $caption=$("<p></p>");
//Keep track of image index for prev/next, using a list index
//position to determine where we are and what it means to move forward
//and backwards by 1.
var $index = 0;

//get the list items from the imageGallery element and
//we are assigning the length total
//making it flexible to expand the gallery or take away
var $galleryLength = $("#imageGallery li").length;

//Add overlay
$('body').append($overlay);
//add an image
$overlay.append($image);

//add a caption to overlay
$overlay.append($caption);

// Add nav buttons and assign unique ids
$overlay.append("<button id='btnPrev'> < </button>");
$overlay.append("<button id='btnNext'> > </button>");


// Update image overlay
//
var updateImage = function(imageLocation, captionText){

  //1.2 update the overlay with the image linked in the link
  $image.attr("src", imageLocation);

  //1.3 Get child <img> alt atrbute and set caption
  $caption.text(captionText);
};


//capture the click event on a link to an image
$('#imageGallery a').click(function(event){
  event.preventDefault();
  var imageLocation = $(this).attr('href');
  //get the child's alt attribute
  var captionText =$(this).children("img").attr("alt");

  //update index to current selected image
    $index = $(this).parent().index();
  //this is calling that new Update overlay function above
      updateImage(imageLocation, captionText);

  //show the overlay
  $overlay.slideDown(imageLocation);
  });

//Button prev next function
var prevNext = function(prev ) {
  //set prev to true to move backwards in the index

  //if flag set move backwards, if not move forwards
  if(!prev) { $index++; }
  else { $index--; }

  //if out of index reset
  if ($index < 0) { $index = $galleryLength-1;}
  if ($index > 10) { $index = 0; }

  //Grab the element by index and then get the link
  var newImgSelected = $("#imageGallery li").get($index).getElementsByTagName("a");

  //grab link information
  var imageLocation = $(newImgSelected).attr("href");
  var textCaption =  $(newImgSelected).children("img").attr("alt");

  //Update Overlay
  updateImage(imageLocation, textCaption);
};

//Button events

$("#btnPrev").click(function(event){
  prevNext(true);
});

$("#btnNext").click(function(event){
  prevNext();
});

//keyboard nav of photos on overlay/lightbox..


$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        $("#btnPrev").click();
        break;

        case 38: // up
        break;

        case 39: // right
        $("#btnNext").click();
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


////keboard nav of gallery photos

var li = $('li');
var liSelected;
$(window).keydown(function(e){
    if(e.which === 39){
        if(liSelected){
            liSelected.removeClass('selected');
            next = liSelected.next();
            if(next.length > 0){
                liSelected = next.addClass('selected');
            }else{
                liSelected = li.eq(0).addClass('selected');
            }
        }else{
            liSelected = li.eq(0).addClass('selected');
        }
    }else if(e.which === 37){
        if(liSelected){
            liSelected.removeClass('selected');
            next = liSelected.prev();
            if(next.length > 0){
                liSelected = next.addClass('selected');
            }else{
                liSelected = li.last().addClass('selected');
            }
        }else{
            liSelected = li.last().addClass('selected');
        }
    }

  });


//keyboard return select of gallery image....NOT working
  document.getElementById("#imageGallery a")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("#imageGallery a").click();
    }
});






//3. When overlay is clicked
$overlay.click(function(event){
  //3.1 Hide the overlay

    if(event.target.id == "overlay")
    $(this).slideUp("fast");

});

//search box filtering of gallery
    // Declare variables
    function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById('textinput');
    filter = input.value.toUpperCase();
    ul = document.getElementById('imageGallery');
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }

    }

}
///animation below did not work.....
//$('img').animate({ppadding: '8px';
//margin: '10px';},slow);
