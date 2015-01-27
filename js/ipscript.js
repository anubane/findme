/**
 * Created by Anurag on 1/17/2015.
 */
function doesConnectionExist() {
    var xhr = new XMLHttpRequest();
    var file = "img/InMapsPlace.png";
    //var file = "http://www.google.com/favicon.ico";
    var randomNum = Math.round(Math.random() * 10000);
    xhr.open('HEAD', file + "?rand=" + randomNum, false);
    try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 304) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
function getApproxLoc(){
    if(doesConnectionExist()) {
        var usrLoc = new Object();
        usrLoc.lat = null;
        usrLoc.long = null;
        usrLoc.cntry = null;
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            var xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "http://www.telize.com/geoip", true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    //console.log(xmlhttp.responseText)
                    var response = JSON.parse(xmlhttp.responseText);
                    usrLoc.lat = response.latitude;
                    usrLoc.long = response.longitude;
                    usrLoc.country = response.country;
                    logger("You seem to be in " + usrLoc.country);
                    logger("Your approx latitude: " + usrLoc.lat);
                    logger("Your approx longitude: " + usrLoc.long);
                    loadMap(toggleStatus);
                } else {
                    console.log("Error", xmlhttp.statusText);
                }
            }
        }
        return usrLoc;
    } else {
        logger("Check your internet connection");
        return null;
    }
}
function loadXMLDoc() {
    if(doesConnectionExist()) {
        if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
            var xmlhttp = new XMLHttpRequest();
        } else { // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", "http://www.telize.com/jsonip", true);
        try {
            xmlhttp.send();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4) {
                    if (xmlhttp.status === 200) {
                        //console.log(xmlhttp.responseText)
                        var xyz = xmlhttp.responseText;
                        var abc = xyz.split("\"");
                        document.getElementById('yourIpValue').innerHTML = abc[3];
                        haveIP = true;
                        yourIP = abc[3];
                        logger(yourIP);
                        usrLoc = getApproxLoc();
                        if (usrLoc === null) {
                            throw new Error();
                        }
                    } else {
                        console.log("Error", xmlhttp.statusText);
                    }
                }
            }
            logger("Retrieving your public IP ...");
        } catch (e){
            logger("Check your internet connection")
        }
    } else {
        logger("Check your internet connection");
    }
}