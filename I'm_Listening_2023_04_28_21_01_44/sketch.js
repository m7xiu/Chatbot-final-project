let myRec = new p5.SpeechRec(); //create a new speech recognition object
myRec.continuous = true; //continuous recognition
//myRec.interimResults = true; //switch interim results on or off to see how the program behaves

let startRecBttn, endRecBttn; //a button for starting the recognition and a button to stop recognition

let listening = false; //a variable to check whether the program is listening

let myVoice = new p5.Speech(); //add a voice to the program
let storyVoice = new p5.Speech(); //add another voice for story

let moon,bearLight,star,jar,jarLight,lampLight,star1,backgroundP,note;

let story;

let lineColor = 255;

//Set locations for the interactive objects
let lampX = 56;
let lampY = 112;
let lampD = 40;

let clockX = 174;
let clockY = 338;
let clockD = 20;

let bearX = 460;
let bearY = 400;
let bearD = 50;

let jarX = 310;
let jarY = 360;
let jarD = 40;

let bookX = 88;
let bookY = 427;
let bookD = 20;

let starX = 546;
let starY = 61;
let starD = 40;

let rv1=0.25;
let rv2=0.25;
let rv3=0.25;
let rv4=0.25;
let rv5=0.25;
let rv6=0.25;

//An array for the user's speech input
let secrets = [];

let check = 0;
let i = 0;
let a=0;
let checkAmount=0;
let randomX=0;
let randomY=0;
let w=[];
let h=[];

let songIsLooping = false;
let song;
let songV;//Song Volume

let storyIsPlaying = false;

let wordIsShowing = false;
let showWords = 0;
let num = 0;

function preload(){
  backgroundP = loadImage("BackgroundP.png");
  moon = loadImage("Moon.png");
  star = loadImage("Star.png");
  bearLight = loadImage("BearLight.png");
  jar = loadImage("Jar.png");
  jarLight = loadImage("JarLight.png");
  star1 = loadImage("Star1.png");
  lampLight = loadImage("LampLight.png");
  book = loadImage("Book.png");
  bookLight = loadImage("BookLight.png");
  note = loadImage("Note.png");
  story =loadStrings('TheLittlePrince.txt');
  song = loadSound('PureImagination.mp3');
}

function setup() {
  createCanvas(650,500);
  myVoice.setVoice("Alex");
  myVoice.setRate(0.8);
  myVoice.speak("Welcome back home, take a rest in the room.");
  
  //Quieter voice for story
  storyVoice.setVolume(0.3);
  storyVoice.setRate(0.9);
  
  song = createAudio('PureImagination.mp3');
  
  //Slider to control the volume of music
  fill("white");
  songV = createSlider(0,100);
  songV.style("width","80px");
  songV.position(clockX-30,clockY+12);
  
  textFont('fantasy');
  
}

function mousePressed(){
  //Song Player
  if(mouseX>clockX-15 && mouseX<clockX+15){
      if(mouseY>clockY-15 && mouseY<clockY+15){
        if (!songIsLooping) {
          song.loop();
          songIsLooping = true;
        } else {
          song.stop();
          songIsLooping = false;
        }
      }
   }
  
  //Story Player
  if(mouseX>bookX-15 && mouseX<bookX+15){
      if(mouseY>bookY-15 && mouseY<bookY+15){
        if (!storyIsPlaying) {
          storyVoice.speak(story);
          storyIsPlaying = true;
        } else {
          storyVoice.stop();
          storyIsPlaying = false;
        }
      }
   }
    
  //Click on bear to speak and stop speaking
  if(check==0){
    if(mouseX>bearX-20 && mouseX<bearX+20){
      if(mouseY>bearY-20 && mouseY<bearY+20){
         startRec();
         check = 1;
      }
    }}
    else if(check==1){
      check=0;
      endRec();
      w.push(random(-60,25));
      h.push(random(-60,80));
      a=20;
    }
   
  if(mouseX>jarX-20 && mouseX<jarX+20){
      if(mouseY>jarY-20 && mouseY<jarY+20){
        if (!wordIsShowing) {
          showWords = 1;
          num = int(random(0,secrets.length));
          console.log(num);
          wordIsShowing = true;
        } else {
          showWords = 0;
          wordIsShowing = false;
        }
      }
   }
}

function startRec() {
  myRec.start();
  listening = true; //change listening to true when recognition starts
  myRec.onEnd = function recEnded() {
  listening = false;
  }; //when recognition stops, turn listening to false
  myRec.onResult = showResult; //callback function for processing result from speech rec
}

function showResult() {
  console.log(myRec.resultString);
  secrets.push(myRec.resultString); // push the result string into array
  console.log(secrets);
  console.log(secrets.length);
}

