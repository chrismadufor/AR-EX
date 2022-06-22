// import baseUrl from 'constants'

const baseUrl = 'https://ar-be.herokuapp.com/'

let stadiumCoords;
const stadiumCoord = {"lat":9.060352,"long":7.4678272}

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
       sessionStorage.setItem('arUserLong', userCoords.longitude)
       sessionStorage.setItem('arUserLat', userCoords.latitude)
    }
}
const wait = document.querySelector('.wait')
const main = document.querySelector('.main-body')

let actualDay;

async function getGame() {
    const response = await fetch(`${baseUrl}api/games/today`)
    const data = await response.json()
    console.log(data)
    setTimeout(() => {
        wait.style.display = 'none'
        // main.style.display = 'flex'
    }, 2000)
    const gameDay = data.data.game.datetime
    actualDay = new Date(gameDay)
    stadiumCoords = {
        lat: data.data.game.lat,
        long: data.data.game.long
    }

    // store game ID in Session storage
    sessionStorage.setItem('slarge-id', data.data.game.id)

}

let loading = true;
let userInStadium = false

function goToArPage() {
    const errorText = document.getElementById('error-text')
    try {
        let experienceMin = actualDay.getMinutes()
        if (experienceMin <= 9) experienceMin = '0' + experienceMin
        let experienceHr = actualDay.getHours()
        if (experienceHr <= 9) experienceHr = '0' + experienceHr
        const experienceDate = actualDay.getDate()
        const experienceMonth = actualDay.getMonth()
        const experienceTime = `${experienceHr}:${experienceMin}`
        const errorText = document.getElementById('error-text')
        const today = new Date()
        const userLong = sessionStorage.getItem('arUserLong')
        const userLat = sessionStorage.getItem('arUserLat')

        
        if (today.getDate() == experienceDate && today.getMonth() == experienceMonth) {
            if (userLong == stadiumCoords.long && userLat == stadiumCoords.lat) {
                userInStadium = true
                if (today.getHours() == experienceHr) {
                    sessionStorage.setItem('slarge-ar', true)
                    window.location.assign('ar.html')
                }else {
                    errorText.innerText = `It is not yet time for the Experience!! The next experience is by ${experienceTime}. I will let you tho 😉 `
                    setTimeout(() => {
                        errorText.innerText = ''
                        sessionStorage.setItem('slarge-ar', true)
                        window.location.assign('ar.html')
                    }, 4000)
                }
            }
            else {
                errorText.innerText = 'Yaay!! It is gameday but you have to be in the stadium for the experience. I will let you tho 😉'
                setTimeout(() => {
                    errorText.innerText = ''
                    sessionStorage.setItem('slarge-ar', true)
                    window.location.assign('ar.html')
                }, 4000)
            }
        }
        else {
            errorText.innerText = 'It is not gameday!!'
            setTimeout(() => errorText.innerText = '', 4000)
        }
    }
    catch(err) {
        alert(err)
        errorText.innerText = 'Something went wrong. Refresh the page'
        setTimeout(() => errorText.innerText = '', 4000)
    }
}