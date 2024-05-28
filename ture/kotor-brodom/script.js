window.addEventListener('scroll', () => {
  // Only execute on desktop
  if (window.innerWidth >= 1024) { // Adjust 1024px as the breakpoint for desktop
      let head = document.querySelector("header");
      let logo = document.querySelector(".logo");
  
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          head.classList.add("white-head");
          logo.classList.add("smaller-logo");
      } else {
          head.classList.remove("white-head");
          logo.classList.remove("smaller-logo");
      }
  }
});



var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
    thumbs: {
      swiper: swiper,
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


  document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    // Set the first tab and content as active by default
    tabs[0].classList.add('active');
    contents[0].style.display = 'block';

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Hide all content first
            contents.forEach(content => {
                content.style.display = 'none';
            });

            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active');
            });

            // Show the targeted content
            const target = document.getElementById(tab.getAttribute('data-target'));
            target.style.display = 'block';

            // Highlight the active tab
            tab.classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const dateSelect = document.getElementById("date-select");
  const timeSelect = document.getElementById("time-select");
  const passengerNumber = document.getElementById("passenger-number");
  const totalPriceElement = document.getElementById("total-price");

  const modal = document.getElementById("popup-modal");
  const closeButton = document.querySelector(".close-button");
  const popupSummary = document.getElementById("popup-summary");

  let passengers = 1;
  const pricePerPassenger = 50;

  // Populate dates (next 30 days)
  const today = new Date();
  const options = { month: "2-digit", day: "2-digit" };
  for (let i = 0; i < 30; i++) {
    const dateOption = document.createElement("option");
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dateOption.value = date.toISOString().split("T")[0];
    dateOption.textContent = date.toLocaleDateString("en-GB", options);
    dateSelect.appendChild(dateOption);
  }

  // Populate time (0-23 hours with 15-minute intervals)
  for (let hour = 0; hour < 24; hour++) {
    for (let min of [0, 15, 30, 45]) {
      const timeOption = document.createElement("option");
      const formattedTime = `${hour.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;
      timeOption.value = formattedTime;
      timeOption.textContent = formattedTime;
      timeSelect.appendChild(timeOption);
    }
  }

  // Update total price
  function updateTotalPrice() {
    const totalPrice = passengers * pricePerPassenger;
    totalPriceElement.textContent = `€${totalPrice}`;
  }

  // Handle passenger increase
  document
    .getElementById("increase-passengers")
    .addEventListener("click", () => {
      passengers++;
      passengerNumber.textContent = passengers;
      updateTotalPrice();
    });

  // Handle passenger decrease
  document
    .getElementById("decrease-passengers")
    .addEventListener("click", () => {
      if (passengers > 1) {
        passengers--;
        passengerNumber.textContent = passengers;
        updateTotalPrice();
      }
    });

  // Handle form submission
  document
    .getElementById("submit-btn")
    .addEventListener("click", function (event) {
      const date = dateSelect.value;
      const time = timeSelect.value;
      const totalPrice = totalPriceElement.textContent;

      popupSummary.innerHTML = `
      <div class="form-info">
        <p>${date} /</p>
        <p>${time} / </p>
        <p>${passengers} osobe</p>
      </div>
      <div class="total-price-popup">
        <h2>${totalPrice}</h2>
      </div>
      `;

      modal.style.display = "block";
    });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  document
    .getElementById("user-details-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Form submitted!");
      modal.style.display = "none";
    });
});
