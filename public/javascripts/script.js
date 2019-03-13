document.addEventListener('DOMContentLoaded', () => {

    console.log('IronGenerator JS imported successfully!!!');

    const madridCenter = {
        lat: 40.416753,
        lng: -3.703354
    }

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: madridCenter
    })

    const myMarker = new google.maps.Marker({
        position: madridCenter,
        map: map,
        title: "I'm here"
    })


    placeRestaurants = (restaurants) => {
        // console.log(restaurants)
        const markers = []

        restaurants.forEach(restaurants => {
            console.log(restaurants.location.coordinates[1], restaurants.location.coordinates[0])
            const center = {
                lat: restaurants.location.coordinates[0],
                lng: restaurants.location.coordinates[1]
            }
            const marker = new google.maps.Marker({
                position: center,
                map: map,
                title: restaurants.name
            })
            markers.push(marker)
        });

    }

    placeRestaurants(window.result)

})