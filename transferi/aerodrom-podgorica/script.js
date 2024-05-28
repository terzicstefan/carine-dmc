  /*On scroll */
  window.onscroll = ( () => {
    let head = document.querySelector("header");
    let logo = document.querySelector(".logo");
  
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
          head.classList.add("white-head");
          logo.classList.add("smaller-logo");

      } else {
          head.classList.remove("white-head");
          logo.classList.remove("smaller-logo");

      }
  });

function toggleBurger() {
  let head = document.getElementById("head");
  let html = document.querySelector("html");
  let body = document.querySelector("body");

  head.classList.toggle("open-menu");
  body.classList.toggle("no-scroll");
  html.classList.toggle("no-scroll");
}

document.addEventListener("DOMContentLoaded", function () {
  const dateSelect = document.getElementById("date-select");
  const timeSelect = document.getElementById("time-select");
  const passengerNumber = document.getElementById("passenger-number");
  const luggage12Number = document.getElementById("luggage-12-number");
  const luggage20Number = document.getElementById("luggage-20-number");
  const totalPriceElement = document.getElementById("total-price");

  const modal = document.getElementById("popup-modal");
  const closeButton = document.querySelector(".close-button");
  const popupSummary = document.getElementById("popup-summary");

  let passengers = 1;
  let luggage12 = 1;
  let luggage20 = 1;
  const pricePerPassenger = 30;

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

  // Handle luggage 12 increase
  document
    .getElementById("increase-luggage-12")
    .addEventListener("click", () => {
      luggage12++;
      luggage12Number.textContent = luggage12;
    });

  // Handle luggage 12 decrease
  document
    .getElementById("decrease-luggage-12")
    .addEventListener("click", () => {
      if (luggage12 > 1) {
        luggage12--;
        luggage12Number.textContent = luggage12;
      }
    });

  // Handle luggage 20 increase
  document
    .getElementById("increase-luggage-20")
    .addEventListener("click", () => {
      luggage20++;
      luggage20Number.textContent = luggage20;
    });

  // Handle luggage 20 decrease
  document
    .getElementById("decrease-luggage-20")
    .addEventListener("click", () => {
      if (luggage20 > 1) {
        luggage20--;
        luggage20Number.textContent = luggage20;
      }
    });

  // Handle form submission
  document
    .getElementById("submit-btn")
    .addEventListener("click", function (event) {
      const date = dateSelect.value;
      const time = timeSelect.value;
      const destination = document.getElementById("destination-select").value;
      const totalPrice = totalPriceElement.textContent;

      popupSummary.innerHTML = `
      <div class="form-info"><p>${date} /</p>
      <p>${time} / </p>
      <p>${passengers} osobe / </p>
      <p>${destination} </p></div>
          <div class="total-price-popup"> <h2>${totalPrice}</h2></div>
         
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
