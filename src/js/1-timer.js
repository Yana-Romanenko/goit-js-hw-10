'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
buttonStart.disabled = true;

const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

// оголоси поза межами методу onClose() let змінну userSelectedDate
let userSelectedDate = '';

//об'єкт параметрів бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    // перевірка дати на майбутність
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        messageColor: '#FAFAFB',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#EF4040',
        position: 'topRight',
        closeOnEscape: true,
        timeout: 5000,
      });
    } else {
      buttonStart.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

//initial flatpickr
//створюємо екземпляр бібліотеки
const datePicker = flatpickr(input, options);

//додаємо слухач на input
input.addEventListener('focus', () => {
  datePicker.config.defaultDate = new Date();
});

let intervalId;

// Start the countdown
buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;

  const currentTime = new Date().getTime();
  const selectedTime = userSelectedDate.getTime();
  let countdownInterval = selectedTime - currentTime;

  //перша ініціалізація відображення таймера
  const time = convertMs(countdownInterval);
  updateTimerDisplay(time);

  intervalId = setInterval(() => {
    countdownInterval -= 1000;
    const updatedTime = convertMs(countdownInterval);
    updateTimerDisplay(updatedTime);

    if (countdownInterval <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);

  // Очищення поля вводу
  input.value = '';
});

// оновлення відображення таймера
function updateTimerDisplay(time) {
  daysTimer.textContent = addLeadingZero(time.days);
  hoursTimer.textContent = addLeadingZero(time.hours);
  minutesTimer.textContent = addLeadingZero(time.minutes);
  secondsTimer.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// style
// const label = document.querySelector('.label');
// label.style = 'text-transform: uppercase;';
