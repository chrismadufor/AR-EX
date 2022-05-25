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
    const gameDay = data.data.games[0].datetime
    actualDay = new Date(gameDay)
    stadiumCoords = {
        lat: data.data.games[0].lat,
        long: data.data.games[0].long
    }
    console.log(data)
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
    console.log('From session storage', userLocation)
    navigator.geolocation.getCurrentPosition(position => {
        userCoords = position.coords

        if (today.getDate() == experienceDate && today.getMonth() == experienceMonth) {
            if (userCoords.longitude == stadiumCoords.long && userCoords.latitude == stadiumCoords.lat) {
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
    })
}