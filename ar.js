document.addEventListener("DOMContentLoaded", function() {
    const sceneEl = document.querySelector('a-scene');
    // const arSystem = sceneEl.systems["mindar-image-system"];
    // arSystem.start()
    const btn = document.querySelector('.claim-btn')
    // btn.style.display='block'
    btn.addEventListener('click', () => {
        window.location.assign('prize.html')
    })
    const piggy = document.querySelector('#piggy1')
    const markers = document.querySelectorAll('a-asset-item')
    console.log(markers)
    console.log(piggy)

    // markers.forEach(marker => {
    //     marker.addEventListener("targetFound", event => {
    //     console.log('Marker found')
    //     })
    //     marker.addEventListener("targetLost", event => {
    //     console.log('Marker lost')
        
    //     })
    // })

    markers.forEach(marker => {
        marker.addEventListener("click", event => {
        console.log('Marker found')
        })
        marker.addEventListener("targetLost", event => {
        console.log('Marker lost')
        
        })
    })
    
})