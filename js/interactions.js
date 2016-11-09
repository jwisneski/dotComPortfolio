$(document).ready(function ( ) {
  $('.copyEmail').on('click tap', function (event) {
        event.preventDefault();

        //Detect Browser
        var browser = navigator.userAgent;

        //Customize Copy Message
        if(browser.includes('Macintosh')){
            console.log('Mac');
            $('.emailHint').html('&#8984; + C to copy');

        }else if(browser.includes('iPhone') || browser.includes('iPad') || browser.includes('iPod')){

            //need to change input to non-text area to copy !!!!!!!!!

            $('.emailHint').html('Press and hold to copy');

        }else if(browser.includes('Windows')){
            $('.emailHint').html('CTRL + C to copy');
        }

        $('textarea.copyEmail').focus().select();
        $('.emailHint').removeClass('hidden');
    });

    $('.copyEmail' ).on('focusout', function (event) {
        $('.emailHint').addClass('hidden');
    });
});
