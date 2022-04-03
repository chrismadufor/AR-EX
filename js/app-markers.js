// Get array of objects of the sponsors

console.log('File Loaded')

let sponsors = [
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
    }
]

AFrame.registerComponent('markers_start', {
    init:function() {
	    console.log('Init function loaded')
        let sceneEl = document.querySelector('a-scene');

        sponsors.forEach((sponsor, index) => {
            //create asset

            //create marker
            let markerEl = document.createElement('a-marker');
            markerEl.setAttribute('type','pattern');
			markerEl.setAttribute('url', sponsor.url);
            markerEl.setAttribute('id', sponsor.name);
            markerEl.setAttribute('markerEvents', '');
            //create entity and add as child to marker
            let model = document.createElement('a-entity')
            model.setAttribute('id',sponsor.name);
            model.setAttribute('gltf-model', sponsor.modelUrl);

            markerEl.appendChild(model)
            sceneEl.appendChild(markerEl)
        })
    }
})

