console.log('Client side js ');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#mes-1')
const messageTwo = document.querySelector('#mes-2')

//messageOne.textContent = ''
//messageTwo.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } 
            else {
                console.log(data);
                console.log(data.forecast);
                messageOne.textContent = 'Temperature: ' + data.forecast.temperature + ', Feelslike: ' + data.forecast.feelslike
                messageTwo.textContent = 'Location: ' + data.forecast.location
            }
        })
    })
})