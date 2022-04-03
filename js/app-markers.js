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
        url: '../assets/markers/paystack.png',
        modelUrl: '../assets/models/paystack/scene.gltf',
        message: 'Hi, Paystack is amazing!'
    },
    {
        name: 'piggyvest',
        url: '../assets/markers/piggyvest.png',
        modelUrl: '../assets/models/piggyvest/scene.gltf',
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

//         <a-assets>
//     <a-asset-item id="cityModel" src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
//   </a-assets>

        //create marker
        let markerEl = document.createElement('a-marker');
        markerEl.setAttribute('type','pattern');
        markerEl.setAttribute('url', sponsor.url);
        markerEl.setAttribute('id', `${sponsor.name}-marker`);
        markerEl.setAttribute('markerEvents', '');
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

