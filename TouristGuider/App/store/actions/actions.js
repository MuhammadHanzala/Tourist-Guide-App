export function isLoggedIn(boolean) {
    return {
        type: 'isLoggedIn',
        boolean
    }
}
export function currentLocation(coords) {
    return {
        type: 'currentLocation',
        coords
    }
}
export function places(data) {
    console.log(data);
    return {
        type: 'places',
        data
    }
}
