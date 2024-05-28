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



function toggleBurger() {
  let head = document.getElementById("head");
  let html = document.querySelector("html");
  let body = document.querySelector("body");

  head.classList.toggle("open-menu");
  body.classList.toggle("no-scroll");
  html.classList.toggle("no-scroll");
}


document.addEventListener('DOMContentLoaded', function() {
  fetch('/data/automobili.json')
      .then(response => response.json())
      .then(data => {
          const carsContainer = document.querySelector('.vozila-container');
          const cars = data.cars;

          cars.forEach(car => {
              const carElement = document.createElement('div');
              carElement.classList.add('car');

              // First div (Thumbnail)
              const thumbnailDiv = document.createElement('div');
              thumbnailDiv.classList.add('thumbnail');
              const thumbnail = document.createElement('img');
              thumbnail.src = car.thumbnail;
              thumbnailDiv.appendChild(thumbnail);
              carElement.appendChild(thumbnailDiv);

              // Middle div (Title and Characteristics)
              const middleDiv = document.createElement('div');
              middleDiv.classList.add('middle');

              const title = document.createElement('h3');
              title.textContent = car.model;
              middleDiv.appendChild(title);

              // Characteristics (First Row)
              const characteristicsDiv1 = document.createElement('div');
              characteristicsDiv1.classList.add('characteristics');

              // Icon and value for mjenjac (Transmission)
              addCharacteristic(characteristicsDiv1, '/images/mjenjac-grey.png', car.characteristics.mjenjac);

              // Icon and value for gorivo (Fuel)
              addCharacteristic(characteristicsDiv1, '/images/gorivo-grey.png', car.characteristics.gorivo);

              // Icon and value for vrata (Doors)
              addCharacteristic(characteristicsDiv1, '/images/vrata-grey.png', car.characteristics.vrata, 'vrata');

              middleDiv.appendChild(characteristicsDiv1);

              // Characteristics (Second Row)
              const characteristicsDiv2 = document.createElement('div');
              characteristicsDiv2.classList.add('characteristics');

              // Icon and value for kilometraza (Mileage)
              addCharacteristic(characteristicsDiv2, '/images/kilometraza-grey.png', car.characteristics.kilometraza);

              // Icon and value for karoserija (Body type)
              addCharacteristic(characteristicsDiv2, '/images/karoserija-grey.png', car.characteristics.karoserija);

              // Icon and value for sjedista (Seats)
              addCharacteristic(characteristicsDiv2, '/images/sjedista-grey.png', car.characteristics.sjedista, 'sjedišta');

              middleDiv.appendChild(characteristicsDiv2);

              carElement.appendChild(middleDiv);

              // Last div (Price and Button)
              const lastDiv = document.createElement('div');
              lastDiv.classList.add('price-container');

              const priceLabelContainer = document.createElement('div');
              priceLabelContainer.classList.add('cijena-dan-container');
              
              const priceLabel = document.createElement('p');
              priceLabel.textContent = 'Od';
              priceLabelContainer.appendChild(priceLabel);

              const priceValue = document.createElement('h3');
              priceValue.textContent = car.cijena;
              priceLabelContainer.appendChild(priceValue);

              lastDiv.appendChild(priceLabelContainer);

              const priceUnit = document.createElement('h4');
              priceUnit.textContent = '1-3 dana';
              lastDiv.appendChild(priceUnit);

              const rentButton = document.createElement('a');
              rentButton.href = car.url;
              rentButton.classList.add('rent-button');
              const buttonIcon = document.createElement('img');
              buttonIcon.src = '/images/date1.png';
              rentButton.appendChild(buttonIcon);
              const buttonText = document.createTextNode('Rentiraj');
              rentButton.appendChild(buttonText);

              lastDiv.appendChild(rentButton);

              carElement.appendChild(lastDiv);

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
