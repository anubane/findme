/**
 * Created by Anurag on 1/16/2015.
 */
/**
 * This js file defines the behaviour and actions of the buttons
 * */

function findMeFnc(){
    if(haveIP) {
        if (doesConnectionExist()) {
            if (navigator.geolocation) {
                logger("Requesting access to your location");
                navigator.geolocation.getCurrentPosition(plotLocation, reportProblem);
            } else {
                logger("Your browser doesn't support geolocation");
            }
        } else {
            logger("Check your internet connection");
        }
    } else {
        alert("Ad blockers need to be deactivated");
    }
}

function togglMapCtrlFnc(){
    if(haveIP) {
        if (toggleStatus) {
            toggleStatus = false;
            logger("Hiding Map controls");
        } else {
            toggleStatus = true;
            logger("Showing Map controls");
        }
        var options = {
            mapTypeControl: toggleStatus,
            overviewMapControl: toggleStatus,
            panControl: toggleStatus,
            rotateControl: toggleStatus,
            scaleControl: toggleStatus,
            zoomControl: toggleStatus,
            streetViewControlOptions: toggleStatus
        };
        map.setOptions(options);
    } else {
        alert("Ad blockers need to be deactivated");
    }
}