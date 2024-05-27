function toggleBurger() {
  let head = document.getElementById("head");
  let html = document.querySelector("html");
  let body = document.querySelector("body");

  head.classList.toggle("open-menu");
  body.classList.toggle("no-scroll");
  html.classList.toggle("no-scroll");
}

document.addEventListener('DOMContentLoaded', function() {
  const tureContainer = document.querySelector('.ture');
  const filterAllButton = document.getElementById('filter-all');
  const filterJednodnevneButton = document.getElementById('filter-jednodnevne');
  const filterVisednevneButton = document.getElementById('filter-visednevne');
  const paginationContainer = document.getElementById('pagination');

  let currentPage = 1;
  const toursPerPage = 8;
  let allTours = [];
  let filteredTours = [];

  // Function to initialize Swiper for each tour
  function initSwiper(swiperContainer) {
    new Swiper(swiperContainer, {
      loop: true,
      navigation: {
        nextEl: swiperContainer.querySelector('.swiper-button-next'),
        prevEl: swiperContainer.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: swiperContainer.querySelector('.swiper-pagination'),
      },
    });
  }

  // Fetch tour data from JSON
  fetch('/data/ture.json')
    .then(response => response.json())
    .then(data => {
      allTours = data;
      filteredTours = data;
      displayTours(filteredTours); // Display all tours initially
      displayPagination(filteredTours); // Display pagination

      // Filter tours based on category
      filterAllButton.addEventListener('click', () => {
        currentPage = 1;
        filteredTours = allTours;
        displayTours(filteredTours);
        displayPagination(filteredTours);
      });

      filterJednodnevneButton.addEventListener('click', () => {
        currentPage = 1;
        filteredTours = allTours.filter(tour => tour.tip === 'jedno-dnevna');
        displayTours(filteredTours);
        displayPagination(filteredTours);
      });

      filterVisednevneButton.addEventListener('click', () => {
        currentPage = 1;
        filteredTours = allTours.filter(tour => tour.tip === 'vise-dnevna');
        displayTours(filteredTours);
        displayPagination(filteredTours);
      });
    })
    .catch(error => console.log('Error fetching tour data:', error));

  // Function to display tours
  function displayTours(tours) {
    tureContainer.innerHTML = ''; // Clear existing tours
  
    const start = (currentPage - 1) * toursPerPage;
    const end = start + toursPerPage;
    const paginatedTours = tours.slice(start, end);
  
    paginatedTours.forEach((tour, index) => {
      const tourElement = document.createElement('div');
      tourElement.classList.add('tour');
  
      // Create swiper slider for tour images
      const swiperContainer = document.createElement('div');
      swiperContainer.classList.add('swiper-container');
  
      const swiperWrapper = document.createElement('div');
      swiperWrapper.classList.add('swiper-wrapper');
  
      tour.images.forEach(image => {
        const swiperSlide = document.createElement('div');
        swiperSlide.classList.add('swiper-slide');
  
        const img = document.createElement('img');
        img.src = image;
  
        swiperSlide.appendChild(img);
        swiperWrapper.appendChild(swiperSlide);
      });
  
      swiperContainer.appendChild(swiperWrapper);
      tourElement.appendChild(swiperContainer);
  
      // Add navigation buttons and pagination dots
      const prevButton = document.createElement('div');
      prevButton.classList.add('swiper-button-prev');
      swiperContainer.appendChild(prevButton);
  
      const nextButton = document.createElement('div');
      nextButton.classList.add('swiper-button-next');
      swiperContainer.appendChild(nextButton);
  
      const pagination = document.createElement('div');
      pagination.classList.add('swiper-pagination');
      swiperContainer.appendChild(pagination);
  
      // Initialize Swiper for the current tour
      initSwiper(swiperContainer);
  
      // Add title as a clickable element with an onclick event
      const title = document.createElement('h3');
      title.textContent = tour.name;
      title.className = `tour-title-1`;
      title.style.cursor = "pointer"; // Makes it obvious it's clickable
      title.onclick = function() {
        window.location.href = tour.url;
      };
      tourElement.appendChild(title);
  
      const place = document.createElement('p');
      place.textContent = tour.place;
      place.className = `tour-place-1`;
      tourElement.appendChild(place);
  
      const rating = document.createElement('div');
      rating.classList.add('rating');
      rating.id = `tour-rating-1`;
      rating.innerHTML = `<div id="tour-rating-value-1">${tour.rating}</div> Odlično`;
      tourElement.appendChild(rating);
  
      // Separate the price into different elements
      const priceContainer = document.createElement('div');
      priceContainer.classList.add('price');
      priceContainer.className = `tour-price-1`;
  
      const pricePrefix = document.createElement('span');
      pricePrefix.textContent = 'Od ';
      pricePrefix.className = `tour-price-prefix-1`;
  
      const priceValue = document.createElement('span');
      priceValue.textContent = `${tour.price}`;
      priceValue.className = `tour-price-value-1`;
  
      const priceSuffix = document.createElement('span');
      priceSuffix.textContent = ' / Po osobi';
      priceSuffix.className = `tour-price-suffix-1`;
  
      priceContainer.appendChild(pricePrefix);
      priceContainer.appendChild(priceValue);
      priceContainer.appendChild(priceSuffix);
      tourElement.appendChild(priceContainer);
  
      // Append tour element to the container
      tureContainer.appendChild(tourElement);
    });
  }
  function displayPagination(tours) {
    const totalPages = Math.ceil(tours.length / toursPerPage);
    paginationContainer.innerHTML = '';
  
    const maxButtons = 3; // Max number of buttons to show around the current page
    const halfMaxButtons = Math.floor(maxButtons / 2);
  
    if (totalPages <= 1) return; // No pagination needed if there's only one page
  
    // Add "Prev" button
    if (currentPage > 1) {
      const prevButton = createPaginationButton(currentPage - 1, "<");
      paginationContainer.appendChild(prevButton);
    }
  
    // Calculate start and end page numbers for pagination buttons
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, currentPage + halfMaxButtons);
  
    // Ensure there are at least maxButtons pages shown if possible
    if (startPage > 1) {
      paginationContainer.appendChild(createPaginationButton(1));
      if (startPage > 2) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        paginationContainer.appendChild(dots);
      }
    }
  
    for (let i = startPage; i <= endPage; i++) {
      const button = createPaginationButton(i);
      paginationContainer.appendChild(button);
    }
  
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        paginationContainer.appendChild(dots);
      }
      paginationContainer.appendChild(createPaginationButton(totalPages));
    }
  
    // Add "Next" button
    if (currentPage < totalPages) {
      const nextButton = createPaginationButton(currentPage + 1, ">");
      paginationContainer.appendChild(nextButton);
    }
  }
  
  function createPaginationButton(pageNumber, text = null) {
    const button = document.createElement("button");
    button.textContent = text ? text : pageNumber;
    button.className = 'page-button'; // Add a general class for styling
    if (pageNumber === currentPage) {
      button.classList.add("active"); // Make the current page button active
    }
    button.addEventListener('click', () => {
      currentPage = pageNumber;
      displayTours(filteredTours);
      displayPagination(filteredTours); // Re-render pagination after changing page
    });
    return button;
  }
  

  function highlightCurrentPageButton() {
    const buttons = document.querySelectorAll(".pagination button");
    buttons.forEach((button) => {
      if (parseInt(button.textContent) === currentPage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  function createPaginationButton(pageNumber, text = null) {
    const button = document.createElement("button");
    button.textContent = text ? text : pageNumber;
    if (pageNumber === currentPage) {
      button.classList.add("active");
    }
    button.addEventListener('click', () => {
      currentPage = pageNumber;
      displayTours(filteredTours);
      displayPagination(filteredTours); // Re-render pagination after changing page
      highlightCurrentPageButton();
    });
    return button;
  }
});