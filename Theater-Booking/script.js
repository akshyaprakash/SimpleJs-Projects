//selecting the elements from the DOM
//to select anything from DOM use queryselector
const container = document.querySelector(".container");
// to select multiple seat classes
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect =  document.getElementById('movie');

populateUI();

//initial selected ticket price
let ticketPrice = +movieSelect.value;
//console.log(typeof ticketPrice);

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMovieprice', moviePrice);
}

//update total count
function updateSelectedCount() {
const selectedSeats = document.querySelectorAll('.row .seat.selected');


//to store the selected seats in a local storage
//copy  selected seats into an array
//map through array
//return a new array indexes
//spread operator - copies the values in the array or objects
const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
//console.log(seatsIndex);

//get the length
const selectedSeatsCount = selectedSeats.length;
count.innerText = selectedSeatsCount;
total.innerText = selectedSeatsCount * ticketPrice;
// console.log(selectedSeatsCount);
//console.log(selectedSeats);
}
//Get Data from local storage and populate  UI
function populateUI() {
    //pull out the selected seats from local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    //count and price from local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    //save in local storage
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});
//click on the seat change the class to selected
container.addEventListener('click', (e) => {
    //to click seats and not to click occupied
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }
    updateSelectedCount();
    //console.log(e.target);
});
updateSelectedCount();

