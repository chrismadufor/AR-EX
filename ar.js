// import baseUrl from 'constants'
const baseUrl = 'https://ar-be.herokuapp.com/'
// const gameId = "421bf3f8-af4c-4f4d-867b-e0c855dd47a0"

let markersObj;

if (sessionStorage.getItem('slarge') !== null) sessionStorage.removeItem('slarge')
const gameId = sessionStorage.getItem('slarge-id')
getMarkers()

// From DOM
window.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    const feedback = document.querySelector('.feedback')
    const btn = document.querySelector('.claim-btn')
    const noPrize = document.querySelector(".no-prize")
    const loader = document.querySelector(".loader")
    console.log(feedback)
})


async function getMarkers() {
    const response = await fetch(`${baseUrl}api/games/${gameId}/markers`)
    const data = await response.json()
    markersObj = data.data.markers
    console.log(markersObj)
    getEntities(markersObj)
}

function getEntities(markers) {
    const sceneEl = document.querySelector('a-scene');
    markers.forEach(marker => {
        const entity = document.createElement('a-entity')
        entity.setAttribute("mindar-image-target", `targetIndex:${marker.targetIndex}`)
        entity.setAttribute("id", `${marker.id}`)
        entity.setAttribute("class", "api-markers")
        const markerTag = document.createElement('a-gltf-model')
        markerTag.setAttribute("class", "clickable")
        markerTag.setAttribute("rotation", "0 0 0")
        markerTag.setAttribute("position", `${marker.position} ${marker.position} ${marker.position}`)
        markerTag.setAttribute("scale", `${marker.scale} ${marker.scale} ${marker.scale}`)
        markerTag.setAttribute("src", `#${marker.modelId}`)
        markerTag.setAttribute("animation-mixer", "")

        // add marker tag as child of entity
        entity.appendChild(markerTag)

        // add entity to the aScene as a child

        sceneEl.appendChild(entity)

        addEvents()
    })
}
let requestCount = 0
function addEvents() {
    const markers = document.querySelectorAll('.api-markers')
    const loader = document.querySelector(".loader")
    const noPrize = document.querySelector(".no-prize")
    markers.forEach((marker, index) => {
        
        marker.addEventListener("targetFound", event => {
            requestCount++
            if(requestCount <=1) {
                console.log('target found')
                if (markersObj[index].hasPrize){
                    loader.style.display = 'flex'
                    claimPrice(markersObj[index].id)
                }
                else {
                    noPrize.style.display = 'flex'
                    setTimeout(() => noPrize.style.display = 'none', 3000)
                }
            }
            console.log('After restriction', requestCount)
        })
        marker.addEventListener("targetLost", event => {
            requestCount = 0
            console.log('target lost')
            const btn = document.querySelector('.claim-btn')
            const noPrize = document.querySelector(".no-prize")
            loader.style.display = 'none'
            btn.style.display = 'none'
            noPrize.style.display = 'none'
            if (sessionStorage.getItem('slarge') !== null) sessionStorage.removeItem('slarge')
        })
    })
}

async function claimPrice(markerId) {
    const btn = document.querySelector('.claim-btn')
    const canvas = document.getElementById('ar-canvas')
    const noPrize = document.querySelector(".no-prize")
    const loader = document.querySelector(".loader")
    const response = await fetch(`${baseUrl}api/games/${gameId}/markers/${markerId}/attempt_claim`)
    const data = await response.json()
    console.log(data)
    setTimeout(() => {
        if (data.status == 'success') {
            loader.style.display = 'none'
            canvas.style.display = 'block'
            btn.style.display = 'block'
            noPrize.style.display = 'none'
            btn.addEventListener('click', () => goToPrizePage(data))
        }
        else {
            loader.style.display = 'none'
            noPrize.style.display = 'flex'
            btn.style.display = 'none'
            if (sessionStorage.getItem('slarge') !== null) sessionStorage.removeItem('slarge')
            setTimeout(() => noPrize.style.display = 'none', 3000)
        }
    }, 2000)
    
}

function goToPrizePage(data) {
    const prize = data.data.prize.prize
    const id  = data.data.prize.id
    const company = data.data.prize.companyName
    const wait = document.querySelector('.wait')
    const obj = {
        prize,
        company,
        id
    }
    console.log('obj', obj)
    localStorage.setItem('slarge', JSON.stringify(obj))
    wait.style.display = 'flex'
    setTimeout(() => {
        window.location.assign('prize.html')
    }, 3000)
    
}