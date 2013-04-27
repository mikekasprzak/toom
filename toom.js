// Internet Explorer Sucks { //
if ( ! window.console ) console = { log: function(){} };
// } //

var canvas;
var ctx;

var queue;
var Art = {};

var Stepper = 0;

function Step() {
	Stepper++;
	
}

function Draw() {
	ctx.fillStyle = "#221133";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
//	console.log('And this is'+Art.man);
	ctx.drawImage( Art.man, canvas.width>>1, canvas.height>>1 );
	
	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = '20px Pixel';
	var Text = 'Hello Derek';
	ctx.fillText(Text, (canvas.width>>1)-55, (canvas.height>>1)-30);

	Text = "I've been expecting you_";
	if ( (Stepper >> 5)&1 ) {
		Text = "I've been expecting you";
	}
	ctx.fillText(Text, (canvas.width>>1)-120, (canvas.height>>1)-10);

}

function Run() {
	Step();
	Draw();	
}

function Init() {
	sndLooped("music");

	setInterval( Run, 1000 / 60 );
}

function sndPlay( SoundName ) {
	return createjs.Sound.play( SoundName, createjs.Sound.INTERRUPT_ANY );
}
function sndLooped( SoundName ) {
	return createjs.Sound.play( SoundName, createjs.Sound.INTERRUPT_ANY, 0, 0, -1 );
}

function handleFileLoad(event) {
	var item = event.item; // A reference to the item that was passed in
	var type = item.type;
	
	if (type == createjs.LoadQueue.IMAGE) {
		console.log(event);
		Art[event.item.id] = event.result;
	}
}

function OnLoad() {
	console.log("Lets Begin");
	
	canvas = document.getElementById("TheCanvas"),
	ctx = canvas.getContext("2d");
	
//	Art["son"] = new Image();
//	Art.son.onload = function() { console.log('this is '+Art.son); };
//	Art.son.src = "art/man.png";

	createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
	
	queue = new createjs.LoadQueue(true); // true 
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete",Init);
	queue.addEventListener("fileload", createjs.proxy(handleFileLoad,(this)));
	
//	queue.loadFile({id:"man", src:"art/man.png"});
	for ( var idx = 0; idx < ArtFiles.length; idx++ ) {
		queue.loadFile({id:ArtFiles[idx].name, src:ArtFiles[idx].value});
	}
	queue.loadFile({id:"music", src:"audio/byetone-capturethis.ogg|audio/byetone-capturethis.mp3"});
	
	queue.load();
}
