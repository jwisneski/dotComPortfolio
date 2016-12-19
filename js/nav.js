$(document).ready(function () {
    $('a').on('click tap', function (event) {
        $('.active').removeClass('active');
        $(this).addClass('active');

        console.log(event);
    });
});
