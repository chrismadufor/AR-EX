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
        url: './assets/markers/paystack',
        modelUrl: './assets/models/paystack/scene.gltf',
        message: 'Hi, Paystack is amazing!'
    },
    {
        name: 'piggyvest',
        url: './assets/markers/piggyvest',
        modelUrl: './assets/models/piggyvest/scene.gltf',
        message: 'Hi, hit your savings targets with Piggyvest'
    },
]}

function renderMarkers(sponsors) {
    console.log('Init function loaded')
    let sceneEl = document.querySelector('a-scene');

    sponsors.forEach((sponsor, index) => {
        //create asset
        let assetEl = document.createElement('a-assets')
        assetEl.setAttribute('id', sponsor.name)
        assetEl.setAttribute('src', sponsor.modelUrl)

//         <a-assets>
//     <a-asset-item id="cityModel" src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
//   </a-assets>

        //create marker
        let markerEl = document.createElement('a-marker');
        markerEl.setAttribute('type','pattern');
        markerEl.setAttribute('url', sponsor.url);
        markerEl.setAttribute('id', sponsor.name);
        markerEl.setAttribute('markerEvents', '');
        //create entity and add as child to marker
        let model = document.createElement('a-entity')
        // model.setAttribute('id',sponsor.name);/
        model.setAttribute('gltf-model', `#${sponsor.name}`);
        markerEl.appendChild(model)
        sceneEl.appendChild(assetEl)
        sceneEl.appendChild(markerEl)
    })
}

