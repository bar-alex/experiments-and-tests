( () => {
    const width = 320;      // we'll scale the photo width to this
    const height = 0;       // will be computed based on the input stream

    const streaming = false; 

    let video = null; 
    let canvas = null;
    let photo = null;
    let startbutton = null;

    function startup () {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');


        navigator.geolocation.getCurrentPosition(
            (pos) => console.log(pos),
            (err) => console.error(err),
            { 
                timeout: 1000, 
                enableHighAccuracy: true, 
                maximumAge: 10_000,
            }
        )
        
            console.log( document.featurePolicy.allowedFeatures()  );
        navigator.mediaDevices.enumerateDevices()
            .then((dev)=>{ console.log(dev); })
        
        navigator.mediaDevices.getUserMedia( {video: true, audio: false} )
            .then( (stream) => {
                video.srcObject = stream;
                video.play();
            } )
            .catch( err => console.error(`An error occurred ${err}`) )




    }


    startup()

})()