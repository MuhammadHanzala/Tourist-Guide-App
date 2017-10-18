
export default (callback) => {
   navigator.geolocation.getCurrentPosition((position) => {
        let coordinates = position.coords;
        let { latitude, longitude } = coordinates;
        console.log(latitude, longitude)
        if(callback) callback(true, {latitude, longitude});
        
    }, async (error) => {
        console.log( );
        if(callback) callback(false, error.message +'. Please check your device Location OR GPS');
        
    }, { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 })
}