function swapClasses(newClass){
    $('.active').removeClass('active');
    $(newClass).addClass('active');
}

$(document).ready(function () {
    //Detect Browser
    var browser = navigator.userAgent;

    //Customize Copy Message
    if(navigator.userAgent.search("Firefox")){
        $('.container').addClass('hidden');
        $('nav').addClass('hidden');

        $('errorMessage').removeClass('hidden');
    }

    var contactOpen = false;
    var home;

    if($('#about').length > 0){
        home=true;
    }

    if(home){
        // default scroll variables
        aboutScroll = $('#about').offset().top + $('#about').height();
        resumeScroll = $('#resume').offset().top + $('#resume').height();
        projectsScroll = $('#projects').offset().top + $('#projects').height();
        processScroll = $('#process').offset().top + $('#process').height();
    }

    stop=0;
    lastStop=0;
    scrollDistance=0

    /*
    // override pushstate for chrome and android
    $(document).bind('mobileinit',function(){
        $.mobile.changePage.defaults.changeHash = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;
    });*/


    // Contact function needs to be specific to the one you're clicking
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

        $(this).focus().select();
        $('.emailHint').removeClass('hidden');
    });

    $('.copyEmail' ).on('focusout', function (event) {
        $('.emailHint').addClass('hidden');
    });

    $( window ).resize(function(){
        if(home){
            // reset scroll variables for new heights
            aboutScroll = $('#about').offset().top + $('#about').height();
            resumeScroll = $('#resume').offset().top + $('#resume').height();
            projectsScroll = $('#projects').offset().top + $('#projects').height();
            processScroll = $('#process').offset().top + $('#process').height();
        }
    });

    // scroll function changes "active" based on scrolling
    $(window).on('scroll',function(){

        // we round here to reduce a little workload
        lastStop=stop;
        stop = Math.round($(window).scrollTop());

        if(!home){
            if(stop<lastStop){
                //check if we're scrolling up add to distance calc
                scrollDistance++;
            }else{
                //otherwise we're scrolling down, reset the distance calc
                scrollDistance=0;
            }

            if(scrollDistance>49){
                // if general direction is up, show next/previous projects
                $('.nextPreviousProjects').addClass('nextPreviousProjectsShown');
            }else{
                // otherwise hide the panel
                $('.nextPreviousProjects').removeClass('nextPreviousProjectsShown');
            }
        }

        if(home){
            if (stop < projectsScroll) {
                // we're above the bottom of projects
                if (stop < resumeScroll){
                    //we're above the bottom of resume
                    if (stop < aboutScroll){
                        swapClasses('.aboutLink');
                    }else{
                        swapClasses('.resumeLink');
                    }
                }else{
                    swapClasses('.projectsLink');
                }
            } else{
                //we're not above the bottom of projects
                swapClasses('.processLink');
            }
        }
    });

    $('a').on('click tap', function (event) {
        if(event.target.className=='toProject'){
            //open link with an ajax call eventually
            //event.preventDefault();
        }else if(event.target.className=='toExternal'
                    || event.target.className=='toResume'){
            //do nothing, just go to the link in a new window
        }else{
            //stay on this page

            if(home){
                event.preventDefault();

                // get first class name (not .active)
                var linkName = event.target.className.split(' ')[0];

                // get the section name
                linkName = linkName.replace('Link', ' ');
                linkName = '#' + linkName;

                $('html, body').animate({
                    scrollTop: $(linkName).offset().top - 60
                }, 500, 'swing');
            }
        }
    });

    $('.contactBtn').on('click tap', function (event){
        if(contactOpen){
            // remove the contact feature and unblur the background
            $('.container').removeClass('blurEffect');
            $('nav').removeClass('blurEffect');

            $('.whiteOverlay').addClass('hidden');

            // remove the click/tap function for container (contact sheet is closed)
            $( '.whiteOverlay').unbind('click tap');
        }else{
            // add the contact feature and unblur the background
            $('.container').addClass('blurEffect');
            $('nav').addClass('blurEffect');

            $('.whiteOverlay').removeClass('hidden');

            setTimeout(function(){
                // creates a listener for clicking outside of the contact form to close
                $('.whiteOverlay').bind('click tap', function (){
                    //remove the contact feature and unblur the background
                    $('.container').removeClass('blurEffect');
                    $('nav').removeClass('blurEffect');

                    $('.whiteOverlay').addClass('hidden');
                });
                // delay the listener so the initial click is not registered
            }, 100);
        }
        contactOpen= !contactOpen;
    });

    var processSlide = 1;

    $('.process').on('mouseover', function (event) {
        if(processSlide>1){
            $('.processBack').removeClass('hidden');

            if(processSlide<5){
                //show both arrows
                $('.processForward').removeClass('hidden');
            }
        }else{
            $('.processForward').removeClass('hidden');
        }
    });

    $('.process').on('mouseout', function(event){
        $('.processBack').addClass('hidden');
        $('.processForward').addClass('hidden');
    });

    $('.processBack').on('click tap', function (event){
        if(processSlide > 1){
            processSlide--;

            if(processSlide==1){
                //slide is framing
                $('.processBack').addClass('hidden');
                $('.sliderContainer').css('margin-left', '0');

                $('.processPhoto').addClass('process01');
                $('.processPhoto').removeClass('process02');
            }else if(processSlide==2){
                //slide is sketching
                $('.processBack').removeClass('hidden');
                $('.sliderContainer').css('margin-left', '-100%');

                $('.processPhoto').addClass('process02');
                $('.processPhoto').removeClass('process03');
            }else if(processSlide==3){
                //slide is patterns
                $('.sliderContainer').css('margin-left', '-200%');

                $('.processPhoto').addClass('process03');
                $('.processPhoto').removeClass('process04');
            }else if(processSlide==4){
                //slide is testing
                $('.processForward').removeClass('hidden');
                $('.sliderContainer').css('margin-left', '-300%');

                $('.processPhoto').addClass('process04');
                $('.processPhoto').removeClass('process05');
            }else{
                //slide is building
                $('.processForward').addClass('hidden');
                $('.sliderContainer').css('margin-left', '-400%');
            }
        }
    });

    $('.processForward').on('click tap', function (event){
        if(processSlide < 5){
            processSlide++;
            if(processSlide==1){
                //slide is framing
                $('.processBack').removeClass('hidden');
                $('.sliderContainer').css('margin-left', '0');
            }else if(processSlide==2){
                //slide is sketching
                $('.processBack').removeClass('hidden');
                $('.sliderContainer').css('margin-left', '-100%');

                $('.processPhoto').removeClass('process01');
                $('.processPhoto').addClass('process02');
            }else if(processSlide==3){
                //slide is patterns
                $('.sliderContainer').css('margin-left', '-200%');

                $('.processPhoto').removeClass('process02');
                $('.processPhoto').addClass('process03');
            }else if(processSlide==4){
                //slide is testing
                $('.processForward').removeClass('hidden');
                $('.sliderContainer').css('margin-left', '-300%');

                $('.processPhoto').removeClass('process03');
                $('.processPhoto').addClass('process04');
            }else{
                //slide is building
                $('.processForward').addClass('hidden');
                $('.sliderContainer').css('margin-left', '-400%');

                $('.processPhoto').removeClass('process04');
                $('.processPhoto').addClass('process05');
            }
        }
    })

}); // end document.ready
