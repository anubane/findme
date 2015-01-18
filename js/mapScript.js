/**
 * Created by Anurag on 1/17/2015.
 */

function loadMap(toggleStatus){
    if(haveIP) {
        logger("Centering map at your Country...");
        var mapCanvas = document.getElementById('mapHolder');
        var mapOptions = {
            center: new google.maps.LatLng(usrLoc.lat, usrLoc.long),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(mapCanvas, mapOptions);
    }
}
function plotLocation(position) {
    if(notYetFound) {
        logger("received a better estimate of your location");
        logger("Latitude: " + position.coords.latitude);
        logger("Longgitude: " + position.coords.longitude);
        var point = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var marker = new google.maps.Marker({
            position: point,
            icon: 'img/LocationMarker.png',
            //animation: google.maps.Animation.BOUNCE
        });
        marker.setMap(map);
        drawAccuracyCircle(point,position.coords.accuracy);
        map.setCenter(point);
        map.setZoom(18);
        disclaimer();
        notYetFound = false;
    } else {
        logger("To refresh location, reload application");
    }
}
function reportProblem(e) {
    /* Is this a support issue or an API issue? */
    if (navigator.geolocation) {
        switch (e.code) {
            case e.PERMISSION_DENIED:
                logger("You have denied access to your position. You will not get the most out of the application now.");
                break;
            case e.POSITION_UNAVAILABLE:
                logger("There was a problem getting your position.");
                break;
            /*case e.TIMEOUT:
             // Three changes to get the location before a true timeout
             if (++attempts < 3) {
             navigator.geolocation.getCurrentPosition(plotLocation,
             reportProblem);
             } else
             logger("The application has timed out attempting to get your location.");
             break;*/
            default:
                logger("There was a horrible Geolocation error that has not been defined.");
        }
    } else
        logger('Geolocation is not supported by your browser.');
}
function drawAccuracyCircle(centerOn,radii){
    logger("Accuracy of your location: "+radii+" m");
    var region = new google.maps.Circle({
        center:centerOn,
        radius:radii,
        strokeColor:"#388C8F",
        strokeOpacity:0.6,
        strokeWeight:1,
        fillColor:"#388C8F",
        fillOpacity:0.3
    });
    region.setMap(map);
}
