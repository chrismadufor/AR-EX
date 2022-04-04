// Get array of objects of the sponsors

window.onload = () => {
    let sponsors = loadSponsors();
    renderMarkers(sponsors);
};

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

function renderMarkers(sponsors) {
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
        // markerEl.setAttribute('smooth', 'true');
        // markerEl.setAttribute('smoothCount', '10');
        markerEl.setAttribute('preset', 'custom');
        // markerEl.setAttribute('raycaster', 'objects: .clickable');
        // markerEl.setAttribute('emitevents', 'true');
        // markerEl.setAttribute('cursor', 'fuse: false; rayOrigin: mouse;');

        //create entity and add as child to marker
        let model = `<a-entity
            gltf-model="#${sponsor.name}-asset" 
            >
        </a-entity>`
        markerEl.innerHTML = model

        sceneEl.appendChild(assetEl)
        sceneEl.appendChild(markerEl)
    })
}

//improvements
// 1. get a better model
// 2. make the object rotate, if possible

//events!!
// 1. marker-found/object-revealed: Show clickable button to claim prize.
// 2. click: open modal that gives feedback.

// AFRAME.registerComponent('markers_start',{
// 	init:function(){
//         console.log('component thing is working')
//     }
// })

