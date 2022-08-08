s = "";
objects = [];
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(s != ""){
        objectDetector.detect(video, gotResults);
        for(i=0 ; i < objects.length; i++){
        if(objects[i].label == object){
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("status").innerHTML = "Object Mentioned Found";
            synth = window.speechSynthesis;
            utterthis = new SpeechSynthesisUtterance(object + "found");
            synth.speak(utterthis);
            console.log(object);
        }
        else{
            document.getElementById("status").innerHTML = object + "Not Found";
        }
            document.getElementById("status").innerHTML = "Staus: Objects Detected";
            document.getElementById("numberOfObjects").innerHTML = "Number of Objects Detected Are: " + objects.length; 
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object = document.getElementById("object_name").value;
}
function modelloaded(){
    console.log("Model loaded!");
    s = true;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}