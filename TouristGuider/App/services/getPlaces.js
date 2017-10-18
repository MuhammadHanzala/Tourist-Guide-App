import axios from 'axios';
import apiKey from './api';
const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"

export default getNearByPlaces = (latitude, longitude, callback, radius = 1000, type = 'all') => {
    let completeUrl = `${url}location=${latitude},${longitude}&radius=${radius}&types=${type}&key=${apiKey}`;
    console.log('Requested');
    axios.get(completeUrl)
        .then(async (response) => {
            console.log(response);
            let places = response.data.results;
            await callback(true, places);
        })
        .catch((err) => callback(false, err.message))
}