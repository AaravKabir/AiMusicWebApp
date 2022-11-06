song1 = "";
song2 = "";
song1status = "";
song2status = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;
rightWristScore = 0;


function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet();
    posenet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("Ml5 is initialised")
}

function draw() {
    image(video,0,0,600,500);
    stroke("#EE0B40");
    fill("EE0B40");
    song1status = song1.isPlaying();
    song2status = song2.isPlaying();
    if(leftWristScore>0.2){
        circle(leftWristX,leftwristY,20);
        song2.stop()
        if(song2status=="false"){
            song2.play()
            document.getElementById("song").innerHTML = "Playing Music2"
        }
    }
    if(rightWristScore>0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song1status=="false"){
            song1.play();
            document.getElementById("song").innerHTML ="Playing Music1"
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}

function gotPoses(results){
    if(results.length>0){
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
    }
}
