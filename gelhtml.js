// - ------------------------------------------------------------------------------------------ - //
// Internet Explorer Sucks { //
if ( ! window.console ) console = { log: function(){} };
// } //
// - ------------------------------------------------------------------------------------------ - //
var IntervalHandle = 0;
var FrameRate = 1000/60;
// - ------------------------------------------------------------------------------------------ - //
var Art = {};
// - ------------------------------------------------------------------------------------------ - //
var BaseX = 0;
var BaseY = 0;
// - ------------------------------------------------------------------------------------------ - //
var canvas;
var ctx;
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
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
// - ------------------------------------------------------------------------------------------ - //
function imgDrawLayer( layer ) {
	for ( var idx = 0; idx < layer.length; idx++ ) {
		imgDraw( Art[layer[idx].img], layer[idx].x, layer[idx].y );
	}

}
// - ------------------------------------------------------------------------------------------ - //
function sndPlay( SoundName ) {
	return createjs.Sound.play( SoundName, createjs.Sound.INTERRUPT_ANY );
}
// - ------------------------------------------------------------------------------------------ - //
function sndLooped( SoundName ) {
	return createjs.Sound.play( SoundName, createjs.Sound.INTERRUPT_ANY, 0, 0, -1 );
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
function OnComplete() {
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
	
	console.log("begin game");
	Init();
	IntervalHandle = setInterval( Run, FrameRate );
}
// - ------------------------------------------------------------------------------------------ - //
function Run() {
	Step();
	Draw();	
}
// - ------------------------------------------------------------------------------------------ - //


// - ------------------------------------------------------------------------------------------ - //
function Main_LoseFocus() {
	// Stop the Clock //
	clearInterval( IntervalHandle );
	IntervalHandle = 0;
	
	if ( typeof LoseFocus != "undefined" ) {
		LoseFocus();
	}
}
// - ------------------------------------------------------------------------------------------ - //
function Main_GainFocus() {
	if ( typeof GainFocus != "undefined" ) {
		GainFocus();
	}

	// Restart the Clock //
	if ( IntervalHandle == 0 ) {
		IntervalHandle = setInterval( Run, FrameRate );
	}
}
// - ------------------------------------------------------------------------------------------ - //

// - ------------------------------------------------------------------------------------------ - //
var ThingsLoaded = 0;
// - ------------------------------------------------------------------------------------------ - //
function ShowProgress() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);	

	ctx.fillStyle = "#FFFFFF";
	for ( var idx = 0; idx < ThingsLoaded; idx++ ) {
		var x = (20*idx)-(20*ThingsLoaded>>1);
		var y = 0;
		
		ctx.fillRect(BaseX+x,BaseY+y,18,18);
	}
}
// - ------------------------------------------------------------------------------------------ - //
function handleFileLoad(event) {
	var item = event.item; // A reference to the item that was passed in
	var type = item.type;
	
	if (type == createjs.LoadQueue.IMAGE) {
		console.log(event);
		Art[event.item.id] = event.result;
	}
	
	ThingsLoaded++;
	ShowProgress();
}
// - ------------------------------------------------------------------------------------------ - //
function OnLoad() {
	console.log("Lets Begin");
	
	canvas = document.getElementById("TheCanvas"),
	ctx = canvas.getContext("2d");
	
	BaseX = canvas.width>>1;
	BaseY = canvas.height>>1;

	createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);

	window.onblur = Main_LoseFocus;
	window.onfocus = Main_GainFocus;
	
	var queue = new createjs.LoadQueue(true); // true 
	queue.installPlugin(createjs.Sound);
	queue.addEventListener("complete",OnComplete);
	queue.addEventListener("fileload",createjs.proxy(handleFileLoad,(this)));
	
	for ( var idx = 0; idx < ArtFiles.length; idx++ ) {
		queue.loadFile({id:ArtFiles[idx].name, src:ArtFiles[idx].value});
	}
	for ( var idx = 0; idx < AudioFiles.length; idx++ ) {
		queue.loadFile({id:AudioFiles[idx].name, src:AudioFiles[idx].value});
	}
	
	queue.load();
}
// - ------------------------------------------------------------------------------------------ - //
