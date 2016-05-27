// $.mobile.defaultPageTransition = 'slide';
$(document).on('pageinit', '#muacTape', function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        autoplay: 3000,
        parallax: true,
        speed: 600,
        observer: true,
        observeParents: true
    });
}).on('pageinit', '#loginSuccess', function() {
    window.location.href = 'index.html';
}).on('pageinit', '#caseStudy', function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
        },
        observer: true,
        observeParents: true
    });
}).on('pageinit', '#causeOfHunger', function() {

}).on('pageinit', '#childSponsorship', function() {

}).on('pageinit', '#definitionOfHunger', function() {

}).on('pageinit', '#registration', function() {
    $('.fb-login').on('click', function() {
        login();
    })

    openFB.init({
        appId: '1301435016551511',
        tokenStore: window.localStorage
    });

    function login() {
        openFB.login(
            function(response) {
                if (response.status === 'connected') {
                    window.localStorage.setItem("fbToken", response.authResponse.accessToken);
                    openFB.api({
                        path: '/me',
                        success: function(data) {
                            $.mobile.changePage('login-success.html', {
                                allowSamePageTransition: true,
                                transition: 'none',
                                reloadPage: true
                            });

                            console.log(JSON.stringify(data));
                            window.localStorage.setItem('fbName', data.name);
                            window.localStorage.setItem('fbPic', 'http://graph.facebook.com/' + data.id + '/picture');
                        },
                        error: errorHandler
                    });
                } else {
                    alert('Facebook login failed: ' + response.error);
                }
            }, {
                scope: 'email'
            });
    }

    function errorHandler(error) {
        alert(error.message);
    }
}).on('pageinit', '#impactOfHunger', function() {
    $('.ui-content').on('touchmove', function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
})
