
    // Function to create slide content
    function createSlide(slideData) {
        const slide = document.createElement('div');
        slide.classList.add('swiper-slide');
        slide.style.backgroundImage = `url(${slideData.thumbnail})`;
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center';
        
        const link = document.createElement('a');
        link.href = slideData.learnMoreUrl;
        
        const content = document.createElement('div');
        content.classList.add('slide-content');
        
        const title = document.createElement('h3');
        title.textContent = slideData.title;
        const dateContainer = document.createElement('div');
        dateContainer.classList.add('date-container');
        
        const dateIcon = document.createElement('img');
        dateIcon.src = '/images/date.png';
        dateIcon.alt = 'Date Icon';
        const date = document.createElement('p');
        date.textContent = slideData.date;
        
        dateContainer.appendChild(dateIcon);
        dateContainer.appendChild(date);
        content.appendChild(dateContainer);
        content.appendChild(title);
        link.appendChild(content);
        slide.appendChild(link);
        
        return slide;
      }
  
      // Function to populate the Swiper slides with data
      function populateSwiper(data) {
        const swiperWrapper = document.querySelector('.aboutSwiper .swiper-wrapper');
        data.forEach(item => {
          const slide = createSlide(item);
          swiperWrapper.appendChild(slide);
        });
      }
  
    // Fetch data and initialize the Swiper
fetch('/data/blog.json')
.then(response => response.json())
.then(data => {
  populateSwiper(data);
  const aboutSwiper = new Swiper('.aboutSwiper', {
    lazy: true,
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
    on: {
      init: function () {
        if (this.slides.length > 10) {
          for (let i = 10; i < this.slides.length; i++) {
            this.slides[i].style.display = 'none';
          }
        }
      },
    },
  });
})
.catch(error => console.error('Error fetching data:', error));

function goToIzleti() { 
  window.location.href = "#"; 
} 

function goToTransferi() { 
  window.location.href = "#"; 
} 

function goToAutomobili() { 
  window.location.href = "#"; 
}
