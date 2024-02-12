import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formElement = document.querySelector('.feedback-form');
const emailInput = formElement.querySelector('input[name="email"]');
const messageTextarea = formElement.querySelector('textarea[name="message"]');

loadFormData();

formElement.addEventListener('submit', onSubmit);
formElement.addEventListener('input', throttle(onInput, 500));

function onSubmit(event) {
  event.preventDefault();
  if (emailInput.value === '' || messageTextarea.value === '') {
    return;
  }
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  console.log('Form submitted with data:', formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onInput(event) {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (formData) {
    if (formData.message) {
      messageTextarea.value = formData.message;
    }
    if (formData.email) {
      emailInput.value = formData.email;
    }
  }
}
