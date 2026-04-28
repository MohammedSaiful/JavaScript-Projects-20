const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');


const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span'); // select all span elements, return an array of span elements

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

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
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now; // distance between now and the countdown date in milliseconds
        // console.log('distance: ', distance);

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // console.log(days, hours, minutes, seconds);


        // hide input container
        inputContainer.hidden = true;
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // populate countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;


            // show countdown
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }



    }, second);
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
    // console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // check for valid date
    if (countdownDate === '') {
        alert('Please select a date for the countdown.');
    } else {
        // get number version of current Date, update DOM
        countdownValue = new Date(countdownDate).getTime();  // milliseconds since Jan 1, 1970
        updateDOM();
    }
}


// reset all values
function reset() {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // stop countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    if (localStorage.getItem('countdown')) {
        //get countdown from local storage if available, parse into an object
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();  
    }
}

// event listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);


// on load, check local storage
restorePreviousCountdown();