// $.mobile.defaultPageTransition = 'slideup';
var changePageDelay = 1000; //change page delay timer
function checkNetConnection() { //check internet connection
  jQuery.ajaxSetup({
    async: false
  });
  re = "";
  r = Math.round(Math.random() * 10000);
  $.get("http://louislam.me/vtc/modern-web/dot.png", {
      subins: r
    }, function(d) {
      re = true;
      console.log('Internet enable');
    })
    .error(function() {
      re = false;
      console.log('Internet disable');
    });
  return re;
}
$(document)
  // .on("pageinit", ".ui-page", function() {
  //   $("#leftpanel a")
  //     .attr('data-ajax', false)
  //     .on('click', function() {
  //       $("#leftpanel")
  //         .panel('close');
  //     });
  // })
  .on('pagecreate', '#home', function() {
    if (checkNetConnection() == true) {
      $('.bg-video')
        .YTPlayer({
          fitToBackground: true,
          videoId: 'QI6qg1ERmGE',
          playerVars: {
            start: 170
          }
        });
    } else {
      $('#home')
        .addClass('bg-img');
    }
  })
  .on('pagecreate', '#muacTape', function() {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      autoplay: 3000,
      parallax: true,
      speed: 600,
      observer: true,
      observeParents: true
    });
  })
  .on('pagecreate', '#loginSuccess', function() {
    setTimeout(function() {
      window.location = 'index.html';
    }, changePageDelay);
  })
  .on('pagecreate', '#updateSuccess', function() {
    setTimeout(function() {
      window.location = 'index.html';
    }, changePageDelay);
  })
  .on('pagecreate', '#logoutSuccess', function() {
    setTimeout(function() {
      window.location = 'index.html';
    }, changePageDelay);
  })
  .on('pagecreate', '#caseStudy', function() {
    //init coverflow plugin
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
    var api_key = 'AIzaSyAz0RAVfhEW4Mqw-Je5PB7cjMTkoaX-3Ds';
    var player = $('.RYPP')
      .rypp(api_key, {
        autoplay: false,
      });
  })
  .on('pagecreate', '#causeOfHunger', function() {})
  .on('pagecreate', '#childSponsorship', function() {})
  .on('pagecreate', '#definitionOfHunger', function() {})
  .on('pagecreate', '#hungerWorld', function() {
    var map;
    var src = 'http://www.google.com/maps/d/kml?mid=1XpYLS4sNcetcWMoMQ3h_7aeNIxE';

    function initMap() {
      map = new google.maps.Map(document.getElementById('map'));
      loadKmlLayer(src, map);
    }

    function loadKmlLayer(src, map) {
      var kmlOptions = {
        suppressInfoWindows: true,
        preserveViewport: false,
        map: map
      };
      var kmlLayer = new google.maps.KmlLayer(src, kmlOptions);
    }
    initMap();
  })
  .on('pagecreate', '#membership', function() {
    function register($data, $popup, $popupTitle, $popupContent) {
      $.ajax({
        url: 'api.php/register',
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        data: $data,
        // data: $('.form-register').serialize(),
        async: true,
        success: function(msg) {
          // console.log(msg);
          if (msg.status === 'success') {
            window.localStorage.setItem('login', 'true');
            window.localStorage.setItem('userName', $('.form-register .username')
              .val());
            window.localStorage.setItem('email', $('.form-register .email')
              .val());
            window.localStorage.setItem('userPic', 'img/user-pic.png');
            window.localStorage.setItem('gender', $('.form-register .gender:checked')
              .val());
            $.mobile.changePage('login-success.html', {
              allowSamePageTransition: true,
              transition: 'none',
              reloadPage: true
            });
          } else {
            $popupTitle.html(msg.title);
            $popupContent.html(msg.message);
            $popup.popup('open');
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          console.log(thrownError)
        }
      });
    }

    function login($dat$popupContent) {
      $.ajax({
        url: 'api.php/login',
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        data: $data,
        // data: $('.form-register').serialize(),
        async: true,
        success: function(msg) {
          // console.log(msg);
          if (msg.status === 'success') {
            window.localStorage.setItem('login', 'true');
            window.localStorage.setItem('email', msg.info.email);
            window.localStorage.setItem('userName', $('.form-login .username')
              .val());
            window.localStorage.setItem('userPic', 'img/user-pic.png');
            $.mobile.changePage('login-success.html', {
              allowSamePageTransition: true,
              transition: 'none',
              reloadPage: true
            });
          } else {
            $popupTitle.html(msg.title);
            $popupContent.html(msg.message);
            $popup.popup('open');
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          console.log(thrownError)
        }
      });
    }
    // function fbLogin() { //for cordova
    //   openFB.login(function(response) {
    //     if (response.status === 'connected') {
    //       window.localStorage.setItem("fbToken", response.authResponse.accessToken);
    //       openFB.api({
    //         path: '/me',
    //         success: function(data) {
    //           $.mobile.changePage('login-success.html', {
    //             allowSamePageTransition: true,
    //             transition: 'none',
    //             reloadPage: true
    //           });
    //           console.log(JSON.stringify(data));
    //           window.localStorage.setItem('register', 'true');
    //           window.localStorage.setItem('fbName', data.name);
    //           window.localStorage.setItem('fbPic', 'http://graph.facebook.com/' + data.id + '/picture');
    //         },
    //         error: fbErrorHandler
    //       });
    //     } else {
    //       alert('Facebook login failed: ' + response.error);
    //     }
    //   }, {
    //     scope: 'email'
    //   });
    // }
    // function fbErrorHandler(error) {
    //   alert(error.message);
    // }
    $('.btn-login')
      .on('click', function() {
        // event.preventDefault();
        var $data = JSON.stringify({
          username: $(".form-login .username")
            .val(),
          password: $(".form-login .password")
            .val()
        });
        var $popup = $('.popup-message');
        var $popupTitle = $popup.find('h3');
        var $popupContent = $popup.find('p');
        //client-side validation
        $('.form-login')
          .validate({
            rules: {
              username: {
                required: true,
                minlength: 2
              },
              password: {
                required: true,
                minlength: 6
              },
            },
            messages: {
              username: "Please enter username.",
              password: {
                required: "Please enter your password.",
                minlength: "Please enter a password with at least 6 characters."
              }
            },
            highlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .addClass("error");
            },
            unhighlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .removeClass("error");
            },
            errorPlacement: function(error, element) {
              return true;
            },
            invalidHandler: function(form, validator) {
              var errors = validator.numberOfInvalids();
              if (errors) {
                var message = errors == 1 ? 'You missed 1 field.<br/>It has been highlighted' : 'You missed ' + errors + ' fields.<br/>They have been highlighted';
                $popupTitle.html("Submission Error");
                $popupContent.html(message);
                $popup.popup('open');
              } else {
                $popup.popup('close');
              }
            }
          })
          .form(this);
        if ($('.form-login')
          .valid()) {
          login($data, $popup, $popupTitle, $popupContent);
          console.log($data);
        }
      })
    $('.btn-register')
      .on('click', function() {
        // event.preventDefault();
        var $data = JSON.stringify({
          username: $(".form-register .username")
            .val(),
          email: $(".form-register .email")
            .val(),
          gender: $(".form-register .gender:checked")
            .val(),
          password: $(".form-register .password")
            .val()
        });
        var $popup = $('.popup-message');
        var $popupTitle = $popup.find('h3');
        var $popupContent = $popup.find('p');
        //client-side validation
        $('.form-register')
          .validate({
            rules: {
              username: {
                required: true,
                minlength: 2
              },
              email: {
                required: true,
                email: true
              },
              gender: {
                required: true
              },
              password: {
                required: true,
                minlength: 6
              },
            },
            messages: {
              username: "Please enter username.",
              email: {
                required: "Please enter your email.",
                email: "Please enter a valid email address."
              },
              password: {
                required: "Please enter your password.",
                minlength: "Please enter a password with at least 6 characters."
              }
            },
            highlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .addClass("error");
            },
            unhighlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .removeClass("error");
            },
            errorPlacement: function(error, element) {
              return true;
            },
            invalidHandler: function(form, validator) {
              var errors = validator.numberOfInvalids();
              if (errors) {
                var message = errors == 1 ? 'You missed 1 field.<br/>It has been highlighted' : 'You missed ' + errors + ' fields.<br/>They have been highlighted';
                $popupTitle.html("Submission Error");
                $popupContent.html(message);
                $popup.popup('open');
              } else {
                $popup.popup('close');
              }
            }
          })
          .form(this);
        if ($('.form-register')
          .valid()) {
          register($data, $popup, $popupTitle, $popupContent);
        }
      })
      //facebook api
    $('.fb-login')
      .on('click', function() {
        // fbLogin();
        var $dfd = $.fblogin({
          fbId: '126062877835153'
        });
        $dfd.progress(function(response) {
          // reponse object has two properties 'status' and 'data'
          switch (response.status) {
            case 'init.fblogin':
              console.log('facebook sdk initialized.');
              break;
            case 'authenticate.fblogin':
              window.localStorage.setItem("fbToken", response.data.authResponse.accessToken);
              console.log(response.data.authResponse.accessToken);
              break;
          }
        });
        $dfd.done(function(data) {
          $.mobile.changePage('login-success.html', {
            allowSamePageTransition: true,
            transition: 'none',
            reloadPage: true
          });
          // console.log(JSON.stringify(data));
          window.localStorage.setItem('login', 'true');
          window.localStorage.setItem('register', 'true');
          window.localStorage.setItem('fbName', data.name);
          window.localStorage.setItem('fbPic', 'http://graph.facebook.com/' + data.id + '/picture');
          console.log(data.name, data.id);
        });
      })
      // openFB.init({
      //   appId: '1301435016551511',
      //   tokenStore: window.localStorage
      // });
  })
  .on('pagecreate', '#setting', function() {
    //retreive info and append into inputs
    var userName = window.localStorage.getItem("userName");
    var email = window.localStorage.getItem("email");
    var gender = window.localStorage.getItem("gender");
    $('.form-info .nusername')
      .val(userName);
    $('.form-info .email')
      .val(email);
    $('.form-info #' + gender)
      .attr("checked", true)
      .checkboxradio("refresh");
    $('.form-info .gender')
      .checkboxradio("refresh");

    function update($data, $popup, $popupTitle, $popupContent) {
      $.ajax({
        url: 'api.php/update',
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        data: $data,
        // data: $('.form-register').serialize(),
        async: true,
        success: function(msg) {
          // console.log(msg);
          if (msg.status === 'success') {
            window.localStorage.setItem('login', 'true');
            window.localStorage.setItem('userName', $('.form-info .nusername')
              .val());
            window.localStorage.setItem('email', $('.form-info .email')
              .val());
            window.localStorage.setItem('gender', $('.form-info .gender:checked')
              .val());
            window.localStorage.setItem('userPic', 'img/user-pic.png');
            $.mobile.changePage('update-success.html', {
              allowSamePageTransition: true,
              transition: 'none',
              reloadPage: true
            });
          } else {
            $popupTitle.html(msg.title);
            $popupContent.html(msg.message);
            $popup.popup('open');
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          console.log(thrownError)
        }
      });
      console.log($data);
    }

    function rpassword($data, $popup, $popupTitle, $popupContent) {
      $.ajax({
        url: 'api.php/rpassword',
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        data: $data,
        // data: $('.form-register').serialize(),
        async: true,
        success: function(msg) {
          console.log(msg);
          if (msg.status === 'success') {
            $popupTitle.html(msg.title);
            $popupContent.html(msg.message);
            $popup.popup('open');
            $('.form-rpassword')
              .validate()
              .resetForm();
            $('.form-rpassword')
              .find('.ui-icon-delete')
              .remove();
            $('.form-rpassword')[0].reset();
          } else {
            $popupTitle.html(msg.title);
            $popupContent.html(msg.message);
            $popup.popup('open');
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          console.log(thrownError)
        }
      });
    }
    $('.btn-update')
      .on('click', function() {
        // event.preventDefault();
        var $data = JSON.stringify({
          ousername: window.localStorage.getItem("userName"),
          nusername: $(".form-info .nusername")
            .val(),
          email: $(".form-info .email")
            .val(),
          gender: $(".form-info .gender:checked")
            .val(),
          password: $(".form-info .password")
            .val()
        });
        var $popup = $('.popup-message');
        var $popupTitle = $popup.find('h3');
        var $popupContent = $popup.find('p');
        //client-side validation
        $('.form-info')
          .validate({
            rules: {
              nusername: {
                required: true,
                minlength: 2
              },
              email: {
                required: true,
                email: true
              },
              gender: {
                required: true
              },
              password: {
                required: true,
                minlength: 6
              }
            },
            messages: {
              nusername: "Please enter username.",
              email: {
                required: "Please enter your email.",
                email: "Please enter a valid email address."
              },
              password: {
                required: "Please enter your password.",
                minlength: "Please enter a password with at least 6 characters."
              }
            },
            highlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .addClass("error");
            },
            unhighlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .removeClass("error");
            },
            errorPlacement: function(error, element) {
              return true;
            },
            invalidHandler: function(form, validator) {
              var errors = validator.numberOfInvalids();
              if (errors) {
                var message = errors == 1 ? 'You missed 1 field.<br/>It has been highlighted' : 'You missed ' + errors + ' fields.<br/>They have been highlighted';
                $popupTitle.html("Submission Error");
                $popupContent.html(message);
                $popup.popup('open');
              } else {
                $popup.popup('close');
              }
            }
          })
          .form(this);
        if ($('.form-info')
          .valid()) {
          update($data, $popup, $popupTitle, $popupContent);
        }
      })
    $('.btn-rpassword')
      .on('click', function() {
        // event.preventDefault();
        var $data = JSON.stringify({
          username: window.localStorage.getItem("userName"),
          opassword: $(".form-rpassword .opassword")
            .val(),
          npassword: $(".form-rpassword .npassword")
            .val()
        });
        var $popup = $('.popup-message');
        var $popupTitle = $popup.find('h3');
        var $popupContent = $popup.find('p');
        //client-side validation
        $('.form-rpassword')
          .validate({
            rules: {
              opassword: {
                required: true,
                minlength: 6
              },
              npassword: {
                required: true,
                minlength: 6
              },
            },
            messages: {
              opassword: {
                required: "Please enter your password.",
                minlength: "Please enter a password with at least 6 characters."
              },
              npassword: {
                required: "Please enter your password.",
                minlength: "Please enter a password with at least 6 characters."
              }
            },
            highlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .addClass("error");
            },
            unhighlight: function(element) {
              $(element)
                .parent('.ui-input-text')
                .removeClass("error");
            },
            errorPlacement: function(error, element) {
              return true;
            },
            invalidHandler: function(form, validator) {
              var errors = validator.numberOfInvalids();
              if (errors) {
                var message = errors == 1 ? 'You missed 1 field.<br/>It has been highlighted' : 'You missed ' + errors + ' fields.<br/>They have been highlighted';
                $popupTitle.html("Submission Error");
                $popupContent.html(message);
                $popup.popup('open');
              } else {
                $popup.popup('close');
              }
            }
          })
          .form(this);
        if ($('.form-rpassword')
          .valid()) {
          rpassword($data, $popup, $popupTitle, $popupContent);
          console.log($data);
        }
      })
  })
  .on('pagecreate', '#impactOfHunger', function() {
    $('.ui-content')
      .on('touchmove', function(e) {
        e.stopPropagation();
        e.preventDefault();
      });
  })