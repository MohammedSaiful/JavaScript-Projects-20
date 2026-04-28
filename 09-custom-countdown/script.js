const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');


const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');



let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date(); // Date obj
let countdownActive;
let savedCountdown;


// in milliseconds
const second = 1000; // second in milliseconds
const minute = second * 60;// minute in milliseconds
const hour = minute * 60;// hour in milliseconds
const day = hour * 24;// day in milliseconds



// set date input min with today's date
const today = new Date().toISOString().split('T')[0];
// console.log(today);
dateEl.setAttribute('min', today);


function updateDOM() {
    const now = new Date().getTime();
    const distance = countdownValue - now; // distance between now and the countdown date in milliseconds
    // console.log('distance: ', distance);

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // console.log(days, hours, minutes, seconds);
}




// take values from form input
function updateCountdown(e) {
    e.preventDefault(); // prevents refresh the page when submit the form
    // console.log(e);
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };


    // get number version of current Date, update DOM
    countdownValue = new Date(countdownDate).getTime();  // milliseconds since Jan 1, 1970
    updateDOM();
}


// event listeners
countdownForm.addEventListener('submit', updateCountdown);