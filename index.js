document.addEventListener("DOMContentLoaded", function() {
    // const piggyWrap = document.querySelector('#piggyWrap')
    const btn = document.querySelector('.claim-btn')
    btn.style.display='block'
    console.log('btn', btn)
    btn.addEventListener('click', () => {
        window.location.assign('prize.html')
    })
    const marker = document.querySelector('#piggy')
    marker.style.zIndex='5'
    marker.addEventListener('click', event => {
    console.log('Marker clicked')
    })
    marker.addEventListener('targetLost', event => {
    console.log('Marker lost')
    
    })
})