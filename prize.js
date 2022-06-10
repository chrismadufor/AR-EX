const baseUrl = 'https://ar-be.herokuapp.com/'

// confetti-js
let confettiSettings = { 
    target: 'my-canvas',
    max: 200,
    rotate: true,
    clock: 15
};
let confetti = new ConfettiGenerator(confettiSettings);
confetti.render();
// setTimeout(() => confetti.clear(), 7000)

const obj = JSON.parse(localStorage.getItem('slarge'))
// if (sessionStorage.getItem('slarge') !== null) sessionStorage.removeItem('slarge')
sessionStorage.setItem('prize-id', obj.id)
const companyLogo = document.getElementById('company-logo')
const prizeMessage = document.getElementById('prize-message-span')

companyLogo.setAttribute("src", `img/${obj.company.toLowerCase()}.png`)

prizeMessage.innerText = obj.prize

const btn = document.getElementById('redeem-btn')

btn.addEventListener('click', () => {
    let firstName = document.getElementById('first-name').value
    let email = document.getElementById('email').value
    let lastName = document.getElementById('last-name').value
    const winnerObj = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
    }
    recordWinner(winnerObj)
    firstName = ''
    email = ''
    lastName = ''
})

async function recordWinner(obj) {
    console.log('From record winner', obj)
    let winnerName = obj.firstName;
    let gameId = sessionStorage.getItem('slarge-id')
    let prizeId = sessionStorage.getItem('prize-id')
    // POST Request
    const response = await fetch(`${baseUrl}api/games/${gameId}/prizes/${prizeId}/claim_prize`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const data = await response.json()
    if(data.status == 'success')showModal(winnerName)
}

function showModal(name) {
    const modal = document.getElementById('modal')
    const nameTag = document.getElementById('name-tag')

    modal.style.display = 'flex'
    nameTag.innerText = name
}

function clearSlarge() {
    localStorage.removeItem('slarge')
    sessionStorage.removeItem('prize-id')
}