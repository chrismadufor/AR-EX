// Get array of objects of the sponsors
console.log('File Loaded')

function loadSponsors() {
    return [
    {
        name: 'paystack',
        url: 'assets/markers/paystack-marker1.patt',
        modelUrl: 'assets/models/paystack/scene.gltf',
        message: 'Hi, Paystack is amazing!'
    },
    {
        name: 'piggyvest',
        url: 'assets/markers/piggyvest-marker1.patt',
        modelUrl: 'assets/models/piggyvest/scene.gltf',
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
            let assetEl = document.createElement('a-assets')
            let assetItemEl = document.createElement('a-asset-item')
            assetItemEl.setAttribute('id', `${sponsors[i].name}-asset`)
            assetItemEl.setAttribute('src', sponsors[i].modelUrl)
            assetEl.appendChild(assetItemEl)
    
            //create marker
            let markerEl = document.createElement('a-marker');
            markerEl.setAttribute('type','pattern');
            markerEl.setAttribute('url', sponsors[i].url);
            markerEl.setAttribute('id', `${sponsors[i].name}-marker`);
            markerEl.setAttribute('type', 'pattern');
            markerEl.setAttribute('preset', 'custom');
            //create entity and add as child to marker
            let model = `<a-entity
            gltf-model="#${sponsors[i].name}-asset"
            rotation="0 180 0" scale="0.5 0.5 0.5">
            </a-entity>`
            console.log('Backyard works!!')
            markerEl.innerHTML = model
            sceneEl.appendChild(assetEl)
            sceneEl.appendChild(markerEl)
        }
    }
})

