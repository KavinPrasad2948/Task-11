// Fetch data from Rest Countries API
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        // Create cards for each country
        const countryRow = document.getElementById('countryRow');
        data.forEach(country => {
            const card = createCountryCard(country);
            countryRow.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching Rest Countries data:', error));

// Function to create a card for a country
function createCountryCard(country) {
    const cardCol = document.createElement('div');
    cardCol.className = 'cardcol card-text  col-md-4 col-lg-4 col-xl-4 col-sm-6 mb-3';

    const card = document.createElement('div');
    card.className = 'card  h-100 col-sm-6 col-md-12 col-lg-12 col-xl-12';
    card.style.backgroundColor = '#E9C893';
    card.style.height = '100%'; // Set a fixed height for all cards

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header bg-dark text-white text-center';
    cardHeader.innerText = country.name.common;
    card.appendChild(cardHeader);

    const flag = document.createElement('img');
    flag.src = country.flags.png;
    flag.alt = 'Flag';
    flag.className = 'Flagimg img-fluid mx-auto d-block mb-2 card-img-top';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body  d-flex flex-column align-items-center'; // Align text center vertically and horizontally

    const details = document.createElement('div');
    details.className = 'text-center card-text details'; // Take remaining space and align text center
    const space= document.createElement('br');
    const space2= document.createElement('br');
    const space3= document.createElement('br');
    const space4= document.createElement('br');
    const capital = document.createElement('div');
    capital.innerText = `Captial: ${country.capital}`;
    const region = document.createElement('div');
    region.innerText = `Region: ${country.region}`;
    const countryCode = document.createElement('div');
    countryCode.innerText = `Country Code: ${country.cca2}`;
    const Weather = document.createElement('div');
    

   
   
    details.appendChild(space);
    details.appendChild(capital);
    details.appendChild(space3);
    details.appendChild(region);
    details.appendChild(space4);
    details.appendChild(countryCode);
    details.appendChild(space2);
    details.appendChild(Weather);
    

    const weatherBtn = document.createElement('button');
    weatherBtn.className = 'btn btn-primary mt-2'; // Add margin at the top
    weatherBtn.innerText = 'Click for Weather';

    weatherBtn.addEventListener('click', () => {
        const lat = country.latlng[0]; // Latitude
        const lon = country.latlng[1]; // Longitude

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ac153ecd6b1d2762cc0033e573255532`)
            .then(response => response.json())
            .then(data => {
                const weatherDescription = data.weather[0].description;
                Weather.innerText = `Weather: ${weatherDescription}`;
            })
            .catch(error => {
                console.error('Error fetching Weather data:', error);
                latlng.innerText = 'Weather data unavailable';
            });
    });
    
    
    cardBody.appendChild(flag);
    cardBody.appendChild(details);
    cardBody.appendChild(weatherBtn);
    card.appendChild(cardBody);
    cardCol.appendChild(card);

    return cardCol;
}
