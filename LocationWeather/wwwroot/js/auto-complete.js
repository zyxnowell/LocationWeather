
var placeSearch, autocomplete;

    


    function initAutocomplete() {

        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('location')),
            { types: ['geocode'] });

        autocomplete.addListener('place_changed', fillInAddress);
    }

    function fillInAddress() {
        var place = autocomplete.getPlace().geometry;
        if (place === undefined) {
            $().exceedAlert();
        } else {
            $("#locationTxt").text(autocomplete.getPlace().name);
            var lat = place.location.lat();
            var lon = place.location.lng();

            $().getWeather(parseInt(lat), parseInt(lon));
        }
        
}

    function geolocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                autocomplete.setBounds(circle.getBounds());
            });
        }
    }