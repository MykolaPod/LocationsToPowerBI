PTP.Controllers.AddressAutocomplete = function () {
    this.autocompleteInputIdSelector = '#autocomplete';
    this._init();

    this.autocompleteObj;

    this.googleResponseModel = {
        street_number: 'long_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        country: 'long_name',
    };
    
};

PTP.Controllers.AddressAutocomplete.prototype._init = function () {
    var self = this;
    self._subscribe();
    self._loadGoogleApi();
  
};


PTP.Controllers.AddressAutocomplete.prototype._apiLoadedCallback = function () {


    var self = PTP.Controllers.currentControllers[0];
    var options = {
        types: ['geocode'],
        //componentRestrictions: { country: 'fr' }
    };
    self.autocompleteObj = new google.maps.places.Autocomplete(/** @type {!HTMLInputElement} */($(self.autocompleteInputIdSelector)[0]), options);

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    self.autocompleteObj.addListener('place_changed',
        function() {self.fillInAddress(self)} );
}

PTP.Controllers.AddressAutocomplete.prototype._subscribe = function () {
    var self = this;

    $(self.autocompleteInputIdSelector).focus(function () {
        return self.autocompleteOnfocusHandler(self);
    });

};

PTP.Controllers.AddressAutocomplete.prototype.fillInAddress = function(ctrl) {
    var self = ctrl;
    // Get the place details from the autocomplete object.
    var place = self.autocompleteObj.getPlace();

    for (var component in self.googleResponseModel) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (self.googleResponseModel[addressType]) {
            var val = place.address_components[i][self.googleResponseModel[addressType]];
            document.getElementById(addressType).value = val;
        }
    }

    var myLatLng = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: myLatLng
    });

    new google.maps.Marker({
        position: myLatLng,
        map: map,
    });

}

PTP.Controllers.AddressAutocomplete.prototype.autocompleteOnfocusHandler = function (ctrl) {
//    var self = ctrl;
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(function (position) {
//            var geolocation = {
//                lat: position.coords.latitude,
//                lng: position.coords.longitude
//            };
//            var circle = new google.maps.Circle({
//                center: geolocation,
//                radius: position.coords.accuracy
//            });
//            self.autocompleteObj.setBounds(circle.getBounds());
//        });
//    }
}

PTP.Controllers.AddressAutocomplete.prototype._loadGoogleApi = function () {
    var self = this;

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCSoKAFI4tAZMWc8dVZxZQOZ10xzvXqGs0&signed_in=true&language=en-US&libraries=places&callback=PTP.Controllers.AddressAutocomplete.prototype._apiLoadedCallback';
    document.body.appendChild(script);
}

$(document).ready(function () {

    PTP.Controllers.currentControllers.push(new PTP.Controllers.AddressAutocomplete());

});
