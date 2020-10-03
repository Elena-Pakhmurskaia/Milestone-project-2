var source, destination;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.SearchBox(document.getElementById('txtSource'));
    new google.maps.places.SearchBox(document.getElementById('txtDestination'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});
 


function GetRoute() {
    var europe = new google.maps.LatLng(49.81888, 3.30115);
    var mapOptions = {
        zoom: 5,
        center: europe
    };

    var waypts = [];
    var checkboxArray = document.getElementById("txtWaypoint");

        for (let i = 0; i < checkboxArray.length; i++) {
          if (checkboxArray.options[i].selected) {
            waypts.push({
              location: checkboxArray[i].value,
              stopover: true,
            });
          }
        }



    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('dvPanel'));
 
    //*********DIRECTIONS AND ROUTE**********************//
    source = document.getElementById("txtSource").value;
    destination = document.getElementById("txtDestination").value;
    waypoint = document.getElementById("txtWaypoint").value
 
    var request = {
        origin: source,
        destination: destination,
        waypoints: waypts,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
 
    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, 
    function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var dvDistance = document.getElementById("dvDistance");
            dvDistance.innerHTML = "";
            dvDistance.innerHTML += "Distance: " + distance + "<br />";
            dvDistance.innerHTML += "Duration: " + duration;
 
        } else {
            alert("Unable to find the route.");
        }
    });

        var marker = new google.maps.Marker({
      
        position: {lat: 50.694284, lng: 5.626468},
		iconImage: "/assets/images/shell logo.png",
		content: '<h5>Antwerp Shell Station</h5><br><h6>Pay here with your EuroShell Card</h6>',
        });

        marker.setMap(map);
}


   