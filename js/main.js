window.onscroll = ( () => {
  let head = document.querySelector("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        head.classList.add("red-head");
    } else {
        head.classList.remove("red-head");
    }
});

let parentslider = new Swiper(".parent-slider", {
    loop: true,
    slidesPerView: 1,
    noSwiping: true,
    centeredSlides: true,
    // autoplay: {
    //     delay: 3000,
    //     disableOnInteraction: false,
    // },
    speed: 2500,
      pagination: {
        el: '.swiper-pagination-parent',
        clickable: true,
      },
});

let childslider = new Swiper(".child-slider", {
    nested: true,
    loop: true,
    speed: 1500,
    slidesPerView: 1,
    noSwiping: false,
    pagination: '.swiper-pagination-child',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
});

let blogswiper = new Swiper(".blogSwiper", {
    slidesPerView: 4,
    loop: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let swiper = new Swiper(".mainSwiper", {
    effect: "fade",
    speed: 2000,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
  });

  function toggleBurger() {
    let head = document.getElementById("head");
    let html = document.querySelector("html");
    let body = document.querySelector("body");

    head.classList.toggle("open-menu");
    body.classList.toggle("no-scroll");
    html.classList.toggle("no-scroll");
  }



let blog_items = document.querySelectorAll(".blog-item");
if (blog_items.length > 0) {
  blog_items.forEach(blog_i => {
    blog_i.addEventListener('click', () => {
        blog_i.classList.add('active');
        blog_items.forEach(other => {
            if (other != blog_i) {
                other.classList.remove('active');
            }
        })
    })
})
}