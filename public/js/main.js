$(document).ready(function(){
    $('.ct_menu_toggle').click(function(){
        $('.ct_navbar').addClass('show');
    })
     $('.ct_close_menu').click(function(){
        $('.ct_navbar').removeClass('show');
    })


    $('.ct_filter_btn').click(function(){
      $(".ct_filter_side_bar").addClass('active')
    })
     $('.ct_filter_close').click(function(){
      $(".ct_filter_side_bar").removeClass('active')
    })

     $(".ct_user_slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });

  $(".ct_product_gallary_slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
    
})

$(document).ready(function () {
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".ct_form_next").click(function () {
    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //Add Class Active
    $("#ct_form_progressbar li")
      .eq($("fieldset").index(next_fs))
      .addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(++current);
  });

  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#ct_form_progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(--current);
  });

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $(".submit").click(function () {
    return false;
  });

 
});

const swiper = new Swiper(".mySwiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 2500,
  },

  // ⭐ Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  },
});


 const thumbs = [
      "../assets/img/user_1.jpg",
      "../assets/img/user_2.jpg",
      "../assets/img/user_3.jpg",
      "../assets/img/user_4.jpg",
      "../assets/img/user_1.jpg",
      "../assets/img/user_2.jpg",
      "../assets/img/user_3.jpg"
    ];
const ct_testimonial_slider = new Swiper(".ct_testimonial_slider", {
  loop: true,
 centeredSlides: true,
  slidesPerView: "auto",

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
          return `
            <span class="${className}">
              <img src="${thumbs[index]}" />
            </span>
          `;
        },
  },
  

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 2500,
  },
  

  // ⭐ Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    576: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 25,
    },
    1200: {
      slidesPerView: 1,
      spaceBetween: 25,
    },
  },
  
});







 




