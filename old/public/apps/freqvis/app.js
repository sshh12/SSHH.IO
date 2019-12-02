var osc;
var ampSlider;

var expPoints = [
	[10,120],
	[90,130],
	[900,130],
	[2000,115],
	[4000,110],
	[10000,121],
	[20000,100],
	[18000,50],
	[10000,10],
	[4000,0],
	[1000,5],
	[20,60],
	[15,90]
];

var orchestralPoints = [
	[40,70],
	[150,90],
	[300,100],
	[9000,70],
	[15000,40],
	[10000,20],
	[800,25],
	[600,21],
	[500,22],
	[200,31],
	[50,55]
];

var vocalPoints = [
	[100,50],
	[120,60],
	[300,70],
	[1000,70],
	[2000,60],
	[10000,40],
	[8000,30],
	[2000,48],
	[800,45],
	[200,42],
	[150,45]
];

function setup() {
	
	frameRate(30);
	
	createCanvas(windowWidth - 20, windowHeight - 20);
	
	ampSlider = createSlider(0, 20, 2, .1);
	ampSlider.position((windowWidth - 20) / 2 - 150, windowHeight - 30);
	ampSlider.style('width', '300px');
	
	osc = new p5.Oscillator();
	osc.setType('sine');
	osc.freq(240);
	osc.amp(0);
	osc.start();
	
}

function coordsToSound(x, y){
	var vol = map(y, 0, windowHeight - 100, ampSlider.value(), 0);
	var freq = 2.4 * pow(10, map(x, 0, windowWidth - 30, 0, 4));
	return [vol, freq];
}

function soundToCoords(freq, vol){
	var x = map(0.434*log(0.4166*freq), 0, 4, 0, windowWidth - 30);
	var y = map(vol, 0, 140, windowHeight - 100, 0);
	return [x,y];
}

function draw() {
	
  noStroke();
  
  fill(255);
	
  rect(0,0,windowWidth,windowHeight);
  
  stroke(50);
	
  drawGraph();
  
  var sound = coordsToSound(mouseX, mouseY);
  
  var volume = sound[0];
  var freq = sound[1];
  
  if(mouseX >= 0 && mouseX < windowWidth - 30 && mouseY >= 0 && mouseY < windowHeight - 100){
	
	  if(mouseIsPressed){

		  osc.amp(volume);
		  osc.freq(freq);
		  
		  fill(0);
		  
	  } else {
		  osc.amp(0);
		  fill(255);
	  }
	  
	  ellipse(mouseX, mouseY, 4, 4);
	  
	  textAlign(CENTER);
	  fill(0);
	  text(freq.toFixed(2) + "Hz, Amp " + volume.toFixed(2) + ", " + (volume/ampSlider.value()*140).toFixed(2) + "dB", mouseX, mouseY-10);
  
  }
  
}

function drawPoints(points, name){
	
	beginShape();
	for(var i = 0; i < points.length; i++){
		var coord = soundToCoords(points[i][0], points[i][1]);
		vertex(coord[0], coord[1]);
	}
	endShape(CLOSE);
	
	fill(20);
	textAlign(LEFT);
	var textCoords = soundToCoords(points[0][0], points[0][1]);
	text(name, textCoords[0] + 40, textCoords[1]);
}

function drawGraph(){
	rect(0, 0, windowWidth - 30, windowHeight - 100);
	
	fill(0);
	textAlign(LEFT, CENTER);
	text("140dB = Amp of " + ampSlider.value().toFixed(1), 10,10);
	
	fill(240);
	drawPoints(expPoints, "Hearing");
	
	fill(200,200,250);
	drawPoints(orchestralPoints, "Orchestral");
	
	fill(200,250,200);
	drawPoints(vocalPoints, "Vocal");
}