const stadiumCoords = {
    long: 7.471104,
    lat: 9.060352
}

const matchDate = new Date()
// const matchDate = new Date(2022,4,22)
const experienceHr = 13
const errorText = document.getElementById('error-text')

let loading = true;
let userInStadium = false

// navigator.geolocation.getCurrentPosition(position => {
//     userCoords = position.coords

//     if (userCoords.longitude == stadiumCoords.long && userCoords.latitude == stadiumCoords.lat) userInStadium = true
//     console.log('Is the user in the stadium?: ' + userInStadium)
// })

function goToArPage() {
    const today = new Date()
    navigator.geolocation.getCurrentPosition(position => {
        userCoords = position.coords
        console.log(userCoords)
        // matchDate.getHours()
        
    
        if (userCoords.longitude == stadiumCoords.long && userCoords.latitude == stadiumCoords.lat) {
            userInStadium = true
            if (today.getHours() == experienceHr) {
                if (userInStadium) {
                    window.location.assign('ar.html')
                }else {
                    errorText.innerText = 'You have to be in the stadium for the experience'
                }
            }else {
                errorText.innerText = 'It is not gameday!!'
            }
        }
        else {
            errorText.innerText = 'You have to be in the stadium for the experience'
        }
    })
}