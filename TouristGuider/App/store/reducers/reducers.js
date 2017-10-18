export default function (state = { isLoggedIn: false, coords: { latitude: null, longitude: null}, data: null }, action) {
    switch (action.type) {
        case 'isLoggedIn':
            return { isLoggedIn: action.boolean };
        case 'currentLocation':
            return { coords: action.coords };
        case 'places':
            console.log(action.data)
            return { data: action.data };
        default:
            return state;
    }
}