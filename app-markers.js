// Get array of objects of the sponsors

window.onload = () => {
    let sponsors = loadSponsors();
    renderMarkers(sponsors);
};

console.log('File Loaded')

function loadSponsors() {
    return [
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
]}

//improvements
// 1. get a better model
// 2. make the object rotate, if possible

//events!!
// 1. marker-found/object-revealed: Show clickable button to claim prize.
// 2. click: open modal that gives feedback.

AFRAME.registerComponent('markers_start',{
	init:function(sponsors){
        console.log('Init function loaded')
        let sceneEl = document.querySelector('a-scene');
    
        sponsors.forEach((sponsor, index) => {
            //create asset
            let assetEl = document.createElement('a-assets')
            let assetItemEl = document.createElement('a-asset-item')
            assetItemEl.setAttribute('id', `${sponsor.name}-asset`)
            assetItemEl.setAttribute('src', sponsor.modelUrl)
            assetEl.appendChild(assetItemEl)
    
            //create marker
            let markerEl = document.createElement('a-marker');
            markerEl.setAttribute('type','pattern');
            markerEl.setAttribute('url', sponsor.url);
            markerEl.setAttribute('id', `${sponsor.name}-marker`);
            markerEl.setAttribute('type', 'pattern');
            markerEl.setAttribute('preset', 'custom');
            //create entity and add as child to marker
            let model = `<a-entity
            gltf-model="#${sponsor.name}-asset"
            scale="2">
        </a-entity>`
        console.log('Backyard works!!')
            markerEl.innerHTML = model
            sceneEl.appendChild(assetEl)
            sceneEl.appendChild(markerEl)
        })
    }
})

