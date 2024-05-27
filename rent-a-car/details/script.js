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


  document.addEventListener('DOMContentLoaded', function () {
    const pickupDateInput = document.getElementById('pickup-date');
    const returnDateInput = document.getElementById('return-date');

    const pickupTimeInput = document.getElementById('pickup-time');
    const returnTimeInput = document.getElementById('return-time');

    // Get today's date in the format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Set the value of the date input to today's date
    pickupDateInput.value = today;
    returnDateInput.value = today;
    // Set the value of the time input to '11:00'
    pickupTimeInput.value = '11:00';
    returnTimeInput.value = '11:00';
    [pickupDateInput, pickupTimeInput, returnDateInput, returnTimeInput].forEach(input => {
        input.style.color = '#848595';
    });
});

document.addEventListener('DOMContentLoaded', function() {
  fetch('/data/automobili.json')
      .then(response => response.json())
      .then(data => {
          const carsContainer = document.querySelector('.cars-container');
          const latestCars = data.cars.slice(0, 3); // Get the latest 3 cars

          latestCars.forEach(car => {
              const carElement = document.createElement('div');
              carElement.classList.add('car');

              // Thumbnail
              const thumbnail = document.createElement('img');
              thumbnail.src = car.thumbnail;
              carElement.appendChild(thumbnail);

              // Title
              const title = document.createElement('h3');
              title.textContent = car.model;
              carElement.appendChild(title);

              // Characteristics (First Row)
              const characteristicsDiv1 = document.createElement('div');
              characteristicsDiv1.classList.add('characteristics');

              // Icon and value for mjenjac (Transmission)
              addCharacteristic(characteristicsDiv1, '/images/mjenjac-grey.png', car.characteristics.mjenjac);

              // Icon and value for gorivo (Fuel)
              addCharacteristic(characteristicsDiv1, '/images/gorivo-grey.png', car.characteristics.gorivo);

              // Icon and value for vrata (Doors)
              addCharacteristic(characteristicsDiv1, '/images/vrata-grey.png', car.characteristics.vrata, 'vrata');

              carElement.appendChild(characteristicsDiv1);

              // Characteristics (Second Row)
              const characteristicsDiv2 = document.createElement('div');
              characteristicsDiv2.classList.add('characteristics');

              // Icon and value for kilometraza (Mileage)
              addCharacteristic(characteristicsDiv2, '/images/kilometraza-grey.png', car.characteristics.kilometraza);

              // Icon and value for karoserija (Body type)
              addCharacteristic(characteristicsDiv2, '/images/karoserija-grey.png', car.characteristics.karoserija);

              // Icon and value for sjedista (Seats)
              addCharacteristic(characteristicsDiv2, '/images/sjedista-grey.png', car.characteristics.sjedista, 'sjedišta');

              carElement.appendChild(characteristicsDiv2);

              // Price per day
              const priceDiv = document.createElement('div');
              priceDiv.classList.add('price-container');

              const priceLabel = document.createElement('p');
              priceLabel.textContent = 'Cijena';
              priceDiv.appendChild(priceLabel);

              const cijenaDanContainer = document.createElement('div');
              cijenaDanContainer.classList.add('cijena-dan-container');

              const priceValue = document.createElement('h3');
              priceValue.textContent = car.cijena;
              cijenaDanContainer.appendChild(priceValue);

              const priceUnit = document.createElement('h4');
              priceUnit.textContent = '/ dan';
              cijenaDanContainer.appendChild(priceUnit);

              priceDiv.appendChild(cijenaDanContainer);
              carElement.appendChild(priceDiv);

              // Rent button
              const rentButton = document.createElement('a');
              rentButton.href = car.url;
              rentButton.classList.add('rent-button');
              const buttonIcon = document.createElement('img');
              buttonIcon.src = '/images/date.png';
              rentButton.appendChild(buttonIcon);
              const buttonText = document.createTextNode('Rentiraj');
              rentButton.appendChild(buttonText);
              carElement.appendChild(rentButton);

              carsContainer.appendChild(carElement);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});

function addCharacteristic(parentElement, iconSrc, value, label = '') {
  const characteristicDiv = document.createElement('div');
  characteristicDiv.classList.add('characteristics-single');
  const icon = document.createElement('img');
  icon.src = iconSrc;
  characteristicDiv.appendChild(icon);
  const valueSpan = document.createElement('span');
  valueSpan.textContent = value + ' ' + label;
  characteristicDiv.appendChild(valueSpan);
  parentElement.appendChild(characteristicDiv);
}


function toggleBurger() {
  let head = document.getElementById("head");
  let html = document.querySelector("html");
  let body = document.querySelector("body");

  head.classList.toggle("open-menu");
  body.classList.toggle("no-scroll");
  html.classList.toggle("no-scroll");
}