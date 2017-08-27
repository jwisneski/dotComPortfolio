// scroll page to section
function scrollPage(pageSection){
    // get code from current site
    // might need ID's
}

function showText( ){
    // show ',well'
    $('.me span').css('opacity', '1');
}

$(document).ready(function () {
    //Detect Browser
    //var browser = navigator.userAgent;
    //browser=browser.toString( );

    // for smaller screens, show ',well' on home
    var width=$(window).width();
    if(width<601){
        setTimeout(showText, 800);
    }

    // Highlights for pagination dots/sections
    $('.pagination>div').on('mouseenter', function(e){
        $(this).children('p').css('opacity', '1');
     });

     $('.pagination>div').on('mouseleave', function(e){
         $(this).children('p').css('opacity', '0');
      });

      $('.pagination>div').on('click', function(e){
          //scroll to that section
          var pageSection = $(this).children('p').text();
          scrollPage(pageSection);
          console.log(pageSection);
       });
});
