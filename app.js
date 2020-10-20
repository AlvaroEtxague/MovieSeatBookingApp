const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const priceTotal = document.getElementById('total');
const movieSelectDD = document.getElementById('movie');

populateUI();

let movieSelectItem = +movieSelectDD.value;

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//This function will update the text values for amount and ticket price
function updateSelectedCount() {
  //selectedSeats will give us a nodeList (very similar to an array) with all the seats selected by the user
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //copy selected seats into an array, map through array and return new array of indexes
  //using 'spread' here will convert the nodeList to a regular array
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  //using local storage to save the seats and movie selected
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //selectedSeatsCount will give us the number of seats selected by the user
  const selectedSeatsCount = selectedSeats.length;

  //count.innerText will be set to the number of seats selected (selectedSeatsCount)
  count.innerText = selectedSeatsCount;

  //priceTotal.innerText will be set to the number of seats selected * price of the movie selected
  priceTotal.innerText = selectedSeatsCount * movieSelectItem;
}

//Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIdx = localStorage.getItem('selectedMovieIndex');
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

  if (selectedMovieIdx !== null) {
    movieSelectDD.selectedIndex = selectedMovieIdx;
    movieSelectDD.value = selectedMoviePrice;
  }
}

//Movie Selection Event
movieSelectDD.addEventListener('change', (event) => {
  movieSelectItem = +event.target.value;
  setMovieData(event.target.selectedIndex, event.target.value);
  updateSelectedCount();
});

//Seat Selection Event
container.addEventListener('click', (event) => {
  //if the element clicked has a class of 'seat' AND doesn't have a class of 'occupied'
  if (event.target.classList.contains('seat') && !event.target.classList.contains('occupied')) {
    //then toggle as 'selected'
    event.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

//Init count and total
updateSelectedCount();
