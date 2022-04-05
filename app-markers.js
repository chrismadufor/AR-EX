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

//improvements
// 1. get a better model
// 2. make the object rotate, if possible

//events!!
// 1. marker-found/object-revealed: Show clickable button to claim prize.
// 2. click: open modal that gives feedback.

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
        let sceneEl = document.querySelector('a-scene');
    
        for (i=0; i<sponsors.length; i++){
            //create asset
            // let assetEl = document.createElement('a-assets')
            // let assetItemEl = document.createElement('a-asset-item')
            // assetItemEl.setAttribute('id', `${sponsors[i].name}-asset`)
            // assetItemEl.setAttribute('src', sponsors[i].modelUrl)
            // assetEl.appendChild(assetItemEl)
    
            //create marker
            let markerEl = document.createElement('a-marker');
            markerEl.setAttribute('type','pattern');
            markerEl.setAttribute('url', sponsors[i].url);
            markerEl.setAttribute('id', `${sponsors[i].name}-marker`);
            markerEl.setAttribute('class', 'animated-marker');
            markerEl.setAttribute('type', 'pattern');
            markerEl.setAttribute('preset', 'custom');
            markerEl.setAttribute('emitevents', 'true');
            markerEl.setAttribute('markerevents', '');
            //create entity and add as child to marker
            let model = `<a-entity
            gltf-model="#coin"
            rotation="0 180 0" scale="2 2 2" class="animated-model">
            </a-entity>`
            console.log('Backyard works!!')
            markerEl.innerHTML = model
            sceneEl.appendChild(markerEl)
        }

        const animatedMarkers = document.querySelectorAll(".animated-marker");

        animatedMarkers.forEach((marker, index) => {
            const aEntity = marker.querySelector(".animated-model");

            marker.addEventListener('markerFound', ()=>{
                marker.addEventListener('click', ()=> console.log('marker clicked', marker.id))
                
            })

        })
    }
})

// AFRAME.registerComponent('markerevents', {
//     init: function() {
        

//         // every click, we make our model grow in size :)
//         // animatedMarker.addEventListener('click', function(ev, target){
//         //     const intersectedElement = ev && ev.detail && ev.detail.intersectedEl;
//         //     if (aEntity && intersectedElement === aEntity) {
//         //         const scale = aEntity.getAttribute('scale');
//         //         Object.keys(scale).forEach((key) => scale[key] = scale[key] + 1);
//         //         aEntity.setAttribute('scale', scale);
//         //     }
//         // });
//     }
// });