function endRec() {
  myRec.stop();
}


function draw() {
  //console.log(mouseX,mouseY);
  background(backgroundP);
  
  image(moon,0,0,width, height);
  image(jar,0,0,width, height);
  image(book,0,0,width, height);
  
  //bouncing circles leading user to interact with the objects
  noFill();
  strokeWeight(2);
  
  push();
  stroke("#FFF2DA");
  circle(lampX,lampY,lampD);
  lampD = lampD+rv1;
  if (lampD > 50||lampD<40) {
    rv1 = rv1*-1;
  }
  pop();
  
  push();
  stroke("#DBBE8C");
  circle(bearX,bearY,bearD);
  bearD = bearD+rv2;
  if (bearD > 60||bearD<50) {
    rv2 = rv2*-1;
  }
  pop();
  
  push();
  stroke(250);
  circle(clockX,clockY,clockD);
  clockD = clockD+rv3;
  if (clockD > 30||clockD<20) {
    rv3 = rv3*-1;
  }
  pop();
  
  push();
  stroke("#ACFFFF");
  circle(jarX,jarY,jarD);
  jarD = jarD+rv4;
  if (jarD > 50||jarD<40) {
    rv4 = rv4*-1;
  }
  pop();
  
  push();
  stroke("#FFE6DA");
  circle(bookX,bookY,bookD);
  bookD = bookD+rv5;
  if (bookD > 30||bookD<20) {
    rv5 = rv5*-1;
  }
  pop();
  
  push();
  stroke("#FFFFDA");
  circle(starX,starY,starD);
  starD = starD+rv6;
  if (starD > 50||starD<40) {
    rv6 = rv6*-1;
  }
  pop();
  
  //when the mouse is in the circle, interaction will happen
  var d1 = dist(mouseX,mouseY,lampX,lampY);
  var d2 = dist(mouseX,mouseY,clockX,clockY);
  var d3 = dist(mouseX,mouseY,bearX,bearY);
  var d4 = dist(mouseX,mouseY,jarX,jarY);
  var d5 = dist(mouseX,mouseY,starX,starY);
  var d6 = dist(mouseX,mouseY,bookX,bookY);
  var d7 = dist(mouseX,mouseY,starX,starY);
  
  if (d1<25){
    image(lampLight,0,0,width, height);
  }
  
  if (d2<15){
    clock();
    let words = " ";
    fill("#FFD7E5");
    textSize(12);
    text('Click to PLAY/STOP music',clockX-52,clockY-33);
  }

  if (d3<30){
    image(bearLight,0,0,width,height);
    
    //Detect the user is speaking or not
    if (listening == true) {
    fill("#FAFFA9");
    noStroke();
    text("I'm listening.", width / 3-10, 120,300,100);
  }
  else {
    fill(175);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text("I know it's been a long day. \n  You can talk to me about anything. \n Press the point to start talking.", width/3-10, 120, 300,100);
  }
  }
  
  if(d4<25){
    image(jarLight,0,0,width,height);
    if(showWords==1){
      image(note,0,0,width,height);
      fill("white");
      text(secrets[num],width/2,height/3);
      
    }
    if(showWords==0){
      //removeElements();
      erase();
    }
  }
  
  if(d5<15){
    image(star,0,0,width,height);
  }
  
  if(d6<15){
    image(bookLight,0,0,width,height);
    push();
    textSize(12);
    noStroke();
    fill("#FFB7A1");
    text('Click to HEAR/STOP \n bedtime story~',bookX+25,bookY+10);
    pop();
  }
  
  if(d7<25){
    image(star,0,0,width,height);
  }
   //There will be a star generated in the jar each time the user input a sentence
   if(a==20){ 
     for(let i=0;i<secrets.length;i++){
       image(star1,w[i]+random(-0.5,0.5),h[i]+random(-0.5,0.5),width-20,height-20);
     }   
  } 
  
  //Adjust volume
  let val = songV.value();
  let sVolume;
  song.volume(map(val,0,100,0,1));
  fill("white");
  text("Volume",clockX-70,clockY+25);


}

function clock(){
  var sec = second();
  var min = minute();
  var hrs = hour();
  var mer = hrs < 12 ? "AM":"PM";

  sec = formatting(sec);
  min = formatting(min);
  hrs = formatting(hrs % 12);

  fill(255);
  noStroke();
  textSize(16);
  
  text(hrs + ":" + min + ":" + sec +
	" " + mer, clockX-35, clockY+1);
}

function formatting(num){
  if(int(num) < 10) {
	return "0" + num;
  }
  return num;
}