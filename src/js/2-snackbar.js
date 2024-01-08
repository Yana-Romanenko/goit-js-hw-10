'use strict'

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateSelected = document.querySelector('input[name="state"]:checked');

  const delay = delayInput.value;
  const state = stateSelected ? stateSelected.value : null;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => {
        resolve(`Fulfilled promise in ${delay}ms`);
      }, delay);
    } else if (state === 'rejected') {
      setTimeout(() => {
        reject(`Rejected promise in ${delay}ms`);
      }, delay);
    } else {
      reject('Invalid state');
    }
    delayInput.value = '';
  });

  promise
    .then(result => {
      iziToast.show({
        message: `✅ ${result}`,
        color: 'green',
        position: 'topRight',
        close: false,
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ ${error}`,
        color: 'red',
        position: 'topRight',
        close: false,
      });
    });
});


