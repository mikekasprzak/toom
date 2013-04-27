// Internet Explorer Sucks { //
if ( ! window.console ) console = { log: function(){} };
// } //

var canvas;
var ctx;

var queue;
var Art = {};

var BaseX = 0;
var BaseY = 0;

function imgDraw( Img, x, y, Index ) {
	if ( typeof Index === "undefined" ) {
		var anchor_x;
		if ( Img.hasOwnProperty('anchor_x') )
			anchor_x = Img.anchor_x;
		else
			anchor_x = Img.width>>1;
	
		var anchor_y;
		if ( Img.hasOwnProperty('anchor_y') )
			anchor_y = Img.anchor_y;
		else
			anchor_y = Img.height>>1;

		ctx.drawImage( Img, BaseX+x-anchor_x, BaseY+y-anchor_y );
	}
	else {
		var tile_w;
		if ( Img.hasOwnProperty('tile_w') )
			tile_w = Img.tile_w;
		else
			tile_w = Img.width;
	
		var tile_h;
		if ( Img.hasOwnProperty('tile_h') )
			tile_h = Img.tile_h;
		else
			tile_h = Img.height;

		var anchor_x;
		if ( Img.hasOwnProperty('anchor_x') )
			anchor_x = Img.anchor_x;
		else
			anchor_x = tile_w>>1;
	
		var anchor_y;
		if ( Img.hasOwnProperty('anchor_y') )
			anchor_y = Img.anchor_y;
		else
			anchor_y = tile_h>>1;
			
		var x_steps = Img.width / tile_w;
//		var y_steps = Img.height / tile_h;

		var x_step = Math.floor(Index % x_steps);
		var y_step = Math.floor(Index / x_steps);
		
		ctx.drawImage( Img,
			x_step*tile_w,
			y_step*tile_h,
			tile_w,
			tile_h,
			BaseX+x-anchor_x,
			BaseY+y-anchor_y,
			tile_w,
			tile_h
			);
	}
}



var Stepper = 0;
function Step() {
	Stepper++;
	
}

function Draw() {
	ctx.fillStyle = "#221133";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	imgDraw( Art.Man, 0, 0, (Stepper>>3)&3 );
	
	
	ctx.fillStyle = "#FFFFFF";
	ctx.font = '20px Pixel';
	var Text = 'Hello Drek';
	ctx.fillText(Text, BaseX-55, BaseY-64-20);

	Text = "I've been protecting you_";
	if ( (Stepper >> 5)&1 ) {
		Text = "I've been protecting you";
	}
	ctx.fillText(Text, BaseX-120, BaseY-64);

}

function Run() {
	Step();
	Draw();	
}

function Init() {
	// Copy Properties //
	for ( var idx = 0; idx < ArtFiles.length; idx++ ) {
		if ( ArtFiles[idx].hasOwnProperty('anchor_x') ) {
			Art[ArtFiles[idx].name].anchor_x = ArtFiles[idx].anchor_x;
		}
		if ( ArtFiles[idx].hasOwnProperty('anchor_y') ) {
			Art[ArtFiles[idx].name].anchor_y = ArtFiles[idx].anchor_y;
		}
		if ( ArtFiles[idx].hasOwnProperty('tile_w') ) {
			Art[ArtFiles[idx].name].tile_w = ArtFiles[idx].tile_w;
		}
		if ( ArtFiles[idx].hasOwnProperty('tile_h') ) {
			Art[ArtFiles[idx].name].tile_h = ArtFiles[idx].tile_h;
		}
	}	
	
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
	
	BaseX = canvas.width>>1;
	BaseY = canvas.height>>1;
	
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
