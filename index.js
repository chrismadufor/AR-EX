let stadiumCoords;
const stadiumCoord = {"lat":9.060352,"long":7.4678272}

const baseUrl = 'https://ar-be.herokuapp.com/'

let userCoords;

window.addEventListener('DOMContentLoaded', (event) => {
    navigator.geolocation.getCurrentPosition(position => {
        userCoords = position.coords
        saveUserCoords()
    })
    getGame()
});

function saveUserCoords() {
    if (userCoords) {
        console.log('From function', userCoords)
        const str = JSON.stringify({
            lat: userCoords.latitude,
            long: userCoords.longitude
        })
        console.log('str', str)
       sessionStorage.setItem('arUserLocation', str)
    }
}
let actualDay;
async function getGame() {
    const response = await fetch(`${baseUrl}api/games/today`)
    const data = await response.json()
    console.log(data)
    const gameDay = data.data.game.datetime
    actualDay = new Date(gameDay)
    stadiumCoords = {
        lat: data.data.game.lat,
        long: data.data.game.long
    }
}

let loading = true;
let userInStadium = false

function goToArPage() {
    const experienceMin = actualDay.getMinutes()
    const experienceHr = actualDay.getHours()
    const experienceDate = actualDay.getDate()
    const experienceMonth = actualDay.getMonth()
    const experienceTime = `${experienceHr}:${experienceMin}`
    const errorText = document.getElementById('error-text')
    const today = new Date()
    const userLocation = JSON.parse(sessionStorage.getItem('arUserLocation'))

    if (today.getDate() == experienceDate && today.getMonth() == experienceMonth) {
        if (userLocation.long == stadiumCoords.long && userLocation.lat == stadiumCoords.lat) {
            userInStadium = true
            if (today.getHours() == experienceHr) {
                window.location.assign('ar.html')
            }else {
                errorText.innerText = `It is not yet time for the Experience!! The next experience is by ${experienceTime} `
            }
        }
        else {
            errorText.innerText = 'Yaay!! It is gameday but you have to be in the stadium for the experience'
        }
    }
    else {
        errorText.innerText = 'It is not gameday!!'
    }
}