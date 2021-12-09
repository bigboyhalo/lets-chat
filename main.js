song="";
rightwristx=0;
rightwristy=0;
leftwristy=0;
leftwristx=0;
scorerightwrist=0;
scoreleftwrist=0;
function preload(){
    song=loadSound("music.mp3")
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotposes);
}

function modelloaded(){
    console.log("posenetisintialised")
}

function gotposes(results){
if (results.length>0) {
    scorerightwrist=results[0].pose.keypoints[10].score;
    scoreleftwrist=results[0].pose.keypoints[9].score;
    console.log("scorerightwrist "+scorerightwrist);
    console.log("scoreleftwrist "+scoreleftwrist);
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("rightwristx, "+rightwristx);
    console.log("rightwristy, "+rightwristy);
    console.log("leftwristx, "+leftwristx);
    console.log("leftwristy, "+leftwristy);

}
}

function draw(){
    image(video,0,0,600,500);
    fill("#ff0000");
    stroke("#ff0000");
    if (scorerightwrist>.2) {
        circle(rightwristx,rightwristy,20);
        if (rightwristy>0 && rightwristy<=100) {
            document.getElementById("speed").innerHTML="speed=0.5x";
            song.rate(0.5);
        }
        else if (rightwristy>100 && rightwristy<=200) {
            document.getElementById("speed").innerHTML="speed=1x";
            song.rate(1);  
        }
        else if (rightwristy>200 && rightwristy<=300) {
            document.getElementById("speed").innerHTML="speed=1.5x";
            song.rate(1.5);  
        }
        else if (rightwristy>300 && rightwristy<=400) {
            document.getElementById("speed").innerHTML="speed=2x";
            song.rate(2);  
        }
        else if (rightwristy>400) {
            document.getElementById("speed").innerHTML="speed=2.5x";
            song.rate(2.5);  
        }
    }

    if (scoreleftwrist>0.2) {
        console.log("Identifingvolume");
        circle(leftwristx,leftwristy,20);
        console.log("circledrawn");
        numberleftwristy=Number(leftwristy);
        console.log("numberleftwristy"+numberleftwristy);
        newleftwristy=floor(numberleftwristy*2);
        console.log("newleftwristy"+newleftwristy);
        leftwristy_divide_1000=newleftwristy/1000;
        console.log("leftwristy_divide_1000"+leftwristy_divide_1000);
        document.getElementById("volume").innerHTML="volume="+leftwristy_divide_1000;
        song.setVolume(leftwristy_divide_1000);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}