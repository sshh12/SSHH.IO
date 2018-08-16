
let video_query = $('#original-video');
let video = video_query.get(0);

let canvas = $('#video-canvas').get(0);
let ctx = canvas.getContext('2d');

let timeLabel = $('#time');

let analysisHeader = $('#analysis-header');

let handleFrame = () => {
	
	let vTime = video.currentTime;
	
	timeLabel.html(vTime.toFixed(3) + "s");
	
	ctx.drawImage(video, 0, 0, video.offsetWidth, video.offsetHeight);
	
	for(let line of lines){
		
		if(line.time[0] <= vTime && line.time[1] >= vTime){
			
			ctx.beginPath();
			ctx.moveTo(line.pos[0][0], line.pos[0][1]);
			
			for(let i = 1; i < line.pos.length; i++){
				ctx.lineTo(line.pos[i][0], line.pos[i][1]);
			}
			
			ctx.strokeStyle = line.color;
			ctx.stroke();
			
		}
		
	}
	
	/*for(let analysis of analysises){
		
		if(analysis.time[0] <= vTime && analysis.time[1] >= vTime){
			
			analysisHeader.html(analysis.name);
			
		}
		
	}*/
	
	if (!video.paused && !video.ended) {
      setTimeout(handleFrame, 0);
    }

}

let stepFrame = (amt) => {
	
	if(!video.paused){ video.pause() };
	
	video.currentTime += amt;
	
	handleFrame();
	
}

let setRelRate = (relRate) => {
	
	video.playbackRate *= relRate;
	
}

video_query.on('play', () => {
	
	canvas.width = video.offsetWidth;
	canvas.height = video.offsetHeight;
	
	handleFrame();
	
})

let lines = [
	{color: 'green', time: [2.329, 3.111], pos: [[384, 87], [438, 107]]},
	{color: 'red', time: [2.329, 3.111], pos: [[384, 87], [388, 70], [396, 55], [404, 31], [406, 19], [408, 10], [412, 3], [416, 3], [402, 0], [424, 5], [428, 3], [428, 5], [429, 9], [430, 13], [432, 19], [432, 26], [432, 34], [434, 47], [436, 65], [438, 89], [438, 107]]}
]

let analysises = [
	{
		name: 'Papertowl 1', 
		time: [0, 4]
	}
]

///
function getMousePos(evt) {
	if(evt.ctrlKey){
    var rect = canvas.getBoundingClientRect();
    console.log({
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    })};
}

window.addEventListener('mousemove', getMousePos);
///