// Get array of objects of the sponsors
console.log('File Loaded')

function loadSponsors() {
    return [
    {
        name: 'paystack',
        url: 'assets/markers/paystack-marker1.patt',
        message: 'Hi, Paystack is amazing!'
    },
    {
        name: 'piggyvest',
        url: 'assets/markers/piggyvest-marker1.patt',
        message: 'Hi, hit your savings targets with Piggyvest'
    },
]}

AFRAME.registerComponent('markers_start',{
	init:function(){
        let sponsors = [
            {
                name: 'paystack',
                url: 'assets/markers/paystack-marker.patt',
                modelUrl: 'assets/models/paystack/scene.gltf',
                message: 'Hi, Paystack is amazing!'
            },
            {
                name: 'piggyvest',
                url: 'assets/markers/piggyvest-marker.patt',
                modelUrl: 'assets/models/piggyvest/scene.gltf',
                message: 'Hi, hit your savings targets with Piggyvest'
            },
        ]

        console.log('Init function loaded')

        const animatedMarkers = document.querySelectorAll(".animated-marker");

        animatedMarkers.forEach((marker, index) => {
            marker.addEventListener('markerFound', ()=>{
                console.log('Marker found')
            })

            marker.addEventListener('markerLost', ()=>{
                console.log('Marker lost')
            })

        })
    }
})

console.log('nftss')

let marker = document.getElementById('#animated-marker')

marker.addEventListener('markerFound', ()=>{
    console.log('Marker found')
})

marker.addEventListener('markerLost', ()=>{
    console.log('Marker lost')
})