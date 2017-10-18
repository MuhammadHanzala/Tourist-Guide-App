import axios from 'axios';
import Polyline from '@mapbox/polyline';
import apiKey from './api';

const url = "https://maps.googleapis.com/maps/api/directions/json?"

export default getPlaceDirection = async (origin, destination, callback) => {
    let completeUrl = `${url}origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;
    console.log('Requested Place Direction');
    await axios.get(completeUrl)
        .then(async (response) => {
            let points = Polyline.decode(response.data.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            callback({origin, coords});          
            console.log(coords);
        })
        .catch((err) => console.log(false, err.message))
}