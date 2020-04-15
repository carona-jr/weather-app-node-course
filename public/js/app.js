const form = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-one')
const msgTwo = document.querySelector('#msg-two')
const load = document.querySelector('#load')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    msgOne.textContent = msgTwo.textContent = ''
    load.setAttribute('src', '/img/2.gif')
    const location = search.value
    fetch(`http://localhost:3000/weather?adress=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgTwo.textContent = data.error
            } else {
                let str = `The search for adress "${data.location}" return the temperature of ${data.forecast.temperature} degress, it's ${data.forecast.description} and the feels like is ${data.forecast.feelslike} degress. There is ${data.forecast.precip}% of rain.`
                msgOne.textContent = str
            }
            load.setAttribute('src', '')
        })
    })
})