/**
 * Created by Anurag on 1/17/2015.
 */

function logger(msg){
    var textArea = document.getElementById("myConsoleText");
    var textToAppend = document.createTextNode("$> "+msg+"\n");
    document.getElementById("myConsoleText").scrollTop = document.getElementById("myConsoleText").scrollHeight;
    textArea.appendChild(textToAppend);
}

function disclaimer(){
    alert("Your location on the Map, as we have shown, may not be accurate and may be entirely wrong. " +
        "Geolocation is based on finding map coordinates by hitting a database with your IP. Accuracy depends on how good is the databse." +
        "We are using w3 database.");
    logger("Our best guess is, you are within acuracy circle");
}

