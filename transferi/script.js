 /*On scroll */
 window.onscroll = ( () => {
  let head = document.querySelector("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        head.classList.add("red-head");
    } else {
        head.classList.remove("red-head");
    }
}); 
 
 
 // Store Swiper instance globally
 let swiper;

 // Function to create a review slide
 function createSlide(reviewData) {
   const slide = document.createElement('div');
   slide.classList.add('swiper-slide');

   const image = document.createElement('img');
   image.src = reviewData.image;
   image.alt = `${reviewData.name} image`;

   const name = document.createElement('h3');
   name.textContent = reviewData.name;

   const place = document.createElement('p');
   place.textContent = reviewData.place;

   const year = document.createElement('p'); // Create a paragraph element for the year
   year.textContent = reviewData.year; // Set the year content from the data

   const starsContainer = document.createElement('div');
   starsContainer.classList.add('stars');
   for (let i = 0; i < reviewData.stars; i++) {
     const star = document.createElement('img');
     star.src = '/images/single-star.png';
     star.alt = 'Star';
     starsContainer.appendChild(star);
   }

   const text = document.createElement('p');
   text.textContent = reviewData.text;

   slide.appendChild(image);
   slide.appendChild(name);
   slide.appendChild(place);
   slide.appendChild(year); // Append the year element to the slide
   slide.appendChild(starsContainer);
   slide.appendChild(text);

   return slide;
 }

 // Function to populate the Swiper with data
 function populateSwiper(data) {
   const swiperWrapper = document.querySelector('.mainSwiper .swiper-wrapper');
   swiperWrapper.innerHTML = ''; // Clear the existing slides
   data.forEach(review => {
     const slide = createSlide(review);
     swiperWrapper.appendChild(slide);
   });

   // Destroy existing Swiper instance if it exists
   if (swiper) {
     swiper.destroy(true, true);
   }

   // Initialize Swiper
   swiper = new Swiper(".mainSwiper", {
    lazy: true,
     effect: "coverflow",
     grabCursor: true,
     centeredSlides: true,
     slidesPerView: "auto",
     coverflowEffect: {
       rotate: 0,
       stretch: 0,
       depth: 150,
       modifier: 1,
       slideShadows: true,
     },
     navigation: {
       nextEl: ".swiper-button-next-custom",
       prevEl: ".swiper-button-prev-custom",
     },
     loop: true,
     initialSlide: 2,
   });
 }

 // Fetch data and initialize the Swiper
 let reviewsData = [];

 fetch('/data/recenzije.json')
   .then(response => response.json())
   .then(data => {
     reviewsData = data;
     populateSwiper(data);
   })
   .catch(error => console.error('Error fetching data:', error));

 // Function to filter data by year and repopulate Swiper
 function filterByYear(year) {
   const filteredData = reviewsData.filter(review => review.year === year);
   populateSwiper(filteredData);
 }

 // Event listener for the year dropdown
 document.getElementById('year-select').addEventListener('change', function() {
   const selectedYear = this.value;
   filterByYear(selectedYear);
 });

 // Reinitialize Swiper on window resize to handle zoom
 window.addEventListener('resize', () => {
   if (swiper) {
     swiper.update();
   }
 });

 $(':radio').change(function() {
    console.log('New star rating: ' + this.value);
  });

  function toggleBurger() {
    let head = document.getElementById("head");
    let html = document.querySelector("html");
    let body = document.querySelector("body");

    head.classList.toggle("open-menu");
    body.classList.toggle("no-scroll");
    html.classList.toggle("no-scroll");
  }
  /*Dodati logiku za formu */