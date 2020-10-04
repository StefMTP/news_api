const countrySelector = document.getElementById('select2');
const span = document.querySelector('.flag-icon');

countrySelector.addEventListener('change', () => {
    span.classList.remove(span.classList.item(span.classList.length-1));
    span.classList += ` flag-icon-${countrySelector.value}`;
});