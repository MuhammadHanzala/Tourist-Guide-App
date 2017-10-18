import axios from 'axios';
import apiKey from './api';
const url = "https://maps.googleapis.com/maps/api/place/details/json?"

export default getPlaceDetails = async (placeId, callback) => {
    let completeUrl = `${url}placeid=${placeId}&key=${apiKey}`;
    console.log('Requested Place Details');
    await axios.get(completeUrl)
        .then(async (response) => {
            callback(response.data.result)
            console.log(response);
            // let placeDetails = response.data.results;
            // await callback(true, places);
        })
        .catch((err) => console.log(false, err.message))
}